"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ethnic, handicraft, handloom, jewelry, spiritual } from "../assets/image/image";

const categories = [
    { name: "Clothing", image: ethnic.src },
    { name: "Craft", image: handicraft.src },
    { name: "Wedding", image: jewelry.src },
    { name: "Accessories", image: handloom.src },
    { name: "Artisans", image: spiritual.src },
];

export default function CategoriesSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 250,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="w-full py-8 md:py-10 bg-white">
            <div className="max-w-full mx-auto px-4 md:px-15">

                {/* HEADER */}
                <div className="w-full text-center">
                    {/* HEADING */}
                    <h2 className="text-3xl md:text-3xl font-serif font-semibold text-[#1a1a1a] leading-snug">
                        Explore Popular Categories
                    </h2>

                    {/* SUB HEADING */}
                    <p className="mt-2 text-sm md:text-base text-[#295037] max-w-xl mx-auto">
                        Discover a wide range of products across top categories curated just for you
                    </p>
                </div>

                {/* CATEGORY WRAPPER */}
                <div className="relative">

                    {/* SCROLL CONTAINER */}
                    <div
                        ref={scrollRef}
                        className="flex gap-8 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pl-4 pr-4 scroll-pl-4"
                    >
                        {categories.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center min-w-[100px] md:min-w-[120px] snap-start group cursor-pointer"
                            >
                                {/* IMAGE CIRCLE */}
                                <div className="relative w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden group">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* LABEL */}
                                <p className="mt-2 md:mt-3 text-xs md:text-sm text-gray-700 text-center">
                                    {item.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}