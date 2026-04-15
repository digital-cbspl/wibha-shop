"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, CreditCard, Lock, MapPin, Package, ShieldCheck, Truck, Plus, Banknote, Shield, Check } from "lucide-react";
import { img1, img2, img6 } from "../../assets/image/image";

// Premium Mock Data
const cartItems = [
    { id: 1, name: "Pottery Decorative Plate - Indigo Florals", price: 30.00, image: img1.src, quantity: 1, type: "Ceramics" },
    { id: 2, name: "Pottery Jar with Lids - Yellow Ornate", price: 79.00, image: img2.src, quantity: 2, type: "Ceramics" },
    { id: 3, name: "Dust Painting - Lilac Muse", price: 70.00, image: img6.src, quantity: 1, type: "Artwork" },
];

const initialAddresses = [
    { id: 1, label: "Home", name: "Ariana Grand", text: "123 Artisan Valley, Plot 45, Jaipur, Rajasthan 302001, India", phone: "+91 98765 43210" },
    { id: 2, label: "Studio", name: "Ariana Grand", text: "45 Creative Hub, Block A, Mumbai, Maharashtra 400050, India", phone: "+91 98765 43210" },
];

export default function PremiumCheckout() {
    const [activeSection, setActiveSection] = useState<1 | 2>(1); // 1: Shipping, 2: Payment

    // Shipping States
    const [addresses, setAddresses] = useState(initialAddresses);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(1);
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

    // Payment States
    const [paymentMethod, setPaymentMethod] = useState("card");

    // Order Totals
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 15.00 : 0;
    const taxes = subtotal * 0.05; // 5% tax mock
    const total = subtotal + shipping + taxes;

    // Handlers
    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const newAddress = {
            id: addresses.length + 1,
            label: "Custom",
            name: (form.fullName as HTMLInputElement).value,
            text: `${(form.street as HTMLInputElement).value}, ${(form.city as HTMLInputElement).value}, ${(form.state as HTMLInputElement).value} ${(form.zip as HTMLInputElement).value}`,
            phone: (form.phone as HTMLInputElement).value,
        };
        setAddresses([newAddress, ...addresses]);
        setSelectedAddressId(newAddress.id);
        setIsAddingNewAddress(false);
    };

    const activeAddress = addresses.find(a => a.id === selectedAddressId);

    return (
        <div className="bg-[#fcfdfc] min-h-screen text-gray-800 font-sans selection:bg-[#18582e] selection:text-white">

            <main className="max-w-7xl mx-auto px-6 py-10 md:py-16 flex flex-col lg:flex-row gap-16 lg:gap-24">

                {/* LEFT: Accordion Flow (60%) */}
                <div className="flex-1 w-full max-w-3xl">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                        <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1a1a]">Complete your order</h1>
                        <div className="flex items-center gap-2 text-[#18582e] font-medium text-sm bg-[#18582e]/5 px-4 py-2.5 rounded-full border border-[#18582e]/20 w-fit shadow-sm">
                            <Lock size={15} /> 100% Secure Checkout
                        </div>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[23px] top-12 bottom-12 w-[2px] bg-gray-100 rounded-full z-0"></div>

                        {/* ======================= SECTION 1: SHIPPING ======================= */}
                        <div className="relative z-10 mb-10 transition-all duration-500">
                            <div className="flex gap-6">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm border-4 transition-all duration-500 ${activeSection === 1 ? 'bg-[#18582e] border-[#18582e]/20 text-white' : activeSection > 1 ? 'bg-white border-[#18582e] text-[#18582e]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                                    {activeSection > 1 ? <Check size={20} className="text-[#18582e]" /> : <MapPin size={20} />}
                                </div>
                                <div className="flex-1 pt-2.5">
                                    <div className="flex items-center justify-between cursor-pointer" onClick={() => activeSection > 1 && setActiveSection(1)}>
                                        <h2 className={`font-serif text-xl font-medium transition-colors ${activeSection === 1 ? 'text-[#1a1a1a]' : 'text-gray-500'}`}>Shipping Detail</h2>
                                        {activeSection > 1 && <span className="text-[#18582e] text-sm font-medium hover:underline">Edit</span>}
                                    </div>

                                    {activeSection === 1 && (
                                        <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">

                                            {!isAddingNewAddress ? (
                                                <div className="space-y-4">
                                                    {addresses.map((addr) => (
                                                        <div
                                                            key={addr.id}
                                                            onClick={() => setSelectedAddressId(addr.id)}
                                                            className={`relative overflow-hidden rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 ${selectedAddressId === addr.id
                                                                ? "border-[#18582e] bg-[#18582e]/[0.02] shadow-sm shadow-[#18582e]/10"
                                                                : "border-gray-100 hover:border-gray-200 bg-white"
                                                                }`}
                                                        >
                                                            <div className="flex gap-4">
                                                                <div className={`mt-1 flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all ${selectedAddressId === addr.id ? 'border-[#18582e]' : 'border-gray-300'}`}>
                                                                    <div className={`w-2.5 h-2.5 rounded-full bg-[#18582e] transition-transform duration-300 ${selectedAddressId === addr.id ? 'scale-100' : 'scale-0'}`}></div>
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center gap-3 mb-1">
                                                                        <span className="font-semibold text-gray-900">{addr.name}</span>
                                                                        <span className="text-[10px] uppercase tracking-wider font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{addr.label}</span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-600 leading-relaxed max-w-md">{addr.text}</p>
                                                                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-2"><Lock size={12} /> {addr.phone}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <button
                                                        onClick={() => setIsAddingNewAddress(true)}
                                                        className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl border-2 border-dashed border-gray-200 text-gray-500 font-medium hover:border-[#18582e] hover:text-[#18582e] hover:bg-[#18582e]/5 transition-all outline-none"
                                                    >
                                                        <Plus size={20} /> Use a different address
                                                    </button>

                                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                                        <button
                                                            onClick={() => setActiveSection(2)}
                                                            disabled={!selectedAddressId}
                                                            className="bg-[#18582e] text-white px-10 py-4 rounded-xl font-medium shadow-lg shadow-[#18582e]/20 hover:shadow-xl hover:shadow-[#18582e]/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none"
                                                        >
                                                            Continue to Payment
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleAddressSubmit} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/40">
                                                    <h3 className="font-serif text-lg font-medium mb-6">New Delivery Address</h3>
                                                    <div className="space-y-5">
                                                        <div className="relative">
                                                            <input type="text" name="fullName" required placeholder="Full Name" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 font-medium" />
                                                        </div>
                                                        <div className="relative">
                                                            <input type="text" name="street" required placeholder="Street Address" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400" />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-5">
                                                            <input type="text" name="city" required placeholder="City" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400" />
                                                            <input type="text" name="state" required placeholder="State" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400" />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-5">
                                                            <input type="text" name="zip" required placeholder="Zip Code" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400" />
                                                            <input type="tel" name="phone" required placeholder="Phone Number" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-8 flex gap-4">
                                                        <button type="submit" className="flex-1 bg-[#1a1a1a] text-white py-4 rounded-xl font-medium hover:bg-black shadow-md transition-colors">Save Address</button>
                                                        <button type="button" onClick={() => setIsAddingNewAddress(false)} className="px-8 bg-transparent text-gray-500 font-medium hover:text-gray-900 transition-colors">Cancel</button>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    )}

                                    {/* Compact View when Completed */}
                                    {activeSection > 1 && activeAddress && (
                                        <div className="mt-3 animate-in fade-in duration-300">
                                            <p className="text-sm text-gray-600 line-clamp-1">{activeAddress.name}, {activeAddress.text}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ======================= SECTION 2: PAYMENT ======================= */}
                        <div className="relative z-10 transition-all duration-500">
                            <div className="flex gap-6">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm border-4 transition-all duration-500 ${activeSection === 2 ? 'bg-[#18582e] border-[#18582e]/20 text-white' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                                    <CreditCard size={20} />
                                </div>
                                <div className="flex-1 pt-2.5">
                                    <h2 className={`font-serif text-xl font-medium transition-colors ${activeSection === 2 ? 'text-[#1a1a1a]' : 'text-gray-500'}`}>Payment Method</h2>

                                    {activeSection === 2 && (
                                        <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">

                                            {/* Payment Options Grid */}
                                            <div className="space-y-4">

                                                {/* Card */}
                                                <div className={`overflow-hidden border-2 rounded-2xl transition-all duration-300 ${paymentMethod === 'card' ? 'border-[#18582e] shadow-md shadow-[#18582e]/10' : 'border-gray-100'}`}>
                                                    <label className="flex items-center p-6 cursor-pointer bg-white">
                                                        <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all ${paymentMethod === 'card' ? 'border-[#18582e]' : 'border-gray-300'}`}>
                                                            <div className={`w-2.5 h-2.5 rounded-full bg-[#18582e] transition-transform duration-300 ${paymentMethod === 'card' ? 'scale-100' : 'scale-0'}`}></div>
                                                        </div>
                                                        <div className="ml-4 font-medium text-gray-900 flex-1">Credit / Debit Card</div>
                                                        <div className="flex gap-2 text-gray-400">
                                                            <CreditCard size={24} strokeWidth={1.5} />
                                                        </div>
                                                    </label>
                                                    {paymentMethod === 'card' && (
                                                        <div className="px-6 pb-6 pt-2 bg-white animate-in slide-in-from-top-2">
                                                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                                                <input type="text" placeholder="Card Number" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 font-medium font-mono" />
                                                                <div className="grid grid-cols-2 gap-5">
                                                                    <input type="text" placeholder="MM / YY" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 font-medium font-mono" />
                                                                    <input type="password" placeholder="CVC" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 font-medium font-mono" />
                                                                </div>
                                                                <input type="text" placeholder="Name on Card" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 font-medium uppercase" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* UPI */}
                                                <div className={`overflow-hidden border-2 rounded-2xl transition-all duration-300 ${paymentMethod === 'upi' ? 'border-[#18582e] shadow-md shadow-[#18582e]/10' : 'border-gray-100'}`}>
                                                    <label className="flex items-center p-6 cursor-pointer bg-white">
                                                        <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all ${paymentMethod === 'upi' ? 'border-[#18582e]' : 'border-gray-300'}`}>
                                                            <div className={`w-2.5 h-2.5 rounded-full bg-[#18582e] transition-transform duration-300 ${paymentMethod === 'upi' ? 'scale-100' : 'scale-0'}`}></div>
                                                        </div>
                                                        <div className="ml-4 font-medium text-gray-900 flex-1">UPI Transaction</div>
                                                        <div className="flex gap-2">
                                                            <Image src="/upi.png" alt="UPI" width={24} height={24} className="opacity-60 saturate-0" />
                                                        </div>
                                                    </label>
                                                    {paymentMethod === 'upi' && (
                                                        <div className="px-6 pb-6 bg-white animate-in slide-in-from-top-2">
                                                            <input type="text" placeholder="Enter Virtual Payment Address (VPA)" className="w-full px-5 py-4 mt-2 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 font-medium" />
                                                            <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                                                                <Shield size={14} className="text-[#18582e]" /> Fully encrypted connection
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* COD */}
                                                <div className={`overflow-hidden border-2 rounded-2xl transition-all duration-300 ${paymentMethod === 'cod' ? 'border-[#18582e] shadow-md shadow-[#18582e]/10' : 'border-gray-100'}`}>
                                                    <label className="flex items-center p-6 cursor-pointer bg-white">
                                                        <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all ${paymentMethod === 'cod' ? 'border-[#18582e]' : 'border-gray-300'}`}>
                                                            <div className={`w-2.5 h-2.5 rounded-full bg-[#18582e] transition-transform duration-300 ${paymentMethod === 'cod' ? 'scale-100' : 'scale-0'}`}></div>
                                                        </div>
                                                        <div className="ml-4 font-medium text-gray-900 flex-1">Pay on Delivery</div>
                                                        <Banknote size={24} className="text-gray-400" strokeWidth={1.5} />
                                                    </label>
                                                </div>

                                            </div>

                                            <div className="mt-10 pt-6 border-t border-gray-100">
                                                <button className="w-full bg-[#1a1a1a] text-white py-5 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:bg-black hover:-translate-y-0.5 transition-all overflow-hidden group relative">
                                                    <span className="relative z-10 flex items-center gap-2">
                                                        <Lock size={18} /> Confirm & Pay ₹{total.toFixed(2)}
                                                    </span>
                                                </button>
                                                <p className="text-center text-xs text-gray-400 mt-4 font-medium flex items-center justify-center gap-1.5">
                                                    <ShieldCheck size={14} /> Payments are 256-bit SSL encrypted.
                                                </p>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* RIGHT: Floating Elegant Summary (40%) */}
                <div className="w-full lg:w-[420px] shrink-0">
                    <div className="sticky top-28 bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-2xl shadow-gray-200/50 p-8">

                        <h3 className="font-serif text-2xl font-medium mb-8 text-[#1a1a1a]">Order Summary</h3>

                        {/* Perfect Scrollable Item List */}
                        <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scroll">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-5 group">
                                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur text-gray-800 text-xs w-6 h-6 flex items-center justify-center rounded-md font-bold shadow-sm">
                                            {item.quantity}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h4 className="text-[15px] font-medium text-gray-900 leading-snug line-clamp-2">{item.name}</h4>
                                        <p className="text-sm text-gray-400 mt-1 mb-2">{item.type}</p>
                                        <span className="font-semibold text-[#18582e]">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Gift / Discount Input */}
                        <div className="flex gap-3 mb-8">
                            <input type="text" placeholder="Gift card or discount code" className="flex-1 px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-[#18582e] transition-all text-sm" />
                            <button className="px-6 rounded-xl bg-gray-100 text-gray-800 font-semibold text-sm hover:bg-gray-200 transition-colors">Apply</button>
                        </div>

                        {/* Pricing Brekdown */}
                        <div className="space-y-3 pt-6 border-t border-dashed border-gray-200">
                            <div className="flex justify-between text-gray-600 text-[15px]">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 text-[15px]">
                                <span>Shipping estimate</span>
                                <span className="font-medium text-gray-900">₹{shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 text-[15px]">
                                <span>Estimated taxes (5%)</span>
                                <span className="font-medium text-gray-900">₹{taxes.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-end">
                                <span className="text-lg font-medium text-gray-900">Total</span>
                                <div className="text-right">
                                    <span className="text-xs text-gray-400 font-bold tracking-widest uppercase mr-2">INR</span>
                                    <span className="text-3xl font-bold text-[#1a1a1a]">₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </main>

        </div>
    );
}