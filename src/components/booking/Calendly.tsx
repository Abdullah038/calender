// app/book/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { Calendar, User, Check } from "lucide-react";

type AptType = { id: number; label: string };
type Service = {
  key: string;
  label: string;
  bg: string;
  bgSelected: string;
  aptTypes: AptType[];
  note: String;
};
const SERVICES: Service[] = [
  {
    key: "dog-walking",
    label: "Dog Walking",
    bg: "bg-[#D165BA]",
    bgSelected: "bg-[#A75095]", // darker 20%
    aptTypes: [
      { id: 78885638, label: "30 min walk – $20 +hst" },
      { id: 78920470, label: "45 min walk – $27 +hst" },
      { id: 78920477, label: "60 min walk – $35 +hst" },
      { id: 78920493, label: "2 dogs, 30 min – $35 +hst" },
      { id: 78920505, label: "2 dogs, 60 min – $50 +hst" },
    ],
    note: `
Rates may be subject to change without prior notice.

All pricing is subject to applicable taxes.

Booking times are approximate.

For any additional dogs or customized quote or any further inquiries, feel free to contact us directly. We look forward to providing excellent care for your furry companion.
    `.trim(),
  },
  {
    key: "house-sitting",
    label: "House Sitting",
    bg: "bg-[#75C5C8]",
    bgSelected: "bg-[#5E9DA0]", // darker 20%
    aptTypes: [{ id: 78931683, label: "House Sitting" }],
    note: `
All pricing is subject to applicable taxes. Rates may be subject to change without prior notice. A deposit or prepayment may be required to secure your house sitting reservation. Additional services, such as watering plants or bringing in mail, may be available at no extra cost. Please discuss your specific requirements when booking.

For a customized quote or any further inquiries, feel free to contact us directly. We look forward to providing excellent house sitting services for your dogs and giving you peace of mind while you are away.`.trim(),
  },
  {
    key: "drop-in-visits",
    label: "Drop-In Visits",
    bg: "bg-[#D08888]",
    bgSelected: "bg-[#A66D6D]", // darker 20%
    aptTypes: [
      { id: 12345678, label: "15 min visit – $15 +hst" },
      { id: 87654321, label: "30 min visit – $25 +hst" },
    ],
    note: `
Rates may be subject to change without prior notice.

All pricing is subject to applicable taxes.

Booking times are approximate. 


For any additional dogs or customized quote or any further inquiries, feel free to contact us directly. We look forward to providing excellent care for your furry companion.`.trim(),
  },
  {
    key: "boarding",
    label: "Boarding",
    bg: "bg-[#8FD997]",
    bgSelected: "bg-[#72AD78]", // darker 20%
    aptTypes: [{ id: 78999703, label: "Boarding" }],
    note: `
Rates may be subject to change without prior notice.

All pricing is subject to applicable taxes.
A deposit or prepayment may be required to secure your dog's boarding reservation.

For any additional dogs or customized quote or any further inquiries, feel free to contact us directly. We look forward to providing excellent care for your furry companion during their stay at our dog boarding facility.`.trim(),
  },
  {
    key: "daycare",
    label: "Daycare",
    bg: "bg-[#8F87D6]",
    bgSelected: "bg-[#726CAB]", // darker 20%
    aptTypes: [{ id: 78999820, label: "Daycare" }],
    note: `Rates may be subject to change without prior notice.

All pricing is subject to applicable taxes.

Please review our policy page for more information 


For any additional dogs or customized quote or any further inquiries, feel free to contact us directly. We look forward to providing excellent care for your furry companion.`.trim(),
  },
];

export default function BookingPage() {
  const [serviceKey, setServiceKey] = useState<string>("");
  const [selectedApt, setSelectedApt] = useState<number | null>(null);

  const service = SERVICES.find((s) => s.key === serviceKey);

  const iframeSrc =
    service && selectedApt
      ? `https://app.acuityscheduling.com/schedule.php?owner=35911827&appointmentType=${selectedApt}&ref=embedded_csp`
      : "";

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      {/* ——————————————————————————————————————————————————————————
           Header & “New Client” CTA
         —————————————————————————————————————————————————————————— */}
      <div className="space-y-4 flex items-start">
        <Image
          src="/dog sitting.png"
          alt="Dog mascot"
          width={120}
          height={120}
          className="mx-auto"
        />
        <div className="flex flex-col flex-1 items-start">
        <h1 className="text-3xl font-black mb-4">BOOK YOUR PUP’S VISIT</h1>
        <button className="px-4 py-2 bg-rose-200 text-rose-800 rounded-full uppercase text-sm max-w-xs font-semibold hover:bg-rose-300">
          New Client? Click Here
        </button>
        </div>
      </div>

      {/* ——————————————————————————————————————————————————————————
           Progress Steps
         —————————————————————————————————————————————————————————— */}
      <div className="flex justify-between items-center">
        {/* Step 1 */}
        <div className="flex flex-col items-center space-y-2 flex-1">
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
            1
          </div>
          <span className="text-xs uppercase font-medium text-center">
            Choose a Service
          </span>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-center space-y-2 flex-1">
          <div className="w-10 h-10 rounded-full bg-secondaryColor flex items-center justify-center">
            <Calendar size={16} />
          </div>
          <span className="text-xs uppercase font-medium text-center">
            Pick a Date & Time
          </span>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-center space-y-2 flex-1">
          <div className="w-10 h-10 rounded-full bg-secondaryColor flex items-center justify-center">
            <User size={16} />
          </div>
          <span className="text-xs uppercase font-medium text-center">
            Contact Info
          </span>
        </div>
        {/* Step 4 */}
        <div className="flex flex-col items-center space-y-2 flex-1">
          <div className="w-10 h-10 rounded-full bg-secondaryColor flex items-center justify-center">
            <Check size={16} />
          </div>
          <span className="text-xs uppercase font-medium text-center">
            Confirm & Book
          </span>
        </div>
      </div>

      {/* ——————————————————————————————————————————————————————————
           Choose a service & (optional) radio card
         —————————————————————————————————————————————————————————— */}
      <div className="bg-secondaryColor rounded-xl p-8 space-y-8">
        <h2 className="text-xl font-bold text-center">CHOOSE A SERVICE</h2>

        <div className="flex justify-center gap-4">
          {SERVICES.map((s) => (
            <button
              key={s.key}
              onClick={() => {
                setServiceKey(s.key);
                // auto-select if only one choice
                setSelectedApt(
                  s.aptTypes.length === 1 ? s.aptTypes[0].id : null
                );
              }}
              className={`
                px-5 py-2 rounded-full font-semibold text-white shadow
                ${
                  serviceKey === s.key
                    ? `${s.bgSelected} ring-2 ring-black`
                    : s.bg
                }
              `}
            >
              {s.label}
            </button>
          ))}
        </div>

        {serviceKey && (
          <div className="bg-white rounded-lg shadow p-6 transition-all">
            {service && service.aptTypes.length > 1 ? (
              <>
                <div className="grid grid-cols-2 gap-y-4">
                  {service.aptTypes.map((opt) => (
                    <label key={opt.id} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="aptType"
                        className="form-radio h-5 w-5 text-teal-600"
                        checked={selectedApt === opt.id}
                        onChange={() => setSelectedApt(opt.id)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </>
            ) : service?.key === "house-sitting" ? (
              <div className="space-y-4 text-gray-800">
                <p className="font-semibold">Pricing:</p>
                <ul className="list-disc list-inside ml-6">
                  <li>
                    $70 +hst per night for a 24-hour period of house sitting.
                  </li>
                  <li>
                    This includes staying overnight in your home, feeding,
                    regular walks, playtime, and providing companionship and
                    security for your dog.
                  </li>
                </ul>

                <p className="font-semibold">Extended Hours:</p>
                <ul className="list-disc list-inside ml-6">
                  <li>
                    An additional $35 will be charged for any extension beyond
                    the 24-hour period up to 3 hours.
                  </li>
                  <li>
                    An additional $70 (full price) will be charged for any
                    extension that is beyond the 24-hour period over 6 hours.
                  </li>
                </ul>

                <p className="font-semibold">Discount Rate for Second Dog:</p>
                <ul className="list-disc list-inside ml-6">
                  <li>
                    If you have two dogs that require house sitting services,
                    the rate for the second dog will be discounted to $55 per
                    night for a 24-hour period.
                  </li>
                </ul>
              </div>
            ) : (
              <p className="text-center">
                You’ve selected <strong>{service?.label}</strong>. Scroll down
                for the calendar.
              </p>
            )}

            {/* ←— render the per-service note */}
            {service?.note && (
              <div className="text-sm mt-4 text-gray-700 whitespace-normal">
              <p className="font-bold">Please note:</p>  {service.note}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ——————————————————————————————————————————————————————————
           Embedded Calendar
         —————————————————————————————————————————————————————————— */}
      {selectedApt && (
        <>
          <iframe
            src={iframeSrc}
            title="Schedule with Acuity"
            width="100%"
            height="800"
            frameBorder="0"
            style={{ border: "none", minWidth: "320px" }}
            className="rounded-lg shadow"
          />
          <Script
            src="https://embed.acuityscheduling.com/js/embed.js"
            strategy="afterInteractive"
          />
        </>
      )}
    </div>
  );
}
