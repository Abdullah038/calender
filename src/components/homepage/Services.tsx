// components/Services.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    description:
      "Dog walking is an essential service that prioritizes the health and wellbeing of our canine companions. As pet owners, we all want our dogs to have enough exercise and fresh air to maintain a happy and healthy lifestyle. However, busy schedules can make it challenging to meet our furry friends' daily walking needs. That's where dog walking services come in. Dog walking services offer a professional and reliable way to provide your dog with the exercise, mental stimulation, and attention they need while you're away. Whether it's a daily walk, lunchtime stroll, or a late-night stroll, our experienced and trained dog walkers can create a customized walking plan that meets your dog's unique needs. During their walk, dogs get a chance to explore new sights and smells, socialize with other dogs or people, and burn off some energy. It's an excellent way to keep them active, healthy, and mentally stimulated, which makes for a happier and better-behaved dog. Dog walking services prioritize the safety of your dog at all times, and our caregivers are always trained to handle any situation that may arise during a walk. They also provide you with real-time updates, pictures, and videos of your furry friend enjoying their walk, giving you the peace of mind that your dog is in good hands. At our dog walking service, we are dedicated to providing reliable, professional, and personalized services that prioritize the health and wellbeing of your furry friend. Contact us today to learn more about our services and how we can help provide a better quality of life for your canine companion.",
  },
  {
    label: "HOUSE SITTING",
    imgSrc: "/images/homepage/house.png",
    bgClass: "bg-[#D2F2F3]",
    btnClass: "bg-[#75C5C8] text-white",
    description:
      "Dog boarding is a service that provides a safe and comfortable space for dogs to stay while their owners are away. It is an excellent option for pet owners who are traveling or need to leave their pets for extended periods of time. By choosing a reputable boarding service, pet owners can ensure that their dogs are well-cared for, exercised, and socialized while they are away. Facilities that offer dog boarding services often have trained staff members who can provide personalized care based on each dog's individual needs.",
  },
  {
    label: "DROP-IN VISITS",
    imgSrc:
      "/images/homepage/young woman sitting on ground and petting dog.png",
    bgClass: "bg-[#F9E1E1]",
    btnClass: "bg-[#D08888] text-white",
    description:
      "Drop-in visits for dogs are an essential service offered to pet owners who are away from home for extended periods. Dogs are social animals that love attention, and they thrive on routine and consistency. However, due to work schedules or other obligations, pet owners may not be able to spend as much time with their dogs as they'd like. That's where drop-in visits come in. Drop-in visits for dogs involve having a professional caregiver visit your home and spend time with your dog in your absence. Caregivers can come once or multiple times per day, depending on your dog's needs, and can provide services such as feeding, fresh water, and potty breaks. They can also administer medications or provide any other special care your dog may require. Drop-in visits are a perfect solution for busy pet owners who don't want to leave their furry friends alone for extended periods. These visits can help reduce stress and anxiety for both owners and dogs, as they provide peace of mind that their pet is happy and well-cared-for. Additionally, these visits can help prevent behavioral problems caused by isolation or loneliness. Our drop-in visit services prioritize the safety and well-being of your furry friend at all times. Our experienced caregivers are trained to handle any situation that arises while also providing real-time updates on your dog's well-being during their visit. At our drop-in visit service, we are dedicated to providing reliable, professional, and personalized services that prioritizes the health and happiness of your furry friend.",
  },
  {
    label: "BOARDING",
    imgSrc: "/images/homepage/Man-playing-with-dog-on-the-couch.png",
    bgClass: "bg-[#D7FADB]",
    btnClass: "bg-[#8FD997] text-white",
    description:
      "Dog boarding is a service that provides a safe and comfortable space for dogs to stay while their owners are away. It is an excellent option for pet owners who are traveling or need to leave their pets for extended periods of time. By choosing a reputable boarding service, pet owners can ensure that their dogs are well-cared for, exercised, and socialized while they are away. Facilities that offer dog boarding services often have trained staff members who can provide personalized care based on each dog's individual needs.",
  },
  {
    label: "DAYCARE",
    imgSrc: "/images/homepage/Girl-standing-and-holding-dog.png",
    bgClass: "bg-[#E1DEFB]",
    btnClass: "bg-[#8F87D6] text-white",
    description:
      "Dog daycare is a specialized service that provides supervised care for dogs while their owners are away or at work. It is an ideal solution for pet owners who do not want their furry friends to be home alone and unattended for extended periods, and for dogs who require socialization and exercise. Usually, dog daycare facilities offer a safe and secure environment with trained professionals who manage the dogs' play, feeding, and rest periods. As a result, dogs have a fun, engaging, and stimulating experience, which keeps them happy, healthy, and well-behaved.",
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
            <Link
              href="/Booking"
              className={`${active.btnClass} rounded-full px-8 py-3 font-semibold`}
            >
              Request to Book
            </Link>
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
