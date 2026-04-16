"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    Search, 
    Plus, 
    Filter, 
    MoreHorizontal, 
    Edit, 
    Trash2, 
    Layers,
    ChevronDown
} from "lucide-react";

// Mock data based on your database structure (product_types joined with categories)
const productTypes = [
    { id: 1, name: "Sarees", slug: "sarees", category: "Clothing", isActive: true, date: "Apr 15, 2026" },
    { id: 2, name: "Kurtas & Kurtis", slug: "kurtas-kurtis", category: "Clothing", isActive: true, date: "Apr 15, 2026" },
    { id: 3, name: "Suit Pieces", slug: "suit-pieces", category: "Clothing", isActive: true, date: "Apr 15, 2026" },
    { id: 4, name: "Lamps & Lights", slug: "lamps-lights", category: "Craft", isActive: true, date: "Apr 15, 2026" },
    { id: 5, name: "Mandala Art", slug: "mandala-art", category: "Artisans", isActive: true, date: "Apr 15, 2026" },
    { id: 6, name: "Pattachitra", slug: "pattachitra", category: "Artisans", isActive: false, date: "Apr 15, 2026" },
];

export default function ProductTypesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Product Types</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage sub-categories to further organize your catalog.</p>
                </div>
                <Link 
                    href="/admin/product-types/new"
                    className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit"
                >
                    <Plus size={16} /> Add Product Type
                </Link>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 overflow-hidden flex flex-col">
                
                {/* Toolbar (Search & Filter) */}
                <div className="p-5 border-b border-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    
                    {/* Search */}
                    <div className="relative w-full sm:w-[320px]">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Search size={16} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search product types..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium placeholder-gray-400"
                        />
                    </div>
                    
                    {/* Filter Dropdown Container */}
                    <div className="relative w-full sm:w-auto">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${isFilterOpen ? 'bg-gray-50 border-gray-300 text-gray-900' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Filter size={16} /> Filters <ChevronDown size={14} className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Filter Menu Popup */}
                        {isFilterOpen && (
                            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 z-20 p-5 animate-in fade-in slide-in-from-top-2 duration-200">
                                
                                {/* Category Filter */}
                                <div className="mb-6">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Parent Category</h3>
                                    <div className="space-y-2.5">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Clothing</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Craft</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Artisans</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4 border-t border-gray-50">
                                    <button 
                                        onClick={() => setIsFilterOpen(false)}
                                        className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg transition-colors"
                                    >
                                        Clear
                                    </button>
                                    <button 
                                        onClick={() => setIsFilterOpen(false)}
                                        className="flex-1 py-2 bg-[#18582e] hover:bg-[#134624] text-white text-xs font-semibold rounded-lg transition-colors shadow-md shadow-[#18582e]/20"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase w-[300px]">Product Type</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Slug</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Parent Category</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Status</th>
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {productTypes.map((type) => (
                                <tr key={type.id} className="hover:bg-gray-50/30 transition-colors group">
                                    
                                    {/* Type Info */}
                                    <td className="py-4 px-6 md:px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-[#18582e]/5 group-hover:text-[#18582e] group-hover:border-[#18582e]/20 transition-colors">
                                                <Layers size={18} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 group-hover:text-[#18582e] transition-colors">{type.name}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">Added {type.date}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Slug */}
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                            /{type.slug}
                                        </span>
                                    </td>

                                    {/* Parent Category Badge */}
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center justify-center px-2.5 py-1 text-[11px] font-bold rounded-md uppercase tracking-wider bg-gray-100 text-gray-600 border border-gray-200">
                                            {type.category}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider
                                            ${type.isActive ? 'bg-[#18582e]/10 text-[#18582e]' : 'bg-gray-100 text-gray-500'}`}>
                                            {type.isActive ? 'Active' : 'Draft'}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="py-4 px-6 md:px-8 text-right">
                                        <div className="flex items-center justify-end gap-1.5 hidden sm:flex">
                                            <button className="p-2 text-gray-400 hover:text-[#18582e] hover:bg-[#18582e]/10 rounded-lg transition-colors" title="Edit">
                                                <Edit size={16} strokeWidth={1.5} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                <Trash2 size={16} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                        {/* Mobile fallback */}
                                        <button className="sm:hidden p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-5 border-t border-gray-50 flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-medium text-xs">Showing 1 to 6 of 23 product types</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-500 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-900 font-medium hover:bg-gray-50 transition-colors">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
}