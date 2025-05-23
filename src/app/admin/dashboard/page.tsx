import React, { Suspense } from 'react';
import Product from '@/model/Product';
import { Dashboard } from '@/components';
import connectDatabase from '@/lib/connectDatabase';
import { Box } from '@mui/material';
import Loading from './loading';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  await connectDatabase();
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
    <Box>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </Box>
  );
}
