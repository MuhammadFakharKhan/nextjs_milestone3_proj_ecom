
import { client } from '@/sanity/lib/client';

// Fetch all product slugs at build time
export async function generateStaticParams() {
  const products = await client.fetch(`*[_type == "productitem"]{ slug }`);
  return products.map((product: { slug: { current: string } }) => ({
    slug: product.slug.current, // Return an array of objects with the `slug` parameter
  }));
}