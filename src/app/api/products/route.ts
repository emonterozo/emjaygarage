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
  } catch {
    return NextResponse.json({ error: 'Failed to save unit' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDatabase();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDatabase();

    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    await Product.findByIdAndUpdate(_id, updateData, { new: true });

    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
