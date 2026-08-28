import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STORE_IDENTIFIER = 'orange-sa.com';
const API_BASE = 'https://api.salla.dev/store/v2/checkout';

// Each offer maps to its own Salla product (no shared option/variant).
// Discovered from the public product pages:
//   Offer 1 (1pc / 99)  -> orange-sa.com/ar/mini-orange/p675834151
//   Offer 2 (2pc / 168) -> orange-sa.com/ar/mini-orange/p1723041231 (MINI-ORANGE-2)
//   Offer 3 (3pc / 230) -> orange-sa.com/ar/mini-orange/p1627582468 (MINI-ORANGE-3)
const OFFERS: Record<number, { product_id: string; pieces: number }> = {
  1: { product_id: '675834151', pieces: 1 },
  2: { product_id: '1723041231', pieces: 2 },
  3: { product_id: '1627582468', pieces: 3 },
};

const HEADERS: Record<string, string> = {
  'Store-Identifier': STORE_IDENTIFIER,
  's-source': 'app',
  's-app-name': 'mini-orange-landing',
  's-app-version': '1.0.0',
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

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

export async function POST(req: NextRequest) {
  let quantity: number;
  try {
    const body = await req.json();
    quantity = Number(body?.quantity);
  } catch {
    return NextResponse.json({ message: 'طلب غير صالح.' }, { status: 400 });
  }

  const offer = OFFERS[quantity];
  if (!offer) {
    return NextResponse.json({ message: 'الكمية غير صالحة.' }, { status: 400 });
  }

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

    const addRes = await fetch(`${API_BASE}/${cartId}/items?include_items=true`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        identifier_type: 'id',
        identifier: offer.product_id,
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

    return NextResponse.json({
      checkout_url: checkoutUrl,
      total,
      currency,
      product_id: offer.product_id,
      pieces: offer.pieces,
    });
  } catch (err) {
    console.error('[salla] unexpected error', err);
    return NextResponse.json(
      { message: 'تعذر الاتصال بمتجر سلة. حاول مرة أخرى.' },
      { status: 502 }
    );
  }
}
