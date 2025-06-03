"use client";

import Image from "next/image";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between h-10 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-72 bg-primaryColor mb-3">
        <div className="flex items-center gap-2">
            <Link href="/">
                <Image src="/facebook.png" width={24} height={24} alt=""/>
            </Link>
            <Link href="/">
                <Image src="/instagram.png" width={24} height={24} alt=""/>
            </Link>
        </div>
        <div className="">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-black">
                <Image src="/phone-call.png" width={24} height={24} alt="" />
                <span className="hidden md:flex">(437) 933-9663 (WOOF)</span>
            </Link>
        </div>


    </div>
    
  )
}


export default TopBar