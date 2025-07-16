"use client";

import { Atma } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const atma = Atma({
  subsets: ["latin"],
  weight: "400",
});

type HeroImageLink = {
  imgSrc: string;
  text: string;
  link: string;
};

const LINKS: HeroImageLink[] = [
  {
    imgSrc: "/images/homepage/our-mission.png",
    text: "Our\nMission",
    link: "/",
  },
  {
    imgSrc: "/images/homepage/barkery-and-boutique.png",
    text: "Barkery &\nBoutique",
    link: "/",
  },
  {
    imgSrc: "/images/homepage/contact-us.png",
    text: "Contact \nUs",
    link: "/#meet-greet-form",
  },
];

const HeroSection = () => {
  return (
    <>
      <div className="flex flex-row justify-center py-5">
        <div className="flex gap-6 xl:flex-row flex-col justify-center items-center">
          <div className="flex md:flex-row flex-col">
            <div className="flex flex-col items-center justify-between px-5">
              <h3 className="text-4xl pb-2">Bark & Beaches</h3>
              <h4 className={`${atma.className} text-6xl text-primaryColor`}>
                Surf&apos;s Pup!
              </h4>

              <p className="py-8 max-w-96">
                Welcome to Barks and Beaches Co., a deluxe staycation for your
                beloved fur babies. As a husband and wife duo, we take great
                pride in offering a five-star, all-inclusive experience
                without the need for a hefty plane ticket. Our goal is to
                provide your dog with memories that will last fur-ever.
              </p>
              <div className="flex  flex-row w-full justify-center gap-10 items-center pb-2">
                <div className="md:flex gap-3 hidden ">
                  <Link href="https://www.facebook.com/barksandbeachesco" target="_blank">
                  <Image
                    src="/facebook.png"
                    alt="Facebook"
                    width={25}
                    height={25}
                  />
                  </Link>

                  <Link href="https://www.instagram.com/barksandbeachesco/" target="_blank">
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={25}
                    height={25}
                  />
                </Link>
                </div>

                
                <Link href="/Booking" className="px-6 py-2 text-xl bg-primaryColor text-white rounded-full">
                Book Now
                </Link>
              </div>
              <Image
                src="/images/homepage/side-view-of-dog.png"
                width={200}
                height={200}
                alt=""
                className="md:flex hidden"
              ></Image>
            </div>

            <div className="flex md:flex-col flex-row justify-between h-full gap-3 mx-5 sm:mx-0 py-5">
              {LINKS.map((hil, idx) => (
                <Link
                  href={hil.link}
                  key={idx}
                  className="relative group md:w-[200px] w-[28vw] md:h-[200px] h-[28vw] md:rounded-[3rem] rounded-full overflow-hidden"
                >
                  <Image
                    src={hil.imgSrc}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold text-lg sm:text-3xl md:text-4xl text-center whitespace-pre-line">
                      {hil.text}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Image
            src="https://images.pexels.com/photos/3196887/pexels-photo-3196887.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={400}
            height={200}
            className="rounded-[3rem] w-[90vw] h-auto mx-auto  md:h-[650px] md:w-[600px]  sm:mx-0"
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
