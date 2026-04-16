"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Grid,
    Layers,
    Palette,
    Shapes,
    Users,
    Star,
    ShoppingCart,
    CreditCard,
    Ticket,
    LayoutList,
    Settings,
    LogOut,
    X
} from "lucide-react";// Adjust path as needed
import { logo } from "../assets/image/image";

type SidebarProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

// Structured navigation based on database schema
const navGroups = [
    {
        title: "Overview",
        items: [
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        ]
    },
    {
        title: "Catalog",
        items: [
            { name: "Products", href: "/admin/products", icon: Package },
            { name: "Categories", href: "/admin/categories", icon: Grid },
            { name: "Product Types", href: "/admin/product-types", icon: Layers },
            { name: "Materials", href: "/admin/materials", icon: Palette },
            { name: "Varieties", href: "/admin/varieties", icon: Shapes },
            { name: "Genders", href: "/admin/genders", icon: Users },
            { name: "Reviews", href: "/admin/reviews", icon: Star },
        ]
    },
    {
        title: "Sales & Promotions",
        items: [
            { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
            { name: "Payments", href: "/admin/payments", icon: CreditCard },
            { name: "Coupons", href: "/admin/coupons", icon: Ticket },
        ]
    },
    {
        title: "Audience",
        items: [
            { name: "Users", href: "/admin/users", icon: Users },
        ]
    },
    {
        title: "Site Management",
        items: [
            { name: "Navigation Menus", href: "/admin/menus", icon: LayoutList },
        ]
    }
];

export default function AdminSidebar({ isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-[280px] bg-white border-r border-gray-100 flex flex-col
                transition-transform duration-500 ease-in-out lg:translate-x-0
                ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
            `}>

                {/* Brand Header */}
                <div className="h-[60px] flex items-center justify-between px-6 border-b border-gray-50 shrink-0">
                    <Link href="/admin" className="flex flex-col items-start gap-1">
                        <Image
                            src={logo.src}
                            alt="Logo"
                            width={180}
                            height={60}
                            priority
                            className="object-contain w-[100px] md:w-[120px] h-auto"
                        />
                    </Link>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full">
                        <X size={18} />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-4 px-4 custom-scroll">
                    {navGroups.map((group, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                                {group.title}
                            </p>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    // Exact match for dashboard, partial match for sub-routes
                                    const isActive = item.href === '/admin'
                                        ? pathname === item.href
                                        : pathname.startsWith(item.href);

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`
                                                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group text-sm
                                                ${isActive
                                                    ? "bg-[#18582e]/5 text-[#18582e]"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                }
                                            `}
                                        >
                                            <Icon
                                                size={18}
                                                className={isActive ? "text-[#18582e]" : "text-gray-400 group-hover:text-gray-600 transition-colors"}
                                                strokeWidth={isActive ? 2 : 1.5}
                                            />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-gray-50 shrink-0 space-y-1">
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all group"
                    >
                        <Settings size={18} className="text-gray-400 group-hover:text-gray-600" strokeWidth={1.5} />
                        Settings
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-red-500 hover:bg-red-50 transition-all group">
                        <LogOut size={18} className="text-red-400 group-hover:text-red-500" strokeWidth={1.5} />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}