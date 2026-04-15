"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, Truck, CheckCircle2, Box, ChevronRight, HelpCircle, ArrowRight, Star } from "lucide-react";
import { img1, img2, img6 } from "../../assets/image/image";

// Product-wise Mock Orders
const mockOrderItems = [
  {
    orderId: "WB-092831",
    id: 1, 
    name: "Pottery Decorative Plate - Indigo Florals", 
    price: "₹30.00", 
    quantity: 1, 
    image: img1.src,
    date: "12 Apr, 2026",
    status: "in-transit",
    statusText: "Shipping Soon",
    estimatedDelivery: "15 Apr, 2026"
  },
  {
    orderId: "WB-092831",
    id: 2, 
    name: "Pottery Jar with Lids - Yellow Ornate", 
    price: "₹158.00", 
    quantity: 2, 
    image: img2.src,
    date: "12 Apr, 2026",
    status: "processing",
    statusText: "Processing Order",
    estimatedDelivery: "16 Apr, 2026"
  },
  {
    orderId: "WB-088122",
    id: 3, 
    name: "Dust Painting - Lilac Muse", 
    price: "₹70.00", 
    quantity: 1, 
    image: img6.src,
    date: "28 Mar, 2026",
    status: "delivered",
    statusText: "Delivered",
    deliveredOn: "02 Apr, 2026"
  }
];

export default function OrdersPage() {
    return (
        <div className="bg-[#f6f8f7] min-h-[calc(100vh-80px)] font-sans pb-16">
            
            {/* Breadcrumbs */}
            <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-4">
                <div className="flex items-center text-xs text-gray-500 font-medium tracking-wide">
                    <Link href="/" className="hover:text-[#18582e] transition-colors">Home</Link>
                    <ChevronRight size={14} className="mx-1" />
                    <span className="text-gray-900">My Orders</span>
                </div>
            </div>

            <main className="max-w-[1000px] mx-auto px-4 sm:px-6">
                
                {/* Header */}
                <div className="mb-6 border-b border-gray-200 pb-5 flex items-end justify-between">
                   <div>
                       <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-wide uppercase">My Orders</h1>
                       <p className="text-xs sm:text-sm text-gray-500 mt-1.5">View and track your recent Wibha purchases</p>
                   </div>
                   <button className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-[#18582e] bg-[#18582e]/5 px-3 py-1.5 rounded-lg border border-[#18582e]/20 hover:bg-[#18582e]/10 transition-colors">
                      <HelpCircle size={14} /> Need Help?
                   </button>
                </div>

                {/* Filters / Search Stub */}
                <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 custom-scroll">
                        <button className="px-4 py-1.5 rounded-full bg-[#18582e] text-white text-xs sm:text-sm font-bold tracking-wide transition-colors whitespace-nowrap">All Orders</button>
                        <button className="px-4 py-1.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 text-xs sm:text-sm font-bold tracking-wide transition-colors whitespace-nowrap">Not Yet Shipped</button>
                        <button className="px-4 py-1.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 text-xs sm:text-sm font-bold tracking-wide transition-colors whitespace-nowrap">Cancelled</button>
                    </div>
                </div>

                {/* Product-Wise List */}
                <div className="space-y-4">
                    {mockOrderItems.map((item) => (
                       <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                           <div className="flex flex-col md:flex-row p-5 gap-5 sm:gap-6">
                              
                              {/* Product Info */}
                              <div className="flex gap-4 flex-1 cursor-pointer group">
                                 <div className="relative w-20 h-24 sm:w-24 sm:h-32 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                                     <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                 </div>
                                 <div className="flex flex-col flex-1 py-0.5">
                                     <h4 className="text-[14px] sm:text-[15px] font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#18582e] transition-colors pr-2">{item.name}</h4>
                                     <p className="text-[11px] sm:text-xs text-gray-500 mt-1.5">Qty: <span className="font-semibold text-gray-700">{item.quantity}</span></p>
                                     <div className="font-serif font-bold text-[#18582e] text-base sm:text-lg mt-1.5">
                                         {item.price}
                                     </div>
                                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-auto pt-3">Order # {item.orderId} • {item.date}</p>
                                 </div>
                              </div>

                              {/* Status & Actions */}
                              <div className="w-full md:w-[320px] lg:w-[380px] flex flex-col justify-between shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-5 md:pt-0 md:pl-5 lg:pl-6">
                                  
                                  <div className="mb-4">
                                     <h3 className={`text-[14px] sm:text-[15px] font-bold flex items-center gap-1.5 mb-1 ${item.status === 'delivered' ? 'text-green-700' : item.status === 'in-transit' ? 'text-[#b39024]' : 'text-gray-800'}`}>
                                        {item.status === 'delivered' ? <CheckCircle2 size={16} /> : item.status === 'in-transit' ? <Truck size={16} /> : <Package size={16} />}
                                        {item.statusText}
                                     </h3>
                                     <p className="text-[11px] sm:text-xs font-medium text-gray-500">
                                        {item.status === 'delivered' ? `Delivered on ${item.deliveredOn}` : `Arriving by ${item.estimatedDelivery}`}
                                     </p>
                                  </div>

                                  <StatusTracker status={item.status} />

                                  <div className="flex gap-2.5 mt-5">
                                     {item.status === "delivered" ? (
                                         <>
                                           <button className="flex-1 text-xs sm:text-sm font-bold bg-[#18582e] text-white border-2 border-[#18582e] py-2 rounded-lg hover:bg-[#113f20] transition-colors">
                                              Buy Again
                                           </button>
                                           <button className="flex-1 text-xs sm:text-sm font-bold bg-white text-[#b39024] border-2 border-[#b39024] py-2 rounded-lg hover:bg-[#b39024]/5 transition-colors flex justify-center items-center gap-1.5">
                                              <Star size={14} fill="#b39024" /> Review
                                           </button>
                                         </>
                                     ) : (
                                         <>
                                           <button className="flex-1 text-xs sm:text-sm font-bold bg-white border-2 border-gray-200 text-gray-700 py-2 rounded-lg hover:border-gray-900 transition-colors">
                                              Cancel
                                           </button>
                                           <button className="flex-1 text-xs sm:text-sm font-bold bg-[#18582e] text-white border-2 border-[#18582e] py-2 rounded-lg hover:bg-[#113f20] transition-colors flex justify-center items-center gap-1.5">
                                              <Truck size={14} /> Track
                                           </button>
                                         </>
                                     )}
                                  </div>
                              </div>

                           </div>
                       </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center pb-10">
                    <button className="flex items-center gap-2 font-bold text-[#18582e] bg-white border-2 border-[#18582e]/20 px-6 py-2.5 rounded-lg shadow-sm hover:border-[#18582e] transition-colors text-sm">
                        Load Older Orders <ArrowRight size={16} />
                    </button>
                </div>

                <style jsx global>{`
                    .custom-scroll::-webkit-scrollbar { height: 4px; }
                    .custom-scroll::-webkit-scrollbar-track { background: transparent; }
                    .custom-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
                `}</style>
            </main>
        </div>
    );
}

// -------------------------------------------------------------
// Helper Component: Individual Status Tracker
// -------------------------------------------------------------
const StatusTracker = ({ status }: { status: string }) => {
    const steps = [
        { key: "placed", label: "Ordered", icon: Box },
        { key: "processing", label: "Packed", icon: Package },
        { key: "in-transit", label: "Shipped", icon: Truck },
        { key: "delivered", label: "Delivered", icon: CheckCircle2 }
    ];

    let currentStepIndex = 0;
    if (status === "processing") currentStepIndex = 1;
    if (status === "in-transit") currentStepIndex = 2;
    if (status === "delivered") currentStepIndex = 3;

    return (
        <div className="flex items-center justify-between relative mt-2">
            {/* Background Line */}
            <div className="absolute left-[12%] right-[12%] top-3.5 -translate-y-1/2 h-[2px] bg-gray-100 rounded-full z-0"></div>
            
            {/* Active Line Fill */}
            <div 
               className="absolute left-[12%] top-3.5 -translate-y-1/2 h-[2px] bg-[#18582e] rounded-full z-0 transition-all duration-1000 ease-out"
               style={{ width: `${(currentStepIndex / 3) * 76}%` }}
            ></div>

            {/* Step Nodes */}
            {steps.map((step, idx) => {
                const isActive = idx <= currentStepIndex;
                const Icon = step.icon;
                
                return (
                   <div key={step.key} className="relative z-10 flex flex-col items-center gap-1.5 w-1/4">
                       <div className={`w-7 h-7 rounded-full flex items-center justify-center border-4 border-white transition-all duration-500 shadow-sm ${isActive ? 'bg-[#18582e] text-white' : 'bg-gray-100 text-gray-400'}`}>
                          <Icon size={12} strokeWidth={isActive ? 2.5 : 2} />
                       </div>
                       <span className={`text-[9px] uppercase tracking-widest font-bold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                          {step.label}
                       </span>
                   </div>
                )
            })}
        </div>
    )
}
