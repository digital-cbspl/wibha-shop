"use client";

import Link from "next/link";
import { 
    ChevronLeft, 
    Save, 
    Info 
} from "lucide-react";

export default function AddProductTypePage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/product-types" 
                        className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Add Product Type</h1>
                        <p className="text-sm text-gray-500 mt-1">Create a new sub-category for your products.</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <Link 
                        href="/admin/product-types"
                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        Discard
                    </Link>
                    <button className="flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all">
                        <Save size={16} /> Save Type
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Type Name <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="e.g., Kurtas & Kurtis" 
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
                                    Slug 
                                    <span className="text-gray-400 font-normal text-xs flex items-center gap-1"><Info size={12}/> Auto-generated</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., kurtas-kurtis" 
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900 placeholder-gray-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Organization & Status */}
                <div className="space-y-8">

                    {/* Organization / Parent Category */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-5">Organization</h2>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Parent Category <span className="text-red-500">*</span></label>
                            <select 
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 appearance-none cursor-pointer"
                            >
                                <option value="">Select a Category...</option>
                                <option value="1">Clothing</option>
                                <option value="2">Craft</option>
                                <option value="3">Wedding</option>
                                <option value="4">Accessories</option>
                                <option value="5">Artisans</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-2">
                                Select the top-level category this product type belongs to.
                            </p>
                        </div>
                    </div>
                    
                    {/* Status */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-5">Visibility Status</h2>
                        
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-[#18582e] bg-[#18582e]/5 cursor-pointer">
                                <input type="radio" name="status" value="active" defaultChecked className="w-4 h-4 text-[#18582e] focus:ring-[#18582e]" />
                                <span className="text-sm font-medium text-[#18582e]">Active (Visible)</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                                <input type="radio" name="status" value="draft" className="w-4 h-4 text-[#18582e] focus:ring-[#18582e]" />
                                <span className="text-sm font-medium text-gray-700">Draft (Hidden)</span>
                            </label>
                        </div>
                    </div>

                    {/* Summary Info */}
                    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex items-start gap-4">
                        <div className="p-2 rounded-full bg-white text-gray-400 shrink-0 shadow-sm border border-gray-100">
                            <Info size={16} strokeWidth={2} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">Hierarchy</p>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                E.g., <strong className="text-gray-700">Clothing</strong> (Category) &rarr; <strong className="text-gray-700">Sarees</strong> (Product Type) &rarr; <strong className="text-gray-700">Ikat Saree</strong> (Product).
                            </p>
                        </div>
                    </div>

                </div>

            </form>
        </div>
    );
}