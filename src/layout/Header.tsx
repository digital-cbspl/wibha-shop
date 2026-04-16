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
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [menu, setMenu] = useState<any[]>([]);

    /* ---------------- FETCH MENU ---------------- */
useEffect(() => {
    axios.get("http://localhost:5000/api/menu")
        .then((res) => {
            const data = res.data;

            // ✅ FILTER ONLY HEADER
            const headerOnly = data.filter(
                (row: any) =>
                    (row.main_loc || "").toLowerCase() === "header"
            );

            const map: any = {};

            headerOnly.forEach((row: any) => {

                if (!row.main_id) return;

                // MAIN
                if (!map[row.main_id]) {
                    map[row.main_id] = {
                        id: row.main_id,
                        name: row.main_menu,
                        url: row.main_url || "#",
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
                            url: row.submenu_url || "#",
                            children: []
                        };
                        map[row.main_id].children.push(sub);
                    }

                    // MEGA
                    if (row.mega_id) {
                        const exists = sub.children.some(
                            (m: any) => m.id === row.mega_id
                        );

                        if (!exists) {
                            sub.children.push({
                                id: row.mega_id,
                                name: row.mega_menu,
                                url: row.mega_url || "#"
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

    return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

}, []);

    const handleEnter = (menuId: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActive(menuId), 100);
    };

    const handleLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActive(null), 200);
    };

    return (
        <>
            <header className="w-full bg-white/95 sticky top-0 z-40 backdrop-blur-sm shadow-lg border-b">

                <div className="flex items-center justify-between py-2 px-4 md:px-10">

                    {/* LOGO */}
                    <Link href="/">
                        <Image
                            src={logo.src}
                            alt="Logo"
                            width={120}
                            height={50}
                            priority
                        />
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex gap-8 text-sm font-medium">
                        {menu.map((item: any) => {
                            const key = item.id.toString();

                            return (
                                <NavItem
                                    key={item.id}
                                    label={item.name}
                                    url={item.url}
                                    hasDropdown={item.children?.length > 0}
                                    onEnter={() => handleEnter(key)}
                                    onLeave={handleLeave}
                                >
                                    {active === key && item.children?.length > 0 && (

                                        item.children.some((c: any) => c.children?.length > 0)
                                            ? (
                                                <MegaMenuDynamic
                                                    data={item.children}
                                                    onLeave={handleLeave}
                                                />
                                            )
                                            : (
                                                <Dropdown>
                                                    {item.children.map((child: any) => (
                                                        <Link key={child.id} href={child.url}>
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

                        <button onClick={() => setIsAuthModalOpen(true)}>
                            <User size={20} />
                        </button>

                        <Link href="/wishlist">
                            <Heart size={20} />
                        </Link>

                        <Link href="/cart">
                            <ShoppingBag size={20} />
                        </Link>

                        <button className="md:hidden" onClick={() => setMobileOpen(true)}>
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* MOBILE */}
                <div className={clsx(
                    "fixed top-0 left-0 w-full h-screen bg-white transition md:hidden",
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    <div className="flex justify-between p-4 border-b">
                        <Image src={logo.src} alt="Logo" width={100} height={40} />
                        <X onClick={() => setMobileOpen(false)} />
                    </div>

                    <div className="p-4">
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

/* NAV ITEM */
function NavItem({ label, url, children, hasDropdown, onEnter, onLeave }: any) {
    return (
        <div onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <Link href={url} className="flex items-center gap-1">
                {label}
                {hasDropdown && <ChevronDown size={14} />}
            </Link>
            {children}
        </div>
    );
}

/* DROPDOWN */
function Dropdown({ children }: any) {
    return (
        <div className="absolute bg-white shadow p-4">
            {children}
        </div>
    );
}

/* MEGA */
function MegaMenuDynamic({ data, onLeave }: any) {
    return (
        <div className="absolute left-0 w-full bg-white shadow-lg" onMouseLeave={onLeave}>
            <div className="grid grid-cols-5 gap-6 p-6">
                {data.map((col: any) => (
                    <div key={col.id}>
                        <Link href={col.url} className="font-bold">
                            {col.name}
                        </Link>

                        {col.children?.map((item: any) => (
                            <Link key={item.id} href={item.url} className="block">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

/* MOBILE */
function MobileItem({ item, closeMenu }: any) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="flex justify-between">
                <Link href={item.url} onClick={closeMenu}>
                    {item.name}
                </Link>
                <button onClick={() => setOpen(!open)}>
                    <ChevronDown size={16} />
                </button>
            </div>

            {open && item.children?.map((sub: any) => (
                <div key={sub.id} className="ml-4">
                    <Link href={sub.url} onClick={closeMenu}>
                        {sub.name}
                    </Link>
                </div>
            ))}
        </div>
    );
}