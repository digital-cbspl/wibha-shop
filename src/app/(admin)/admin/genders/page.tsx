"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    Search, 
    Plus, 
    MoreHorizontal, 
    Edit, 
    Trash2, 
    Users
} from "lucide-react";

// Mock data based on your database structure (genders table)
const genders = [
    { id: 1, name: "Men", slug: "men", date: "Apr 15, 2026" },
    { id: 2, name: "Women", slug: "women", date: "Apr 15, 2026" },
    { id: 3, name: "Boys", slug: "boys", date: "Apr 15, 2026" },
    { id: 4, name: "Girls", slug: "girls", date: "Apr 15, 2026" },
    { id: 5, name: "Kids", slug: "kids", date: "Apr 15, 2026" },
];

export default function GendersPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Target Genders</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage the target audiences for your products.</p>
                </div>
                <Link 
                    href="/admin/genders/new"
                    className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit"
                >
                    <Plus size={16} /> Add Gender
                </Link>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 overflow-hidden flex flex-col">
                
                {/* Toolbar */}
                <div className="p-5 border-b border-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-[320px]">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Search size={16} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search genders..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase w-[350px]">Target Audience</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Slug</th>
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {genders.map((gender) => (
                                <tr key={gender.id} className="hover:bg-gray-50/30 transition-colors group">
                                    
                                    {/* Gender Info */}
                                    <td className="py-4 px-6 md:px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-[#18582e]/5 group-hover:text-[#18582e] group-hover:border-[#18582e]/20 transition-colors">
                                                <Users size={18} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 group-hover:text-[#18582e] transition-colors">{gender.name}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">Added {gender.date}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Slug */}
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                            /{gender.slug}
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
                    <span className="text-gray-500 font-medium text-xs">Showing 1 to 5 of 5 genders</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-400 font-medium cursor-not-allowed">Previous</button>
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-400 font-medium cursor-not-allowed">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
}