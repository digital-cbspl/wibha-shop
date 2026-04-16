"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    Search, 
    Filter, 
    MoreHorizontal, 
    Eye,
    ChevronDown,
    Download,
    Truck,
    CheckCircle2,
    Clock,
    XCircle
} from "lucide-react";

// Mock data based on your database structure (orders joined with users and payments)
const orders = [
    { 
        id: "#ORD-4092", 
        customer: "Bishnu Prasad Dash", 
        email: "abhi@gmail.com",
        date: "Apr 15, 2026, 10:24 AM", 
        total: "₹2,499.00", 
        items: 2,
        payment: "Paid", 
        status: "processing" 
    },
    { 
        id: "#ORD-4091", 
        customer: "Ariana Grand", 
        email: "ariana@example.com",
        date: "Apr 14, 2026, 04:12 PM", 
        total: "₹3,200.00", 
        items: 1,
        payment: "Paid", 
        status: "shipped" 
    },
    { 
        id: "#ORD-4090", 
        customer: "John Doe", 
        email: "john.doe@example.com",
        date: "Apr 12, 2026, 09:30 AM", 
        total: "₹1,850.00", 
        items: 3,
        payment: "COD", 
        status: "delivered" 
    },
    { 
        id: "#ORD-4089", 
        customer: "Elena Gilbert", 
        email: "elena@example.com",
        date: "Apr 10, 2026, 11:45 AM", 
        total: "₹59.99", 
        items: 1,
        payment: "Failed", 
        status: "cancelled" 
    },
    { 
        id: "#ORD-4088", 
        customer: "Stefan Salvatore", 
        email: "stefan@example.com",
        date: "Apr 09, 2026, 02:15 PM", 
        total: "₹4,500.00", 
        items: 4,
        payment: "Pending", 
        status: "pending" 
    },
];

// Helper to style status badges based on your DB enums
const getStatusBadge = (status: string) => {
    switch(status) {
        case 'delivered':
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100"><CheckCircle2 size={12} /> Delivered</span>;
        case 'shipped':
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100"><Truck size={12} /> Shipped</span>;
        case 'processing':
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100"><Clock size={12} /> Processing</span>;
        case 'cancelled':
        case 'returned':
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-red-50 text-red-600 border border-red-100"><XCircle size={12} /> {status}</span>;
        default: // pending
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100"><Clock size={12} /> Pending</span>;
    }
};

export default function OrdersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Orders</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage fulfillment, track shipments, and view order details.</p>
                </div>
                <button 
                    className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all w-fit shadow-sm"
                >
                    <Download size={16} /> Export CSV
                </button>
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
                            placeholder="Search by order ID or customer..." 
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
                                
                                {/* Status Filter */}
                                <div className="mb-6">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Order Status</h3>
                                    <div className="space-y-2.5">
                                        {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
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
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase w-[250px]">Order ID & Date</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase w-[250px]">Customer</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Payment</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Total</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Status</th>
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/30 transition-colors group">
                                    
                                    {/* Order ID & Date - UPDATED TO BE A LINK */}
                                    <td className="py-4 px-6 md:px-8">
                                        <Link 
                                            href={`/admin/orders/${order.id.replace('#', '')}`}
                                            className="text-sm font-bold text-gray-900 hover:text-[#18582e] transition-colors cursor-pointer"
                                        >
                                            {order.id}
                                        </Link>
                                        <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                                    </td>

                                    {/* Customer Info */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-serif font-bold text-xs shrink-0">
                                                {order.customer.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{order.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Payment Status */}
                                    <td className="py-4 px-6">
                                        <span className={`text-xs font-medium px-2 py-1 rounded border
                                            ${order.payment === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                              order.payment === 'Failed' ? 'bg-red-50 text-red-600 border-red-100' : 
                                              'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                            {order.payment}
                                        </span>
                                    </td>

                                    {/* Total Amount & Items */}
                                    <td className="py-4 px-6">
                                        <p className="text-sm font-semibold text-gray-900">{order.total}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                                    </td>

                                    {/* Fulfillment Status */}
                                    <td className="py-4 px-6">
                                        {getStatusBadge(order.status)}
                                    </td>

                                    {/* Actions */}
                                    <td className="py-4 px-6 md:px-8 text-right">
                                        <div className="flex items-center justify-end gap-1.5 hidden sm:flex">
                                            {/* We mock a link to a theoretical order details page */}
                                            <Link href={`/admin/orders/${order.id.replace('#', '')}`} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#18582e] hover:bg-[#18582e]/10 rounded-lg transition-colors border border-transparent hover:border-[#18582e]/20">
                                                <Eye size={14} /> View Details
                                            </Link>
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
                    <span className="text-gray-500 font-medium text-xs">Showing 1 to 5 of 156 orders</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-500 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-900 font-medium hover:bg-gray-50 transition-colors">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
}