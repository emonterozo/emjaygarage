import React from 'react';
import Product from '@/model/Product';
import { AdminProducts } from '@/components';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const products = await Product.find({}).sort({ is_sold: 1, name: 1 }).lean();

  const data = JSON.parse(JSON.stringify(products));

  return <AdminProducts products={data} />;
}
