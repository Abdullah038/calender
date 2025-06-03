import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primaryColor text-white">
      {/* Top section with 4 columns and subtle divider */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div className="space-y-4">
          <Image
            src="/logo.jpg"
            width={80}
            height={80}
            alt="Barks & Beaches logo"
            className=""
          />
          <h3 className="text-2xl font-bold">Barks & Beaches</h3>
          <p className="text-sm leading-relaxed opacity-90">
            We’re a doggy day care and boutique offering fun, safe, and loving care for your furry family members. From playtime to pampering — tails are always wagging here!
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {['Home', 'Services', 'Bakery & Boutique', 'FAQs', 'Contact Us'].map((label) => {
              const href =
                label === 'Home'
                  ? '/'
                  : `/${label.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:underline hover:opacity-90 transition-opacity"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Visit Us */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Visit Us</h4>
          <p className="text-sm leading-relaxed opacity-90">
            Monday–Sunday<br />
            7:00am–7:00pm<br />
          </p>
          <p className="font-medium">(437) 933‑9663 (WOOF)</p>
          <div className="mt-4">
            <Image
              src="/images/insurance.png"
              width={150}
              height={50}
              alt="Protected by PROfur insurance"
              className="opacity-90"
            />
          </div>
        </div>

        {/* Follow The Wag */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Follow The Wag</h4>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/facebook.png"
                width={24}
                height={24}
                alt="Facebook"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/instagram.png"
                width={24}
                height={24}
                alt="Instagram"
              />
            </a>
          </div>
          <form className="flex flex-col items-center space-y-2 ">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/75 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            <button
              type="submit"
              className="w-full px-6 py-2 rounded-lg bg-white text-primaryColor font-semibold hover:bg-white/90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom row with top border for separation */}
      <div className="border-t border-white/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-xs opacity-90">
          <span>@ 2025 by Barks & Beaches Collective</span>
          <a
            href="mailto:barksandbeachesco@outlook.com"
            className="font-medium hover:underline"
          >
            barksandbeachesco@outlook.com
          </a>
          <div className="flex space-x-6">
            <Link href="/PrivacyPolicy" className="hover:underline">
              Privacy Policy
            </Link>
     
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
