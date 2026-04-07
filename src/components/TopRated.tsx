"use client";

import { useState } from "react";
import Image from "next/image";
import QuickViewModal from "./QuickViewModal";
import {
    Heart,
    Eye,
    ShoppingBag,
    Star,
} from "lucide-react";
import {
    img1,
    img2,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
} from "../assets/image/image";

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

export default function TopRated() {
    const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

    return (
        <>
            <section className="py-10 bg-[#f6f8f7]">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-3xl font-serif font-semibold text-[#1a1a1a] leading-snug">
                        Top Rated Products
                    </h2>
                    <p className="text-sm text-[#295037] mt-2">
                        Each product crafted to celebrate timeless tradition and authentic heritage
                    </p>
                </div>

                <div className="max-w-full mx-auto px-4 md:px-15">

                    {/* GRID (4 TOP + 4 BOTTOM) */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {products.map((item, i) => (
                            <div key={i} className="group/card flex flex-col">

                                <div className="relative overflow-hidden">

                                    {item.discount && (
                                        <span className="absolute top-4 left-4 bg-[#18582e] z-10 text-white text-xs px-3 py-1 rounded-full">
                                            {item.discount}
                                        </span>
                                    )}

                                    {/* HOVER ICONS */}
                                    <div className="absolute right-4 z-10 top-4 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition">
                                        <IconBtn>
                                            <Heart size={16} />
                                        </IconBtn>

                                        <IconBtn onClick={() => setSelectedProduct(item)}>
                                            <Eye size={16} />
                                        </IconBtn>

                                        <IconBtn>
                                            <ShoppingBag size={16} />
                                        </IconBtn>
                                    </div>

                                    {/* IMAGE */}
                                    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[500px]">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover/card:scale-105"
                                        />
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="text-center mt-4">
                                    <div className="flex justify-center gap-1 text-[#18582e] mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill="#18582e" />
                                        ))}
                                    </div>

                                    <h3 className="text-sm md:text-base font-medium text-gray-800">
                                        {item.name}
                                    </h3>

                                    <div className="mt-1 text-[#18582e] font-semibold text-sm md:text-base">
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

            {/* MODAL */}
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