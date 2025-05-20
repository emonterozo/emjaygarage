import React from 'react';
import { notFound } from 'next/navigation';
import Product from '@/model/Product';
import { AdminProducts } from '@/components';

type AdminPageProps = {
  params: {
    id: string;
  };
};

const NEXT_PUBLIC_ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;

export default async function AdminPage({ params }: AdminPageProps) {
  const { id } = await params;

  if (id !== NEXT_PUBLIC_ADMIN_KEY) return notFound();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let products: TProduct[] = await Product.find({}).sort({ is_sold: 1 }).lean();
  products = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));

  return <AdminProducts products={products} />;
}
