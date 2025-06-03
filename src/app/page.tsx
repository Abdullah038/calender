
'use client';
import AboutUs from "@/components/homepage/AboutUs"
import BookingForm from "@/components/homepage/BookingForm"
import Categories from "@/components/homepage/Categories"
import Faqs from "@/components/homepage/Faqs"
import HeroSection from "@/components/homepage/HeroSection"
import Services from "@/components/homepage/Services"
import Testimonials from "@/components/homepage/Testimonials"
import ScrollToHashClient from "@/components/ScrollToHashClient";

import { useEffect } from "react";


const HomePage = () => {
  const post = [
    {id: 1, title: "First Title", desc: "this is first discription"},
    {id: 2, title: "Second Title", desc: "this is second discription"},
  ]

  
  return (
    <>
    <ScrollToHashClient />
    <HeroSection/>
    <Testimonials/>
    <BookingForm id="meet-greet-form"/>
    <Services />
    <AboutUs />
    <Categories />
    <Faqs />
    </>
  )
}

export default HomePage