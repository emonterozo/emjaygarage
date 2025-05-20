import { NextResponse } from 'next/server';
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
