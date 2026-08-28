import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STORE_IDENTIFIER = 'orange-sa.com';
const PRODUCTS_API = 'https://api.salla.dev/store/v2/products';
const CACHE_TTL = 5 * 60 * 1000;

// Verified server-side offer configuration. This is the single source of
// truth for prices and is always returned, even if the read-only lookup fails.
const OFFERS: Record<number, { productId: string; pieces: number; price: number }> = {
  1: { productId: '675834151', pieces: 1, price: 99 },
  2: { productId: '1723041231', pieces: 2, price: 168 },
  3: { productId: '1627582468', pieces: 3, price: 230 },
};

const HEADERS: Record<string, string> = {
  'Store-Identifier': STORE_IDENTIFIER,
  's-source': 'app',
  's-app-name': 'mini-orange-landing',
  's-app-version': '1.0.0',
  Accept: 'application/json',
};

type PriceInfo = {
  quantity: number;
  product_id: string;
  pieces: number;
  available: boolean;
  currency: string;
  sub_total: number;
  total: number;
  tax: number;
  discount: number;
  original_total: number;
  per_piece: number;
};

const cache = new Map<number, { at: number; data: PriceInfo }>();

function fallbackPrice(q: number): PriceInfo {
  const offer = OFFERS[q];
  const total = offer.price;
  return {
    quantity: q,
    product_id: offer.productId,
    pieces: offer.pieces,
    available: true,
    currency: 'SAR',
    sub_total: total,
    total,
    tax: 0,
    discount: 0,
    original_total: total,
    per_piece: Number((total / offer.pieces).toFixed(2)),
  };
}

// Best-effort read-only lookup. Never mutates a cart. Falls back to the
// verified offer configuration on any failure or when no price is found.
async function fetchPrice(q: number): Promise<PriceInfo> {
  const cached = cache.get(q);
  if (cached && Date.now() - cached.at < CACHE_TTL) return cached.data;

  const offer = OFFERS[q];
  const fallback = fallbackPrice(q);

  try {
    const res = await fetch(`${PRODUCTS_API}/${offer.productId}`, {
      method: 'GET',
      headers: HEADERS,
      cache: 'no-store',
    });

    if (res.ok) {
      const json = await res.json().catch(() => null);
      const price = extractPrice(json);
      if (typeof price === 'number' && price > 0) {
        const result: PriceInfo = {
          ...fallback,
          sub_total: price,
          total: price,
          original_total: price,
          per_piece: Number((price / offer.pieces).toFixed(2)),
        };
        cache.set(q, { at: Date.now(), data: result });
        return result;
      }
    }
  } catch (e) {
    console.error('[salla-pricing] read-only lookup failed, using fallback', e);
  }

  cache.set(q, { at: Date.now(), data: fallback });
  return fallback;
}

function extractPrice(json: unknown): number | null {
  if (!json || typeof json !== 'object') return null;
  const data = (json as { data?: Record<string, unknown> }).data ?? json;
  // Try a few common Salla product shapes.
  const candidates: unknown[] = [
    (data as { price?: { amount?: { value?: number } } }).price?.amount?.value,
    (data as { price?: number }).price,
    (data as { amount?: { value?: number } }).amount?.value,
    (data as { sale_price?: { amount?: { value?: number } } }).sale_price?.amount?.value,
  ];
  for (const c of candidates) {
    const n = Number(c);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return null;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  if (url.searchParams.get('revalidate') === '1') {
    cache.clear();
  }
  try {
    const prices = await Promise.all([1, 2, 3].map(fetchPrice));
    return NextResponse.json({ prices });
  } catch (e) {
    console.error('[salla-pricing] error', e);
    const prices = [1, 2, 3].map(fallbackPrice);
    return NextResponse.json({ prices });
  }
}
