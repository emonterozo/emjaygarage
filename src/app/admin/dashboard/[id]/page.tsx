import React from 'react';
import { notFound } from 'next/navigation';
import Product from '@/model/Product';
import { Dashboard } from '@/components';

type DashboardPageProps = {
  params: {
    id: string;
  };
};

const NEXT_PUBLIC_ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { id } = await params;

  if (id !== NEXT_PUBLIC_ADMIN_KEY) return notFound();

  const totalUnits = await Product.countDocuments();
  const totalPublishedUnit = await Product.countDocuments({ is_active: true });
  const totalOwnUnits = await Product.countDocuments({ is_own_unit: true });
  const totalOwnSoldUnits = await Product.countDocuments({ is_own_unit: true, is_sold: true });

  const products = await Product.find({ is_own_unit: true })
    .sort({ is_sold: -1, name: 1 })
    .select(
      '_id name plate total_expenses sold_price profit percentage date_acquired date_sold days_on_hold is_sold is_active',
    )
    .lean();

  const data = JSON.parse(JSON.stringify(products));

  return (
    <Dashboard
      data={data}
      summary={[
        {
          label: 'Units',
          value: totalUnits,
        },
        {
          label: 'Active Units',
          value: totalPublishedUnit,
        },
        {
          label: 'Units Owned',
          value: totalOwnUnits,
        },
        {
          label: 'Units Sold',
          value: totalOwnSoldUnits,
        },
      ]}
    />
  );
}
