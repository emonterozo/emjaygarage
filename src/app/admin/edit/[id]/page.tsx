import React from 'react';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import connectDatabase from '@/lib/connectDatabase';
import Product from '@/model/Product';
import { UnitForm } from '@/components';
import { Box } from '@mui/material';
import { Product as TProduct } from '@/types/types';

type AdminProductPreviewProps = {
  params: {
    id: string;
  };
};

export default async function AdminEditPage({ params }: AdminProductPreviewProps) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  await connectDatabase();

  const product = await Product.findById(id).lean();

  const data: TProduct = JSON.parse(JSON.stringify(product));

  const terms = data.financing_details.terms.map((item) => ({
    months: item.term.toString(),
    amount: item.amount.toString(),
    _id: item._id,
  }));

  return (
    <Box>
      <UnitForm
        data={{
          _id: data._id,
          plate: data.plate,
          model: data.name,
          price: data.price.toString(),
          description: data.description,
          detail: '',
          details: data.details,
          downpayment: data.financing_details.down_payment.toString(),
          financingOptions: terms,
          purchasePrice: data.purchase_price.toString(),
          soldAmount: data.sold_price.toString(),
          salesIncentive: data.sales_incentive.toString(),
          acquiredCity: data.acquired_city,
          expenses: data.expenses,
          isFeature: String(data.is_feature),
          isOwnUnit: String(data.is_own_unit),
          isSold: String(data.is_sold),
          isActive: String(data.is_active),
          images: data.images,
          financingMonths: '0',
          financingAmount: '0',
          expenseDescription: '',
          expenseAmount: '0',
          expenseCategory: 'Operating',
          dateAcquired: data.date_acquired === null ? undefined : data.date_acquired.toString(),
          dateSold: data.date_sold === null ? undefined : data.date_sold.toString(),
        }}
      />
    </Box>
  );
}
