"use client";

import React, { useRef } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import Link from "next/link";

const FeedbackSection = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_FEEDBACK_TEMPLATE_ID!, // ← use new one
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      )

      .then(
        () => {
          alert("Feedback submitted successfully!");
          formRef.current?.reset();
        },
        (error) => {
          alert("Failed to send feedback. Try again later.");
          console.error(error);
        }
      );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6 bg-white rounded-xl">
      {/* Left Side: Video and CTA */}
      <div className="flex flex-col items-center">
        <div className="relative rounded-2xl overflow-hidden w-[90vw] h-[200px] md:w-[450px] md:h-[240px] shadow-md">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=0&modestbranding=1&rel=0"
            title="Pup Adventure Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <Link href="/#meet-greet-form">
          <button className="mt-4 bg-secondaryColor font-bold py-2 px-6 rounded-xl shadow-md text-gray-700 hover:bg-sky-300 transition">
            Book Your Pup’s Adventure Today!
          </button>
        </Link>
        <p className="text-center mt-4 max-w-sm text-sm text-gray-700">
          Whether it’s a walk, drop-in, daycare, or overnight boarding, we’re
          ready to give your dog a beachside stay they’ll never forget.
        </p>
      </div>

      {/* Right Side: Feedback Form */}
      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="bg-secondaryColor rounded-3xl text-gray-700 p-6 w-full max-w-md shadow-lg"
      >
        <h3 className="text-lg font-bold  mb-4">
          Your Feedback Is Important To Us!
        </h3>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your experience with us"
          required
          className="w-full p-2 rounded-md mb-4 focus:outline-none"
        ></textarea>
        <input
          type="text"
          name="user_name"
          placeholder="Full Name"
          required
          className="w-full p-2 rounded-md mb-4 focus:outline-none"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Email Address"
          required
          className="w-full p-2 rounded-md mb-4 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-primaryColor text-white font-semibold py-2 rounded-full hover:opacity-90"
        >
          SUBMIT RESPONSE
        </button>
      </form>
    </div>
  );
};

export default FeedbackSection;
