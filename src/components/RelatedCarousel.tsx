"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RelatedCarousel({ products }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const loopProducts = [...products, ...products];

  // ✅ Dynamic scroll based on screen
  const getScrollAmount = () => {
    if (window.innerWidth < 640) return 180; // mobile
    if (window.innerWidth < 1024) return 220; // tablet
    return 260; // desktop
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = getScrollAmount();

    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (isPaused) return;

      const amount = getScrollAmount();

      container.scrollBy({ left: amount, behavior: "smooth" });

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollTo({ left: 0, behavior: "auto" });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* LEFT BUTTON */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 text-sm hover:bg-gray-100"
      >
        ◀
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 text-sm hover:bg-gray-100"
      >
        ▶
      </button>

      {/* CAROUSEL */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-6 scrollbar-hide"
      >
        {loopProducts.map((item: any, index: number) => (
          <Link
            href={`/product/${item.slug}`}
            key={index}
            className="
              flex-shrink-0
              w-[48%]        /* mobile: 2 items */
              sm:w-[32%]     /* tablet: 3 items */
              lg:w-[24%]     /* desktop: 4 items */
            "
          >
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
              
              {/* IMAGE */}
              <div className="relative w-full h-[180px] sm:h-[220px] lg:h-[260px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-3 text-center">
                <p className="text-sm sm:text-base font-medium truncate">
                  {item.name}
                </p>
                <p className="text-green-700 font-semibold">
                  {item.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}