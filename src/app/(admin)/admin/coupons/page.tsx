"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    Search, 
    Filter, 
    MoreHorizontal, 
    Plus,
    Edit,
    Trash2,
    Ticket,
    Percent,
    Banknote,
    ChevronDown,
    CalendarDays
} from "lucide-react";

// Mock data for coupons
const coupons = [
    { 
        id: 1, 
        code: "WELCOME20", 
        type: "percentage", 
        value: 20, 
        minOrder: "₹1,000",
        usage: { current: 145, limit: 500 },
        validity: "Apr 01, 2026 - May 01, 2026",
        status: "active" 
    },
    { 
        id: 2, 
        code: "FESTIVAL500", 
        type: "fixed", 
        value: 500, 
        minOrder: "₹3,000",
        usage: { current: 42, limit: 100 },
        validity: "Apr 10, 2026 - Apr 20, 2026",
        status: "active" 
    },
    { 
        id: 3, 
        code: "FREESHIP", 
        type: "percentage", // Assuming 100% off shipping is tracked differently, but we'll mock it here
        value: 100, 
        minOrder: "₹2,500",
        usage: { current: 89, limit: null }, // Unlimited
        validity: "Always Active",
        status: "active" 
    },
    { 
        id: 4, 
        code: "WINTER15", 
        type: "percentage", 
        value: 15, 
        minOrder: "₹1,500",
        usage: { current: 300, limit: 300 },
        validity: "Dec 01, 2025 - Jan 31, 2026",
        status: "expired" 
    },
    { 
        id: 5, 
        code: "VIPMEMBER", 
        type: "fixed", 
        value: 1000, 
        minOrder: "₹5,000",
        usage: { current: 0, limit: 50 },
        validity: "May 01, 2026 - Jun 01, 2026",
        status: "draft" 
    },
];

// Helper to style status badges
const getStatusBadge = (status: string) => {
    switch(status) {
        case 'active':
            return <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">Active</span>;
        case 'expired':
            return <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-red-50 text-red-600 border border-red-100">Expired</span>;
        default: // draft
            return <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-gray-100 text-gray-600 border border-gray-200">Draft</span>;
    }
};

export default function CouponsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Coupons & Discounts</h1>
                    <p className="text-sm text-gray-500 mt-1">Create and manage promotional codes for your customers.</p>
                </div>
                <Link 
                    href="/admin/coupons/new"
                    className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit"
                >
                    <Plus size={16} /> Create Coupon
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
                            placeholder="Search by coupon code..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium placeholder-gray-400 uppercase"
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
                                
                                {/* Status Filter */}
                                <div className="mb-6">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Coupon Status</h3>
                                    <div className="space-y-2.5">
                                        {['Active', 'Draft', 'Expired'].map((status) => (
                                            <label key={status} className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{status}</span>
                                            </label>
                                        ))}
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
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase w-[250px]">Coupon Code</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Discount</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Usage Limit</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Validity</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Status</th>
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {coupons.map((coupon) => (
                                <tr key={coupon.id} className="hover:bg-gray-50/30 transition-colors group">
                                    
                                    {/* Coupon Code */}
                                    <td className="py-4 px-6 md:px-8">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border 
                                                ${coupon.status === 'active' ? 'bg-[#18582e]/5 text-[#18582e] border-[#18582e]/20' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                                                <Ticket size={18} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold font-mono text-gray-900 tracking-wide">{coupon.code}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">Min: {coupon.minOrder}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Discount Type & Value */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            {coupon.type === 'percentage' ? (
                                                <Percent size={14} className="text-blue-500" />
                                            ) : (
                                                <Banknote size={14} className="text-emerald-500" />
                                            )}
                                            <span className="text-sm font-semibold text-gray-900">
                                                {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Usage */}
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-medium text-gray-900">{coupon.usage.current} used</span>
                                                <span className="text-gray-400">{coupon.usage.limit ? `/ ${coupon.usage.limit}` : '∞'}</span>
                                            </div>
                                            {coupon.usage.limit && (
                                                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full ${coupon.usage.current >= coupon.usage.limit ? 'bg-red-500' : 'bg-[#18582e]'}`} 
                                                        style={{ width: `${Math.min((coupon.usage.current / coupon.usage.limit) * 100, 100)}%` }}
                                                    ></div>
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    {/* Validity Dates */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <CalendarDays size={14} className="text-gray-400" />
                                            <span className="truncate max-w-[150px]" title={coupon.validity}>{coupon.validity}</span>
                                        </div>
                                    </td>

                                    {/* Status Badge */}
                                    <td className="py-4 px-6">
                                        {getStatusBadge(coupon.status)}
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
                    <span className="text-gray-500 font-medium text-xs">Showing 1 to 5 of 12 coupons</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-400 font-medium cursor-not-allowed">Previous</button>
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-400 font-medium cursor-not-allowed">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
}