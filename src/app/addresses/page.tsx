"use client";

import { useState } from "react";
import { MapPin, Plus, Lock, Star, Edit2, Trash2, Home, Briefcase } from "lucide-react";

// Premium Mock Data
const initialAddresses = [
    { id: 1, label: "Home", name: "Ariana Grand", text: "123 Artisan Valley, Plot 45, Jaipur, Rajasthan 302001, India", phone: "+91 98765 43210", isDefault: true },
    { id: 2, label: "Work", name: "Ariana Grand", text: "45 Creative Hub, Block A, Mumbai, Maharashtra 400050, India", phone: "+91 98765 43210", isDefault: false },
];

export default function MyAddresses() {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

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
            isDefault: addresses.length === 0, // Make default if it's the first one
        };
        setAddresses([newAddress, ...addresses]);
        setIsAddingNewAddress(false);
    };

    const setAsDefault = (id: number) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    const deleteAddress = (id: number) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    // Helper to render the correct icon based on label
    const getLabelIcon = (label: string) => {
        const lowerLabel = label.toLowerCase();
        if (lowerLabel === "home") return <Home size={12} strokeWidth={2.5} />;
        if (lowerLabel === "work") return <Briefcase size={12} strokeWidth={2.5} />;
        return <MapPin size={12} strokeWidth={2.5} />;
    };

    return (
        <div className="bg-[#fcfdfc] min-h-screen text-gray-800 font-sans selection:bg-[#18582e] selection:text-white">
            <main className="max-w-5xl mx-auto px-6 py-10 md:py-16">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4 border-b border-gray-100 pb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#1a1a1a]">My Addresses</h1>
                        <p className="text-gray-500 mt-2">Manage your shipping and billing locations</p>
                    </div>
                    {!isAddingNewAddress && (
                        <button 
                            onClick={() => setIsAddingNewAddress(true)}
                            className="flex items-center gap-2 bg-[#18582e] text-white px-6 py-3 rounded-xl font-medium shadow-md shadow-[#18582e]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit"
                        >
                            <Plus size={18} /> Add New Address
                        </button>
                    )}
                </div>

                {/* Content Area */}
                <div className="transition-all duration-500">
                    {!isAddingNewAddress ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {addresses.map((addr) => (
                                <div
                                    key={addr.id}
                                    className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300 ${
                                        addr.isDefault
                                            ? "border-[#18582e] bg-[#18582e]/[0.02] shadow-sm shadow-[#18582e]/10"
                                            : "border-gray-100 hover:border-gray-200 bg-white"
                                    }`}
                                >
                                    {/* Default Badge */}
                                    {addr.isDefault && (
                                        <div className="absolute top-0 right-0 bg-[#18582e] text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1">
                                            <Star size={12} fill="currentColor" /> Default
                                        </div>
                                    )}

                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`p-2 rounded-full ${addr.isDefault ? 'bg-[#18582e]/10 text-[#18582e]' : 'bg-gray-50 text-gray-400'}`}>
                                                {/* Use the same helper function for the main circle icon if you want, or keep MapPin */}
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-900 text-lg">{addr.name}</span>
                                                    {/* Updated Label with Icon */}
                                                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                                        {getLabelIcon(addr.label)}
                                                        {addr.label}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="pl-11">
                                            <p className="text-sm text-gray-600 leading-relaxed pr-8">{addr.text}</p>
                                            <p className="text-sm text-gray-500 mt-3 flex items-center gap-2 font-medium">
                                                <Lock size={14} className="text-gray-400" /> {addr.phone}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-4 mt-6 pt-5 border-t border-gray-100 pl-11">
                                        <button className="text-sm font-medium text-gray-500 hover:text-[#18582e] flex items-center gap-1.5 transition-colors">
                                            <Edit2 size={14} /> Edit
                                        </button>
                                        <button 
                                            onClick={() => deleteAddress(addr.id)}
                                            className="text-sm font-medium text-gray-500 hover:text-red-600 flex items-center gap-1.5 transition-colors"
                                        >
                                            <Trash2 size={14} /> Remove
                                        </button>
                                        {!addr.isDefault && (
                                            <button 
                                                onClick={() => setAsDefault(addr.id)}
                                                className="text-sm font-medium text-[#18582e] ml-auto hover:underline"
                                            >
                                                Set as Default
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Empty State / Add Card Trigger */}
                            {addresses.length === 0 && (
                                <button
                                    onClick={() => setIsAddingNewAddress(true)}
                                    className="w-full flex flex-col items-center justify-center gap-3 py-12 rounded-2xl border-2 border-dashed border-gray-200 text-gray-500 font-medium hover:border-[#18582e] hover:text-[#18582e] hover:bg-[#18582e]/5 transition-all outline-none"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-2">
                                        <Plus size={24} />
                                    </div>
                                    You don't have any saved addresses.
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="max-w-2xl">
                            <form onSubmit={handleAddressSubmit} className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/40 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="font-serif text-xl font-medium mb-8 text-[#1a1a1a]">Enter Address Details</h3>
                                
                                <div className="space-y-5">
                                    <div className="relative">
                                        <input type="text" name="fullName" required placeholder="Full Name" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 font-medium text-gray-900" />
                                    </div>
                                    <div className="relative">
                                        <input type="text" name="street" required placeholder="Street Address (Flat, House no., Building, Company)" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 text-gray-900" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <input type="text" name="city" required placeholder="City / Town" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 text-gray-900" />
                                        <input type="text" name="state" required placeholder="State / Province" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 text-gray-900" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <input type="text" name="zip" required placeholder="Zip / Postal Code" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 text-gray-900" />
                                        <input type="tel" name="phone" required placeholder="Phone Number" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e] focus:border-transparent transition-all placeholder-gray-400 text-gray-900" />
                                    </div>
                                </div>

                                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                    <button type="submit" className="flex-1 bg-[#1a1a1a] text-white py-4 px-8 rounded-xl font-medium hover:bg-black shadow-md transition-colors flex items-center justify-center gap-2">
                                        Save Address
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => setIsAddingNewAddress(false)} 
                                        className="py-4 px-8 bg-gray-50 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}