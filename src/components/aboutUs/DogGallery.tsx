"use client";

import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type GalleryProps = {
  images: string[];
};

const DogGallery: React.FC<GalleryProps> = ({ images }) => {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
    <div className="flex justify-center my-10 mx-5">
      <div className="flex flex-wrap gap-1 justify-center items-center max-w-primaryMaxWidthLg">
        {images.map((img, i) => (
          <div key={i} className="cursor-pointer" onClick={() => setIndex(i)}>
            <Image
              src={img}
              alt={`Dog photo ${i + 1}`}
              width={100}
              height={100}
              className="object-cover "
            />
          </div>
        ))}
      </div>
</div>
<Lightbox
  open={index !== null}
  close={() => setIndex(null)}
  index={index ?? 0}
  slides={images.map((src) => ({ src }))}
  animation={{ fade: 250 }}
  render={{
    slide: ({ slide }) => (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <img
          src={slide.src}
          alt=""
          className="h-[90vh] w-[90vw] object-contain"
        />
      </div>
    ),
  }}
/>


      
    </>
  );
};

export default DogGallery;
