"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client'; 

interface Category {
  _id: string;
  title: string;
  image: {
    asset: {
      url: string;
    };
  };
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [current, setCurrent] = useState(0);

  // Fetch categories from Sanity
  useEffect(() => {
    client.fetch('*[_type == "category"]{_id, title, image{asset->{url}}}').then(data => {
      setCategories(data);
    });

    // Set up sliding interval
    const interval = setInterval(() => {
      setCurrent(prev => (prev === categories.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [categories.length]);

  return (
    <div className='relative h-[calc(100vh-80px)] overflow-hidden'>
      <div className='w-max h-full flex transition-transform ease-in-out duration-1000'
        style={{ transform: `translateX(-${current * 100}vw)` }}>
        {categories.map(category => (
          <Link key={category._id} href={`/list?cat=${category.title}`} className='w-screen h-full flex-shrink-0'>
            <div className='relative bg-slate-100 w-full h-64'> 
              <Image src={category.image.asset.url} alt={category.title} fill sizes='20vw' className='object-contain' /> {/* Changed object-cover to object-contain */}
            </div>
            <h1 className='mt-8 font-semibold text-center text-cl tracking-wide'>{category.title}</h1>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        {categories.map((category, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-black cursor-pointer flex items-center justify-center ${current === index ? "scale-150" : ""}`}
            key={`indicator-${category._id}`}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-black rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;





