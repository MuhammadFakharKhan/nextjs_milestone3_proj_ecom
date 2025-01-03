"use client";
import CategoryList from '@/components/ui/CategoryList';
import NewProduct from '@/components/ui/NewProduct';
import ProductList from '@/components/ui/ProductList';
import Slider from '@/components/ui/Slider';
import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';

const Homepage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Fetch featured products from Sanity
    const fetchFeaturedProducts = async () => {
      const query = `*[_type == "productlist" && featured == true]{
        _id,
        name,
        priceData,
        description,
        images[]{
          asset -> { url }
        }
      }`;
      const products = await client.fetch(query);
      setFeaturedProducts(products);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      <Slider />
      <div className='mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
       
        <ProductList products={featuredProducts} />
      </div>

      <div className='mt-24'>
        <h1 className='text-2xl px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mb-12 font-semibold'>Categories</h1>
        <CategoryList />
      </div>

      <div className='mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
        <h1 className='text-2xl font-semibold'>New Products</h1>
        <NewProduct />
      </div>
    </div>
  );
};

export default Homepage;



