"use client";

import { 
    TrendingUp, 
    TrendingDown, 
    Users, 
    CreditCard, 
    Package, 
    ArrowUpRight, 
    MoreHorizontal 
} from "lucide-react";
import Image from "next/image";

// --- Mock Data ---
const kpis = [
    { 
        title: "Total Revenue", 
        value: "₹24,500.00", 
        trend: "+12.5%", 
        isUp: true, 
        icon: CreditCard,
        cardBg: "bg-emerald-50/50 hover:bg-emerald-50",
        borderColor: "border-emerald-100",
        iconBg: "bg-emerald-100 text-emerald-600"
    },
    { 
        title: "Total Orders", 
        value: "156", 
        trend: "+8.2%", 
        isUp: true, 
        icon: Package,
        cardBg: "bg-blue-50/50 hover:bg-blue-50",
        borderColor: "border-blue-100",
        iconBg: "bg-blue-100 text-blue-600"
    },
    { 
        title: "Active Customers", 
        value: "1,204", 
        trend: "-2.4%", 
        isUp: false, 
        icon: Users,
        cardBg: "bg-purple-50/50 hover:bg-purple-50",
        borderColor: "border-purple-100",
        iconBg: "bg-purple-100 text-purple-600"
    },
    { 
        title: "Avg. Order Value", 
        value: "₹1,570.50", 
        trend: "+5.1%", 
        isUp: true, 
        icon: TrendingUp,
        cardBg: "bg-amber-50/50 hover:bg-amber-50",
        borderColor: "border-amber-100",
        iconBg: "bg-amber-100 text-amber-600"
    },
];

const topProducts = [
    { id: 1, name: "Pottery Decorative Plate", sales: 45, revenue: "₹1,350.00" },
    { id: 2, name: "Yellow Ornate Jar", sales: 38, revenue: "₹3,002.00" },
    { id: 3, name: "Lilac Muse Dust Painting", sales: 24, revenue: "₹1,680.00" },
];

const recentOrders = [
    { id: "#ORD-092", customer: "Elena Gilbert", date: "Today, 10:24 AM", total: "₹1,250.00", status: "Processing" },
    { id: "#ORD-091", customer: "Stefan Salvatore", date: "Today, 09:12 AM", total: "₹3,400.00", status: "Shipped" },
    { id: "#ORD-090", customer: "Damon Salvatore", date: "Yesterday", total: "₹850.00", status: "Delivered" },
    { id: "#ORD-089", customer: "Bonnie Bennett", date: "Yesterday", total: "₹4,200.00", status: "Delivered" },
];

// Mock data for the bar chart
const chartData = [
    { day: "Mon", value: 40, label: "₹4.0k" },
    { day: "Tue", value: 65, label: "₹6.5k" },
    { day: "Wed", value: 45, label: "₹4.5k" },
    { day: "Thu", value: 80, label: "₹8.0k" },
    { day: "Fri", value: 55, label: "₹5.5k" },
    { day: "Sat", value: 95, label: "₹9.5k" },
    { day: "Sun", value: 75, label: "₹7.5k" }
]; 

export default function AdminDashboard() {
    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            
            {/* Page Header */}
            <div>
                <h1 className="font-serif text-3xl font-medium text-[#1a1a1a]">Overview</h1>
                <p className="text-gray-500 mt-1">Here is what's happening with your store today.</p>
            </div>

            {/* COMPACT KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {kpis.map((kpi, idx) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={idx} className={`${kpi.cardBg} ${kpi.borderColor} p-4 md:p-5 rounded-2xl border transition-all duration-300 shadow-sm shadow-gray-200/20`}>
                            <div className="flex justify-between items-start mb-3">
                                {/* Slightly smaller icon container */}
                                <div className={`p-2.5 rounded-xl ${kpi.iconBg}`}>
                                    <Icon size={18} strokeWidth={2} />
                                </div>
                                {/* Smaller trend badge */}
                                <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md ${kpi.isUp ? 'text-[#18582e] bg-[#18582e]/10' : 'text-red-600 bg-red-50'}`}>
                                    {kpi.isUp ? <TrendingUp size={12} strokeWidth={3} /> : <TrendingDown size={12} strokeWidth={3} />}
                                    {kpi.trend}
                                </span>
                            </div>
                            {/* Smaller title and value fonts */}
                            <h3 className="text-gray-500 text-xs font-medium mb-1">{kpi.title}</h3>
                            <p className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{kpi.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Middle Section: Chart & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Enhanced Revenue Chart */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 lg:col-span-2 flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="font-serif text-xl font-medium text-[#1a1a1a]">Revenue Overview</h2>
                            <p className="text-sm text-gray-500 mt-1">Comparing sales from the last 7 days</p>
                        </div>
                        <button className="text-sm font-medium text-gray-500 hover:text-[#18582e] flex items-center gap-1 transition-colors">
                            View Report <ArrowUpRight size={16} />
                        </button>
                    </div>
                    
                    {/* CSS Bar Chart with Gridlines & Tooltips */}
                    <div className="relative flex-1 flex items-end h-[240px] mt-4 pl-8">
                        
                        {/* Y-Axis Labels & Horizontal Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 text-[10px] font-bold text-gray-300">
                            <div className="w-full flex items-center justify-between border-t border-dashed border-gray-100">
                                <span className="absolute -left-2 -translate-x-full">10k</span>
                            </div>
                            <div className="w-full flex items-center justify-between border-t border-dashed border-gray-100">
                                <span className="absolute -left-2 -translate-x-full">7.5k</span>
                            </div>
                            <div className="w-full flex items-center justify-between border-t border-dashed border-gray-100">
                                <span className="absolute -left-2 -translate-x-full">5k</span>
                            </div>
                            <div className="w-full flex items-center justify-between border-t border-dashed border-gray-100">
                                <span className="absolute -left-2 -translate-x-full">2.5k</span>
                            </div>
                            <div className="w-full flex items-center justify-between border-t border-solid border-gray-200">
                                <span className="absolute -left-2 -translate-x-full">0</span>
                            </div>
                        </div>

                        {/* Chart Bars */}
                        <div className="relative w-full h-full flex justify-between items-end pb-8 z-10 px-2 md:px-6 gap-2">
                            {chartData.map((data, idx) => (
                                <div key={idx} className="w-full flex flex-col items-center h-full justify-end group relative cursor-pointer">
                                    
                                    {/* Hover Tooltip */}
                                    <div className="absolute -top-10 bg-gray-900 text-white text-xs font-bold py-1 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                        {data.label}
                                        {/* Little triangle arrow for tooltip */}
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-gray-900"></div>
                                    </div>

                                    {/* The Bar */}
                                    <div 
                                        className="w-full max-w-[40px] bg-[#18582e] rounded-t-lg transition-all duration-700 ease-out group-hover:bg-[#18582e]/80" 
                                        style={{ height: `${data.value}%` }}
                                    ></div>
                                    
                                    {/* X-Axis Label */}
                                    <span className="absolute -bottom-6 text-xs font-bold text-gray-400 uppercase tracking-wider">{data.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a]">Top Products</h2>
                        <button className="p-1 text-gray-400 hover:text-gray-900 transition-colors rounded-lg">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                    
                    <div className="space-y-6">
                        {topProducts.map((product, idx) => (
                            <div key={product.id} className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center font-bold text-gray-400 text-xs border border-gray-100">
                                        #{idx + 1}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 group-hover:text-[#18582e] transition-colors line-clamp-1">{product.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{product.sales} sales</p>
                                    </div>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">{product.revenue}</span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-8 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        View All Products
                    </button>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="font-serif text-xl font-medium text-[#1a1a1a]">Recent Orders</h2>
                    <button className="text-sm font-medium text-gray-500 hover:text-[#18582e] flex items-center gap-1 transition-colors">
                        View All <ArrowUpRight size={16} />
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="py-4 px-6 md:px-8 text-xs font-bold tracking-widest text-gray-400 uppercase">Order ID</th>
                                <th className="py-4 px-6 md:px-8 text-xs font-bold tracking-widest text-gray-400 uppercase">Customer</th>
                                <th className="py-4 px-6 md:px-8 text-xs font-bold tracking-widest text-gray-400 uppercase">Date</th>
                                <th className="py-4 px-6 md:px-8 text-xs font-bold tracking-widest text-gray-400 uppercase text-right">Total</th>
                                <th className="py-4 px-6 md:px-8 text-xs font-bold tracking-widest text-gray-400 uppercase text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                                    <td className="py-4 px-6 md:px-8 text-sm font-medium text-gray-900">{order.id}</td>
                                    <td className="py-4 px-6 md:px-8 text-sm text-gray-600">{order.customer}</td>
                                    <td className="py-4 px-6 md:px-8 text-sm text-gray-500">{order.date}</td>
                                    <td className="py-4 px-6 md:px-8 text-sm font-semibold text-gray-900 text-right">{order.total}</td>
                                    <td className="py-4 px-6 md:px-8 text-right">
                                        <span className={`inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wider
                                            ${order.status === 'Delivered' ? 'bg-[#18582e]/10 text-[#18582e]' : 
                                              order.status === 'Processing' ? 'bg-amber-50 text-amber-600' : 
                                              'bg-blue-50 text-blue-600'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}