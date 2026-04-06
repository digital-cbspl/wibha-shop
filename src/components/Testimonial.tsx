"use client";

import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-3xl font-serif font-semibold text-[#1a1a1a] leading-snug">
            Trusted by Thousands of <br />
            Satisfied Customers.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <p className="text-gray-600 leading-relaxed mb-6">
              “Wibha truly captures the essence of Indian tradition. The quality of the products and the detailing in every item feels authentic and premium.”
            </p>

            {/* Stars */}
            <div className="flex gap-1 mb-6 text-[#18582e]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#18582e" />
              ))}
            </div>

            <h3 className="font-semibold text-lg text-[#1a1a1a]">
              Ananya Sharma
            </h3>

            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#18582e] flex items-center justify-center text-white text-[10px]">
                ✓
              </span>
              Verified Buyer
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <p className="text-gray-600 leading-relaxed mb-6">
              “I ordered ethnic decor and was impressed by the craftsmanship. Wibha delivers not just products, but a piece of Indian heritage to your home.”
            </p>

            <div className="flex gap-1 mb-6 text-[#18582e]">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={16} fill="#18582e" />
              ))}
              <Star size={16} className="text-gray-300" />
            </div>

            <h3 className="font-semibold text-lg text-[#1a1a1a]">
              Rohit Verma
            </h3>

            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#18582e] flex items-center justify-center text-white text-[10px]">
                ✓
              </span>
              Verified Buyer
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <p className="text-gray-600 leading-relaxed mb-6">
              "From packaging to product quality, everything was excellent. Wibha is now my go-to place for traditional and festive shopping."
            </p>

            <div className="flex gap-1 mb-6 text-[#18582e]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#18582e" />
              ))}
            </div>

            <h3 className="font-semibold text-lg text-[#1a1a1a]">
              Priya Reddy
            </h3>

            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#18582e] flex items-center justify-center text-white text-[10px]">
                ✓
              </span>
              Verified Buyer
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}