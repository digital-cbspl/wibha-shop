"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Star, Heart } from "lucide-react";
import { img1, img2, img5, img7 } from "../../assets/image/image";

const initialWishlist = [
    { id: 1, name: "Pottery Decorative Plate - Indigo Florals", price: "₹30.00", oldPrice: "₹60.00", image: img1.src, discount: "Save 50%", inStock: true },
    { id: 2, name: "Pottery Jar with Lids - Yellow Ornate", price: "₹79.00", image: img2.src, inStock: true },
    { id: 3, name: "Dust Painting - Gulbahaar", price: "₹50.99", image: img5.src, inStock: false },
    { id: 4, name: "Pouch Set - Prism Weave", price: "₹55.00", image: img7.src, inStock: true },
];

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState(initialWishlist);

    const removeItem = (id: number) => {
        setWishlist(wishlist.filter(item => item.id !== id));
    };

    return (
        <div className="bg-[#f6f8f7] min-h-screen py-10 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Sequence */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-gray-200 gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-[#1a1a1a] leading-tight">
                            My Wishlist
                        </h1>
                        <p className="text-sm text-[#295037] mt-2">
                            {wishlist.length} item{wishlist.length !== 1 && 's'} in your wishlist
                        </p>
                    </div>
                    <Link href="/shop" className="inline-flex items-center justify-center px-6 py-2.5 border border-[#18582e] text-[#18582e] hover:bg-[#18582e] hover:text-white transition-colors rounded-full font-medium text-sm">
                        Continue Shopping
                    </Link>
                </div>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlist.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg p-3 group/card shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">

                                {/* Image Container */}
                                <div className="relative w-full aspect-[4/5] overflow-hidden rounded bg-gray-100 mb-4">
                                    {item.discount && (
                                        <span className="absolute top-3 left-3 bg-[#bf0503] z-10 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                                            {item.discount}
                                        </span>
                                    )}

                                    {!item.inStock && (
                                        <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center">
                                            <span className="bg-white text-gray-800 text-xs px-3 py-1 font-semibold uppercase tracking-wider rounded border border-gray-200">Out of Stock</span>
                                        </div>
                                    )}

                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className={`object-cover w-full h-full transition-transform duration-500 group-hover/card:scale-105 ${!item.inStock ? 'opacity-70' : ''}`}
                                    />

                                    {/* Quick Actions overlay */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="absolute top-3 right-3 z-20 p-2 rounded-full shadow-sm bg-white text-gray-500 hover:text-[#bf0503] hover:bg-[#bf0503]/10 transition-colors opacity-0 group-hover/card:opacity-100"
                                        title="Remove from Wishlist"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow text-center">
                                    {/* Rating */}
                                    <div className="flex justify-center gap-1 text-[#b39024] mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} fill="#b39024" />
                                        ))}
                                    </div>

                                    {/* Title */}
                                    <Link href={`#`} className="text-sm font-medium text-gray-800 hover:text-[#18582e] transition-colors line-clamp-2 mb-2 flex-grow">
                                        {item.name}
                                    </Link>

                                    {/* Price */}
                                    <div className="mt-auto flex items-center justify-center gap-2 mb-4">
                                        <span className="text-[#18582e] font-semibold">{item.price}</span>
                                        {item.oldPrice && (
                                            <span className="text-gray-400 line-through text-xs">{item.oldPrice}</span>
                                        )}
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        disabled={!item.inStock}
                                        className={`w-full py-2.5 rounded flex items-center justify-center gap-2 text-sm font-medium transition-colors ${item.inStock
                                                ? "bg-[#18582e] text-white hover:bg-[#124222]"
                                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            }`}
                                    >
                                        <ShoppingBag size={16} />
                                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-4 mt-8 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Heart size={40} className="text-gray-300" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-2xl font-serif text-gray-800 mb-3">Your wishlist is empty</h2>
                        <p className="text-gray-500 text-center max-w-md mb-8">
                            Looks like you haven't added any items to your wishlist yet. Discover our latest collection and find something you love.
                        </p>
                        <Link href="/shop" className="bg-[#18582e] text-white px-8 py-3 rounded-full hover:bg-[#124222] transition-colors font-medium">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
