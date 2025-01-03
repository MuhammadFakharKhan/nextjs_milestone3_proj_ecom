import Link from 'next/link';
import React from 'react'
import Menu from './Menu';

import Searchbar from './Searchbar';
import NavIcons from './NavIcons';
function Navbar() {
  return (
    <div className='h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative '>
        {/* {Mobile} */}
        <div className='h-full flex items-center justify-between md:hidden'>

       <Link href='/'>
       <div className='text-2xl font-semibold tracking-wide'>E&nbsp;COMM</div>

       </Link>
       <Menu />
       
       </div>
       {/* {BIGGER SCREEN} */}
       <div className='hidden md:flex h-full justify-between gap-8 items-center'>
        {/* LEFT SECTION */}
        <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
        <Link href="/" className='flex items-center gap-3'>
        
        <div className='text-2xl font-semibold tracking-wide'>E&nbsp;COMM</div>
        </Link>
        <div className='hidden xl:flex gap-4'>
        <Link href="/">Home</Link>
          <Link href="/Shop">Shop</Link>
          <Link href="/Deals">Deals</Link>
          <Link href="/About">About</Link>
          <Link href="/Contact">Contact</Link>
        </div>
        </div>
        {/* RIGHT SECTION */}
        <div className='w-2/3 flex items-center justify-between gap-8'>
        <Searchbar />
        <NavIcons />
        </div>
       </div>
    </div>
  )
}

export default Navbar;