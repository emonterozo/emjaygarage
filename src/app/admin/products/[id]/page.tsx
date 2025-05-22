import React from 'react';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import connectDatabase from '@/lib/connectDatabase';
import Product from '@/model/Product';
import { AdminProduct } from '@/components';
import { Box } from '@mui/material';

export default async function AdminProductPreview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  await connectDatabase();

  const product = await Product.findById(id).lean();

  const data = JSON.parse(JSON.stringify(product));

  return (
    <Box>
      <AdminProduct product={data} />
    </Box>
  );
}
