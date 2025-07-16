// components/TestimonialCarousel.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import autoHeight from "embla-carousel-auto-height";


type Testimonial = {
  name: string;
  quote: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Tia M.",
    quote:
      "Amazing experience with Barks and Beaches! This was our first time using a doggy daycare service so we were a little nervous, but Joy and her husband were so kind and patient with our puppy! They sent us updates and pictures/videos throughout the day which were always a fun surprise and gave us some peace of mind! We would absolutely use Barks and Beaches again!! :)​",
    rating: 5,
  },
  {
    name: "Katie-lynn P.",
    quote:
      "We had a great experience with Barks and Beaches. They kept us posted with the updates and pictures of Bruce having fun at the park and going on walks. They were very accommodating and flexible with the schedule and timings. They were gentle and patient with Bruce as he is slow to warm and can be spicy in new situations. We will definitely recommend their services for future. Thank you for taking such great care of Bruce.",
    rating: 5,
  },
  {
    name: "Penny & Brian B.",
    quote:
      "Joy is so lovely! She did a one week house sitting with our 2 Whippets and they all got along famously! We loved getting her daily pictures and update on the boys. They will probably find life pretty dull now that mom and dad are home!! There was a complex medication schedule for our senior Whippet and Joy seemed to handle it with no issues! We would gladly use her again to stay with our boys! They love her!",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: false },
    [autoHeight()]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  // update pagination on slide change
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (idx: number) => emblaApi && emblaApi.scrollTo(idx),
    [emblaApi]
  );

  return (
    <div className="embla relative mx-auto mt-12 max-w-[1202px]">
      <div
        className="embla__viewport overflow-hidden"
        ref={emblaRef}
      >
        <div className="embla__container flex">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="embla__slide flex justify-center px-4"
            >
              <div className="bg-secondaryColor rounded-2xl flex md:flex-row flex-col space-x-6 px-2 py-4 md:p-8 w-full">
                {/* Name column */}
                <div className="flex-none text-center">
                  <span className="block text-2xl font-semibold">
                    {t.name}
                  </span>
                </div>
                {/* Quote + stars */}
                <div className="flex-1 flex flex-col">
                  <p className="text-gray-800 leading-snug">
                    “{t.quote}”
                  </p>
                  <div className="mt-4 flex items-center space-x-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.968a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.969c.3.922-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.196-1.538-1.118l1.287-3.969a1 1 0 00-.364-1.118L2.045 9.395c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.968z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* pagination dots */}
      <div className="absolute bottom-4 right-8 flex space-x-2">
        {TESTIMONIALS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === selectedIndex
                ? "bg-rose-300"
                : "bg-white border border-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
