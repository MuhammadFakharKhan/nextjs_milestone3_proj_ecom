import React, { Suspense } from 'react'; 
import Image from 'next/image';
import Filter from '@/components/ui/Filter'; 
import CategoryList from '@/components/ui/CategoryList'; 

const Listpage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-black">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-black text-white hover:bg-transparent hover:text-black w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/2">
          <Image src="/men-no-bg.png" alt="" fill className="object-contain" />
        </div>
      </div>

      FILTER
      * Wrap the Filter component in Suspense */
      <Suspense fallback={<div className="text-center">Loading Filters...</div>}>
        <Filter />
      </Suspense>

      {/* CATEGORY LIST */}
      <CategoryList />
    </div>
  );
};

export default Listpage;