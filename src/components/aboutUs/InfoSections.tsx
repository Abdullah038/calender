"use client";

import React from "react";
import { FaPaw, FaDog } from "react-icons/fa";
import { GiPalmTree } from "react-icons/gi";

type InfoContainerItem = {
  heading: string;
  paragh: string;
  icon: JSX.Element;
};


const InfoContainer: InfoContainerItem[] = [
  {
    heading: "Personalized care & safety",
    paragh:
      "At Barks and Beaches Co., safety is paramount. To ensure each guest receives our undivided love and attention, we only board 1–3 dogs at a time. Whether your furry friend joins us for a walk, drop‐in visit, daycare, boarding, or sitting excursion, rest assured that they will feel safe, loved, and cherished during their stay with us.",
    icon: <FaPaw className=" text-2xl" />,
  },
  {
    heading: "Resort-Like Amenities",
    paragh:
      "Our resort-like amenities will make your pup’s tail wag with delight! Imagine your furry friend splashing in our pool pawties or indulging in bottomless tropical puptails specially crafted for dogs aged 8 weeks and up (valid ID required, of course!). Our lakeshore walking trails and escarpment hikes offer breathtaking views and adventures for your dog to explore. With parks and recreation at every corner, your pup will never be bored.",
    icon: <GiPalmTree className="text-2xl" />,
  },
  {
    heading: "Experienced & Insured",
    paragh:
      "Being experienced with dogs of all sizes and breeds, we understand the unique needs and personalities of each furry guest. Additionally, we are a registered, fully‐insured business, leaving you with peace of mind knowing that your dog is in capable hands.",
    icon: <FaDog className="text-2xl" />,
  },
];

const InfoSections: React.FC = () => {
  return (
    <div className="space-y-8 max-w-primaryMaxWidthLg mx-auto ">
        {InfoContainer.map((item, index) => (

      <div key={index} className="bg-primaryColor80 rounded-2xl shadow-md p-6 mx-5 md:mx-0">
        <div className="flex items-center space-x-3">
          {item.icon}
          <h3 className="text-2xl font-medium">
            {item.heading}
          </h3>
        </div>
        <p className="mt-4 text-gray-700 text-base leading-relaxed">
          {item.paragh}
        </p>
      </div>
        ))}
     
    </div>
  );
};

export default InfoSections;
