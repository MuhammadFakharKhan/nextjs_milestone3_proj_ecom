"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from "@/sanity/lib/client";
import sanitize from 'dompurify';

interface Product {
  _id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  slug: string;
  media: {
    mainMedia: {
      url: string;
      variantId?: string;
    };
    items: {
      url: string;
    }[];
  };
  additionalInfoSections: {
    title: string;
    description: string;
  }[];
  stockNumber?: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Deals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        *[_type == "productlist"] {
          _id,
          name,
          "slug": slug.current,
          "media": {
            "mainMedia": images[0],
            "items": images
          },
          "price": priceData.price,
          "discountedPrice": priceData.discounted_price,
          category -> { _id, title },
          additionalInfoSections,
          stockNumber
        } | order(name asc)
      `;
      const products = await client.fetch(query);
      console.log("Fetched products:", products);
      setProducts(products);
    };

    fetchData();
  }, []);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prevItems, item];
      }
    });
    console.log("Cart items after addition:", cartItems);
  };

  return (
    <div className='mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
      {products.map((product) => {
        // Logging the main image URL
        console.log(`Main image URL: ${product.media.mainMedia.url}`);

        return (
          <div key={product._id} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
            <Link href={`/app/${product.slug}`}>
              <div className='relative w-full h-80'>
                <Image
                  src={product.media.mainMedia.url}
                  alt={product.name}
                  fill
                  sizes='25vw'
                  className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500'
                  onError={() => console.log(`Failed to load image for product ID: ${product._id}`)}
                />
                {product.media.items.length > 1 && (
                  <Image
                    src={product.media.items[1]?.url}
                    alt={product.name}
                    fill
                    sizes='25vw'
                    className='absolute object-cover rounded-md'
                    onError={() => console.log(`Failed to load hover image for product ID: ${product._id}`)}
                  />
                )}
              </div>
            </Link>
            <div className='flex justify-between'>
              <span className='font-medium'>{product.name}</span>
              <div>
                <span className='font-semibold line-through text-gray-500'>${product.price}</span>
                <span className='font-semibold text-red-500 ml-2'>${product.discountedPrice}</span>
              </div>
            </div>
            <div className='text-sm text-gray-500'>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitize.sanitize(product.additionalInfoSections.find(
                    (section) => section.title === "shortDesc"
                  )?.description || '')
                }}
              />
            </div>
            <button
              className='rounded-2xl ring-1 ring-rose-400 w-max text-rose-400 py-2 px-4 text-xs hover:bg-rose-400 hover:text-white'
              onClick={() => {
                addToCart({ id: product._id, name: product.name, price: product.price, quantity: 1 });
                console.log(`Product ${product._id} added to cart`);
              }}
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Deals;





