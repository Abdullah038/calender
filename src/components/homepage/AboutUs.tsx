// components/AboutUs.tsx
"use client";

import React from "react";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-secondaryColor rounded-[2rem] overflow-hidden max-w-screen-2xl mx-auto my-10 ">
        {/* Top: title, (mobile) image, intro, (desktop) image */}
        <div className="flex flex-col md:flex-row items-center gap-8 py-8 px-4 md:px-8">
          {/* desktop-only side image */}
          <div className="hidden md:block flex-shrink-0 w-64 h-64 rounded-[2rem] overflow-hidden">
            <Image
              src="/images/homepage/about-us.jpg"
              alt="Owners smiling at the beach"
              width={256}
              height={256}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-bold text-primaryColor">
              Meet the Humans behind the wag!
            </h2>

            {/* mobile-only full-width banner image */}
            <div className="relative block md:hidden my-4 w-full  sm:h-96 h-60 overflow-hidden rounded-[2rem]">
              <Image
                src="/images/homepage/about-us.jpg"
                alt="Owners smiling at the beach"
                fill
                className="object-cover"
              />
            </div>

            <p className="mt-4 text-gray-900 max-w-2xl mx-auto md:mx-0">
              Welcome to Barks and Beaches Co., a deluxe staycation for your
              beloved fur babies. As a husband and wife duo, we take great pride
              in offering a five-star, all-inclusive experience without the need
              for a hefty plane ticket. Our goal is to provide your dog with
              memories that will last fur-ever.
            </p>
          </div>
        </div>

        {/* Bottom feature bar */}
        <div className="flex flex-wrap text-black text-center font-semibold">
          <div className="w-1/2 md:flex-1 bg-[#F0D6EB] p-4 flex items-center justify-center space-x-2 text-sm">
            <span className="text-yellow-400 text-xl">★</span>
            <span>Insured</span>
          </div>
          <div className="w-1/2 md:flex-1 bg-[#D2F2F3] p-4 flex items-center justify-center space-x-2 text-sm">
            <span className="text-blue-400 text-xl">⏰</span>
            <span>On Time</span>
          </div>
          <div className="w-1/2 md:flex-1 bg-[#D7FADB] p-4 flex items-center justify-center space-x-2 text-sm">
            <span className="text-green-400 text-xl">🦴</span>
            <span>Experienced</span>
          </div>
          <div className="w-1/2 md:flex-1 bg-[#E1DEFB] p-4 flex items-center justify-center space-x-2 text-sm">
            <span className="text-red-500 text-xl">❤️</span>
            <span>Pet Lovers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
