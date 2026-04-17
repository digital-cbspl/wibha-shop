"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { 
    ChevronLeft, 
    Save, 
    LayoutTemplate,
    MonitorPlay,
    PanelBottom,
    Loader2
} from "lucide-react";
import { API_BASE_URL } from "@/src/src/utils/config";

export default function CreateMenuPage() {
    const router = useRouter();
    
    // Form States
    const [name, setName] = useState("");
    const [url, setUrl] = useState("#");
    const [menuLocation, setMenuLocation] = useState('header');
    const [menuType, setMenuType] = useState('main'); // 'main', 'submenu', 'mega'
    const [parentId, setParentId] = useState<string>("");
    const [isActive, setIsActive] = useState<number>(1);
    
    // Data States
    const [availableParents, setAvailableParents] = useState<any[]>([]);
    
    // UI States
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingParents, setIsLoadingParents] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch potential parent items when 'type' or 'location' changes
    useEffect(() => {
        if (menuType === 'main') {
            setAvailableParents([]);
            setParentId("");
            return;
        }
        
        fetchParents();
    }, [menuType, menuLocation]);

    const fetchParents = async () => {
        setIsLoadingParents(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/menu`);
            const allMenus = response.data;
            
            let filteredParents: any[] = [];

            if (menuType === 'submenu') {
                // If creating a submenu, we need MAIN items in the selected location
                filteredParents = allMenus.filter((m: any) => m.main_loc === menuLocation && !m.submenu_id);
                // We only want unique main menus
                const uniqueMains = new Map();
                allMenus.forEach((m: any) => {
                    if (m.main_loc === menuLocation && m.main_id && !uniqueMains.has(m.main_id)) {
                        uniqueMains.set(m.main_id, { id: m.main_id, name: m.main_menu });
                    }
                });
                filteredParents = Array.from(uniqueMains.values());
            } 
            else if (menuType === 'mega') {
                // If creating a mega menu, we need SUBMENU items in the selected location
                const uniqueSubs = new Map();
                allMenus.forEach((m: any) => {
                    if (m.main_loc === menuLocation && m.submenu_id && !uniqueSubs.has(m.submenu_id)) {
                        uniqueSubs.set(m.submenu_id, { id: m.submenu_id, name: `${m.main_menu} > ${m.submenu}` });
                    }
                });
                filteredParents = Array.from(uniqueSubs.values());
            }

            setAvailableParents(filteredParents);
            
            // Auto-select first available parent
            if (filteredParents.length > 0) {
                setParentId(filteredParents[0].id.toString());
            } else {
                setParentId("");
            }

        } catch (err) {
            console.error("Failed to fetch parents", err);
        } finally {
            setIsLoadingParents(false);
        }
    };

    const generateSlug = (text: string) => {
        return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (menuType !== 'main' && !parentId) {
            setError(`Please select a Parent item for this ${menuType}.`);
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const payload = {
                name: name.trim(),
                slug: generateSlug(name),
                location: menuLocation,
                type: menuType, 
                url: url.trim(),
                parent_id: menuType === 'main' ? null : parseInt(parentId),
                is_active: isActive,
                sort_order: 99 // Put new items at the end by default
            };

            await axios.post(`${API_BASE_URL}/api/menu`, payload);
            
            router.push("/admin/menus");
            router.refresh();

        } catch (err: any) {
            console.error("Submission error:", err);
            setError(err.response?.data?.message || "Failed to create menu item.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/menus" className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Create Menu Link</h1>
                        <p className="text-sm text-gray-500 mt-1">Add a new link to your storefront navigation.</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <Link href="/admin/menus" className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        Discard
                    </Link>
                    <button 
                        type="submit"
                        form="create-menu-form"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                        {isSubmitting ? "Saving..." : "Save Link"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            <form id="create-menu-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 space-y-8">
                    
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-6">Menu Details</h2>
                        
                        <div className="space-y-6">
                            
                            {/* Location Assignment */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Display Location <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${menuLocation === 'header' ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                        <input type="radio" name="location" value="header" checked={menuLocation === 'header'} onChange={() => { setMenuLocation('header'); setMenuType('main'); }} className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <MonitorPlay size={16} className={menuLocation === 'header' ? 'text-blue-600' : 'text-gray-500'} />
                                                <span className={`text-sm font-bold ${menuLocation === 'header' ? 'text-blue-900' : 'text-gray-900'}`}>Main Header</span>
                                            </div>
                                            <p className={`text-xs ${menuLocation === 'header' ? 'text-blue-700' : 'text-gray-500'}`}>Top navigation bar. Supports dropdowns.</p>
                                        </div>
                                    </label>

                                    <label className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${menuLocation === 'footer' ? 'bg-purple-50 border-purple-200 ring-1 ring-purple-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                        <input type="radio" name="location" value="footer" checked={menuLocation === 'footer'} onChange={() => { setMenuLocation('footer'); setMenuType('main'); }} className="mt-1 w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300" />
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <PanelBottom size={16} className={menuLocation === 'footer' ? 'text-purple-600' : 'text-gray-500'} />
                                                <span className={`text-sm font-bold ${menuLocation === 'footer' ? 'text-purple-900' : 'text-gray-900'}`}>Footer List</span>
                                            </div>
                                            <p className={`text-xs ${menuLocation === 'footer' ? 'text-purple-700' : 'text-gray-500'}`}>Bottom of page. Flat list format only.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* 👉 NEW: Menu Level Selector */}
                            <div className="pt-2 border-t border-gray-100">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Hierarchy Level</label>
                                <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200 w-fit">
                                    <button type="button" onClick={() => setMenuType('main')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${menuType === 'main' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Top Level (Main)</button>
                                    
                                    {/* Disable sub/mega for Footer */}
                                    <button type="button" onClick={() => setMenuType('submenu')} disabled={menuLocation === 'footer'} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed ${menuType === 'submenu' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Submenu</button>
                                    
                                    <button type="button" onClick={() => setMenuType('mega')} disabled={menuLocation === 'footer'} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed ${menuType === 'mega' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Mega Menu</button>
                                </div>
                            </div>

                            {/* 👉 NEW: Dynamic Parent Selector */}
                            {menuType !== 'main' && (
                                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                    <label className="block text-sm font-medium text-blue-900 mb-2">
                                        Assign to Parent <span className="text-red-500">*</span>
                                    </label>
                                    {isLoadingParents ? (
                                        <div className="flex items-center gap-2 text-sm text-blue-600"><Loader2 size={14} className="animate-spin" /> Loading available parents...</div>
                                    ) : availableParents.length === 0 ? (
                                        <p className="text-sm text-red-600 font-medium">No valid parents found. Create a {menuType === 'submenu' ? 'Main Menu' : 'Submenu'} first.</p>
                                    ) : (
                                        <select 
                                            value={parentId}
                                            onChange={(e) => setParentId(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                                        >
                                            <option value="" disabled>-- Select a parent item --</option>
                                            {availableParents.map(parent => (
                                                <option key={parent.id} value={parent.id}>{parent.name}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Name <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={menuType === 'main' ? "e.g., Shop" : "e.g., Summer Collection"} 
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">URL Path <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="/collection/summer" 
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-mono text-gray-900"
                                    />
                                    <p className="text-[11px] text-gray-500 mt-2">Use "#" if this item is just a dropdown trigger.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-8">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 p-6 md:p-8">
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a] mb-5">Status</h2>
                        
                        <div className="space-y-3">
                            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${isActive === 1 ? 'border-[#18582e] bg-[#18582e]/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <input type="radio" name="status" checked={isActive === 1} onChange={() => setIsActive(1)} className="w-4 h-4 text-[#18582e] focus:ring-[#18582e]" />
                                <span className={`text-sm font-medium ${isActive === 1 ? 'text-[#18582e]' : 'text-gray-700'}`}>Active (Visible)</span>
                            </label>
                            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${isActive === 0 ? 'border-gray-500 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <input type="radio" name="status" checked={isActive === 0} onChange={() => setIsActive(0)} className="w-4 h-4 text-gray-600 focus:ring-gray-500" />
                                <span className={`text-sm font-medium ${isActive === 0 ? 'text-gray-900' : 'text-gray-700'}`}>Draft (Hidden)</span>
                            </label>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}