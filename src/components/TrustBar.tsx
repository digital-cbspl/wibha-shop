"use client";

import { ShieldCheck, BadgeCheck, Truck } from "lucide-react";

export default function TrustBar() {
  return (
    <section className="bg-[#18582e] text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-0">

          {/* Item 1 */}
          <div className="flex flex-col items-center md:items-center text-center gap-1 md:px-6 relative">
            <ShieldCheck size={20} className="mb-1" />
            <h3 className="font-semibold tracking-wide text-sm md:text-base">
              SAFE & SECURE CHECKOUT
            </h3>
            <p className="text-xs sm:text-sm text-white/80">
              Guaranteed on all purchases
            </p>

            {/* Divider */}
            <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/30"></span>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center md:items-center text-center gap-1 md:px-6 relative">
            <BadgeCheck size={20} className="mb-1" />
            <h3 className="font-semibold tracking-wide text-sm md:text-base">
              AUTHENTIC FRAGRANCES
            </h3>
            <p className="text-xs sm:text-sm text-white/80">
              Genuine shop with confidence
            </p>

            {/* Divider */}
            <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/30"></span>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center md:items-center text-center gap-1 md:px-6">
            <Truck size={20} className="mb-1" />
            <h3 className="font-semibold tracking-wide text-sm md:text-base">
              ITEMS SHIP SAME DAY
            </h3>
            <p className="text-xs sm:text-sm text-white/80">
              Fast reliable delivery every time
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}