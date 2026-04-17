"use client";

import { useState, useRef, useEffect } from "react";
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
import axios from "axios";
import AuthModal from "../components/AuthModal";
import Link from "next/link";

export default function Header() {
    const [active, setActive] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    
    // <-- Auth Modal State
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [menu, setMenu] = useState<any[]>([]);

    /* ---------------- FETCH MENU ---------------- */
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu`)
        .then((res) => {
            const data = res.data;
             const headerOnly = data.filter(
                (row: any) =>
                    (row.main_loc || "").toLowerCase() === "header"
            );
            const map: any = {};

            headerOnly.forEach((row: any) => {

                // ✅ FIX: skip invalid rows
                if (!row.main_id) return;

                // MAIN
                if (!map[row.main_id]) {
                    map[row.main_id] = {
                        id: row.main_id,
                        name: row.main_menu,
                        url: row.main_url || '#',
                        children: []
                    };
                }

                // SUB
                if (row.submenu_id) {
                    let sub = map[row.main_id].children.find(
                        (s: any) => s.id === row.submenu_id
                    );

                    if (!sub) {
                        sub = {
                            id: row.submenu_id,
                            name: row.submenu,
                            url: row.submenu_url || '#',
                            children: []
                        };
                        map[row.main_id].children.push(sub);
                    }

                    // ✅ FIX: prevent duplicate mega
                    if (row.mega_id) {
                        const exists = sub.children.some(
                            (m: any) => m.id === row.mega_id
                        );

                        if (!exists) {
                            sub.children.push({
                                id: row.mega_id,
                                name: row.mega_menu,
                                url: row.mega_url || '#'
                            });
                        }
                    }
                }
            });

            setMenu(Object.values(map));
        })
        .catch((err) => {
            console.error("API ERROR 👉", err);
        });

    // ✅ FIX: cleanup
    return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

}, []);

    const handleEnter = (menuId: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActive(menuId));
    };

    const handleLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActive(null), 200);
    };

    return (
        <>
            <header className="w-full bg-white/95 sticky top-0 z-40 backdrop-blur-sm shadow-lg shadow-gray-200/40 border-b border-gray-50">
                {/* MAIN HEADER */}
                <div className="max-w-full mx-auto flex items-center justify-between px-4 md:px-15 relative">
                    
                    {/* LOGO */}
                    <div className="flex items-center">
                        <Link href="/">
                            <Image
                                src={logo.src}
                                alt="Logo"
                                width={180}
                                height={60}
                                priority
                                className="object-contain w-[100px] md:w-[120px] h-auto"
                            />
                        </Link>
                    </div>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium h-full">
                        {menu.map((item: any) => {
                            const key = item.id.toString(); // Use ID instead of name for safer state matching

                            return (
                                <NavItem
                                    key={item.id}
                                    label={item.name.toUpperCase()}
                                    url={item.url}
                                    hasDropdown={item.children.length > 0}
                                    onEnter={() => handleEnter(key)}
                                    onLeave={handleLeave}
                                >
                                    {active === key && item.children.length > 0 && (
                                        // If any sub-item has children, it's a Mega Menu. Otherwise, it's a simple Dropdown.
                                        item.children.some((c: any) => c.children.length > 0)
                                            ? (
                                                <MegaMenuDynamic data={item.children} onLeave={handleLeave} />
                                            )
                                            : (
                                                <Dropdown>
                                                    {item.children.map((child: any) => (
                                                        <Link 
                                                            key={child.id} 
                                                            href={child.url}
                                                            className="hover:text-[#18582e] transition-colors py-1 block"
                                                            onClick={handleLeave}
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    ))}
                                                </Dropdown>
                                            )
                                    )}
                                </NavItem>
                            );
                        })}
                    </nav>

                    {/* RIGHT */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-[260px]">
                            <input
                                placeholder="Search our store"
                                className="bg-transparent outline-none text-sm flex-1"
                            />
                            <Search size={16} className="text-gray-500" />
                        </div>

                        <button 
                            onClick={() => setIsAuthModalOpen(true)}
                            className="hover:text-[#18582e] transition-colors focus:outline-none"
                        >
                            <User size={20} />
                        </button>
                        
                        <Link href="/wishlist" className="hover:text-[#18582e] transition-colors focus:outline-none">
                            <Heart size={20} />
                        </Link>

                        <Link href="/cart" className="relative hover:text-[#18582e] transition-colors focus:outline-none">
                            <ShoppingBag size={20} />
                            <span className="absolute -top-2 -right-2 text-[10px] bg-[#18582e] text-white rounded-full px-1.5 py-0.5 min-w-[16px] text-center">
                                0
                            </span>
                        </Link>

                        <button className="md:hidden" onClick={() => setMobileOpen(true)}>
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* MOBILE DRAWER */}
                <div
                    className={clsx(
                        "fixed top-0 left-0 w-full h-screen bg-white transition-transform duration-300 md:hidden z-[60] overflow-y-auto pb-10",
                        mobileOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <div className="flex justify-between items-center p-5 border-b border-gray-100">
                        <Image src={logo.src} alt="Logo" width={100} height={40} className="object-contain" />
                        <X onClick={() => setMobileOpen(false)} className="cursor-pointer text-gray-500 hover:text-black" />
                    </div>

                    <div className="flex flex-col p-4 text-sm gap-2">
                        {menu.map((item: any) => (
                            <MobileItem key={item.id} item={item} closeMenu={() => setMobileOpen(false)} />
                        ))}
                    </div>
                </div>
            </header>

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
        </>
    );
}

/* ---------------- NAV ITEM ---------------- */
function NavItem({ label, url, children, hasDropdown, onEnter, onLeave }: any) {
    return (
        <div
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="flex items-center py-4 h-full"
        >
            <Link href={url} className="flex items-center gap-1 cursor-pointer hover:text-[#18582e] transition-colors">
                {label}
                {hasDropdown && <ChevronDown size={14} className="mt-0.5" />}
            </Link>
            {children}
        </div>
    );
}

/* ---------------- DROPDOWN ---------------- */
function Dropdown({ children }: any) {
    return (
        <div className="absolute top-[100%] left-auto mt-0 bg-white shadow-xl p-5 min-w-[200px] z-50 flex flex-col gap-3 text-sm rounded-b-xl border-t-2 border-[#18582e]">
            {children}
        </div>
    );
}

/* ---------------- DYNAMIC MEGA MENU ---------------- */
function MegaMenuDynamic({ data, onLeave }: any) {
    return (
        <div 
            className="fixed left-1/2 -translate-x-1/2 top-[52px] w-full bg-white shadow-2xl z-50 border-t border-gray-100 cursor-default"
            onMouseLeave={onLeave}
        >
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
                {data.map((col: any) => (
                    <MenuColumn
                        key={col.id}
                        title={col.name}
                        titleUrl={col.url}
                        items={col.children}
                    />
                ))}

                <div className="hidden md:block">
                    <div className="bg-gray-100 h-[140px] rounded-xl flex items-center justify-center text-gray-400">
                        {/* Replace with an actual promo image later */}
                        Promo Image
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-800">
                        Up to 50% Off On Select Items
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ---------------- COLUMN ---------------- */
function MenuColumn({ title, titleUrl, items }: any) {
    return (
        <div>
            {/* Submenu Title */}
            <Link href={titleUrl || '#'} className="font-bold mb-4 text-sm block hover:text-[#18582e] text-gray-900 pb-2">
                {title}
            </Link>
            
            {/* Mega Menu Links */}
            <ul className="space-y-3 text-sm text-gray-500">
                {items.map((item: any) => (
                    <li key={item.id}>
                        <Link href={item.url || '#'} className="hover:text-[#18582e] hover:translate-x-1 inline-block transition-all duration-200">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ---------------- MOBILE ITEM ---------------- */
function MobileItem({ item, closeMenu }: any) {
    const [open, setOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    return (
        <div className="border-b border-gray-50 pb-2 mb-2">
            <div className="flex justify-between items-center py-2">
                <Link 
                    href={item.url || '#'} 
                    onClick={closeMenu}
                    className="font-medium text-base hover:text-[#18582e]"
                >
                    {item.name}
                </Link>
                {hasChildren && (
                    <button onClick={() => setOpen(!open)} className="p-2 -mr-2 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <ChevronDown size={18} className={open ? "rotate-180 transition" : "transition"} />
                    </button>
                )}
            </div>

            {open && hasChildren && (
                <div className="mt-2 ml-4 flex flex-col gap-4 text-gray-600 border-l-2 border-[#18582e]/20 pl-4 py-2">
                    {item.children.map((sub: any) => (
                        <div key={sub.id} className="flex flex-col gap-2">
                            
                            <Link 
                                href={sub.url || '#'} 
                                onClick={closeMenu}
                                className="font-medium text-sm text-gray-800 hover:text-[#18582e]"
                            >
                                {sub.name}
                            </Link>

                            {/* Render Mega Links under Submenu in Mobile */}
                            {sub.children && sub.children.length > 0 && (
                                <div className="flex flex-col gap-2.5 mt-1">
                                    {sub.children.map((mega: any) => (
                                        <Link 
                                            key={mega.id} 
                                            href={mega.url || '#'} 
                                            onClick={closeMenu}
                                            className="text-sm text-gray-500 hover:text-[#18582e]"
                                        >
                                            {mega.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}