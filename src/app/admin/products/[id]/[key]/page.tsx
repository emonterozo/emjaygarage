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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const product: ProductTypes | null = await Product.findById(id).lean();

  if (key !== NEXT_PUBLIC_ADMIN_KEY || !product) return notFound();
  product._id = product._id.toString();
  return (
    <Box>
      <AdminProduct product={product} />
      <Footer />
    </Box>
  );
}
