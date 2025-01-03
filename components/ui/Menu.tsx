"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import  Link  from 'next/link'

function Menu() {

    const [open,setOpen] = useState(false)
  return (
    <div className = "md:hidden xl:flex items-center">
        <Image src="/menu.png"
         alt='menu' width={28} 
         height={28} 
         className='cursor-pointer'onClick={()=>setOpen(prev=>!prev)}

        />{
            open && (
                <div className='absolute bg-black text-white left-0 top-20  w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10'>
                    <Link href='/'>Home</Link>
                    <Link href='/Shop'>Shop</Link>
                    <Link href='/Deals'>Deals</Link>
                    <Link href='/About'>About</Link>
                    <Link href='/Contact'>Contact</Link>
                    <Link href='/Login'>Login</Link>
                    
                    </div>
            )
        }

    </div>
  )
}

export default Menu;