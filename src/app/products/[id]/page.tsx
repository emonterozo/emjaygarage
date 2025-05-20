import mongoose from 'mongoose';
import { notFound } from 'next/navigation';
import connectDatabase from '@/lib/connectDatabase';
import Product from '@/model/Product';
import { Footer, Product as ProductComponent, Products } from '@/components';
import { Box } from '@mui/material';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
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
      <ProductComponent product={productData} />
      <Products products={productsData} />
      <Footer />
    </Box>
  );
}
