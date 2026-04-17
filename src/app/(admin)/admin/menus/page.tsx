"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { 
    Plus, Edit, Trash2, LayoutTemplate, GripVertical, 
    Link as LinkIcon, MonitorPlay, PanelBottom, Save, CheckCircle, AlertCircle 
} from "lucide-react";
import EditMenuModal from "@/src/components/EditMenuModal";
// 1. Import Toast components
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "@/src/src/utils/config";

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
    const dragItem = useRef<DragContext | null>(null);

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/api/menu`);
            const transformed = transformMenuData(response.data);
            setMenuGroups(transformed);
        } catch (error) {
            toast.error("Failed to load menus");
            console.error(error);
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

    const handleDrop = (e: React.DragEvent, targetTier: 'main' | 'sub' | 'mega', gIdx: number, mIdx: number, sIdx?: number, mgIdx?: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (!dragItem.current) return;
        const from = dragItem.current;
        const to = { tier: targetTier, gIdx, mIdx, sIdx, mgIdx };
        if (from.tier !== to.tier || from.gIdx !== to.gIdx) {
            setDraggingId(null);
            return;
        }

        setMenuGroups(prevGroups => {
            const newGroups = JSON.parse(JSON.stringify(prevGroups));
            let list: any[] = [];
            try {
                if (from.tier === 'main') {
                    list = newGroups[from.gIdx].items;
                } else if (from.tier === 'sub') {
                    if (from.mIdx !== to.mIdx) return newGroups;
                    list = newGroups[from.gIdx].items[from.mIdx].subItems;
                } else if (from.tier === 'mega') {
                    if (from.mIdx !== to.mIdx || from.sIdx !== to.sIdx) return newGroups;
                    list = newGroups[from.gIdx].items[from.mIdx].subItems[from.sIdx!].megaItems;
                }
                const fromIdx = from.tier === 'main' ? from.mIdx : (from.tier === 'sub' ? from.sIdx! : from.mgIdx!);
                const toIdx = to.tier === 'main' ? to.mIdx : (to.tier === 'sub' ? to.sIdx! : to.mgIdx!);
                const [draggedItem] = list.splice(fromIdx, 1);
                list.splice(toIdx, 0, draggedItem);
                list.forEach((item, index) => { item.sort_order = index + 1; });
            } catch (err) { console.error(err); }
            return newGroups;
        });
        dragItem.current = null;
        setDraggingId(null);
    };

    const saveSortOrder = async () => {
        setIsSavingSort(true);
        // 2. Use toast.promise for a nice loading/success flow
        const savePromise = (async () => {
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

            await axios.put(`${API_BASE_URL}/api/menu/reorder`, { items: sortPayload });
            fetchMenus();
        })();

        toast.promise(savePromise, {
            loading: 'Saving menu structure...',
            success: 'Menu order saved successfully!',
            error: 'Failed to save changes.',
        }, {
            style: { borderRadius: '12px', background: '#333', color: '#fff', fontSize: '14px' },
            success: { duration: 3000, icon: <CheckCircle className="text-green-400" size={18} /> },
            error: { icon: <AlertCircle className="text-red-400" size={18} /> }
        });

        setIsSavingSort(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Delete this menu item?")) {
            try {
                await axios.delete(`${API_BASE_URL}/api/menu/${id}`);
                toast.success("Item deleted");
                fetchMenus();
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingMenuId, setEditingMenuId] = useState<number | null>(null);

    const handleEditClick = (id: number) => {
        setEditingMenuId(null);
        setTimeout(() => {
            setEditingMenuId(id);
            setIsEditModalOpen(true);
        }, 10);
    };

    const handleEditSuccess = () => {
        setIsEditModalOpen(false);
        toast.success("Menu updated");
        fetchMenus();
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading Menus...</div>;

    return (
        <div className="space-y-6 pb-10">
            {/* 3. Global Toaster Component */}
            <Toaster position="top-right" reverseOrder={false} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Navigation Menus</h1>
                    <p className="text-sm text-gray-500 mt-1">Design the structure of your storefront header and footer.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={saveSortOrder}
                        disabled={isSavingSort}
                        className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50"
                    >
                        <Save size={16} /> {isSavingSort ? "Saving..." : "Save Order"}
                    </button>
                    <Link href="/admin/menus/new" className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black transition-all">
                        <Plus size={16} /> Create Menu Group
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {menuGroups.map((group, gIdx) => (
                        <div key={gIdx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <h2 className="font-serif text-lg font-medium text-[#1a1a1a]">{group.name}</h2>
                                    {getLocationBadge(group.location)}
                                </div>
                                <Link href={`/admin/menus/new?location=${group.location}`} className="text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1">
                                    <Plus size={14} /> Add Link
                                </Link>
                            </div>

                            <div className="p-6">
                                <div className="space-y-3">
                                    {group.items.map((main: any, mIdx: number) => (
                                        <div key={main.id} className="space-y-3">
                                            {/* MAIN MENU */}
                                            <div
                                                draggable
                                                onDragStart={(e) => {
                                                    e.stopPropagation();
                                                    dragItem.current = { tier: 'main', gIdx, mIdx };
                                                    setDraggingId(main.id);
                                                }}
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => handleDrop(e, 'main', gIdx, mIdx)}
                                                onDragEnd={() => setDraggingId(null)}
                                                className={`flex items-center justify-between p-3 rounded-xl border transition-all group cursor-grab active:cursor-grabbing 
                                                    ${draggingId === main.id ? 'opacity-50 border-blue-400 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                            >
                                                <div className="flex items-center gap-3 pointer-events-none">
                                                    <GripVertical size={18} className="text-gray-300" />
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{main.title}</p>
                                                        <span className="text-[11px] text-gray-500 font-mono">{main.url}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleEditClick(main.id)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit size={14} /></button>
                                                    <button onClick={() => handleDelete(main.id)} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 size={14} /></button>
                                                </div>
                                            </div>

                                            {/* SUBMENU */}
                                            {main.subItems?.length > 0 && (
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
                                                                onDragOver={(e) => e.preventDefault()}
                                                                onDrop={(e) => handleDrop(e, 'sub', gIdx, mIdx, sIdx)}
                                                                onDragEnd={() => setDraggingId(null)}
                                                                className={`flex items-center justify-between p-3 rounded-xl border transition-all group cursor-grab 
                                                                    ${draggingId === sub.id ? 'opacity-50 border-purple-400 bg-purple-50' : 'border-gray-100 bg-gray-50 hover:bg-white'}`}
                                                            >
                                                                <div className="flex items-center gap-3 pointer-events-none">
                                                                    <GripVertical size={16} className="text-gray-300" />
                                                                    <p className="text-sm font-medium text-gray-800">{sub.title}</p>
                                                                </div>
                                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                                                                    <button onClick={() => handleEditClick(sub.id)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit size={14} /></button>
                                                                    <button onClick={() => handleDelete(sub.id)} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 size={14} /></button>
                                                                </div>
                                                            </div>

                                                            {/* MEGA MENU */}
                                                            {sub.megaItems?.length > 0 && (
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
                                                                            onDragOver={(e) => e.preventDefault()}
                                                                            onDrop={(e) => handleDrop(e, 'mega', gIdx, mIdx, sIdx, mgIdx)}
                                                                            onDragEnd={() => setDraggingId(null)}
                                                                            className={`flex items-center justify-between p-2 rounded-lg border transition-all group
                                                                                ${draggingId === mega.id ? 'opacity-50 border-green-400 bg-green-50' : 'border-transparent hover:bg-gray-50'}`}
                                                                        >
                                                                            <div className="flex items-center gap-3 pointer-events-none">
                                                                                <LayoutTemplate size={14} className="text-gray-300" />
                                                                                <p className="text-xs font-medium text-gray-600">{mega.title}</p>
                                                                            </div>
                                                                            <button onClick={() => handleEditClick(mega.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded"><Edit size={12} /></button>
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
                    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                        <div className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 mb-4 shadow-sm">
                            <LayoutTemplate size={20} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-serif text-lg font-medium text-[#1a1a1a] mb-2">How Menus Work</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            You can build custom menus here and assign them to specific locations in your storefront theme.
                        </p>
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