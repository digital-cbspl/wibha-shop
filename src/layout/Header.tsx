"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
    Search,
    User,
    Heart,
    ShoppingBag,
    ChevronDown,
    Menu,
    X
} from "lucide-react";
import clsx from "clsx";
import { logo } from "../assets/image/image";
import AuthModal from "../components/AuthModal";

export default function Header() {
    const [active, setActive] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // Mobile Drawer State
    const [mobileOpen, setMobileOpen] = useState(false);
    
    // Auth Modal State <-- Added this state
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const handleEnter = (menu: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setActive(menu);
        });
    };

    const handleLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setActive(null);
        }, 200);
    };

    return (
        <>
            <header className="w-full bg-white sticky top-9 z-50 backdrop-blur-sm shadow-lg shadow-gray-200/40 border-b border-gray-50">

                {/* MAIN HEADER */}
                <div className="max-w-full mx-auto flex items-center justify-between py-1 px-4 md:px-15">

                    {/* LEFT - LOGO */}
                    <div className="flex items-center">
                        <Image
                            src={logo.src}
                            alt="Logo"
                            width={180}
                            height={60}
                            priority
                            className="object-contain w-[100px] md:w-[120px] h-auto"
                        />
                    </div>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

                        <NavItem label="HOME" />

                        <NavItem
                            label="SHOP"
                            hasDropdown
                            onEnter={() => handleEnter("shop")}
                            onLeave={handleLeave}
                        >
                            {active === "shop" && <MegaMenu />}
                        </NavItem>

                        <NavItem label="BLOG" />

                        <NavItem
                            label="ABOUT"
                            hasDropdown
                            onEnter={() => handleEnter("about")}
                            onLeave={handleLeave}
                        >
                            {active === "about" && (
                                <Dropdown>
                                    <a>About Us</a>
                                    <a>FAQ</a>
                                    <a>Terms</a>
                                </Dropdown>
                            )}
                        </NavItem>
                        <NavItem label="SALES" />
                        <NavItem label="CONTACT" />
                    </nav>

                    {/* RIGHT */}
                    <div className="flex items-center gap-4">

                        {/* SEARCH */}
                        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-[260px]">
                            <input
                                placeholder="Search our store"
                                className="bg-transparent outline-none text-sm flex-1"
                            />
                            <Search size={16} className="text-gray-500" />
                        </div>

                        {/* USER LOGIN ICON TRIGGER */}
                        <button 
                            onClick={() => setIsAuthModalOpen(true)}
                            className="text-gray-800 hover:text-[#18582e] transition-colors p-1"
                            aria-label="Account"
                        >
                            <User size={20} />
                        </button>

                        <button className="text-gray-800 hover:text-[#18582e] transition-colors p-1" aria-label="Wishlist">
                            <Heart size={20} />
                        </button>

                        <button className="relative text-gray-800 hover:text-[#18582e] transition-colors p-1" aria-label="Cart">
                            <ShoppingBag size={20} />
                            <span className="absolute -top-1 -right-1 text-[10px] bg-[#18582e] text-white rounded-full px-1.5 font-medium">
                                0
                            </span>
                        </button>

                        {/* MOBILE MENU BUTTON */}
                        <button
                            className="md:hidden p-1 text-gray-800 hover:text-[#18582e] transition-colors"
                            onClick={() => setMobileOpen(true)}
                        >
                            <Menu />
                        </button>
                    </div>
                </div>

                {/* MOBILE DRAWER */}
                <div
                    className={clsx(
                        "fixed top-0 left-0 w-full h-full bg-white transition-transform duration-300 md:hidden z-50",
                        mobileOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                        <span className="font-semibold tracking-wider text-sm">MENU</span>
                        <button className="p-1 text-gray-500 hover:text-black" onClick={() => setMobileOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 p-4 text-sm font-medium text-gray-800">
                        <MobileItem label="HOME" />
                        <MobileItem label="SHOP">
                            <span className="hover:text-black cursor-pointer">All Products</span>
                            <span className="hover:text-black cursor-pointer">New Arrivals</span>
                            <span className="hover:text-black cursor-pointer">Best Sellers</span>
                        </MobileItem>
                        <MobileItem label="BLOG" />
                        <MobileItem label="ABOUT">
                            <span className="hover:text-black cursor-pointer">About Us</span>
                            <span className="hover:text-black cursor-pointer">FAQ</span>
                            <span className="hover:text-black cursor-pointer">Terms</span>
                        </MobileItem>
                        <MobileItem label="CONTACT" />
                        
                        {/* Mobile Login Trigger inside the drawer */}
                        <button 
                            className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3 text-left w-full hover:text-[#18582e]"
                            onClick={() => {
                                setMobileOpen(false); // Close drawer
                                setIsAuthModalOpen(true); // Open modal
                            }}
                        >
                            <User size={18} /> Sign In / Register
                        </button>
                    </div>
                </div>
            </header>

            {/* RENDER THE AUTH MODAL HERE */}
            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
        </>
    );
}

/* ---------------- NAV ITEM ---------------- */

function NavItem({
    label,
    children,
    hasDropdown,
    onEnter,
    onLeave
}: any) {
    return (
        <div
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="relative flex items-center gap-1 cursor-pointer hover:text-[#18582e] transition-colors py-4"
        >
            {label}
            {hasDropdown && <ChevronDown size={14} />}
            {children}
        </div>
    );
}

/* ---------------- DROPDOWN ---------------- */

function Dropdown({ children }: any) {
    return (
        <div className="absolute top-[100%] left-0 mt-0 bg-white shadow-lg border border-gray-100 p-4 min-w-[200px] z-50 flex flex-col gap-3 text-sm text-gray-600 rounded-b-lg animate-in fade-in slide-in-from-top-2 duration-200">
            {children}
        </div>
    );
}

/* ---------------- FULL WIDTH MEGA MENU ---------------- */

function MegaMenu() {
    return (
        <div className="fixed left-1/2 -translate-x-1/2 top-[85px] w-screen bg-white shadow-xl border-t border-gray-100 z-40 animate-in fade-in slide-in-from-top-2 duration-300">

            {/* CENTERED CONTENT */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">

                <MenuColumn
                    title="Categories"
                    items={[
                        "Clothing",
                        "Crafts",
                        "Wedding",
                        "Accessories",
                        "Artisans",
                    ]}
                />

                <MenuColumn
                    title="Clothing"
                    items={[
                        "Men's Clothing",
                        "Women's Clothing",
                        "Boy's Clothing",
                        "Girl's Clothing",
                        "Kid's Clothing",
                        "New Arrivals",
                    ]}
                />

                <MenuColumn
                    title="Crafts"
                    items={[
                        "Lamps & Lights",
                        "Linen & Mats",
                        "Furnitures & Woods",
                        "Bath & Beauty",
                        "Wall hangings",
                    ]}
                />

                <MenuColumn
                    title="Artisans"
                    items={[
                        "Mandala Art",
                        "Pattachitra",
                        "Madhubani",
                        "Saura Painting",
                        "Applique",
                    ]}
                />

                {/* PROMO */}
                <div className="hidden md:block">
                    <div className="bg-gray-100 h-[140px] rounded-xl flex items-center justify-center border border-gray-200">
                        {/* Placeholder for Promo Image */}
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-widest">Promo Image</span>
                    </div>
                    <p className="mt-4 text-sm font-semibold text-gray-900 leading-snug">
                        Up to 50% Off On Select Items
                    </p>
                    <a href="#" className="text-xs text-[#18582e] font-medium hover:underline mt-1 inline-block">Shop Now &rarr;</a>
                </div>

            </div>
        </div>
    );
}

/* ---------------- COLUMN ---------------- */

function MenuColumn({ title, items }: any) {
    return (
        <div>
            <h4 className="font-serif font-medium mb-4 text-base text-gray-900">{title}</h4>
            <ul className="space-y-3 text-sm text-gray-500">
                {items.map((item: string, i: number) => (
                    <li key={i} className="hover:text-[#18582e] cursor-pointer transition-colors">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ---------------- MOBILE ITEM ---------------- */

function MobileItem({ label, children }: any) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-gray-50 pb-2">
            <div
                className="flex justify-between items-center cursor-pointer py-2 hover:text-[#18582e]"
                onClick={() => setOpen(!open)}
            >
                {label}
                {children && (
                    <ChevronDown
                        size={16}
                        className={open ? "rotate-180 transition-transform" : "transition-transform"}
                    />
                )}
            </div>

            {open && children && (
                <div className="mt-2 ml-4 pl-4 border-l border-gray-100 flex flex-col gap-3 text-gray-500 py-2">
                    {children}
                </div>
            )}
        </div>
    );
}