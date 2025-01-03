import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  images: {
    asset: {
      url: string;
    };
  }[];
  priceData: {
    price: number;
    discounted_price?: number;
  };
  description: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products.map((product) => (
        <Link href={`/app/${product.slug.current}`} key={product._id} className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
          <div className="relative w-full h-80">
            {product.images[0]?.asset?.url && (
              <Image
                src={product.images[0].asset.url}
                alt={product.name}
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
              />
            )}
            {product.images[1]?.asset?.url && (
              <Image
                src={product.images[1].asset.url}
                alt={product.name}
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.priceData.discounted_price ?? product.priceData.price}</span>
          </div>
          <div className="text-sm text-gray-500">{product.description}</div>
          <button className="rounded-2xl ring-1 ring-rose-400 w-max text-rose-400 py-2 px-4 text-xs hover:bg-rose-400 hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;



