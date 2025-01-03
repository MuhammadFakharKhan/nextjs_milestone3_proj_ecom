
"use client";

import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client'; 
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore, CartState } from '@/app/store/cartStore';
import { useParams } from 'next/navigation';



interface AdditionalInfoSection {
  title: string;
  description: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: { price: number; discountedPrice?: number };
  stock?: { quantity: number };
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
  additionalInfoSections?: AdditionalInfoSection[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Add: React.FC<{ productId: string, stockNumber: number, price: number, addToCart: (item: CartItem) => void }> = ({ productId, stockNumber, price, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    
    addToCart({ id: productId, name: `Product ${productId}`, price, quantity });
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left!
              <br /> {"Don't"} miss it
            </div>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const SinglePage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const addItem = useCartStore((state: CartState) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (slug) {
        const query = `*[_type == "productitem" && slug.current == $slug][0]{
          _id,
          name,
          description,
          price,
          stock,
          image { asset -> { url } },
          hoverimage { asset -> { url } },
          additionalInfoSections
        }`;
        const product = await client.fetch(query, { slug });
        
        setProduct(product);
      }
    };

    fetchProduct();
  }, [slug]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/Product" className="mt-4 text-blue-500 hover:underline">
          Go back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="w-full flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        {product.image?.asset?.url && (
          <Image
            src={product.image.asset.url}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-md"
            onError={(e) => {
              e.currentTarget.src = "/fallback-image.png";
            }}
          />
        )}
        {product.hoverimage?.asset?.url && (
          <Image
            src={product.hoverimage.asset.url}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-md mt-4"
            onError={(e) => {
              e.currentTarget.src = "/fallback-image.png";
            }}
          />
        )}
        <div className="h-[2px] bg-gray-100" />
        {product.price?.discountedPrice ? (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product.price.price} {/* Render the original price */}
            </h3>
            <h2 className="font-medium text-2xl">
              ${product.price.discountedPrice} {/* Render the discounted price */}
            </h2>
          </div>
        ) : (
          <h2 className="font-medium text-2xl">
            ${product.price?.price || 0} {/* Render the original price with fallback */}
          </h2>
        )}
        <div className="h-[2px] bg-gray-100" />
        <Add
          productId={product._id}
          stockNumber={product.stock?.quantity || 0}
          price={product.price?.discountedPrice || product.price?.price || 0}
          addToCart={addItem}
        />
        <div className="h-[2px] bg-gray-100" />
        {product.additionalInfoSections?.map((section: AdditionalInfoSection) => (
          <div className="text-sm" key={section.title}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <p>{section.description}</p>
          </div>
        ))}
        <div className="h-[2px] bg-gray-100" />
      </div>
    </div>
  );
};

export default SinglePage;


