"use client";

import Link from "next/link";
import { 
    ChevronLeft, 
    Save, 
    Info,
    Wand2,
    Calendar,
    Percent,
    Banknote
} from "lucide-react";
import { useState } from "react";

export default function CreateCouponPage() {
    const [discountType, setDiscountType] = useState('percentage');

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/coupons" 
                        className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Create Coupon</h1>
                        <p className="text-sm text-gray-500 mt-1">Set up a new discount code or promotional campaign.</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <Link 
                        href="/admin/coupons"
                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        Discard
                    </Link>
                    <button className="flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all">
                        <Save size={16} /> Save Coupon
                    </button>
                </div>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: Main Details */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Basic Information */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">General Information</h2>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code <span className="text-red-500">*</span></label>
                                <div className="flex gap-3">
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="e.g., SUMMER20" 
                                        className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-bold text-gray-900 placeholder-gray-400 uppercase tracking-wide"
                                    />
                                    <button 
                                        type="button"
                                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shrink-0 border border-gray-200"
                                    >
                                        <Wand2 size={16} /> Generate
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Customers will enter this code at checkout.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Internal)</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., Summer sale campaign for all clothing" 
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900 placeholder-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Discount Rules */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">Discount Rules</h2>
                        
                        <div className="space-y-6">
                            {/* Discount Type Toggle */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Discount Type</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setDiscountType('percentage')}
                                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-colors
                                            ${discountType === 'percentage' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <Percent size={18} /> Percentage
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setDiscountType('fixed')}
                                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-colors
                                            ${discountType === 'fixed' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <Banknote size={18} /> Fixed Amount
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 font-medium">
                                            {discountType === 'percentage' ? '%' : '₹'}
                                        </div>
                                        <input 
                                            type="number" 
                                            required 
                                            placeholder="0" 
                                            className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-bold text-gray-900"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Purchase Amount</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 font-medium">₹</div>
                                        <input 
                                            type="number" 
                                            placeholder="0.00" 
                                            className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Leave 0 for no minimum requirement.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Limits & Status */}
                <div className="space-y-8">

                    {/* Validity Dates */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-5 flex items-center gap-2">
                            <Calendar size={18} className="text-[#18582e]" /> Validity
                        </h2>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date <span className="text-red-500">*</span></label>
                                <input 
                                    type="datetime-local" 
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                                <input 
                                    type="datetime-local" 
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900"
                                />
                                <p className="text-xs text-gray-500 mt-2">Leave blank if the coupon never expires.</p>
                            </div>
                        </div>
                    </div>

                    {/* Usage Limits */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-5">Usage Limits</h2>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Total Usage Limit</label>
                                <input 
                                    type="number" 
                                    placeholder="e.g., 100" 
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900"
                                />
                                <p className="text-xs text-gray-500 mt-2">Maximum number of times this coupon can be used overall.</p>
                            </div>
                            <div>
                                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                    <span className="text-sm font-medium text-gray-700">Limit to one use per customer</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    {/* Status */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-5">Status</h2>
                        
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-[#18582e] bg-[#18582e]/5 cursor-pointer">
                                <input type="radio" name="status" value="active" defaultChecked className="w-4 h-4 text-[#18582e] focus:ring-[#18582e]" />
                                <span className="text-sm font-medium text-[#18582e]">Active (Live)</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                                <input type="radio" name="status" value="draft" className="w-4 h-4 text-[#18582e] focus:ring-[#18582e]" />
                                <span className="text-sm font-medium text-gray-700">Draft (Hidden)</span>
                            </label>
                        </div>
                    </div>

                </div>

            </form>
        </div>
    );
}