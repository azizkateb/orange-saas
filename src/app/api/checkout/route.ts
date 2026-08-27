import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const STORE_IDENTIFIER = 'orange-sa.com';
const PRODUCT_SKU = 'MINI-ORANGE-5000';
const API_BASE = 'https://api.salla.dev/store/v2/checkout';

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

  if (![1, 2, 3].includes(quantity)) {
    return NextResponse.json({ message: 'الكمية غير صالحة.' }, { status: 400 });
  }

  try {
    // 1) Generate a guest cart
    const genRes = await fetch(`${API_BASE}/generate?include_items=true`, {
      method: 'POST',
      headers: HEADERS,
    });
    const genText = await genRes.text();
    let gen: SallaResponse;
    try {
      gen = JSON.parse(genText);
    } catch {
      gen = {};
    }

    if (!genRes.ok) {
      console.error('[salla] generate failed', genRes.status, genText);
      return NextResponse.json(
        { message: 'تعذر إنشاء سلة الشراء. حاول مرة أخرى.' },
        { status: 502 }
      );
    }

    const cartId = gen?.data?.id;
    if (!cartId) {
      console.error('[salla] generate missing cart id', genRes.status, genText);
      return NextResponse.json(
        { message: 'تعذر إنشاء سلة الشراء. حاول مرة أخرى.' },
        { status: 502 }
      );
    }

    // 2) Add the Mini Orange SKU to the cart
    const addRes = await fetch(`${API_BASE}/${cartId}/items?include_items=true`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        identifier_type: 'sku',
        identifier: PRODUCT_SKU,
        quantity,
      }),
    });
    const addText = await addRes.text();
    let add: SallaResponse;
    try {
      add = JSON.parse(addText);
    } catch {
      add = {};
    }

    if (!addRes.ok) {
      console.error('[salla] add item failed', addRes.status, addText);
      return NextResponse.json(
        { message: 'تعذر إضافة المنتج للسلة. حاول مرة أخرى.' },
        { status: 502 }
      );
    }

    const checkoutUrl = checkoutUrlFrom(add);
    if (!checkoutUrl) {
      console.error('[salla] no checkout_url in response', addRes.status, addText);
      return NextResponse.json(
        { message: 'تعذر إتمام الطلب. حاول مرة أخرى.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ checkout_url: checkoutUrl });
  } catch (err) {
    console.error('[salla] unexpected error', err);
    return NextResponse.json(
      { message: 'تعذر الاتصال بمتجر سلة. حاول مرة أخرى.' },
      { status: 502 }
    );
  }
}
