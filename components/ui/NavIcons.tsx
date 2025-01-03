
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cartStore"; 
import { CartItem } from "@/app/types"; 

interface CartModelProps {
  items: CartItem[];
  removeItem: (id: string) => void;
}

const CartModel: React.FC<CartModelProps> = ({ items, removeItem }) => {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="w-max absolute p-4 top-12 right-0 flex flex-col gap-6 z-20 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white text-sm">
      {items.length === 0 ? (
        <div className="">Cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                {item.image && (
                  <Image src={item.image} alt={item.name} width={72} height={96} />
                )}
                <div className="">
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">${item.price}</div>
                  </div>
                  <div className="text-sm text-gray-500">available</div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. {item.quantity}</span>
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const router = useRouter();

  // TEMPORARY
  const isLoggedIn = false;

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/");
    }
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative z-20">
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white text-black z-10">
          <div className="mt-2 cursor-pointer">Profile</div>
          <div className="mt-2 cursor-pointer">Logout</div>
        </div>
      )}
      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="" width={22} height={22} />
        {cartItems.length > 0 && (
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-rose-400 rounded-full text-white text-sm flex items-center justify-center">
            {cartItems.length}
          </div>
        )}
      </div>
      {isCartOpen && <CartModel items={cartItems} removeItem={removeItem} />}
    </div>
  );
};

export default NavIcons;

