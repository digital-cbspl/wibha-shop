"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    ChevronLeft, 
    Printer, 
    CheckCircle2, 
    Truck, 
    CreditCard, 
    User, 
    MapPin, 
    Package,
    RotateCcw,
    Eye
} from "lucide-react";

// Import your local images (Adjust the path if your folder structure differs)
import { img1, img3 } from "../../../../../assets/image/image"; 

// Mock Data based on your db_wibha_shop.sql schema
const mockOrder = {
    id: "#ORD-4092",
    date: "Apr 15, 2026 at 10:24 AM",
    status: "processing", // pending, confirmed, processing, shipped, delivered, partially_returned, returned, cancelled
    payment: {
        method: "UPI",
        status: "success",
        transactionId: "pay_xyz123456",
        amount: 3200.00
    },
    customer: {
        name: "Bishnu Prasad Dash",
        email: "abhi@gmail.com",
        phone: "+91 9876543210",
        ordersCount: 4
    },
    shipping: {
        name: "Bishnu Prasad Dash",
        addressLine1: "123 Artisan Valley, Plot 45",
        city: "Bhubaneswar",
        state: "Odisha",
        postalCode: "751001",
        country: "India"
    },
    items: [
        { 
            id: 1, 
            name: "Handwoven Ikat Saree", 
            type: "Sarees", 
            price: 2499.00, 
            qty: 1, 
            status: "ordered", // ordered, shipped, delivered, returned
            image: img1.src 
        },
        { 
            id: 2, 
            name: "Linen Kurta Set", 
            type: "Kurta Set", 
            price: 701.00, 
            qty: 1, 
            status: "returned", 
            image: img3.src 
        }
    ],
    summary: {
        subtotal: 3200.00,
        shipping: 0.00,
        tax: 160.00,
        total: 3360.00
    }
};

export default function OrderDetailsPage() {
    // State to simulate changing overall order status
    const [orderStatus, setOrderStatus] = useState(mockOrder.status);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/orders" 
                        className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Order {mockOrder.id}</h1>
                            <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase">
                                {mockOrder.date}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all shadow-sm">
                        <Printer size={16} /> Print Invoice
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: Main Order Details */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Order Status Management */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="font-serif text-lg font-medium text-[#1a1a1a]">Fulfillment Status</h2>
                            <p className="text-sm text-gray-500 mt-1">Update the main status of this order.</p>
                        </div>
                        <select 
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                            className="px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 cursor-pointer min-w-[200px]"
                        >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="partially_returned">Partially Returned</option>
                            <option value="returned">Fully Returned</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Order Items Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 overflow-hidden">
                        <div className="p-6 md:p-8 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="font-serif text-xl font-medium text-[#1a1a1a] flex items-center gap-2">
                                <Package size={20} className="text-[#18582e]" /> Order Items
                            </h2>
                            <span className="text-sm font-medium text-gray-500">{mockOrder.items.length} items</span>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Product</th>
                                        <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-center">Qty</th>
                                        <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-right">Price</th>
                                        <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-right">Item Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {mockOrder.items.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                                            <td className="py-4 px-6 md:px-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                                        <p className="text-xs text-gray-500 mt-0.5">{item.type}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-center text-sm font-medium text-gray-700">
                                                x{item.qty}
                                            </td>
                                            <td className="py-4 px-6 text-right text-sm font-medium text-gray-900">
                                                ₹{item.price.toFixed(2)}
                                            </td>
                                            <td className="py-4 px-6 md:px-8 text-right">
                                                {/* Item Level Status Dropdown */}
                                                <select 
                                                    defaultValue={item.status}
                                                    className={`px-3 py-1.5 rounded-lg border outline-none transition-all text-xs font-bold uppercase tracking-wider cursor-pointer
                                                        ${item.status === 'returned' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-white'}
                                                    `}
                                                >
                                                    <option value="ordered">Ordered</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="returned">Returned</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Order Summary / Totals */}
                        <div className="p-6 md:p-8 bg-gray-50/50 border-t border-gray-100 flex justify-end">
                            <div className="w-full sm:w-1/2 lg:w-1/3 space-y-3">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">₹{mockOrder.summary.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium text-gray-900">{mockOrder.summary.shipping === 0 ? 'Free' : `₹${mockOrder.summary.shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Tax (5%)</span>
                                    <span className="font-medium text-gray-900">₹{mockOrder.summary.tax.toFixed(2)}</span>
                                </div>
                                <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between items-center">
                                    <span className="font-medium text-gray-900">Total</span>
                                    <span className="font-serif text-2xl font-bold text-[#1a1a1a]">₹{mockOrder.summary.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Customer, Shipping & Payment */}
                <div className="space-y-6">
                    
                    {/* Customer Info */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-lg font-medium text-[#1a1a1a] mb-5 flex items-center gap-2">
                            <User size={18} className="text-[#18582e]" /> Customer
                        </h2>
                        <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-900">{mockOrder.customer.name}</p>
                            <p className="text-sm text-gray-600 hover:text-[#18582e] transition-colors"><a href={`mailto:${mockOrder.customer.email}`}>{mockOrder.customer.email}</a></p>
                            <p className="text-sm text-gray-600">{mockOrder.customer.phone}</p>
                            
                            <div className="pt-3 mt-3 border-t border-gray-50">
                                <Link 
                                    href="/admin/orders" 
                                    className="flex items-center gap-1.5 text-sm text-[#18582e] font-medium hover:underline"
                                >
                                    <Eye size={14} /> View {mockOrder.customer.ordersCount} previous orders
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-lg font-medium text-[#1a1a1a] mb-5 flex items-center gap-2">
                            <MapPin size={18} className="text-[#18582e]" /> Shipping Address
                        </h2>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900 mb-2">{mockOrder.shipping.name}</p>
                            <p className="text-sm text-gray-600">{mockOrder.shipping.addressLine1}</p>
                            <p className="text-sm text-gray-600">{mockOrder.shipping.city}, {mockOrder.shipping.state} {mockOrder.shipping.postalCode}</p>
                            <p className="text-sm text-gray-600">{mockOrder.shipping.country}</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-lg font-medium text-[#1a1a1a] mb-5 flex items-center gap-2">
                            <CreditCard size={18} className="text-[#18582e]" /> Payment
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Method</span>
                                <span className="text-sm font-medium text-gray-900 bg-gray-50 px-2 py-1 rounded">{mockOrder.payment.method}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Status</span>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest
                                    ${mockOrder.payment.status === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                    {mockOrder.payment.status}
                                </span>
                            </div>
                            {mockOrder.payment.transactionId && (
                                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                    <span className="text-xs text-gray-500">Txn ID:</span>
                                    <span className="text-xs font-mono text-gray-900">{mockOrder.payment.transactionId}</span>
                                </div>
                            )}

                            {/* Action if Payment is COD or Pending */}
                            {mockOrder.payment.status !== 'success' && (
                                <button className="w-full mt-2 py-2.5 border-2 border-[#18582e] text-[#18582e] hover:bg-[#18582e] hover:text-white rounded-xl text-sm font-semibold transition-colors">
                                    Mark as Paid
                                </button>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}