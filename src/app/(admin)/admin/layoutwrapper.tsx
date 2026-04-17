import { usePathname } from "next/navigation";
import { useState } from "react";

import AdminFooter from "@/src/layout/AdminFooter";
import AdminHeader from "@/src/layout/AdminHeader";
import AdminSidebar from "@/src/layout/AdminSidebar";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Routes where layout should be hidden
    const hideLayoutRoutes = [
        "/admin/login",
    ];

    const shouldHideLayout = hideLayoutRoutes.includes(pathname);

    // 👉 If layout should be hidden → render only page
    if (shouldHideLayout) {
        return <>{children}</>;
    }

    // 👉 Otherwise render YOUR EXACT layout
    return (
        <div className="flex h-screen bg-[#fcfdfc] font-sans text-gray-800 selection:bg-[#18582e] selection:text-white overflow-hidden">
            
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AdminHeader setSidebarOpen={setIsSidebarOpen} />

                <main className="flex-1 overflow-y-auto custom-scroll flex flex-col">
                    
                    <div className="flex-1 p-3 max-w-7xl mx-auto w-full">
                        {children}
                    </div>

                    <AdminFooter />
                </main>
            </div>
        </div>
    );
}