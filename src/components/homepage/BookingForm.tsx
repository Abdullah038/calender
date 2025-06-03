// components/BookingForm.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { init, sendForm } from "@emailjs/browser";

export default function BookingForm({ id }: { id?: string })  {
  // Initialize EmailJS once
  useEffect(() => {
    init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID!);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");
    try {
      await sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current
      );
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <div id={id} className="mx-auto flex justify-center items-start gap-5 py-10">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-primaryColor80 rounded-[2rem] p-8 w-[95vw] lg:max-w-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center lg:text-left">
          Book A Meet & Greet
        </h2>

        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="owner_name"
            type="text"
            placeholder="Owner’s name"
            className="bg-white rounded-full px-4 py-2 placeholder-gray-500 focus:outline-none"
            required
          />
          <input
            name="phone_number"
            type="tel"
            placeholder="Phone number"
            className="bg-white rounded-full px-4 py-2 placeholder-gray-500 focus:outline-none"
            required
          />
        </div>

        {/* Row 2 */}
        <div className="mt-4">
          <input
            name="email_address"
            type="email"
            placeholder="Email address"
            className="w-full bg-white rounded-full px-4 py-2 placeholder-gray-500 focus:outline-none"
            required
          />
        </div>

        {/* Row 3 */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            name="pet_name"
            type="text"
            placeholder="Pet’s name"
            className="bg-white rounded-full px-4 py-2 placeholder-gray-500 focus:outline-none"
            required
          />
          <input
            name="pet_age"
            type="number"
            placeholder="Age"
            className="bg-white rounded-full px-4 py-2 placeholder-gray-500 focus:outline-none"
            required
          />
          <input
            name="pet_breed"
            type="text"
            placeholder="Breed"
            className="bg-white rounded-full px-4 py-2 placeholder-gray-500 focus:outline-none"
            required
          />
        </div>

        {/* Row 4 */}
        <div className="mt-4">
          <select
            name="service_type"
            className="w-full bg-white rounded-full px-4 py-2 focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select a service
            </option>
            <option>Daycare</option>
            <option>Grooming</option>
            <option>Boarding</option>
          </select>
        </div>

        {/* Row 5 */}
        <div className="mt-4">
          <input
            name="preferred_datetime"
            type="datetime-local"
            className="w-full bg-white rounded-full px-4 py-2 placeholder-gray-500 focus:outline-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-6 bg-primaryColor text-white rounded-full px-6 py-2 self-center lg:self-start disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Submit"}
        </button>

        {/* Feedback */}
        {status === "success" && (
          <p className="mt-4 text-green-600">Your request has been sent!</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-600">Something went wrong. Please try again.</p>
        )}
      </form>

      {/* Right side image (desktop only) */}
      <div className="hidden lg:flex items-center justify-center">
        <Image
          src="/images/homepage/booking-form-dog.jpg"
          className="rounded-[2rem]"
          alt="Happy dog"
          width={360}
          height={200}
        />
      </div>
    </div>
  );
}
