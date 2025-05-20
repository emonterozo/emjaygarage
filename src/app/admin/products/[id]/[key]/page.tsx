import React from 'react';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import connectDatabase from '@/lib/connectDatabase';
import Product from '@/model/Product';
import { AdminProduct, Footer } from '@/components';
import { Box } from '@mui/material';

type AdminProductPreviewProps = {
  params: {
    id: string;
    key: string;
  };
};

const NEXT_PUBLIC_ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;

export default async function AdminProductPreview({ params }: AdminProductPreviewProps) {
  const { id, key } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  await connectDatabase();

  const product = await Product.findById(id).lean();

  if (key !== NEXT_PUBLIC_ADMIN_KEY || !product) return notFound();

  const data = JSON.parse(JSON.stringify(product));

  return (
    <Box>
      <AdminProduct product={data} />
      <Footer />
    </Box>
  );
}
