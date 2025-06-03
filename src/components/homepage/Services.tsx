// components/Services.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

type Service = {
  label: string;
  imgSrc: string;
  bgClass: string;
  btnClass: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    label: "DOG WALKING",
    imgSrc: "/images/homepage/Man-walking-two-dogs-on-leash.png",
    bgClass: "bg-[#F0D6EB]",
    btnClass: "bg-[#D165BA] text-white",
    description: "…",
  },
  {
    label: "HOUSE SITTING",
    imgSrc: "/images/homepage/house.png",
    bgClass: "bg-[#D2F2F3]",
    btnClass: "bg-[#75C5C8] text-white",
    description: "…",
  },
  {
    label: "DROP-IN VISITS",
    imgSrc: "/images/homepage/young woman sitting on ground and petting dog.png",
    bgClass: "bg-[#F9E1E1]",
    btnClass: "bg-[#D08888] text-white",
    description: "…",
  },
  {
    label: "BOARDING",
    imgSrc: "/images/homepage/Man-playing-with-dog-on-the-couch.png",
    bgClass: "bg-[#D7FADB]",
    btnClass: "bg-[#8FD997] text-white",
    description: "…",
  },
  {
    label: "DAYCARE",
    imgSrc: "/images/homepage/Girl-standing-and-holding-dog.png",
    bgClass: "bg-[#E1DEFB]",
    btnClass: "bg-[#8F87D6] text-white",
    description: "…",
  },
];

export default function Services() {
  const [active, setActive] = useState<Service | null>(null);

  if (active) {
    return (
      <div className={`${active.bgClass} w-full relative py-16 px-8`}>
        <button
          onClick={() => setActive(null)}
          className="absolute top-6 left-6 text-2xl font-bold"
          aria-label="Back to services"
        >
          ←
        </button>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
          <div className="w-full md:w-1/2 h-96 relative">
            <Image
              src={active.imgSrc}
              alt={active.label}
              fill
              className="object-contain"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-white mb-6">
              {active.label}
            </h1>
            <p className="text-lg text-gray-900 mb-8">{active.description}</p>
            <button
              className={`${active.btnClass} rounded-full px-8 py-3 font-semibold`}
            >
              Request to Book
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: 2-column grid */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 py-8">
        {SERVICES.map((svc) => (
          <div
            key={svc.label}
            onClick={() => setActive(svc)}
            className={`${svc.bgClass} rounded-2xl flex flex-col items-center py-6 cursor-pointer`}
          >
            <div className="w-28 h-28 relative mb-4">
              <Image
                src={svc.imgSrc}
                alt={svc.label}
                fill
                className="object-contain"
              />
            </div>
            <button
              className={`${svc.btnClass} rounded-full px-4 py-2 font-semibold`}
            >
              {svc.label}
            </button>
          </div>
        ))}
      </div>

      {/* Desktop: simple 5-column grid, no overlapping */}
      <div className="hidden lg:grid lg:grid-cols-5 py-8">
        {SERVICES.map((svc) => (
          <div
            key={svc.label}
            onClick={() => setActive(svc)}
            className={`${svc.bgClass} flex flex-col items-center py-10 cursor-pointer`}
          >
            <div className=" w-[15vw] h-[15vh]  xl:w-64 xl:h-64 relative mb-4">
              <Image
                src={svc.imgSrc}
                alt={svc.label}
                fill
                className="object-contain"
              />
            </div>
            <button
              className={`${svc.btnClass} rounded-full px-6 py-2 font-semibold`}
            >
              {svc.label}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
