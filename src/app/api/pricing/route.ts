import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STORE_IDENTIFIER = 'orange-sa.com';
const API_BASE = 'https://api.salla.dev/store/v2/checkout';
const CACHE_TTL = 5 * 60 * 1000;

const OFFERS: Record<number, { product_id: string; pieces: number }> = {
  1: { product_id: '675834151', pieces: 1 }, // 1 piece  -> 99 SAR
  2: { product_id: '1723041231', pieces: 2 }, // 2 pieces -> 168 SAR
  3: { product_id: '1627582468', pieces: 3 }, // 3 pieces -> 230 SAR
};

const HEADERS: Record<string, string> = {
  'Store-Identifier': STORE_IDENTIFIER,
  's-source': 'app',
  's-app-name': 'mini-orange-landing',
  's-app-version': '1.0.0',
  'Content-Type': 'application/json',
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

async function fetchPrice(q: number): Promise<PriceInfo> {
  const cached = cache.get(q);
  if (cached && Date.now() - cached.at < CACHE_TTL) return cached.data;

  const offer = OFFERS[q];
  const base: PriceInfo = {
    quantity: q,
    product_id: offer.product_id,
    pieces: offer.pieces,
    available: false,
    currency: 'SAR',
    sub_total: 0,
    total: 0,
    tax: 0,
    discount: 0,
    original_total: 0,
    per_piece: 0,
  };

  const genRes = await fetch(`${API_BASE}/generate?include_items=true`, {
    method: 'POST',
    headers: HEADERS,
  });
  if (!genRes.ok) {
    console.error('[salla-pricing] generate failed', genRes.status);
    cache.set(q, { at: Date.now(), data: base });
    return base;
  }
  const gen = await genRes.json();
  const cartId = gen?.data?.id;
  if (!cartId) {
    console.error('[salla-pricing] missing cart id', gen);
    cache.set(q, { at: Date.now(), data: base });
    return base;
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
    console.error('[salla-pricing] add failed', addRes.status, text);
    cache.set(q, { at: Date.now(), data: base });
    return base;
  }

  const add = await addRes.json();
  const d = add?.data ?? {};
  const amounts = d.amounts ?? {};
  const subTotal = Number(amounts.sub_total?.amount?.value ?? 0);
  const total = Number(amounts.total?.amount?.value ?? 0);
  const tax = Number(amounts.tax?.amount?.value ?? 0);
  const currency = d.currency?.code || 'SAR';
  const discount = Math.max(0, subTotal - total);
  const pieces = offer.pieces || 1;

  const result: PriceInfo = {
    ...base,
    available: true,
    currency,
    sub_total: subTotal,
    total,
    tax,
    discount,
    original_total: subTotal,
    per_piece: Number((total / pieces).toFixed(2)),
  };

  cache.set(q, { at: Date.now(), data: result });
  return result;
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
    return NextResponse.json({ message: 'تعذر تحميل السعر' }, { status: 502 });
  }
}
