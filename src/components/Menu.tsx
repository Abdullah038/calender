"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div className="">
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-primaryColor text-white pt-6 left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-start gap-8 text-xl z-10">
          <Link href="/" onClick={handleClose}>Home</Link>
          <Link href="/Booking" onClick={handleClose}>Booking</Link>
          <Link href="/waiver" onClick={handleClose}>Waiver</Link>
          <Link href="/aboutUs" onClick={handleClose}>About Us</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
