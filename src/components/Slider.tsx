"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slider1, slider2 } from "../assets/image/image";

const slides = [
  {
    title: "Crafted with Heritage",
    subtitle: "Explore handcrafted treasures and authentic essentials rooted in culture and quality",
    image: slider1,
    button: "Shop Now",
  },
  {
    title: "New Arrivals 2026",
    subtitle: "Shop ethnic, handmade, and traditional products curated for modern living",
    image: slider2,
    button: "Explore Now",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden">

      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover z-0"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 z-10" />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-4">
            <h2 className="text-2xl md:text-5xl font-semibold mb-3">
              {slide.title}
            </h2>
            <p className="text-sm md:text-lg mb-6">
              {slide.subtitle}
            </p>
            <button className="bg-white text-black px-6 py-2 rounded-full text-sm md:text-base hover:bg-gray-200 transition">
              {slide.button}
            </button>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
  onClick={prevSlide}
  className="absolute z-30 left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
>
        <ChevronLeft size={20} />
      </button>

      <button
  onClick={nextSlide}
  className="absolute z-30 right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
>
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute z-30 bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}