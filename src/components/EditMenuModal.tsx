"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { X, Save, Loader2, MonitorPlay, PanelBottom, Link as LinkIcon } from "lucide-react";

interface EditMenuModalProps {
    isOpen: boolean;
    onClose: () => void;
    menuId: number | null;
    onSuccess: () => void;
}

export default function EditMenuModal({ isOpen, onClose, menuId, onSuccess }: EditMenuModalProps) {
    // Form States
    const [name, setName] = useState("");
    const [slug, setSlug] = useState(""); 
    const [url, setUrl] = useState("");
    const [menuLocation, setMenuLocation] = useState('header');
    const [menuType, setMenuType] = useState('main'); 
    const [parentId, setParentId] = useState<string>("");
    const [isActive, setIsActive] = useState<number>(1);
    
    // UI Configuration State
    const [originalType, setOriginalType] = useState('main'); 
    
    // Data States
    const [allMenus, setAllMenus] = useState<any[]>([]); 
    const [availableParents, setAvailableParents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateSlug = (text: string) => {
        return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
    };

    // 1. Fetch data safely, anticipating both single-row and joined-row API responses
    useEffect(() => {
        if (isOpen && menuId) {
            const initializeData = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const [itemRes, allRes] = await Promise.all([
                        axios.get(`http://localhost:5000/api/menu/${menuId}`),
                        axios.get(`http://localhost:5000/api/menu`)
                    ]);

                    const item = Array.isArray(itemRes.data) ? itemRes.data[0] : itemRes.data;
                    setAllMenus(allRes.data); 

                    // BULLETPROOF EXTRACTION: Works even if your API returns joined header formatting
                    const detectedType = item.type || (item.submenu_id === menuId ? 'submenu' : item.mega_id === menuId ? 'mega' : 'main');
                    const detectedName = item.name || (detectedType === 'submenu' ? item.submenu : detectedType === 'mega' ? item.mega_menu : item.main_menu) || "";
                    const detectedUrl = item.url || (detectedType === 'submenu' ? item.submenu_url : detectedType === 'mega' ? item.mega_url : item.main_url) || "";
                    const detectedParent = item.parent_id || (detectedType === 'submenu' ? item.main_id : detectedType === 'mega' ? item.submenu_id : "");
                    const detectedLoc = item.location || item.main_loc || "header";

                    setName(detectedName);
                    setSlug(item.slug || generateSlug(detectedName));
                    setUrl(detectedUrl);
                    setMenuLocation(detectedLoc);
                    setMenuType(detectedType);
                    setOriginalType(detectedType); 
                    setParentId(detectedParent ? detectedParent.toString() : "");
                    setIsActive(item.is_active !== undefined ? item.is_active : 1);

                } catch (err) {
                    console.error("Failed to fetch menu data:", err);
                    setError("Failed to load menu data. Please check your network.");
                } finally {
                    setIsLoading(false);
                }
            };

            initializeData();
        } else {
            setName("");
            setSlug("");
            setUrl("");
            setParentId("");
            setOriginalType('main');
            setAllMenus([]);
            setAvailableParents([]);
            setError(null);
        }
    }, [isOpen, menuId]);

    // 2. Filter the exact correct parents based on the menu level
    useEffect(() => {
        if (!allMenus.length || !isOpen) return;

        let filteredParents: any[] = [];

        if (menuType === 'submenu') {
            const uniqueMains = new Map();
            allMenus.forEach((m: any) => {
                if (m.main_loc === menuLocation && m.main_id && m.main_id !== menuId && !uniqueMains.has(m.main_id)) {
                    uniqueMains.set(m.main_id, { id: m.main_id, name: m.main_menu });
                }
            });
            filteredParents = Array.from(uniqueMains.values());
        } 
        else if (menuType === 'mega') {
            const uniqueSubs = new Map();
            allMenus.forEach((m: any) => {
                if (m.main_loc === menuLocation && m.submenu_id && m.submenu_id !== menuId && !uniqueSubs.has(m.submenu_id)) {
                    uniqueSubs.set(m.submenu_id, { id: m.submenu_id, name: `${m.main_menu} > ${m.submenu}` });
                }
            });
            filteredParents = Array.from(uniqueSubs.values());
        }

        setAvailableParents(filteredParents);

        // Keep the existing parent if it's valid, otherwise default to the first available
        setParentId(currentParentId => {
            if (menuType === 'main') return ""; 
            if (filteredParents.length > 0 && !filteredParents.some(p => p.id.toString() === currentParentId)) {
                return filteredParents[0].id.toString(); 
            }
            return currentParentId;
        });

    }, [menuType, menuLocation, allMenus, menuId, isOpen]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setSlug(generateSlug(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!menuId) return;

        if (menuType !== 'main' && !parentId) {
            setError(`Please select a valid Parent for this ${menuType}.`);
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const payload = {
                name: name.trim(),
                slug: slug.trim() || generateSlug(name), 
                location: menuLocation,
                type: menuType,
                parent_id: menuType === 'main' ? null : parseInt(parentId),
                url: url.trim() || "#",
                is_active: isActive,
            };

            await axios.put(`http://localhost:5000/api/menu/${menuId}`, payload);
            onSuccess(); 
        } catch (err: any) {
            console.error("Update error:", err);
            setError(err.response?.data?.message || "Failed to update menu.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    // Determine Title based on type
    const modalTitle = originalType === 'main' 
        ? "Edit Main Menu" 
        : originalType === 'submenu' 
            ? "Edit Submenu" 
            : "Edit Mega Menu Item";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                
                <div className="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm text-gray-500">
                            <LinkIcon size={16} />
                        </div>
                        <h2 className="font-serif text-xl font-medium text-[#1a1a1a]">{modalTitle}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-xl transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-500 gap-3">
                            <Loader2 size={28} className="animate-spin text-[#18582e]" />
                            <p className="text-sm font-medium">Loading data...</p>
                        </div>
                    ) : (
                        <form id="edit-menu-form" onSubmit={handleSubmit} className="space-y-6">
                            
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            {/* 👉 SHOW ONLY FOR MAIN MENU */}
                            {originalType === 'main' && (
                                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Display Location <span className="text-red-500">*</span></label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <label className={`relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${menuLocation === 'header' ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-500 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                            <input type="radio" name="location" value="header" checked={menuLocation === 'header'} onChange={() => setMenuLocation('header')} className="text-blue-600 focus:ring-blue-500" />
                                            <div className="flex items-center gap-2">
                                                <MonitorPlay size={16} className={menuLocation === 'header' ? 'text-blue-600' : 'text-gray-500'} />
                                                <span className={`text-sm font-bold ${menuLocation === 'header' ? 'text-blue-900' : 'text-gray-900'}`}>Main Header</span>
                                            </div>
                                        </label>

                                        <label className={`relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${menuLocation === 'footer' ? 'bg-purple-50 border-purple-200 ring-1 ring-purple-500 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                            <input type="radio" name="location" value="footer" checked={menuLocation === 'footer'} onChange={() => { setMenuLocation('footer'); setMenuType('main'); }} className="text-purple-600 focus:ring-purple-500" />
                                            <div className="flex items-center gap-2">
                                                <PanelBottom size={16} className={menuLocation === 'footer' ? 'text-purple-600' : 'text-gray-500'} />
                                                <span className={`text-sm font-bold ${menuLocation === 'footer' ? 'text-purple-900' : 'text-gray-900'}`}>Footer List</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* 👉 SHOW ONLY FOR SUBMENU & MEGA MENU */}
                            {originalType !== 'main' && (
                                <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                                    <label className="block text-sm font-medium text-blue-900 mb-2">
                                        Assign to {originalType === 'submenu' ? 'Parent Main Menu' : 'Parent Submenu'} <span className="text-red-500">*</span>
                                    </label>
                                    {availableParents.length === 0 ? (
                                        <p className="text-sm text-red-600 font-medium">No valid parents found for this tier.</p>
                                    ) : (
                                        <select 
                                            value={parentId}
                                            onChange={(e) => setParentId(e.target.value)}
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 font-medium shadow-sm"
                                        >
                                            <option value="" disabled>-- Select a parent item --</option>
                                            {availableParents.map(parent => (
                                                <option key={parent.id} value={parent.id}>{parent.name}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            )}

                            {/* Basic Details (Always Visible) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Name <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={name}
                                        onChange={handleNameChange}
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] text-sm text-gray-900 transition-all"
                                        placeholder="e.g., Sarees"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] text-sm text-gray-900 transition-all"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Navigation URL <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] text-sm text-gray-900 font-mono transition-all"
                                        placeholder="/collections/sarees"
                                    />
                                    <p className="text-[11px] text-gray-500 mt-1.5">Use "#" if this item is a dropdown trigger.</p>
                                </div>
                            </div>

                            {/* Status (Always Visible) */}
                            <div className="pt-2 border-t border-gray-100">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
                                <div className="flex gap-3">
                                    <label className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${isActive === 1 ? 'border-[#18582e] bg-[#18582e]/5 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input type="radio" name="status" checked={isActive === 1} onChange={() => setIsActive(1)} className="hidden" />
                                        <span className={`text-sm font-medium ${isActive === 1 ? 'text-[#18582e]' : 'text-gray-600'}`}>Active (Visible)</span>
                                    </label>
                                    <label className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${isActive === 0 ? 'border-gray-500 bg-gray-50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input type="radio" name="status" checked={isActive === 0} onChange={() => setIsActive(0)} className="hidden" />
                                        <span className={`text-sm font-medium ${isActive === 0 ? 'text-gray-900' : 'text-gray-600'}`}>Draft (Hidden)</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
                    <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" form="edit-menu-form" disabled={isSubmitting || isLoading} className="flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-black transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm">
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>

            </div>
        </div>
    );
}