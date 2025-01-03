"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { useCartStore } from "@/app/store/cartStore";

interface Product {
  _id: string;
  name: string;
  price: { price: number; discountedPrice?: number }; // Updated to match schema
  description: string;
  slug: {
    current: string;
  };
  image: {
    asset: {
      url: string;
    };
  } | null;
  hoverimage: {
    asset: {
      url: string;
    };
  } | null;
}

const NewProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "productitem"]{
          _id,
          name,
          price,
          description,
          slug,
          image {
            asset -> { url }
          },
          hoverimage {
            asset -> { url }
          }
        }`;
        const products = await client.fetch(query);
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products.map((product) => (
        <div key={product._id} className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
          <Link href={`/Product/${product.slug.current}`}>
            <div className="relative w-full h-80 border-black radius-2xl">
              {product.image?.asset?.url && (
                <Image
                  src={product.image.asset.url}
                  alt={product.name}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
                />
              )}
              {product.hoverimage?.asset?.url && (
                <Image
                  src={product.hoverimage.asset.url}
                  alt={product.name}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md opacity-0 hover:opacity-100 z-20"
                />
              )}
            </div>
          </Link>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">
              ${product.price.discountedPrice || product.price.price} {/* Render discounted price if available */}
            </span>
          </div>
          <div className="text-sm text-gray-500">{product.description}</div>
          <button
            className="rounded-2xl ring-1 ring-rose-400 w-max text-rose-400 py-2 px-4 text-xs hover:bg-rose-400 hover:text-white"
            onClick={() => {
              // Add to cart functionality
              addItem({
                id: product._id,
                name: product.name,
                price: product.price.discountedPrice || product.price.price, // Use discounted price if available
                quantity: 1,
              });
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default NewProduct;








