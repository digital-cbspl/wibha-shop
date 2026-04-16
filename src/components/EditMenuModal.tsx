"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { X, Save, Loader2 } from "lucide-react";

interface EditMenuModalProps {
    isOpen: boolean;
    onClose: () => void;
    menuId: number | null;
    onSuccess: () => void; // Callback to refresh the list
}

export default function EditMenuModal({ isOpen, onClose, menuId, onSuccess }: EditMenuModalProps) {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [menuLocation, setMenuLocation] = useState('header');
    const [isActive, setIsActive] = useState<number>(1);
    
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch existing data when the modal opens
    useEffect(() => {
        if (isOpen && menuId) {
            fetchMenuData(menuId);
        }
    }, [isOpen, menuId]);

    const fetchMenuData = async (id: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:5000/api/menu/${id}`);
            const data = response.data;
            
            setName(data.name || "");
            setUrl(data.url || "");
            setMenuLocation(data.location || "header");
            setIsActive(data.is_active);
        } catch (err) {
            console.error("Failed to fetch menu:", err);
            setError("Failed to load menu data.");
        } finally {
            setIsLoading(false);
        }
    };

    const generateSlug = (text: string) => {
        return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!menuId) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const payload = {
                name: name.trim(),
                slug: generateSlug(name),
                location: menuLocation,
                url: url.trim() || "#",
                is_active: isActive,
            };

            await axios.put(`http://localhost:5000/api/menu/${menuId}`, payload);
            
            onSuccess(); // Close modal and refresh parent data
        } catch (err: any) {
            console.error("Update error:", err);
            setError(err.response?.data?.message || "Failed to update menu.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <h2 className="font-serif text-xl font-medium text-[#1a1a1a]">Edit Menu Item</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-10 text-gray-500 gap-3">
                            <Loader2 size={24} className="animate-spin" />
                            <p className="text-sm">Loading details...</p>
                        </div>
                    ) : (
                        <form id="edit-menu-form" onSubmit={handleSubmit} className="space-y-5">
                            
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Display Name <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    required 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] text-sm text-gray-900 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Navigation URL <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    required 
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] text-sm text-gray-900 font-mono transition-all"
                                />
                                <p className="text-[11px] text-gray-500 mt-1.5">Use "#" if this item is a dropdown trigger.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <div className="flex gap-3">
                                    <label className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${isActive === 1 ? 'border-[#18582e] bg-[#18582e]/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input type="radio" name="status" checked={isActive === 1} onChange={() => setIsActive(1)} className="hidden" />
                                        <span className={`text-sm font-medium ${isActive === 1 ? 'text-[#18582e]' : 'text-gray-600'}`}>Active</span>
                                    </label>
                                    <label className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${isActive === 0 ? 'border-gray-500 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input type="radio" name="status" checked={isActive === 0} onChange={() => setIsActive(0)} className="hidden" />
                                        <span className={`text-sm font-medium ${isActive === 0 ? 'text-gray-900' : 'text-gray-600'}`}>Hidden</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50/50">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        form="edit-menu-form"
                        disabled={isSubmitting || isLoading}
                        className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>

            </div>
        </div>
    );
}