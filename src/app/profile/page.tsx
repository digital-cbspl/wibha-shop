"use client";

import Link from "next/link";
import { ChevronRight, Camera, User, Mail, Phone, Lock, Shield, MapPin, Package, Heart, LogOut } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    
    // Mock user details
    const [user, setUser] = useState({
        firstName: "Ariana",
        lastName: "Grand",
        email: "ariana.handcrafted@example.com",
        phone: "+91 98765 43210"
    });

    const handleSave = (e: any) => {
        e.preventDefault();
        setIsEditing(false);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="bg-[#f6f8f7] min-h-[calc(100vh-80px)] font-sans pb-16">
            
            {/* Breadcrumbs */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
                <div className="flex items-center text-[11px] sm:text-xs text-gray-500 font-bold tracking-widest uppercase">
                    <Link href="/" className="hover:text-[#18582e] transition-colors">Home</Link>
                    <ChevronRight size={14} className="mx-2 text-gray-300" />
                    <span className="text-gray-900">My Account</span>
                </div>
            </div>

            <main className="max-w-[1200px] mx-auto px-4 sm:px-6">
                
                {/* Header */}
                <div className="mb-8 border-b border-gray-200 pb-5">
                   <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-wide uppercase">My Account</h1>
                   <p className="text-xs sm:text-sm text-gray-500 mt-1.5">Manage your personal information and security settings</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Navigation Sidebar */}
                    <aside className="w-full lg:w-[280px] shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
                            
                            {/* Profile Mini Header */}
                            <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-[#18582e] text-white flex items-center justify-center font-serif text-2xl font-bold uppercase tracking-widest">
                                    {user.firstName[0]}{user.lastName[0]}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 leading-tight">{user.firstName} {user.lastName}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5 w-full overflow-hidden text-ellipsis">{user.email}</p>
                                </div>
                            </div>

                            {/* Nav Links */}
                            <nav className="flex flex-col py-2">
                                <Link href="/profile" className="flex items-center gap-3 px-6 py-4 border-l-4 border-[#18582e] bg-[#18582e]/5 text-[#18582e] font-bold text-sm transition-colors">
                                    <User size={18} /> Personal Info
                                </Link>
                                <Link href="/orders" className="flex items-center gap-3 px-6 py-4 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-bold text-sm transition-colors">
                                    <Package size={18} className="text-gray-400" /> My Orders
                                </Link>
                                <Link href="/addresses" className="flex items-center gap-3 px-6 py-4 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-bold text-sm transition-colors">
                                    <MapPin size={18} className="text-gray-400" /> Saved Addresses
                                </Link>
                                <Link href="/wishlist" className="flex items-center gap-3 px-6 py-4 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-bold text-sm transition-colors">
                                    <Heart size={18} className="text-gray-400" /> Wishlist
                                </Link>
                            </nav>

                            <div className="p-4 border-t border-gray-100">
                                <button className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl text-[#bf0503] hover:bg-red-50 font-bold text-sm transition-colors">
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Right Form Section */}
                    <div className="flex-1 space-y-6">
                        
                        {/* Profile Info Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">Personal Information</h2>
                                    <p className="text-sm text-gray-500">Update your basic profile details securely.</p>
                                </div>
                                {!isEditing && (
                                    <button 
                                        onClick={() => setIsEditing(true)} 
                                        className="text-sm font-bold text-[#18582e] border-2 border-[#18582e]/20 px-5 py-2 rounded-lg hover:border-[#18582e] transition-colors"
                                    >
                                        Edit Details
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSave}>
                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    
                                    {/* First Name */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">First Name</label>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                value={user.firstName}
                                                onChange={(e) => setUser({...user, firstName: e.target.value})}
                                                disabled={!isEditing}
                                                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${isEditing ? 'border-gray-300 focus:border-[#18582e] bg-white' : 'border-transparent bg-gray-50 text-gray-600'} outline-none transition-colors font-medium`}
                                            />
                                            <User size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isEditing ? 'text-[#18582e]' : 'text-gray-400'}`} />
                                        </div>
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Last Name</label>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                value={user.lastName}
                                                onChange={(e) => setUser({...user, lastName: e.target.value})}
                                                disabled={!isEditing}
                                                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${isEditing ? 'border-gray-300 focus:border-[#18582e] bg-white' : 'border-transparent bg-gray-50 text-gray-600'} outline-none transition-colors font-medium`}
                                            />
                                            <User size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isEditing ? 'text-[#18582e]' : 'text-gray-400'}`} />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                                        <div className="relative">
                                            <input 
                                                type="email" 
                                                value={user.email}
                                                onChange={(e) => setUser({...user, email: e.target.value})}
                                                disabled={!isEditing}
                                                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${isEditing ? 'border-gray-300 focus:border-[#18582e] bg-white' : 'border-transparent bg-gray-50 text-gray-600'} outline-none transition-colors font-medium`}
                                            />
                                            <Mail size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isEditing ? 'text-[#18582e]' : 'text-gray-400'}`} />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Mobile Number</label>
                                        <div className="relative">
                                            <input 
                                                type="tel" 
                                                value={user.phone}
                                                onChange={(e) => setUser({...user, phone: e.target.value})}
                                                disabled={!isEditing}
                                                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${isEditing ? 'border-gray-300 focus:border-[#18582e] bg-white' : 'border-transparent bg-gray-50 text-gray-600'} outline-none transition-colors font-medium`}
                                            />
                                            <Phone size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isEditing ? 'text-[#18582e]' : 'text-gray-400'}`} />
                                        </div>
                                    </div>

                                </div>

                                {/* Action Buttons */}
                                {isEditing && (
                                    <div className="flex gap-4 border-t border-gray-100 pt-6">
                                        <button 
                                            type="submit"
                                            className="px-8 py-3 rounded-xl font-bold bg-[#18582e] text-white hover:bg-[#113f20] transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-8 py-3 rounded-xl font-bold bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                                
                                {/* Success Message */}
                                {isSaved && (
                                    <div className="flex items-center gap-2 mt-4 text-green-700 bg-green-50 p-3 rounded-lg border border-green-200 font-bold block transition-all">
                                        <Shield size={18} className="text-green-600" /> Profile details saved successfully.
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Security Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">Security</h2>
                                    <p className="text-sm text-gray-500">Keep your account secure.</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50/50 gap-4">
                                <div>
                                    <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-1">
                                        <Lock size={16} className="text-gray-400" /> Account Password
                                    </h4>
                                    <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                                </div>
                                <button className="w-full sm:w-auto text-sm font-bold text-gray-700 bg-white border border-gray-200 px-5 py-2.5 rounded-lg hover:border-gray-900 transition-colors">
                                    Change Password
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}
