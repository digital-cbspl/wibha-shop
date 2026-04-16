"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    ChevronLeft, 
    Edit, 
    Mail, 
    Phone, 
    CalendarDays, 
    MapPin, 
    Package, 
    ShieldAlert, 
    Ban, 
    CheckCircle2, 
    Crown,
    ShoppingBag,
    TrendingUp,
    Star,
    ExternalLink,
    RefreshCw
} from "lucide-react";

// Mock Data for a specific user based on your database
const mockUser = {
    id: "USR-001",
    name: "Bishnu Prasad Dash",
    email: "abhi@gmail.com",
    phone: "+91 9876543210",
    role: "customer", // or 'admin'
    status: "active", // active, inactive, banned
    isPrime: true,
    joinedDate: "Jan 10, 2026",
    lastLogin: "Apr 15, 2026, 09:30 AM",
    stats: {
        totalOrders: 12,
        lifetimeValue: 45200.00,
        averageOrderValue: 3766.66,
        rewardPoints: 1250
    },
    addresses: [
        {
            id: 1,
            label: "Home",
            isDefault: true,
            line1: "123 Artisan Valley, Plot 45",
            city: "Bhubaneswar",
            state: "Odisha",
            pin: "751001"
        }
    ],
    recentOrders: [
        { id: "#ORD-4092", date: "Apr 15, 2026", items: 2, total: 3200.00, status: "processing" },
        { id: "#ORD-3945", date: "Mar 22, 2026", items: 1, total: 2499.00, status: "delivered" },
        { id: "#ORD-3810", date: "Feb 10, 2026", items: 3, total: 8500.00, status: "delivered" },
        { id: "#ORD-3701", date: "Jan 15, 2026", items: 1, total: 1200.00, status: "returned" },
    ]
};

// Helper for Order Status badges
const getOrderStatusBadge = (status: string) => {
    switch(status) {
        case 'delivered': return <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-emerald-100">Delivered</span>;
        case 'processing': return <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-100">Processing</span>;
        case 'returned': return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-gray-200">Returned</span>;
        default: return <span className="bg-amber-50 text-amber-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-amber-100">{status}</span>;
    }
};

export default function UserDetailsPage() {
    const [userStatus, setUserStatus] = useState(mockUser.status);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/users" 
                        className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Customer Profile</h1>
                            {userStatus === 'active' && <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase border border-emerald-100 flex items-center gap-1"><CheckCircle2 size={12}/> Active</span>}
                            {userStatus === 'banned' && <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase border border-red-100 flex items-center gap-1"><Ban size={12}/> Banned</span>}
                        </div>
                    </div>
                </div>
                
                {/* <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all shadow-sm">
                        <Edit size={16} /> Edit Profile
                    </button>
                </div> */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: Stats & Orders */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Multicolour Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Lifetime Value</p>
                                <p className="text-2xl font-bold text-blue-950">₹{mockUser.stats.lifetimeValue.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                <TrendingUp size={20} strokeWidth={2.5} />
                            </div>
                        </div>

                        <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Total Orders</p>
                                <p className="text-2xl font-bold text-emerald-950">{mockUser.stats.totalOrders}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                <ShoppingBag size={20} strokeWidth={2.5} />
                            </div>
                        </div>

                        <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">Avg. Order Value</p>
                                <p className="text-2xl font-bold text-purple-950">₹{mockUser.stats.averageOrderValue.toFixed(2)}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                                <Package size={20} strokeWidth={2.5} />
                            </div>
                        </div>

                        <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Reward Points</p>
                                <p className="text-2xl font-bold text-amber-950">{mockUser.stats.rewardPoints}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                                <Star size={20} strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>

                    {/* Order History Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 overflow-hidden">
                        <div className="p-6 md:p-8 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="font-serif text-xl font-medium text-[#1a1a1a] flex items-center gap-2">
                                <Package size={20} className="text-[#18582e]" /> Order History
                            </h2>
                            <Link href={`/admin/orders?user=${mockUser.id}`} className="text-sm font-medium text-[#18582e] hover:underline">
                                View All
                            </Link>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[500px]">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Order ID & Date</th>
                                        <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-center">Items</th>
                                        <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-right">Total</th>
                                        <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {mockUser.recentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50/30 transition-colors">
                                            <td className="py-4 px-6 md:px-8">
                                                <Link 
                                                    href={`/admin/orders/${order.id.replace('#', '')}`}
                                                    className="text-sm font-bold text-gray-900 hover:text-[#18582e] transition-colors flex items-center gap-1.5 w-fit"
                                                >
                                                    {order.id} <ExternalLink size={12} className="text-gray-400" />
                                                </Link>
                                                <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                                            </td>
                                            <td className="py-4 px-6 text-center text-sm font-medium text-gray-700">
                                                {order.items}
                                            </td>
                                            <td className="py-4 px-6 text-right text-sm font-medium text-gray-900">
                                                ₹{order.total.toFixed(2)}
                                            </td>
                                            <td className="py-4 px-6 md:px-8 text-right">
                                                {getOrderStatusBadge(order.status)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Profile, Contacts, Actions */}
                <div className="space-y-6">
                    
                    {/* Identity Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 text-center">
                        <div className="relative inline-block mb-4">
                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center font-serif font-bold text-3xl text-gray-700 mx-auto border-4 border-white shadow-sm">
                                {mockUser.name.charAt(0)}
                            </div>
                            {mockUser.isPrime && (
                                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-amber-300 to-amber-500 p-1.5 rounded-full border-2 border-white shadow-sm" title="Prime Member">
                                    <Crown size={16} className="text-white fill-white" />
                                </div>
                            )}
                        </div>
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a]">{mockUser.name}</h2>
                        <p className="text-sm font-mono text-gray-400 mt-1">{mockUser.id}</p>
                        
                        <div className="mt-6 space-y-4 text-left">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail size={16} className="text-gray-400 shrink-0" />
                                <a href={`mailto:${mockUser.email}`} className="text-gray-700 hover:text-[#18582e] font-medium transition-colors truncate">{mockUser.email}</a>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone size={16} className="text-gray-400 shrink-0" />
                                <span className="text-gray-700 font-medium">{mockUser.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <CalendarDays size={16} className="text-gray-400 shrink-0" />
                                <span className="text-gray-600">Joined {mockUser.joinedDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Saved Addresses */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6">
                        <h2 className="font-serif text-lg font-medium text-[#1a1a1a] mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-[#18582e]" /> Saved Addresses
                        </h2>
                        {mockUser.addresses.map((address) => (
                            <div key={address.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-900">{address.label}</span>
                                    {address.isDefault && <span className="bg-[#18582e]/10 text-[#18582e] px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">Default</span>}
                                </div>
                                <p className="text-sm text-gray-600">{address.line1}</p>
                                <p className="text-sm text-gray-600">{address.city}, {address.state} {address.pin}</p>
                            </div>
                        ))}
                    </div>

                    {/* Danger Zone / Security */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6">
                        <h2 className="font-serif text-lg font-medium text-red-600 mb-4 flex items-center gap-2">
                            <ShieldAlert size={18} /> Account Security
                        </h2>
                        
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-semibold transition-colors">
                                <RefreshCw size={16} /> Send Password Reset
                            </button>

                            {userStatus === 'active' ? (
                                <button 
                                    onClick={() => setUserStatus('banned')}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl text-sm font-semibold transition-colors"
                                >
                                    <Ban size={16} /> Ban Customer
                                </button>
                            ) : (
                                <button 
                                    onClick={() => setUserStatus('active')}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                                >
                                    <CheckCircle2 size={16} /> Restore Access
                                </button>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}