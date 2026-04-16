"use client";

import Link from "next/link";
import { 
    ChevronLeft, 
    Save, 
    Info,
    LayoutTemplate,
    MonitorPlay,
    PanelBottom
} from "lucide-react";
import { useState } from "react";

export default function CreateMenuPage() {
    const [menuLocation, setMenuLocation] = useState('header');

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/menus" 
                        className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Create Menu Group</h1>
                        <p className="text-sm text-gray-500 mt-1">Set up a new navigation group for your storefront.</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <Link 
                        href="/admin/menus"
                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        Discard
                    </Link>
                    <button className="flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all">
                        <Save size={16} /> Save Menu
                    </button>
                </div>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: Main Details */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Basic Information */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">Menu Details</h2>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Menu Name <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="e.g., Footer Support Links" 
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                                />
                                <p className="text-xs text-gray-500 mt-2">This name is for your internal reference only.</p>
                            </div>

                            {/* Location Assignment */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Display Location <span className="text-red-500">*</span></label>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label 
                                        className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all
                                            ${menuLocation === 'header' ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                                    >
                                        <input 
                                            type="radio" 
                                            name="location" 
                                            value="header" 
                                            checked={menuLocation === 'header'}
                                            onChange={() => setMenuLocation('header')}
                                            className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" 
                                        />
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <MonitorPlay size={16} className={menuLocation === 'header' ? 'text-blue-600' : 'text-gray-500'} />
                                                <span className={`text-sm font-bold ${menuLocation === 'header' ? 'text-blue-900' : 'text-gray-900'}`}>Main Header</span>
                                            </div>
                                            <p className={`text-xs ${menuLocation === 'header' ? 'text-blue-700' : 'text-gray-500'}`}>
                                                Top navigation bar. Supports dropdown sub-menus.
                                            </p>
                                        </div>
                                    </label>

                                    <label 
                                        className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all
                                            ${menuLocation === 'footer' ? 'bg-purple-50 border-purple-200 ring-1 ring-purple-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                                    >
                                        <input 
                                            type="radio" 
                                            name="location" 
                                            value="footer" 
                                            checked={menuLocation === 'footer'}
                                            onChange={() => setMenuLocation('footer')}
                                            className="mt-1 w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300" 
                                        />
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <PanelBottom size={16} className={menuLocation === 'footer' ? 'text-purple-600' : 'text-gray-500'} />
                                                <span className={`text-sm font-bold ${menuLocation === 'footer' ? 'text-purple-900' : 'text-gray-900'}`}>Footer List</span>
                                            </div>
                                            <p className={`text-xs ${menuLocation === 'footer' ? 'text-purple-700' : 'text-gray-500'}`}>
                                                Bottom of page. Flat list format only.
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Limits & Status */}
                <div className="space-y-8">

                    {/* Information Card */}
                    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                        <div className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 mb-4 shadow-sm">
                            <LayoutTemplate size={20} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-serif text-lg font-medium text-[#1a1a1a] mb-2">Next Steps</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            After creating this Menu Group, you will be redirected back to the Menus dashboard where you can start adding links (Categories, Pages, etc.) to it.
                        </p>
                    </div>
                    
                    {/* Status */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-5">Status</h2>
                        
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-[#18582e] bg-[#18582e]/5 cursor-pointer">
                                <input type="radio" name="status" value="active" defaultChecked className="w-4 h-4 text-[#18582e] focus:ring-[#18582e]" />
                                <span className="text-sm font-medium text-[#18582e]">Active (Visible)</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                                <input type="radio" name="status" value="draft" className="w-4 h-4 text-[#18582e] focus:ring-[#18582e]" />
                                <span className="text-sm font-medium text-gray-700">Draft (Hidden)</span>
                            </label>
                        </div>
                    </div>

                </div>

            </form>
        </div>
    );
}