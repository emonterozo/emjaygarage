import mongoose from 'mongoose';
import { notFound } from 'next/navigation';
import connectDatabase from '@/lib/connectDatabase';
import Product from '@/model/Product';
import { Footer, Product as ProductComponent, Products } from '@/components';
import { Product as ProductTypes } from '@/types/types';
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const product: ProductTypes | null = await Product.findById(id).lean();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  let products: ProductTypes[] = await Product.find({ is_active: true, _id: { $ne: id } })
    .sort({ is_sold: 1 })
    .lean();
  products = products.map((product) => ({
    ...product,
    _id: product._id.toString(), // Convert ObjectId to string
  }));

  if (!product) {
    return notFound();
  }

  product._id = product._id.toString();

  return (
    <Box>
      <ProductComponent product={product} />
      <Products products={products} />
      <Footer />
    </Box>
  );
}
