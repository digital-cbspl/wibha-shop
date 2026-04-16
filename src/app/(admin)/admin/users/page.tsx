"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Filter,
    MoreHorizontal,
    ChevronDown,
    Download,
    UserPlus,
    Shield,
    User,
    CheckCircle2,
    XCircle,
    Ban,
    Edit,
    ExternalLink,
    Users,
    TrendingUp,
    UserCheck,
    AlertTriangle,
    Crown // Added Crown icon for Prime members
} from "lucide-react";

// Mock data based on your users/customers table (Now with isPrime status)
const usersList = [
    {
        id: "USR-001",
        name: "Bishnu Prasad Dash",
        email: "abhi@gmail.com",
        phone: "+91 9876543210",
        role: "admin",
        status: "active",
        isPrime: true,
        orders: 12,
        spent: "₹45,200",
        joined: "Jan 10, 2026"
    },
    {
        id: "USR-084",
        name: "Ariana Grand",
        email: "ariana@example.com",
        phone: "+91 8877665544",
        role: "customer",
        status: "active",
        isPrime: true,
        orders: 4,
        spent: "₹12,450",
        joined: "Mar 15, 2026"
    },
    {
        id: "USR-102",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+91 9988776655",
        role: "customer",
        status: "inactive",
        isPrime: false,
        orders: 0,
        spent: "₹0",
        joined: "Apr 02, 2026"
    },
    {
        id: "USR-145",
        name: "Elena Gilbert",
        email: "elena@example.com",
        phone: "+91 7766554433",
        role: "customer",
        status: "banned",
        isPrime: false,
        orders: 2,
        spent: "₹4,200",
        joined: "Apr 10, 2026"
    },
    {
        id: "USR-156",
        name: "Stefan Salvatore",
        email: "stefan@example.com",
        phone: "+91 6655443322",
        role: "customer",
        status: "active",
        isPrime: false,
        orders: 1,
        spent: "₹2,499",
        joined: "Apr 14, 2026"
    },
];

// Helper to style status badges
const getStatusBadge = (status: string) => {
    switch (status) {
        case 'active':
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100"><CheckCircle2 size={12} /> Active</span>;
        case 'banned':
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-red-50 text-red-600 border border-red-100"><Ban size={12} /> Banned</span>;
        default: // inactive
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider bg-gray-100 text-gray-600 border border-gray-200"><XCircle size={12} /> Inactive</span>;
    }
};

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Users & Customers</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage customer accounts, view purchase history, and control admin access.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all shadow-sm">
                        <Download size={16} /> Export
                    </button>
                    {/* <Link
                        href="/admin/users/new"
                        className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                        <UserPlus size={16} /> Add User
                    </Link> */}
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Total Users</p>
                        <p className="text-2xl font-bold text-blue-950">1,248</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <Users size={20} strokeWidth={2.5} />
                    </div>
                </div>

                <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Prime Members</p>
                        <p className="text-2xl font-bold text-amber-950">342</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                        <Crown size={20} strokeWidth={2.5} />
                    </div>
                </div>

                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Active This Month</p>
                        <p className="text-2xl font-bold text-emerald-950">856</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <UserCheck size={20} strokeWidth={2.5} />
                    </div>
                </div>

                <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">Banned Accounts</p>
                        <p className="text-2xl font-bold text-rose-950">12</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                        <AlertTriangle size={20} strokeWidth={2.5} />
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
                            placeholder="Search by name, email, or phone..."
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

                                {/* Membership Filter */}
                                <div className="mb-5">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Membership</h3>
                                    <div className="space-y-2.5">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex items-center gap-1.5"><Crown size={14} className="text-amber-500" /> Prime Members</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex items-center gap-1.5"><User size={14} className="text-gray-400" /> Regular Users</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Role Filter */}
                                <div className="mb-5">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Role</h3>
                                    <div className="space-y-2.5">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Admin</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Customer</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Status Filter */}
                                <div className="mb-6">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Status</h3>
                                    <div className="space-y-2.5">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Active</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Banned</span>
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
                    <table className="w-full text-left border-collapse min-w-[950px]">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase w-[350px]">User Details</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Role</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Orders & Spent</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Joined</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Status</th>
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {usersList.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/30 transition-colors group">

                                    {/* User Info */}
                                    <td className="py-4 px-6 md:px-8">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm shrink-0 border
                                                ${user.role === 'admin' ? 'bg-[#18582e]/10 text-[#18582e] border-[#18582e]/20' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#18582e] transition-colors">{user.name}</p>
                                                    {user.isPrime && (
                                                        <span className="flex items-center gap-1 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest shadow-sm">
                                                            <Crown size={10} className="fill-amber-400 text-amber-500" /> Prime
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                                                <p className="text-[11px] text-gray-400 mt-0.5">{user.phone}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Role */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-1.5">
                                            {user.role === 'admin' ? (
                                                <Shield size={14} className="text-[#18582e]" />
                                            ) : (
                                                <User size={14} className="text-gray-400" />
                                            )}
                                            <span className={`text-xs font-bold uppercase tracking-wider ${user.role === 'admin' ? 'text-[#18582e]' : 'text-gray-600'}`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Orders & Spent */}
                                    <td className="py-4 px-6">
                                        <p className="text-sm font-semibold text-gray-900">{user.spent}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{user.orders} orders</p>
                                    </td>

                                    {/* Joined Date */}
                                    <td className="py-4 px-6">
                                        <p className="text-sm text-gray-600">{user.joined}</p>
                                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">ID: {user.id}</p>
                                    </td>

                                    {/* Status Badge */}
                                    <td className="py-4 px-6">
                                        {getStatusBadge(user.status)}
                                    </td>

                                    {/* Actions */}
                                    <td className="py-4 px-6 md:px-8 text-right">
                                        <div className="flex items-center justify-end gap-1.5 hidden sm:flex">
                                            <Link
                                                href={`/admin/users/${user.id}`}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-block"
                                                title="View Profile & Orders"
                                            >
                                                <ExternalLink size={16} strokeWidth={1.5} />
                                            </Link>
                                            <button className="p-2 text-gray-400 hover:text-[#18582e] hover:bg-[#18582e]/10 rounded-lg transition-colors" title="Edit User">
                                                <Edit size={16} strokeWidth={1.5} />
                                            </button>

                                            {/* Ban/Unban toggle logic based on current status */}
                                            {user.status === 'banned' ? (
                                                <button className="p-2 text-red-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Unban User">
                                                    <CheckCircle2 size={16} strokeWidth={1.5} />
                                                </button>
                                            ) : (
                                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Ban User">
                                                    <Ban size={16} strokeWidth={1.5} />
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
                    <span className="text-gray-500 font-medium text-xs">Showing 1 to 5 of 1,248 users</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-500 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-900 font-medium hover:bg-gray-50 transition-colors">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
}