"use client";

import Image from "next/image";
import { img10 } from "../assets/image/image";

export default function OfferBanner() {
  return (
    <section className="py-10 bg-[#e8e8e8]">
      <div className="max-w-7xl mx-auto px-4">

        <div className="rounded-2xl bg-white overflow-hidden relative">

          {/* Border dashed */}
          <div className="absolute inset-4 border border-dashed border-gray-300 rounded-xl pointer-events-none"></div>

          <div className="grid md:grid-cols-2 items-center">

            {/* LEFT CONTENT */}
            <div className="px-10 md:px-16 py-16 text-center md:text-left">
              <p className="tracking-[0.3em] text-[#295037] text-sm mb-4">
                LIMITED TIME OFFER
              </p>

              <h2 className="text-5xl md:text-6xl font-serif text-[#18582e]">
                50% <span className="font-light">OFF</span>
              </h2>

              <button className="mt-6 underline text-sm text-black hover:text-[#18582e] cursor-pointer transition">
                Shop Now
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative h-[300px] md:h-[350px] w-full">
              <Image
                src={img10.src} // replace with your image
                alt="Offer"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}