// components/Faqs.tsx
"use client";

import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

// Props for the individual FAQ item
interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg bg-[#C2927C] text-black">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-6 py-4 focus:outline-none"
      >
        <span>{question}</span>
        <ChevronRightIcon
          className={`h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="bg-white bg-opacity-80 px-6 py-4 text-gray-800">
          {answer}
        </div>
      )}
    </div>
  );
};

const Faqs: React.FC = () => {
  const faqItemsLeft = [
    { question: "What do I need to bring for my dog's first day?", answer: "Please bring your dog's up-to-date vaccination records, a sturdy leash, their usual food (in a sealed container), and any comfort item like a favorite toy or blanket." },
    { question: "What vaccinations are required?",                answer: "All dogs must be current on Distemper, Parvovirus, Rabies, and Bordetella vaccines. You can email or upload proof in your client portal before drop-off." },
    { question: "Do you separate dogs by size or temperament?",     answer: "Yes—our playgroups are organized by size and energy level to ensure every dog has a safe and fun experience." },
    { question: "What's a typical day like at your doggy day care?",answer: "Your pup will enjoy morning playtime, rest in our quiet rooms, a mid-day walk, and supervised group play in our indoor/outdoor yards." },
  ];

  const faqItemsRight = [
    { question: "What if my dog doesn't get along with others?",               answer: "We offer a private introduction session to help your dog acclimate and can recommend one-on-one play or training if needed." },
    { question: "Do I need to book in advance?",                               answer: "We recommend reserving a spot at least 24 hours before to guarantee availability, especially on weekends." },
    { question: "What happens if my dog gets sick or injured?",               answer: "Our staff is trained in pet first aid. We will contact you immediately and transport your dog to the nearest veterinary clinic if necessary." },
    { question: "Are there discounts for multiple dogs or frequent visits?",  answer: "Yes! We offer a 10% sibling discount and a loyalty program that gives a free day for every 10 visits." },
  ];

  return (
    <section
      id="faqs"
      className="relative bg-[url('/images/homepage/faqs.png')] bg-cover bg-center py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column always shows all 4 */}
          <div className="space-y-4">
            {faqItemsLeft.map((faq, idx) => (
              <FaqItem
                key={`left-${idx}`}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>

          {/* Right column: hide the 3rd & 4th items on mobile (<md) */}
          <div className="space-y-4">
            {faqItemsRight.map((faq, idx) => (
              <div
                key={`right-${idx}`}
                className={idx >= 2 ? "hidden md:block" : ""}
              >
                <FaqItem question={faq.question} answer={faq.answer} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
