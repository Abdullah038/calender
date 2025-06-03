"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Atma } from "next/font/google";
import JSXStyle from "styled-jsx/style";
import Image from "next/image";

// Load the Atma font
const atma = Atma({
  subsets: ["latin"],
  weight: "400",
});

const slides = [
  "/images/homepage/about-us.jpg",
  "/images/homepage/about-us.jpg",
  "/images/homepage/about-us.jpg",
  "/images/homepage/about-us.jpg",
];

const HeroSect = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-12 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center gap-8 justify-center max-w-primaryMaxWidthLg mx-5 md:mx-0">
        {/* Text content */}
        <div className="">
          <h2
            className={`${atma.className} text-3xl text-center md:text-left text-primaryColor`}
          >
            Surf’s Pup: A Deluxe Staycation for Your Furry Friends
          </h2>
          <div className="mt-4 space-y-4 text-gray-700 text-center md:text-left">
            <p>
              Welcome to Barks and Beaches Co., a deluxe staycation for your
              beloved fur babies. As a husband and wife duo, we take great pride
              in offering a five-star, all-inclusive experience without the need
              for a hefty plane ticket. Our goal is to provide your dog with
              memories that will last fur-ever.
            </p>
            <p>
              Nestled in a resort-like condominium, our backyard transforms into
              a private beach that allows your furry friend to soak up the sun
              and dig their paws into the sand. With ample grassy areas, scenic
              trails, and a specially designed dog park, we ensure your dog
              receives the appropriate exercise and socialization they need to
              thrive.
            </p>
          </div>
          <div className="flex justify-end px-28">
          
            <Image
              src={
                "/images/aboutUs/rear view of a beagle dog standing on three books.png"
              }
              width={100}
              height={100}
              alt=""
              className="hidden md:flex"
            />
          </div>
        </div>
        <div className="max-w-[800px]">
          <div>
                <p className={`${atma.className} text-center text-2xl`}> Meet the Lifeguards of the Leash </p>
          </div>
          <style jsx>
            {`
              .embla {
                overflow: hidden;
              }
            `}
          </style>

          {/* Embla carousel */}
          <div className="w-full md:w-[400px] flex flex-col items-center relative">
            <div className="embla md:w-[400px] md:h-[400px] rounded-3xl" ref={emblaRef}>
              <div className="embla__container flex">
                {slides.map((src, idx) => (
                  <div className="embla__slide min-w-full" key={idx}>
                    <img
                      src={src}
                      alt={`Slide ${idx + 1}`}
                      className="block"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 flex items-center space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full ${
                    idx === selectedIndex
                      ? "bg-rose-300"
                      : "bg-white border border-gray-300"
                  }`}
                  onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSect;
