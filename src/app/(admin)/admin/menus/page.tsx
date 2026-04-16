"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import {
    Plus,
    Edit,
    Trash2,
    LayoutTemplate,
    GripVertical,
    Link as LinkIcon,
    MonitorPlay,
    PanelBottom,
    Save
} from "lucide-react";
import EditMenuModal from "@/src/components/EditMenuModal";

const getLocationBadge = (location: string) => {
    const isHeader = location?.toLowerCase().includes('header');
    const style = isHeader
        ? "bg-blue-50 text-blue-700 border-blue-100"
        : "bg-purple-50 text-purple-700 border-purple-100";
    const Icon = isHeader ? MonitorPlay : PanelBottom;

    return (
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${style}`}>
            <Icon size={12} /> {location}
        </span>
    );
};

// Drag Ref Type Definition
type DragContext = {
    tier: 'main' | 'sub' | 'mega';
    gIdx: number;
    mIdx: number;
    sIdx?: number;
    mgIdx?: number;
};

export default function NavigationMenusPage() {
    const [menuGroups, setMenuGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSavingSort, setIsSavingSort] = useState(false);

    const [draggingId, setDraggingId] = useState<number | null>(null);

    // We only need to track what we picked up. The drop target will be passed by the onDrop event.
    const dragItem = useRef<DragContext | null>(null);

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/menu");
            const transformed = transformMenuData(response.data);
            setMenuGroups(transformed);
        } catch (error) {
            console.error("Failed to fetch menus:", error);
        } finally {
            setLoading(false);
        }
    };

    const transformMenuData = (data: any[]) => {
        const locations: any = {};

        data.forEach((row: any) => {
            const loc = row.main_loc || 'Header';
            if (!locations[loc]) {
                locations[loc] = { name: `${loc} Navigation`, location: loc, items: [] };
            }

            let mainItem = locations[loc].items.find((i: any) => i.id === row.main_id);
            if (!mainItem && row.main_id) {
                mainItem = { id: row.main_id, title: row.main_menu, url: row.main_url, type: 'Main', subItems: [] };
                locations[loc].items.push(mainItem);
            }

            let subItem = null;
            if (row.submenu_id && mainItem) {
                subItem = mainItem.subItems.find((s: any) => s.id === row.submenu_id);
                if (!subItem) {
                    subItem = { id: row.submenu_id, title: row.submenu, url: row.submenu_url, type: 'Submenu', megaItems: [] };
                    mainItem.subItems.push(subItem);
                }
            }

            if (row.mega_id && subItem) {
                const megaExists = subItem.megaItems.find((m: any) => m.id === row.mega_id);
                if (!megaExists) {
                    subItem.megaItems.push({ id: row.mega_id, title: row.mega_menu, url: row.mega_url, type: 'Mega' });
                }
            }
        });

        return Object.values(locations);
    };

    // 👉 NEW: Bulletproof Drop Logic
    const handleDrop = (e: React.DragEvent, targetTier: 'main' | 'sub' | 'mega', gIdx: number, mIdx: number, sIdx?: number, mgIdx?: number) => {
        e.preventDefault();
        e.stopPropagation();

        if (!dragItem.current) return;

        const from = dragItem.current;
        const to = { tier: targetTier, gIdx, mIdx, sIdx, mgIdx };

        // Ensure we only swap within the exact same parent container
        if (from.tier !== to.tier || from.gIdx !== to.gIdx) {
            setDraggingId(null);
            return;
        }

        setMenuGroups(prevGroups => {
            const newGroups = JSON.parse(JSON.stringify(prevGroups)); // Deep clone

            try {
                if (from.tier === 'main') {
                    if (from.mIdx === to.mIdx) return newGroups;
                    const list = newGroups[from.gIdx].items;
                    const [dragged] = list.splice(from.mIdx, 1);
                    list.splice(to.mIdx, 0, dragged);
                    list.forEach((val: any, idx: number) => val.sort_order = idx + 1);
                }
                else if (from.tier === 'sub') {
                    if (from.mIdx !== to.mIdx || from.sIdx === to.sIdx) return newGroups;
                    const list = newGroups[from.gIdx].items[from.mIdx].subItems;
                    const [dragged] = list.splice(from.sIdx!, 1);
                    list.splice(to.sIdx!, 0, dragged);
                    list.forEach((val: any, idx: number) => val.sort_order = idx + 1);
                }
                else if (from.tier === 'mega') {
                    if (from.mIdx !== to.mIdx || from.sIdx !== to.sIdx || from.mgIdx === to.mgIdx) return newGroups;
                    const list = newGroups[from.gIdx].items[from.mIdx].subItems[from.sIdx!].megaItems;
                    const [dragged] = list.splice(from.mgIdx!, 1);
                    list.splice(to.mgIdx!, 0, dragged);
                    list.forEach((val: any, idx: number) => val.sort_order = idx + 1);
                }
            } catch (err) {
                console.error("Sorting error:", err);
            }

            return newGroups;
        });

        dragItem.current = null;
        setDraggingId(null);
    };

    const saveSortOrder = async () => {
        setIsSavingSort(true);
        try {
            const sortPayload: { id: number, sort_order: number }[] = [];

            menuGroups.forEach(group => {
                group.items.forEach((main: any, mainIdx: number) => {
                    sortPayload.push({ id: main.id, sort_order: mainIdx + 1 });
                    if (main.subItems) {
                        main.subItems.forEach((sub: any, subIdx: number) => {
                            sortPayload.push({ id: sub.id, sort_order: subIdx + 1 });
                            if (sub.megaItems) {
                                sub.megaItems.forEach((mega: any, megaIdx: number) => {
                                    sortPayload.push({ id: mega.id, sort_order: megaIdx + 1 });
                                });
                            }
                        });
                    }
                });
            });

            await axios.put("http://localhost:5000/api/menu/reorder", { items: sortPayload });
            alert("Sort order saved!");
        } catch (err) {
            console.error("Failed to save sort order", err);
            alert("Failed to save sort order.");
        } finally {
            setIsSavingSort(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this menu item?")) {
            try {
                await axios.delete(`http://localhost:5000/api/menu/${id}`);
                fetchMenus();
            } catch (error) {
                alert("Failed to delete item");
            }
        }
    };
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingMenuId, setEditingMenuId] = useState<number | null>(null);

    const handleEditClick = (id: number) => {
        setEditingMenuId(id);
        setIsEditModalOpen(true);
    };

    const handleEditSuccess = () => {
        setIsEditModalOpen(false);
        fetchMenus(); // Refresh the list after successful edit
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading Menus...</div>;



    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Navigation Menus</h1>
                    <p className="text-sm text-gray-500 mt-1">Design the structure of your storefront's header and footer links.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={saveSortOrder}
                        disabled={isSavingSort}
                        className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50"
                    >
                        <Save size={16} /> {isSavingSort ? "Saving..." : "Save Order"}
                    </button>
                    <Link href="/admin/menus/new" className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit">
                        <Plus size={16} /> Create Menu Group
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {menuGroups.map((group, gIdx) => (
                        <div key={gIdx} className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 overflow-hidden">
                            <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h2 className="font-serif text-lg font-medium text-[#1a1a1a]">{group.name}</h2>
                                        {getLocationBadge(group.location)}
                                    </div>
                                    <p className="text-xs text-gray-500">{group.items.length} top-level links</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={`/admin/menus/new?location=${group.location}`} className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all shadow-sm">
                                        <Plus size={14} /> Add Link
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-3">
                                    {group.items.map((main: any, mIdx: number) => (
                                        <div key={main.id} className="space-y-3">

                                            {/* 👉 TIER 1: MAIN MENU */}
                                            <div
                                                draggable
                                                onDragStart={(e) => {
                                                    e.stopPropagation();
                                                    dragItem.current = { tier: 'main', gIdx, mIdx };
                                                    setDraggingId(main.id);
                                                }}
                                                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                                onDrop={(e) => handleDrop(e, 'main', gIdx, mIdx)}
                                                onDragEnd={() => setDraggingId(null)}
                                                className={`flex items-center justify-between p-3 rounded-xl border transition-all group cursor-grab active:cursor-grabbing 
                                                    ${draggingId === main.id ? 'opacity-50 border-blue-400 bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:border-[#18582e]/30 hover:shadow-sm'}`}
                                            >
                                                <div className="flex items-center gap-3 pointer-events-none">
                                                    <div className="text-gray-300 group-hover:text-gray-500">
                                                        <GripVertical size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{main.title}</p>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <LinkIcon size={10} className="text-gray-400" />
                                                            <span className="text-[11px] text-gray-500 font-mono">{main.url}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEditClick(main.id)}
                                                        className="p-1.5 text-gray-400 hover:text-[#18582e] hover:bg-[#18582e]/10 rounded-lg transition-colors"
                                                    >
                                                        <Edit size={14} />
                                                    </button>
                                                    <button onClick={() => handleDelete(main.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* 👉 TIER 2: SUBMENU ITEMS */}
                                            {main.subItems && main.subItems.length > 0 && (
                                                <div className="pl-8 space-y-3 relative before:absolute before:left-4 before:top-0 before:bottom-4 before:w-px before:bg-gray-200">
                                                    {main.subItems.map((sub: any, sIdx: number) => (
                                                        <div key={sub.id} className="space-y-3">
                                                            <div
                                                                draggable
                                                                onDragStart={(e) => {
                                                                    e.stopPropagation();
                                                                    dragItem.current = { tier: 'sub', gIdx, mIdx, sIdx };
                                                                    setDraggingId(sub.id);
                                                                }}
                                                                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                                                onDrop={(e) => handleDrop(e, 'sub', gIdx, mIdx, sIdx)}
                                                                onDragEnd={() => setDraggingId(null)}
                                                                className={`flex items-center justify-between p-3 rounded-xl border transition-all group relative cursor-grab active:cursor-grabbing
                                                                    ${draggingId === sub.id ? 'opacity-50 border-purple-400 bg-purple-50 shadow-md z-10' : 'border-gray-100 bg-gray-50 hover:border-[#18582e]/20 hover:bg-white'}`}
                                                            >
                                                                <div className="absolute -left-4 top-1/2 w-4 h-px bg-gray-200 pointer-events-none"></div>
                                                                <div className="flex items-center gap-3 pointer-events-none">
                                                                    <div className="text-gray-300">
                                                                        <GripVertical size={16} />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-gray-800">{sub.title}</p>
                                                                        <div className="flex items-center gap-2 mt-0.5">
                                                                            <span className="text-[10px] text-gray-400 font-mono">{sub.url}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <button
                                                                        onClick={() => handleEditClick(main.id)}
                                                                        className="p-1.5 text-gray-400 hover:text-[#18582e] hover:bg-[#18582e]/10 rounded-lg transition-colors"
                                                                    >
                                                                        <Edit size={14} />
                                                                    </button>
                                                                    <button onClick={() => handleDelete(sub.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* 👉 TIER 3: MEGA ITEMS */}
                                                            {sub.megaItems && sub.megaItems.length > 0 && (
                                                                <div className="pl-10 space-y-2 relative before:absolute before:left-4 before:top-0 before:bottom-4 before:w-px before:bg-gray-100">
                                                                    {sub.megaItems.map((mega: any, mgIdx: number) => (
                                                                        <div
                                                                            key={mega.id}
                                                                            draggable
                                                                            onDragStart={(e) => {
                                                                                e.stopPropagation();
                                                                                dragItem.current = { tier: 'mega', gIdx, mIdx, sIdx, mgIdx };
                                                                                setDraggingId(mega.id);
                                                                            }}
                                                                            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                                                            onDrop={(e) => handleDrop(e, 'mega', gIdx, mIdx, sIdx, mgIdx)}
                                                                            onDragEnd={() => setDraggingId(null)}
                                                                            className={`flex items-center justify-between p-2 rounded-lg border transition-all group relative cursor-grab active:cursor-grabbing
                                                                                ${draggingId === mega.id ? 'opacity-50 border-green-400 bg-green-50 z-10 shadow-sm' : 'border-transparent hover:border-gray-200 hover:bg-gray-50'}`}
                                                                        >
                                                                            <div className="absolute -left-6 top-1/2 w-4 h-px bg-gray-100 pointer-events-none"></div>
                                                                            <div className="flex items-center gap-3 pointer-events-none">
                                                                                <div className="text-gray-300 hover:text-gray-500">
                                                                                    <LayoutTemplate size={14} />
                                                                                </div>
                                                                                <div>
                                                                                    <p className="text-xs font-medium text-gray-600">{mega.title}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                <button
                                                                                    onClick={() => handleEditClick(main.id)}
                                                                                    className="p-1.5 text-gray-400 hover:text-[#18582e] hover:bg-[#18582e]/10 rounded-lg transition-colors"
                                                                                >
                                                                                    <Edit size={14} />
                                                                                </button>
                                                                                <button onClick={() => handleDelete(mega.id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                                                                    <Trash2 size={12} />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="space-y-6">

                    {/* Information Card */}
                    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                        <div className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 mb-4 shadow-sm">
                            <LayoutTemplate size={20} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-serif text-lg font-medium text-[#1a1a1a] mb-2">How Menus Work</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            You can build custom menus here and assign them to specific locations in your storefront theme.
                        </p>
                        <ul className="space-y-3">
                            <li className="text-sm text-gray-600 flex items-start gap-2">
                                <div className="mt-1"><MonitorPlay size={14} className="text-blue-500" /></div>
                                <span><strong>Header Locations</strong> support up to 2 levels of dropdowns (Sub-links).</span>
                            </li>
                            <li className="text-sm text-gray-600 flex items-start gap-2">
                                <div className="mt-1"><PanelBottom size={14} className="text-purple-500" /></div>
                                <span><strong>Footer Locations</strong> are flat lists and do not support dropdowns.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Link Generator */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6">
                        <h3 className="font-serif text-lg font-medium text-[#1a1a1a] mb-4">Link Generator</h3>
                        <p className="text-xs text-gray-500 mb-4">Quickly find internal system URLs to copy and paste into your menus.</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Resource Type</label>
                                <select className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] text-sm font-medium text-gray-900 cursor-pointer appearance-none">
                                    <option>Categories</option>
                                    <option>Materials</option>
                                    <option>System Pages</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Select Item</label>
                                <select className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] text-sm font-medium text-gray-900 cursor-pointer appearance-none">
                                    <option>Sarees</option>
                                    <option>Kurta Sets</option>
                                    <option>Suit Pieces</option>
                                </select>
                            </div>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
                                <span className="text-xs font-mono text-gray-600">/category/sarees</span>
                                <button className="text-xs font-bold text-[#18582e] hover:underline">Copy</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <EditMenuModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                menuId={editingMenuId}
                onSuccess={handleEditSuccess}
            />
        </div>

    );
}