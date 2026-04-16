"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    ChevronLeft, 
    Save, 
    UploadCloud, 
    X,
    Info,
    Image as ImageIcon
} from "lucide-react";

export default function AddProductPage() {
    // Basic state for the image drag-and-drop UI mock
    const [dragActive, setDragActive] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/products" 
                        className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Add New Product</h1>
                        <p className="text-sm text-gray-500 mt-1">Create a new product listing in your catalog.</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <Link 
                        href="/admin/products"
                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        Discard
                    </Link>
                    <button className="flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all">
                        <Save size={16} /> Save Product
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="e.g., Handwoven Ikat Saree" 
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
                                    Product Slug 
                                    <span className="text-gray-400 font-normal text-xs flex items-center gap-1"><Info size={12}/> Auto-generated</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., handwoven-ikat-saree" 
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900 placeholder-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea 
                                    rows={5}
                                    placeholder="Describe the product's origin, materials, and care instructions..." 
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900 placeholder-gray-400 resize-none custom-scroll"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Media / Images */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h2 className="font-serif text-xl font-medium text-[#1a1a1a]">Media</h2>
                                <p className="text-xs text-gray-500 mt-1">Upload product images. Recommended size: 1080x1080px.</p>
                            </div>
                        </div>

                        <div 
                            className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-colors cursor-pointer
                                ${dragActive ? 'border-[#18582e] bg-[#18582e]/5' : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
                            onDragEnter={() => setDragActive(true)}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={() => setDragActive(false)}
                        >
                            <div className="w-14 h-14 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 mb-4">
                                <UploadCloud size={24} />
                            </div>
                            <p className="text-sm font-medium text-gray-900 mb-1">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                        </div>
                    </div>

                    {/* Pricing & Inventory */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">Pricing & Inventory</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Regular Price (₹) <span className="text-red-500">*</span></label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    required 
                                    placeholder="0.00" 
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Price (₹)</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    placeholder="0.00" 
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">SKU (Stock Keeping Unit)</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., CL-SA-001" 
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900 placeholder-gray-400 uppercase"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Available Stock</label>
                                <input 
                                    type="number" 
                                    defaultValue={0}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: Organization */}
                <div className="space-y-8">
                    
                    {/* Status */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-5">Status</h2>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-[#18582e] bg-[#18582e]/5 cursor-pointer">
                                <input type="radio" name="status" value="active" defaultChecked className="w-4 h-4 text-[#18582e] focus:ring-[#18582e]" />
                                <span className="text-sm font-medium text-[#18582e]">Active</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                                <input type="radio" name="status" value="draft" className="w-4 h-4 text-[#18582e] focus:ring-[#18582e]" />
                                <span className="text-sm font-medium text-gray-700">Draft (Hidden)</span>
                            </label>
                        </div>
                    </div>

                    {/* Organization / Categories */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">Organization</h2>
                        
                        <div className="space-y-5">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 appearance-none cursor-pointer">
                                    <option value="">Select Category...</option>
                                    <option value="1">Clothing</option>
                                    <option value="2">Craft</option>
                                    <option value="3">Wedding</option>
                                    <option value="4">Accessories</option>
                                    <option value="5">Artisans</option>
                                </select>
                            </div>

                            {/* Product Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Type <span className="text-red-500">*</span></label>
                                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 appearance-none cursor-pointer">
                                    <option value="">Select Type...</option>
                                    <option value="8">Sarees</option>
                                    <option value="2">Kurtas</option>
                                    <option value="3">Shirts</option>
                                    <option value="17">Lamps & Lights</option>
                                    <option value="21">Mandala Art</option>
                                </select>
                            </div>

                            {/* Material */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 appearance-none cursor-pointer">
                                    <option value="">Select Material...</option>
                                    <option value="1">Cotton</option>
                                    <option value="2">Silk</option>
                                    <option value="3">Tusser</option>
                                    <option value="6">Linen</option>
                                </select>
                            </div>

                            {/* Variety */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Variety / Art Form</label>
                                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 appearance-none cursor-pointer">
                                    <option value="">Select Variety...</option>
                                    <option value="1">Habaspuri Saree</option>
                                    <option value="3">Ikat Saree</option>
                                    <option value="13">Pattachitra</option>
                                    <option value="14">Madhubani</option>
                                </select>
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Target Gender</label>
                                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 appearance-none cursor-pointer">
                                    <option value="">Unisex / None</option>
                                    <option value="1">Men</option>
                                    <option value="2">Women</option>
                                    <option value="3">Boys</option>
                                    <option value="4">Girls</option>
                                    <option value="5">Kids</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>

            </form>
        </div>
    );
}