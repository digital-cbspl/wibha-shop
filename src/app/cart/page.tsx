"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { img1, img2, img6 } from "../../assets/image/image";

// Reusing mock data structure with quantity
const initialCart = [
    { id: 1, name: "Pottery Decorative Plate - Indigo Florals", price: 30.00, image: img1.src, quantity: 1 },
    { id: 2, name: "Pottery Jar with Lids - Yellow Ornate", price: 79.00, image: img2.src, quantity: 2 },
    { id: 3, name: "Dust Painting - Lilac Muse", price: 70.00, image: img6.src, quantity: 1 },
];

export default function CartPage() {
    const [cart, setCart] = useState(initialCart);

    const updateQuantity = (id: number, delta: number) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const removeItem = (id: number) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 15.00 : 0; // Flat shipping rate
    const total = subtotal + shipping;

    return (
        <div className="bg-[#f6f8f7] min-h-screen py-10 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 pb-6 border-b border-gray-200">
                    <h1 className="text-3xl md:text-4xl font-serif font-semibold text-[#1a1a1a] leading-tight flex items-center gap-3">
                        <ShoppingBag className="text-[#18582e]" size={32} />
                        Shopping Cart
                    </h1>
                    <p className="text-sm text-[#295037] mt-2">
                        {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
                    </p>
                </div>

                {cart.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Cart Items List */}
                        <div className="lg:w-2/3 flex flex-col gap-6">
                            {/* Table Header Configuration - Hidden on Mobile */}
                            <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-2 text-center">Price</div>
                                <div className="col-span-2 text-center">Quantity</div>
                                <div className="col-span-2 text-right">Total</div>
                            </div>

                            {/* Items */}
                            {cart.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col md:grid md:grid-cols-12 md:items-center gap-4 transition-all hover:shadow-md">
                                    {/* Product Details */}
                                    <div className="col-span-6 flex items-center gap-4">
                                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <Link href={`#`} className="text-base font-medium text-gray-800 hover:text-[#18582e] transition-colors line-clamp-2">
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-gray-400 mt-1 md:hidden">₹{(item.price).toFixed(2)}</p>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-400 hover:text-[#bf0503] text-sm font-medium mt-3 flex items-center gap-1 w-fit transition-colors md:mt-2"
                                            >
                                                <Trash2 size={14} />
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price - Desktop */}
                                    <div className="hidden md:block col-span-2 text-center font-medium text-gray-800">
                                        ₹{(item.price).toFixed(2)}
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-span-2 flex justify-between md:justify-center items-center mt-2 md:mt-0">
                                        <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 overflow-hidden">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 hover:text-[#18582e] transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-semibold text-gray-800">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 hover:text-[#18582e] transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Total Price & Mobile display adjust */}
                                    <div className="col-span-2 text-right md:text-right flex justify-between md:block items-center border-t border-gray-100 md:border-0 pt-3 md:pt-0 mt-3 md:mt-0">
                                        <span className="text-sm text-gray-500 md:hidden">Total:</span>
                                        <span className="font-semibold text-lg md:text-base text-[#18582e]">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-24">
                                <h2 className="text-xl font-serif font-semibold text-gray-800 mb-6">Order Summary</h2>

                                <div className="space-y-4 text-sm text-gray-600 border-b border-gray-100 pb-6 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span>Subtotal ({cart.length} items)</span>
                                        <span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Shipping Estimate</span>
                                        <span className="font-medium text-gray-800">₹{shipping.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-lg font-semibold text-gray-800">Total</span>
                                    <div className="text-right">
                                        <span className="block text-3xl font-bold text-[#18582e]">₹{total.toFixed(2)}</span>
                                        <span className="text-xs text-gray-400">Including all taxes</span>
                                    </div>
                                </div>

                                <a href="/checkout" className="w-full">
                                    <button className="w-full bg-[#18582e] hover:bg-[#124222] text-white py-3.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#18582e]/20 hover:shadow-lg hover:shadow-[#18582e]/30">
                                        Proceed to Checkout
                                        <ArrowRight size={18} />
                                    </button>
                                </a>

                                <div className="mt-4 text-center">
                                    <p className="text-xs text-gray-500">Secure Checkout powered by Wibha</p>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 px-4 mt-8 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag size={40} className="text-gray-300" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-2xl font-serif text-gray-800 mb-3">Your cart is empty</h2>
                        <p className="text-gray-500 text-center max-w-md mb-8">
                            Looks like you haven't added any items to your cart yet. Discover our beautifully handcrafted collection.
                        </p>
                        <Link href="/shop" className="bg-[#18582e] text-white px-8 py-3 rounded-full hover:bg-[#124222] transition-colors font-medium shadow-md">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
