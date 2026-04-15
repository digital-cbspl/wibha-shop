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
export default function Header() {
    const [active, setActive] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    const [menu, setMenu] = useState<any[]>([]);

    /* ---------------- FETCH MENU ---------------- */
    useEffect(() => {
        axios.get("http://localhost:5000/api/menu")
            .then((res) => {

                const data = res.data;
                const map: any = {};

                data.forEach((row: any) => {

                    // MAIN
                    if (!map[row.main_id]) {
                        map[row.main_id] = {
                            name: row.main_menu,
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
                                children: []
                            };
                            map[row.main_id].children.push(sub);
                        }

                        // MEGA
                        if (row.mega_id) {
                            sub.children.push({
                                id: row.mega_id,
                                name: row.mega_menu
                            });
                        }
                    }

                });

                setMenu(Object.values(map));
            })
            .catch((err) => {
                console.error("API ERROR 👉", err);
            });
    }, []);

    const handleEnter = (menu: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActive(menu));
    };

    const handleLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActive(null), 200);
    };

    return (
        <header className="w-full bg-white sticky top-9 z-50">

            {/* MAIN HEADER */}
            <div className="max-w-full mx-auto flex items-center justify-between py-1 px-4 md:px-15">

                {/* LOGO */}
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

                    {menu.map((item: any, i: number) => {
                        const key = item.name.toLowerCase();

                        return (
                            <NavItem
                                key={i}
                                label={item.name.toUpperCase()}
                                hasDropdown={item.children.length > 0}
                                onEnter={() => handleEnter(key)}
                                onLeave={handleLeave}
                            >

                                {active === key && item.children.length > 0 && (

                                    item.children.some((c: any) => c.children.length > 0)

                                        ? (
                                            <MegaMenuDynamic data={item.children} />
                                        )

                                        : (
                                            <Dropdown>
                                                {item.children.map((child: any, j: number) => (
                                                    <a key={j}>{child.name}</a>
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
                        <Search size={16} />
                    </div>

                    <User size={20} />
                    <Heart size={20} />

                    <div className="relative">
                        <ShoppingBag size={20} />
                        <span className="absolute -top-2 -right-2 text-[10px] bg-[#18582e] text-white rounded-full px-1.5">
                            0
                        </span>
                    </div>

                    <button className="md:hidden" onClick={() => setMobileOpen(true)}>
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
                <div className="flex justify-between p-4">
                    <span className="font-semibold">MENU</span>
                    <X onClick={() => setMobileOpen(false)} />
                </div>

                <div className="flex flex-col gap-4 p-4 text-sm">
                    {menu.map((item: any, i: number) => (
                        <MobileItem key={i} label={item.name}>
                            {item.children.map((sub: any, j: number) => (
                                <span key={j}>{sub.name}</span>
                            ))}
                        </MobileItem>
                    ))}
                </div>
            </div>
        </header>
    );
}

/* ---------------- NAV ITEM ---------------- */

function NavItem({ label, children, hasDropdown, onEnter, onLeave }: any) {
    return (
        <div
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="relative flex items-center gap-1 cursor-pointer"
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
        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg p-4 min-w-[180px] z-50 flex flex-col gap-2 text-sm">
            {children}
        </div>
    );
}

/* ---------------- DYNAMIC MEGA MENU ---------------- */

function MegaMenuDynamic({ data }: any) {
    return (
        <div className="fixed left-1/2 -translate-x-1/2 top-[80px] w-screen bg-white shadow-xl z-40">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">

                {data.map((col: any, i: number) => (
                    <MenuColumn
                        key={i}
                        title={col.name}
                        items={col.children.map((c: any) => c.name)}
                    />
                ))}

                <div className="hidden md:block">
                    <div className="bg-gray-200 h-[140px] rounded-md" />
                    <p className="mt-3 text-sm font-medium">
                        Up to 50% Off On Select Item
                    </p>
                </div>

            </div>
        </div>
    );
}

/* ---------------- COLUMN ---------------- */

function MenuColumn({ title, items }: any) {
    return (
        <div>
            <h4 className="font-semibold mb-3 text-sm">{title}</h4>
            <ul className="space-y-2 text-sm text-gray-600">
                {items.map((item: string, i: number) => (
                    <li key={i} className="hover:text-black cursor-pointer">
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
        <div>
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                {label}
                <ChevronDown
                    size={16}
                    className={open ? "rotate-180 transition" : "transition"}
                />
            </div>

            {open && (
                <div className="mt-2 ml-3 flex flex-col gap-2 text-gray-600">
                    {children}
                </div>
            )}
        </div>
    );
}