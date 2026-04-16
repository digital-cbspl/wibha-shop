"use client";

import AdminFooter from "@/src/layout/AdminFooter";
import AdminHeader from "@/src/layout/AdminHeader";
import AdminSidebar from "@/src/layout/AdminSidebar";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#fcfdfc] font-sans text-gray-800 selection:bg-[#18582e] selection:text-white overflow-hidden">
            
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AdminHeader setSidebarOpen={setIsSidebarOpen} />
                
                {/* Changed main to a flex column so the footer is pushed to the bottom */}
                <main className="flex-1 overflow-y-auto custom-scroll flex flex-col">
                    
                    {/* Main Content Area */}
                    <div className="flex-1 p-3 max-w-7xl mx-auto w-full">
                        {children}
                    </div>

                    {/* Footer rendered at the bottom of the scrollable area */}
                    <AdminFooter />
                </main>
            </div>
        </div>
    );
}