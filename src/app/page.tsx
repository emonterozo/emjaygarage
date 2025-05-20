import { Box } from '@mui/material';
import { Banner, Catalog, Products, Contact, Footer, WhyChooseUs } from '@/components';
import connectDatabase from '@/lib/connectDatabase';
import Product from '@/model/Product';
import { Product as TProduct } from '@/types/types';

function shuffle(array: TProduct[]) {
  return array.sort(() => 0.5 - Math.random());
}

export default async function Home() {
  await connectDatabase();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const products = await Product.find({ is_active: true }).sort({ is_sold: 1 }).lean();

  const productsData: TProduct[] = JSON.parse(JSON.stringify(products));

  const catalogProducts: TProduct[] = [];
  const remainingProducts: TProduct[] = [];

  // Find 1 featured product
  const featuredProductIndex = productsData.findIndex((p) => p.is_feature === true);
  if (featuredProductIndex !== -1) {
    catalogProducts.push(productsData[featuredProductIndex]);
  }

  // Remove the featured product from products array to avoid duplication
  const productsWithoutFeatured = productsData.filter((_, idx) => idx !== featuredProductIndex);

  // Filter products with is_sold false and true
  const unsoldProducts = productsWithoutFeatured.filter((p) => p.is_sold === false);
  const soldProducts = productsWithoutFeatured.filter((p) => p.is_sold === true);

  // Shuffle unsold products and pick up to 3
  const selectedUnsold = shuffle(unsoldProducts).slice(0, 3);

  // If less than 3 unsold products, fill with sold products
  let selectedSold: TProduct[] = [];
  if (selectedUnsold.length < 3) {
    const needed = 3 - selectedUnsold.length;
    selectedSold = shuffle(soldProducts).slice(0, needed);
  }

  // Push to catalogProducts
  catalogProducts.push(...selectedUnsold);
  catalogProducts.push(...selectedSold);

  // Now put the remaining products into remainingProducts
  // They are those not in catalogProducts
  const catalogProductIds = new Set(catalogProducts.map((p) => p._id));
  for (const product of productsData) {
    if (!catalogProductIds.has(product._id)) {
      remainingProducts.push(product);
    }
  }

  return (
    <Box>
      <Banner />
      <Catalog products={catalogProducts} />
      <WhyChooseUs />
      <Products products={remainingProducts} />
      <Contact />
      <Footer />
    </Box>
  );
}
