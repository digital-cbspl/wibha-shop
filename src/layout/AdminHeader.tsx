"use client";

import { Bell, Search, Menu } from "lucide-react";
import Image from "next/image";

type HeaderProps = {
    setSidebarOpen: (isOpen: boolean) => void;
};

export default function AdminHeader({ setSidebarOpen }: HeaderProps) {
    return (
        <header className="h-[60px] bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-30">
            
            {/* Left side: Mobile Toggle & Global Search */}
            <div className="flex items-center gap-4 flex-1">
                <button 
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 text-gray-500 hover:text-gray-900 bg-gray-50 rounded-xl transition-colors"
                >
                    <Menu size={20} />
                </button>

                <div className="hidden md:flex items-center bg-gray-50 rounded-xl px-4 py-2.5 w-full max-w-md border border-gray-100 focus-within:ring-2 focus-within:ring-[#18582e]/20 focus-within:bg-white transition-all">
                    <Search size={18} className="text-gray-400 mr-3" />
                    <input 
                        type="text" 
                        placeholder="Search orders, products, or customers..." 
                        className="bg-transparent outline-none text-sm w-full font-medium placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Right side: Notifications & Profile */}
            <div className="flex items-center gap-5 md:gap-8">
                
                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-gray-900 transition-colors">
                    <Bell size={22} strokeWidth={1.5} />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

                {/* User Profile */}
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-gray-900 leading-tight">Ariana Grand</p>
                        <p className="text-xs text-gray-500 font-medium">Admin</p>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-[#18582e]/10 text-[#18582e] flex items-center justify-center font-serif font-bold border-2 border-transparent group-hover:border-[#18582e]/20 transition-all">
                        AG
                        {/* If you have a profile picture, you can use Next Image here instead */}
                        {/* <Image src="/avatar.jpg" alt="Admin" fill className="rounded-full object-cover" /> */}
                    </div>
                </div>
            </div>
        </header>
    );
}