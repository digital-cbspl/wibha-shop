"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    Plus, 
    Edit, 
    Trash2, 
    LayoutTemplate,
    GripVertical,
    Link as LinkIcon,
    ChevronDown,
    MonitorPlay,
    PanelBottom,
    MoveRight
} from "lucide-react";

// Mock data representing your navigation structure
const menuGroups = [
    {
        id: 1,
        name: "Main Navigation",
        location: "Header",
        status: "active",
        items: [
            { id: 101, title: "Home", url: "/", type: "System Page" },
            { 
                id: 102, 
                title: "Sarees", 
                url: "/category/sarees", 
                type: "Category", 
                subItems: [
                    { id: 201, title: "Handwoven Ikat", url: "/varieties/ikat-saree", type: "Variety" },
                    { id: 202, title: "Cotton Sarees", url: "/materials/cotton", type: "Material" },
                    { id: 203, title: "Tusser Silk", url: "/materials/tusser", type: "Material" },
                ]
            },
            { id: 103, title: "Kurta Sets", url: "/category/kurta-sets", type: "Category" },
            { id: 104, title: "Wall Art", url: "/category/wall-art", type: "Category" },
            { id: 105, title: "About WIBHA", url: "/about", type: "Custom Page" }
        ]
    },
    {
        id: 2,
        name: "Footer Quick Links",
        location: "Footer Column 1",
        status: "active",
        items: [
            { id: 301, title: "Shop All", url: "/shop", type: "System Page" },
            { id: 302, title: "Track Order", url: "/track", type: "System Page" },
            { id: 303, title: "FAQs", url: "/faqs", type: "Custom Page" },
            { id: 304, title: "Contact Us", url: "/contact", type: "Custom Page" }
        ]
    },
    {
        id: 3,
        name: "Legal Information",
        location: "Footer Column 2",
        status: "active",
        items: [
            { id: 401, title: "Privacy Policy", url: "/privacy-policy", type: "Custom Page" },
            { id: 402, title: "Terms of Service", url: "/terms", type: "Custom Page" },
            { id: 403, title: "Refund Policy", url: "/refunds", type: "Custom Page" }
        ]
    }
];

// Helper to style location badges
const getLocationBadge = (location: string) => {
    if (location.includes('Header')) {
        return <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-blue-100"><MonitorPlay size={12} /> {location}</span>;
    }
    return <span className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-purple-100"><PanelBottom size={12} /> {location}</span>;
};

export default function NavigationMenusPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Navigation Menus</h1>
                    <p className="text-sm text-gray-500 mt-1">Design the structure of your storefront's header and footer links.</p>
                </div>
                <Link href="/admin/menus/new" 
                className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit">
                    <Plus size={16} /> Create Menu Group
                </Link>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Content (Menu Lists) */}
                <div className="lg:col-span-2 space-y-8">
                    {menuGroups.map((menu) => (
                        <div key={menu.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 overflow-hidden">
                            
                            {/* Menu Header */}
                            <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h2 className="font-serif text-lg font-medium text-[#1a1a1a]">{menu.name}</h2>
                                        {getLocationBadge(menu.location)}
                                    </div>
                                    <p className="text-xs text-gray-500">{menu.items.length} top-level links</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all shadow-sm">
                                        <Plus size={14} /> Add Link
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-[#18582e] hover:bg-[#18582e]/10 rounded-xl transition-colors border border-transparent hover:border-[#18582e]/20" title="Edit Menu Settings">
                                        <Edit size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Menu Items Builder */}
                            <div className="p-6">
                                <div className="space-y-3">
                                    {menu.items.map((item) => (
                                        <div key={item.id} className="space-y-3">
                                            {/* Parent Item */}
                                            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white hover:border-[#18582e]/30 hover:shadow-sm transition-all group">
                                                <div className="flex items-center gap-3">
                                                    <div className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing">
                                                        <GripVertical size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{item.title}</p>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <LinkIcon size={10} className="text-gray-400" />
                                                            <span className="text-[11px] text-gray-500 font-mono">{item.url}</span>
                                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded ml-2">{item.type}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1.5 text-gray-400 hover:text-[#18582e] hover:bg-[#18582e]/10 rounded-lg transition-colors" title="Edit">
                                                        <Edit size={14} />
                                                    </button>
                                                    <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Sub Items (If any) */}
                                            {item.subItems && (
                                                <div className="pl-8 space-y-3 relative before:absolute before:left-4 before:top-0 before:bottom-4 before:w-px before:bg-gray-200">
                                                    {item.subItems.map((subItem) => (
                                                        <div key={subItem.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50 hover:border-[#18582e]/20 hover:bg-white transition-all group relative">
                                                            {/* Connector Line */}
                                                            <div className="absolute -left-4 top-1/2 w-4 h-px bg-gray-200"></div>
                                                            
                                                            <div className="flex items-center gap-3">
                                                                <div className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing">
                                                                    <GripVertical size={16} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-800">{subItem.title}</p>
                                                                    <div className="flex items-center gap-2 mt-0.5">
                                                                        <span className="text-[10px] text-gray-400 font-mono">{subItem.url}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button className="p-1.5 text-gray-400 hover:text-[#18582e] hover:bg-[#18582e]/10 rounded-lg transition-colors" title="Edit">
                                                                    <Edit size={14} />
                                                                </button>
                                                                <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove">
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#18582e] transition-colors ml-2 py-1">
                                                        <Plus size={12} /> Add Sub-link
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Settings & Info */}
                <div className="space-y-6">
                    
                    {/* Information Card */}
                    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                        <div className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 mb-4 shadow-sm">
                            <LayoutTemplate size={20} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-serif text-lg font-medium text-[#1a1a1a] mb-2">How Menus Work</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            You can build custom menus here and assign them to specific locations in your storefront theme. 
                        </p>
                        <ul className="space-y-3">
                            <li className="text-sm text-gray-600 flex items-start gap-2">
                                <div className="mt-1"><MonitorPlay size={14} className="text-blue-500" /></div>
                                <span><strong>Header Locations</strong> support up to 2 levels of dropdowns (Sub-links).</span>
                            </li>
                            <li className="text-sm text-gray-600 flex items-start gap-2">
                                <div className="mt-1"><PanelBottom size={14} className="text-purple-500" /></div>
                                <span><strong>Footer Locations</strong> are flat lists and do not support dropdowns.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Link Generator */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6">
                        <h3 className="font-serif text-lg font-medium text-[#1a1a1a] mb-4">Link Generator</h3>
                        <p className="text-xs text-gray-500 mb-4">Quickly find internal system URLs to copy and paste into your menus.</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Resource Type</label>
                                <select className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] text-sm font-medium text-gray-900 cursor-pointer appearance-none">
                                    <option>Categories</option>
                                    <option>Materials</option>
                                    <option>System Pages</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Select Item</label>
                                <select className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] text-sm font-medium text-gray-900 cursor-pointer appearance-none">
                                    <option>Sarees</option>
                                    <option>Kurta Sets</option>
                                    <option>Suit Pieces</option>
                                </select>
                            </div>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
                                <span className="text-xs font-mono text-gray-600">/category/sarees</span>
                                <button className="text-xs font-bold text-[#18582e] hover:underline">Copy</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}