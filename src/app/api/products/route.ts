import { NextRequest, NextResponse } from 'next/server';
import connectDatabase from '@/lib/connectDatabase';
import Product from '@/model/Product';

export async function GET() {
  try {
    await connectDatabase();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDatabase();

    const body = await request.json();
    await Product.create(body);

    return NextResponse.json({ message: 'New unit successfully added!' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save unit' }, { status: 500 });
  }
}
