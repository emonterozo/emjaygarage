import mongoose from 'mongoose';
import { notFound } from 'next/navigation';
import connectDatabase from '@/lib/connectDatabase';
import Product from '@/model/Product';
import { Footer, Product as ProductComponent, Products } from '@/components';
import { Box } from '@mui/material';
import { Suspense } from 'react';
import Loading from './loading';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  await connectDatabase();

  const product = await Product.findById(id).lean();

  const products = await Product.find({ is_active: true, _id: { $ne: id } })
    .sort({ is_sold: 1 })
    .lean();

  if (!product) {
    return notFound();
  }

  const productData = JSON.parse(JSON.stringify(product));
  const productsData = JSON.parse(JSON.stringify(products));

  return (
    <Box>
      <Suspense fallback={<Loading />}>
        <ProductComponent product={productData} />
        {productsData.length > 0 && <Products products={productsData} />}
        <Footer />
      </Suspense>
    </Box>
  );
}
