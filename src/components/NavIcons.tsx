"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CartModal from "./CartModal";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const router = useRouter();

  // TEMPORARY
  const isLoggedIn = false;

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    setIsProfileOpen((prev) => !prev);
  };


  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-4 xl:gap-6">
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        onClick={handleProfile}
        className="cursor-pointer relative"
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-14 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-gray-200 z-20">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
        </div>
      )}

      <div className="relative cursor-pointer">
        <Image
          src="/cart.png"
          alt=""
          width={22}
          height={22}
          onClick={() => setIsCartOpen((prev) => !prev)}
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-800 rounded-full text-white text-sm flex items-center justify-center">2</div>

      </div>

      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
