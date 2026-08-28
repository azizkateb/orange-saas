import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STORE_IDENTIFIER = 'orange-sa.com';
const API_BASE = 'https://api.salla.dev/store/v2/checkout';

// Each offer maps to its own Salla product (no shared option/variant).
//   Offer 1 (1pc / 99)  -> 675834151
//   Offer 2 (2pc / 168) -> 1723041231
//   Offer 3 (3pc / 230) -> 1627582468
const OFFERS: Record<number, { productId: string; pieces: number }> = {
  1: { productId: '675834151', pieces: 1 },
  2: { productId: '1723041231', pieces: 2 },
  3: { productId: '1627582468', pieces: 3 },
};

const HEADERS: Record<string, string> = {
  'Store-Identifier': STORE_IDENTIFIER,
  's-source': 'app',
  's-app-name': 'mini-orange-landing',
  's-app-version': '1.0.0',
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// Request-level deduplication. A retried/double-clicked request that carries
// the same requestId reuses the original checkout URL instead of creating a
// second Salla cart.
const DEDUP_TTL = 10 * 60 * 1000;
const checkoutByRequest = new Map<string, { at: number; checkoutUrl: string; total: number; currency: string; productId: string; pieces: number }>();
const inFlight = new Set<string>();

type SallaResponse = {
  success?: boolean;
  message?: string;
  data?: {
    id?: string;
    checkout_url?: string;
    currency?: { code?: string };
    amounts?: {
      total?: { amount?: { value?: number; currency?: string } };
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

function checkoutUrlFrom(payload: unknown): string | undefined {
  const p = (payload ?? {}) as SallaResponse;
  return p?.data?.checkout_url ?? (p as { checkout_url?: string }).checkout_url;
}

// Salla's hosted checkout page follows the store's default language unless we
// pin it via the `lang` query param. Force it to match the storefront locale
// so Arabic visitors land on an Arabic checkout.
function withLang(url: string | undefined, locale: string | undefined): string | undefined {
  if (!url) return url;
  const lang = locale === 'en' ? 'en' : 'ar';
  try {
    const u = new URL(url);
    u.searchParams.set('lang', lang);
    return u.toString();
  } catch {
    return url.includes('?') ? `${url}&lang=${lang}` : `${url}?lang=${lang}`;
  }
}

export async function POST(req: NextRequest) {
  let quantity: number;
  let requestId: string | undefined;
  let locale: string = 'ar';
  try {
    const body = await req.json();
    quantity = Number(body?.quantity);
    requestId = typeof body?.requestId === 'string' ? body.requestId : undefined;
    locale = body?.locale === 'en' ? 'en' : 'ar';
  } catch {
    return NextResponse.json({ message: 'طلب غير صالح.' }, { status: 400 });
  }

  const offer = OFFERS[quantity];
  if (!offer) {
    return NextResponse.json({ message: 'الكمية غير صالحة.' }, { status: 400 });
  }

  // Deduplicate by requestId (double-click / network retry).
  if (requestId) {
    const existing = checkoutByRequest.get(requestId);
    if (existing && Date.now() - existing.at < DEDUP_TTL) {
      return NextResponse.json({
        checkout_url: withLang(existing.checkoutUrl, locale),
        total: existing.total,
        currency: existing.currency,
        product_id: existing.productId,
        pieces: existing.pieces,
        deduplicated: true,
      });
    }
  }

  // Only one cart per requestId at a time.
  if (requestId && inFlight.has(requestId)) {
    return NextResponse.json(
      { message: 'جارٍ معالجة طلبك، انتظر قليلًا.' },
      { status: 429 }
    );
  }
  if (requestId) inFlight.add(requestId);

  try {
    const genRes = await fetch(`${API_BASE}/generate?include_items=true`, {
      method: 'POST',
      headers: HEADERS,
    });
    if (!genRes.ok) {
      console.error('[salla] generate failed', genRes.status);
      return NextResponse.json(
        { message: 'تعذر إنشاء سلة الشراء. حاول مرة أخرى.' },
        { status: 502 }
      );
    }
    const gen = await genRes.json();
    const cartId = gen?.data?.id;
    if (!cartId) {
      console.error('[salla] missing cart id', gen);
      return NextResponse.json(
        { message: 'تعذر إنشاء سلة الشراء. حاول مرة أخرى.' },
        { status: 502 }
      );
    }

    // Add ONLY the selected product, exactly once, with Salla quantity 1.
    const addRes = await fetch(`${API_BASE}/${cartId}/items?include_items=true`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        identifier_type: 'id',
        identifier: offer.productId,
        quantity: 1,
      }),
    });

    if (!addRes.ok) {
      const text = await addRes.text();
      console.error('[salla] add failed', addRes.status, text);
      return NextResponse.json(
        { message: 'تعذر إضافة المنتج للسلة، تأكد من توفّره أو حاول مرة أخرى.' },
        { status: 502 }
      );
    }

    const add: SallaResponse = await addRes.json();
    const checkoutUrl = checkoutUrlFrom(add);
    if (!checkoutUrl) {
      console.error('[salla] no checkout_url in response', add);
      return NextResponse.json(
        { message: 'تعذر إتمام الطلب. حاول مرة أخرى.' },
        { status: 502 }
      );
    }

    const amounts = (add?.data?.amounts ?? {}) as {
      total?: { amount?: { value?: number; currency?: string } };
    };
    const total = Number(amounts.total?.amount?.value ?? 0);
    const currency = amounts.total?.amount?.currency || add?.data?.currency?.code || 'SAR';

    if (requestId) {
      checkoutByRequest.set(requestId, {
        at: Date.now(),
        checkoutUrl,
        total,
        currency,
        productId: offer.productId,
        pieces: offer.pieces,
      });
    }

    return NextResponse.json({
      checkout_url: withLang(checkoutUrl, locale),
      total,
      currency,
      product_id: offer.productId,
      pieces: offer.pieces,
    });
  } catch (err) {
    console.error('[salla] unexpected error', err);
    return NextResponse.json(
      { message: 'تعذر الاتصال بمتجر سلة. حاول مرة أخرى.' },
      { status: 502 }
    );
  } finally {
    if (requestId) inFlight.delete(requestId);
  }
}
