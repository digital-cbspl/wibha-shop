"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import QuickViewModal from "./QuickViewModal";
import {
    Heart,
    Eye,
    ShoppingBag,
    ChevronLeft,
    ChevronRight,
    Star,
} from "lucide-react";
import { img1, img2, img4, img5, img6, img7, img8, img9 } from "../assets/image/image";

const products = [
    { name: "Pottery Decorative Plate - Indigo Florals", price: "₹30.00", oldPrice: "₹60.00", image: img1.src, discount: "Save 50%" },
    { name: "Pottery Jar with Lids - Yellow Ornate", price: "From ₹79.00", image: img2.src },
    { name: "Dust Painting - Gulbahaar", price: "₹50.99", image: img5.src },
    { name: "Dust Painting - Phoolvaadi", price: "₹50.00", image: img4.src },
    { name: "Table Runner - Blue Aztec", price: "₹65.00", image: img9.src },
    { name: "Dust Painting - Lilac Muse", price: "₹70.00", image: img6.src },
    { name: "Pouch Set - Prism Weave", price: "₹55.00", image: img7.src },
    { name: "Pouch Set - Arrow Lines", price: "₹48.00", image: img8.src },
];

export default function BestSeller() {
    const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (!sliderRef.current) return;

        const card = sliderRef.current.querySelector(".card");
        if (!card) return;

        const cardWidth = (card as HTMLElement).offsetWidth + 24; // gap-6

        sliderRef.current.scrollBy({
            left: dir === "left" ? -cardWidth : cardWidth,
            behavior: "smooth",
        });
    };

    return (
        <>
            <section className="py-16 bg-[#f6f8f7] group">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-3xl font-serif font-semibold text-[#1a1a1a] leading-snug">
                        Best Sellers Products
                    </h2>
                    <p className="text-sm text-[#295037] mt-2">
                        Each product crafted to celebrate timeless tradition and authentic heritage
                    </p>
                </div>

                <div className="relative max-w-7xl mx-auto px-4">

                    {/* LEFT */}
                    <button
                        onClick={() => scroll("left")}
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-[#18582e] text-white p-3 rounded-full z-10 opacity-0 group-hover:opacity-100 transition"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* RIGHT */}
                    <button
                        onClick={() => scroll("right")}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-[#18582e] text-white p-3 rounded-full z-10 opacity-0 group-hover:opacity-100 transition"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* SLIDER */}
                    <div
                        ref={sliderRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {products.map((item, i) => (
                            <div
                                key={i}
                                className="card snap-start flex-shrink-0 
                                min-w-full 
                                sm:min-w-[calc(50%-12px)] 
                                md:min-w-[calc(25%-18px)] 
                                group/card"
                            >

                                <div className="relative overflow-hidden">

                                    {item.discount && (
                                        <span className="absolute top-4 left-4 bg-[#18582e] z-10 text-white text-xs px-3 py-1 rounded-full">
                                            {item.discount}
                                        </span>
                                    )}

                                    {/* FIXED HOVER */}
                                    <div className="absolute right-4 z-10 top-4 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition">
                                        <IconBtn><Heart size={16} className="pointer-events-none" /></IconBtn>

                                        <IconBtn onClick={() => setSelectedProduct(item)}>
                                            <Eye size={16} className="pointer-events-none" />
                                        </IconBtn>

                                        <IconBtn><ShoppingBag size={16} className="pointer-events-none" /></IconBtn>
                                    </div>

                                    <div className="relative w-full h-[500px] sm:h-[300px] md:h-[320px] lg:h-[350px]">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover/card:scale-105"
                                        />
                                    </div>
                                </div>

                                <div className="text-center mt-4">
                                    <div className="flex justify-center gap-1 text-[#18582e] mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill="#18582e" />
                                        ))}
                                    </div>

                                    <h3 className="text-sm font-medium text-gray-800">
                                        {item.name}
                                    </h3>

                                    <div className="mt-1 text-[#18582e] font-semibold">
                                        {item.price}
                                        {item.oldPrice && (
                                            <span className="text-gray-400 line-through ml-2 text-sm">
                                                {item.oldPrice}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ✅ MODAL MUST BE HERE */}
            {selectedProduct && (
                <QuickViewModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </>
    );
}

/* ICON BUTTON */
function IconBtn({ children, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="p-2 rounded-full shadow cursor-pointer transition 
      bg-white text-gray-700 
      hover:bg-[#18582e] hover:text-white"
        >
            {children}
        </button>
    );
}