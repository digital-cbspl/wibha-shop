"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Filter,
    MoreHorizontal,
    ChevronDown,
    Download,
    CreditCard,
    Banknote,
    Smartphone,
    CheckCircle2,
    Clock,
    XCircle,
    RotateCcw,
    ExternalLink,
    ReceiptText,
    TrendingUp,
    Activity
} from "lucide-react";

// Mock data based on your database structure (payments table)
const transactions = [
    {
        id: "txn_upi_8923749283",
        orderId: "#ORD-4092",
        customer: "Bishnu Prasad Dash",
        date: "Apr 15, 2026, 10:24 AM",
        amount: 3200.00,
        method: "UPI",
        status: "success"
    },
    {
        id: "txn_cod_pending_91",
        orderId: "#ORD-4091",
        customer: "Ariana Grand",
        date: "Apr 14, 2026, 04:12 PM",
        amount: 1850.00,
        method: "COD",
        status: "pending"
    },
    {
        id: "txn_card_445920192",
        orderId: "#ORD-4089",
        customer: "Elena Gilbert",
        date: "Apr 10, 2026, 11:46 AM",
        amount: 4500.00,
        method: "Card",
        status: "failed"
    },
    {
        id: "txn_upi_ref_112233",
        orderId: "#ORD-4085",
        customer: "Stefan Salvatore",
        date: "Apr 08, 2026, 09:15 AM",
        amount: 2499.00,
        method: "UPI",
        status: "refunded"
    },
    {
        id: "txn_upi_8923749282",
        orderId: "#ORD-4084",
        customer: "John Doe",
        date: "Apr 08, 2026, 08:30 AM",
        amount: 701.00,
        method: "UPI",
        status: "success"
    },
];

// Helper to style status badges
const getStatusBadge = (status: string) => {
    switch (status) {
        case 'success':
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100"><CheckCircle2 size={12} /> Success</span>;
        case 'failed':
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-red-50 text-red-600 border border-red-100"><XCircle size={12} /> Failed</span>;
        case 'refunded':
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-gray-100 text-gray-600 border border-gray-200"><RotateCcw size={12} /> Refunded</span>;
        default: // pending
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100"><Clock size={12} /> Pending</span>;
    }
};

// Helper to get method icon
const getMethodIcon = (method: string) => {
    switch (method) {
        case 'UPI': return <Smartphone size={14} className="text-purple-600" />;
        case 'Card': return <CreditCard size={14} className="text-blue-600" />;
        case 'COD': return <Banknote size={14} className="text-emerald-600" />;
        default: return <CreditCard size={14} className="text-gray-600" />;
    }
};

export default function PaymentsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Payments & Transactions</h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor incoming revenue, cash-on-delivery statuses, and refunds.</p>
                </div>
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all shadow-sm w-fit">
                    <Download size={16} /> Export Ledger
                </button>
            </div>

            {/* Multicolour Quick Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Revenue Card */}
                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Today's Revenue</p>
                        <p className="text-2xl font-bold text-emerald-950">₹8,450.00</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <TrendingUp size={20} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Pending Card */}
                <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Pending Settlement</p>
                        <p className="text-2xl font-bold text-amber-950">₹1,850.00</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                        <Clock size={20} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Refunds Card */}
                <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">Refunds (7 Days)</p>
                        <p className="text-2xl font-bold text-rose-950">₹2,499.00</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                        <RotateCcw size={20} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Success Rate Card */}
                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Success Rate</p>
                        <p className="text-2xl font-bold text-blue-950">94.2%</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <Activity size={20} strokeWidth={2.5} />
                    </div>
                </div>
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
                            placeholder="Search by Txn ID, Order, or Customer..."
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
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Payment Status</h3>
                                    <div className="space-y-2.5">
                                        {['Success', 'Pending', 'Failed', 'Refunded'].map((status) => (
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
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase w-[250px]">Transaction Info</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase w-[200px]">Order & Customer</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Method</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Amount</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Status</th>
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-gray-50/30 transition-colors group">

                                    {/* Transaction Info */}
                                    <td className="py-4 px-6 md:px-8">
                                        <p className="text-sm font-mono font-medium text-gray-900 truncate max-w-[200px]" title={txn.id}>{txn.id}</p>
                                        <p className="text-xs text-gray-500 mt-1">{txn.date}</p>
                                    </td>

                                    {/* Order Info */}
                                    <td className="py-4 px-6">
                                        <Link
                                            href={`/admin/orders/${txn.orderId.replace('#', '')}`}
                                            className="text-sm font-bold text-gray-900 hover:text-[#18582e] transition-colors flex items-center gap-1 w-fit"
                                        >
                                            {txn.orderId} <ExternalLink size={12} className="text-gray-400" />
                                        </Link>
                                        <p className="text-xs text-gray-500 mt-1 truncate">{txn.customer}</p>
                                    </td>

                                    {/* Payment Method */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100 w-fit">
                                            {getMethodIcon(txn.method)}
                                            <span className="text-xs font-medium text-gray-700">{txn.method}</span>
                                        </div>
                                    </td>

                                    {/* Amount */}
                                    <td className="py-4 px-6">
                                        <p className={`text-sm font-semibold ${txn.status === 'refunded' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                            ₹{txn.amount.toFixed(2)}
                                        </p>
                                    </td>

                                    {/* Status Badge */}
                                    <td className="py-4 px-6">
                                        {getStatusBadge(txn.status)}
                                    </td>

                                    {/* Actions */}
                                    <td className="py-4 px-6 md:px-8 text-right">
                                        <div className="flex items-center justify-end gap-1.5 hidden sm:flex">
                                            {txn.status === 'success' && (
                                                <button className="p-2 text-gray-400 hover:text-[#18582e] hover:bg-[#18582e]/10 rounded-lg transition-colors" title="Download Receipt">
                                                    <ReceiptText size={16} strokeWidth={1.5} />
                                                </button>
                                            )}
                                            {txn.status === 'pending' && txn.method === 'COD' && (
                                                <button className="px-3 py-1.5 text-xs font-medium text-[#18582e] border border-[#18582e] hover:bg-[#18582e] hover:text-white rounded-lg transition-colors">
                                                    Mark Paid
                                                </button>
                                            )}
                                            {txn.status === 'failed' && (
                                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="View Error Details">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            )}
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
                    <span className="text-gray-500 font-medium text-xs">Showing 1 to 5 of 842 transactions</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-500 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-900 font-medium hover:bg-gray-50 transition-colors">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
}