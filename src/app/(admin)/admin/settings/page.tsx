"use client";

import { useState } from "react";
import { 
    Save, 
    Store, 
    MapPin, 
    CreditCard, 
    Settings as SettingsIcon,
    UploadCloud,
    Globe,
    ShieldCheck,
    Bell
} from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Store Settings</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your store's core configuration, taxes, and contact details.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all">
                        <Save size={16} /> Save Settings
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* LEFT COLUMN: Navigation Tabs */}
                <div className="lg:col-span-1 space-y-2">
                    <button 
                        onClick={() => setActiveTab('general')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                            ${activeTab === 'general' ? 'bg-[#18582e]/10 text-[#18582e] border border-[#18582e]/20' : 'bg-transparent text-gray-600 hover:bg-white hover:border-gray-200 border border-transparent'}`}
                    >
                        <Store size={18} /> General Details
                    </button>
                    <button 
                        onClick={() => setActiveTab('contact')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                            ${activeTab === 'contact' ? 'bg-[#18582e]/10 text-[#18582e] border border-[#18582e]/20' : 'bg-transparent text-gray-600 hover:bg-white hover:border-gray-200 border border-transparent'}`}
                    >
                        <MapPin size={18} /> Contact & Address
                    </button>
                    <button 
                        onClick={() => setActiveTab('checkout')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                            ${activeTab === 'checkout' ? 'bg-[#18582e]/10 text-[#18582e] border border-[#18582e]/20' : 'bg-transparent text-gray-600 hover:bg-white hover:border-gray-200 border border-transparent'}`}
                    >
                        <CreditCard size={18} /> Checkout & Taxes
                    </button>
                    <button 
                        onClick={() => setActiveTab('system')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                            ${activeTab === 'system' ? 'bg-[#18582e]/10 text-[#18582e] border border-[#18582e]/20' : 'bg-transparent text-gray-600 hover:bg-white hover:border-gray-200 border border-transparent'}`}
                    >
                        <SettingsIcon size={18} /> System Config
                    </button>
                </div>

                {/* RIGHT COLUMN: Form Content */}
                <div className="lg:col-span-3">
                    
                    {/* General Settings Tab */}
                    {activeTab === 'general' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                                <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">Store Identity</h2>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                                            <input type="text" defaultValue="WIBHA" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-bold text-gray-900" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Store Tagline</label>
                                            <input type="text" defaultValue="Authentic Handloom Styles" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Store Description (SEO)</label>
                                        <textarea rows={3} defaultValue="Premium ethnic wear, handcrafted sarees, and beautiful home decor." className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                                <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">Logos & Branding</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Primary Logo (Light Backgrounds)</label>
                                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                                            <UploadCloud size={28} className="text-gray-400 group-hover:text-[#18582e] mb-2 transition-colors" />
                                            <span className="text-sm font-medium text-gray-600">Click to upload logo</span>
                                            <span className="text-xs text-gray-400 mt-1">PNG or SVG, max 2MB</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Favicon (Browser Tab Icon)</label>
                                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                                            <UploadCloud size={28} className="text-gray-400 group-hover:text-[#18582e] mb-2 transition-colors" />
                                            <span className="text-sm font-medium text-gray-600">Click to upload icon</span>
                                            <span className="text-xs text-gray-400 mt-1">32x32px PNG or ICO</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Contact & Address Tab */}
                    {activeTab === 'contact' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                                <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">Customer Support Details</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                                        <input type="email" defaultValue="support@wibha.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone Number</label>
                                        <input type="text" defaultValue="+91 98765 43210" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                                <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">Business Address</h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                                        <textarea rows={2} defaultValue="Plot 45, Handloom Artisans Valley" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900"></textarea>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                            <input type="text" defaultValue="Bhubaneswar" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                            <input type="text" defaultValue="Odisha" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                                            <input type="text" defaultValue="751001" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Checkout & Taxes Tab */}
                    {activeTab === 'checkout' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                                <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">Currency & Formatting</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Store Currency</label>
                                        <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 appearance-none cursor-pointer">
                                            <option value="INR">Indian Rupee (₹)</option>
                                            <option value="USD">US Dollar ($)</option>
                                            <option value="EUR">Euro (€)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Order ID Prefix</label>
                                        <input type="text" defaultValue="#ORD-" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm text-gray-900 font-mono" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                                <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">Tax Calculation</h2>
                                <div className="space-y-6">
                                    <label className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                                        <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                        <div>
                                            <span className="block text-sm font-bold text-gray-900">All prices include tax</span>
                                            <span className="block text-xs text-gray-500 mt-1">If unchecked, tax will be added on top of product prices at checkout.</span>
                                        </div>
                                    </label>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Tax Rate (%)</label>
                                        <div className="relative w-full sm:w-1/2">
                                            <input type="number" defaultValue="5" className="w-full pl-4 pr-8 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-bold text-gray-900" />
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-500 font-medium">%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* System Config Tab */}
                    {activeTab === 'system' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                                <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">Store Visibility</h2>
                                
                                <label className="flex items-start gap-4 p-5 rounded-xl border border-amber-200 bg-amber-50 cursor-pointer transition-colors">
                                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500/20 cursor-pointer" />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck size={16} className="text-amber-600" />
                                            <span className="text-sm font-bold text-amber-900">Maintenance Mode</span>
                                        </div>
                                        <span className="block text-xs text-amber-700 mt-1 leading-relaxed">
                                            Turning this on will hide your storefront from customers. Only logged-in administrators will be able to view the site.
                                        </span>
                                    </div>
                                </label>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                                <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">Localization</h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <Globe size={16} className="text-gray-400"/> System Timezone
                                        </label>
                                        <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900 appearance-none cursor-pointer">
                                            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                            <option value="America/New_York">America/New_York (EST)</option>
                                            <option value="Europe/London">Europe/London (GMT)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}