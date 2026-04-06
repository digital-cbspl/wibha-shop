"use client";

import Image from "next/image";
import { X } from "lucide-react";

export default function QuickViewModal({ product, onClose }: any) {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

            {/* Modal */}
            <div className="bg-white w-[95%] md:w-[900px] rounded-xl overflow-hidden relative">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-[#18582e] text-white p-2 rounded-full"
                >
                    <X size={16} />
                </button>

                <div className="grid md:grid-cols-2">

                    {/* LEFT IMAGE */}
                    {/* LEFT IMAGE */}
                    <div className="bg-[#ede7e4] relative w-full h-[400px] md:h-full">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="p-6 space-y-4">

                        <h2 className="text-2xl font-semibold">
                            {product.name}
                        </h2>

                        <p className="text-[#18582e] font-semibold text-lg">
                            {product.price}
                        </p>

                        {/* Color */}
                        <div>
                            <p className="font-medium mb-2">Color: Green</p>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 border rounded-md bg-gray-200"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div>
                            <p className="font-medium mb-2">Weight: 100ML</p>
                            <div className="flex gap-2">
                                {["100ML", "200ML", "300ML"].map((s, i) => (
                                    <button
                                        key={i}
                                        className={`px-4 py-2 border rounded-md ${i === 0
                                                ? "bg-black text-white"
                                                : "hover:bg-[#18582e] hover:text-white"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-3">
                            <button className="border px-3 py-1">-</button>
                            <span>1</span>
                            <button className="border px-3 py-1">+</button>
                        </div>

                        {/* Buttons */}
                        <button className="w-full bg-[#18582e] text-white py-3 rounded-md">
                            ADD TO CART
                        </button>

                        <button className="w-full bg-[#18582e]/90 text-white py-3 rounded-md">
                            BUY IT NOW
                        </button>

                        <a className="text-sm underline cursor-pointer">
                            View full details →
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
}