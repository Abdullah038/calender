// components/BarkerySection.tsx
"use client";

import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import useEmblaCarousel, {
  EmblaOptionsType
} from "embla-carousel-react";
import { Atma } from "next/font/google";

const atma = Atma({
  subsets: ["latin"],
  weight: "400",
});

const PRODUCTS = [
  { id: 1, label: "Pupcake",  imgSrc: "/images/homepage/cupcake.jpg" },
  { id: 2, label: "Accessories",   imgSrc: "/images/homepage/collar.jpg" },
  { id: 3, label: "Cakes", imgSrc: "/images/homepage/cake.webp" },

];

export default function BarkerySection() {
  // 1. set up Embla
  const options: EmblaOptionsType = {
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  // 2. state for prev/next disabled, selected index, and snaps
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // 3. callbacks to scroll
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo   = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  // 4. sync state on init & selection change
  useEffect(() => {
    if (!emblaApi) return;
    // grab the snap list
    setScrollSnaps(emblaApi.scrollSnapList());
    // set initial button+dot state
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevDisabled(!emblaApi.canScrollPrev());
      setNextDisabled(!emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  


  return (
    
    <section className="bg-[#FDE8CE] rounded-[2rem] p-8 mt-12 mx-5">
      {/* Title */}
      <style jsx>{`
.embla {
  --slide-size-sm: 50%;

  --slide-size-lg: calc(100% / 3);
}

.embla__viewport {
  overflow: hidden;
}
.embla__container {
  display: flex;
  align-items: flex-start; /* Add this */
}

.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
}

.embla__container {
  transition: height 0.2s;
}


@media (min-width: 750px) {
  .embla__slide {
    flex: 0 0 var(--slide-size-sm);
  }
}
@media (min-width: 1200px) {
  .embla__slide {
    flex: 0 0 var(--slide-size-lg);
  }
}

`} </style>
      <h2 className={`text-center text-4xl md:text-6xl font-bold ${atma.className}  text-primaryColor leading-tight`}>
        Welcome to Barks & Beaches:<br />Barkery & Boutique
      </h2>
      <p className="text-center text-xl text-primaryColor mt-2">
        Treats & Trends for Your Furry Best Friend
      </p>

      {/* Embla viewport */}
      <div className="embla relative mt-8">
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex ">
            {PRODUCTS.map((p) => (
              <div
                key={p.id}
                className="embla__slide flex flex-col items-center  overflow-hidden gap-5"
              >
                <div className="bg-white rounded-2xl">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <Image
                    src={p.imgSrc}
                    alt={p.label}
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                </div>
                <div className="py-2 text-center font-semibold text-black">
                  {p.label}
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next */}
        <button
          onClick={scrollPrev}
          disabled={prevDisabled}
          aria-label="Previous"
          className={`
            absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md
            ${prevDisabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          ←
        </button>
        <button
          onClick={scrollNext}
          disabled={nextDisabled}
          aria-label="Next"
          className={`
            absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md
            ${nextDisabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          →
        </button>


      </div>

      {/* Shop Now */}
      <button className="mt-8 mx-auto block bg-[#CBAAA7] text-white px-8 py-3 rounded-full font-semibold">
        Shop Now
      </button>
    </section>
  );
}
