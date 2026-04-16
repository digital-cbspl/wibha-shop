"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    Search, 
    Plus, 
    Filter, 
    MoreHorizontal, 
    Edit, 
    Trash2, 
    Eye,
    ChevronDown
} from "lucide-react";

// Import your local images
import { img1, img2, img3, img4 } from "../../../../assets/image/image"; 

// Mock data matching your database structure using local images
const products = [
    {
        id: 1,
        name: "Handwoven Ikat Saree",
        category: "Clothing",
        type: "Sarees",
        material: "Cotton",
        price: "₹2,499.00",
        stock: 45,
        isActive: true,
        image: img1.src
    },
    {
        id: 2,
        name: "Pattachitra Wall Art",
        category: "Craft",
        type: "Pattachitra",
        material: "Tusser",
        price: "₹3,200.00",
        stock: 12,
        isActive: true,
        image: img2.src
    },
    {
        id: 3,
        name: "Linen Kurta Set",
        category: "Clothing",
        type: "Kurta Set",
        material: "Linen",
        price: "₹1,850.00",
        stock: 0,
        isActive: false,
        image: img3.src
    },
    {
        id: 4,
        name: "Example new Product Update",
        category: "Clothing",
        type: "All Clothing",
        material: "Cotton",
        price: "₹59.99",
        stock: 150,
        isActive: true,
        image: img4.src
    }
];

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Products</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your catalog, pricing, and inventory.</p>
                </div>
                <Link 
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit"
                >
                    <Plus size={16} /> Add Product
                </Link>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/20 overflow-hidden flex flex-col">
                
                {/* Toolbar (Search & Filter) */}
                <div className="p-5 border-b border-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    
                    {/* Search */}
                    <div className="relative w-full sm:w-[320px]">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Search size={16} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-[#18582e]/20 focus:border-[#18582e] transition-all text-sm font-medium placeholder-gray-400"
                        />
                    </div>
                    
                    {/* Filter Dropdown Container */}
                    <div className="relative w-full sm:w-auto">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${isFilterOpen ? 'bg-gray-50 border-gray-300 text-gray-900' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Filter size={16} /> Filters <ChevronDown size={14} className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Filter Menu Popup */}
                        {isFilterOpen && (
                            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 z-20 p-5 animate-in fade-in slide-in-from-top-2 duration-200">
                                
                                {/* Status Filter */}
                                <div className="mb-5">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Status</h3>
                                    <div className="space-y-2.5">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Active</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Draft</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div className="mb-6">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Category</h3>
                                    <div className="space-y-2.5">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Clothing</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Craft</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Accessories</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4 border-t border-gray-50">
                                    <button 
                                        onClick={() => setIsFilterOpen(false)}
                                        className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg transition-colors"
                                    >
                                        Clear
                                    </button>
                                    <button 
                                        onClick={() => setIsFilterOpen(false)}
                                        className="flex-1 py-2 bg-[#18582e] hover:bg-[#134624] text-white text-xs font-semibold rounded-lg transition-colors shadow-md shadow-[#18582e]/20"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase w-[350px]">Product Info</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Category & Type</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Pricing</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Stock</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Status</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/30 transition-colors group">
                                    
                                    {/* Product Info */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                                                <Image 
                                                    src={product.image} 
                                                    alt={product.name} 
                                                    fill 
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 group-hover:text-[#18582e] transition-colors line-clamp-1">{product.name}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">ID: {product.id}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category Data */}
                                    <td className="py-4 px-6">
                                        <p className="text-sm text-gray-900 font-medium">{product.category}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{product.type} &bull; {product.material}</p>
                                    </td>

                                    {/* Pricing */}
                                    <td className="py-4 px-6">
                                        <p className="text-sm font-semibold text-gray-900">{product.price}</p>
                                    </td>

                                    {/* Stock */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                                            <span className="text-sm font-medium text-gray-700">{product.stock} in stock</span>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider
                                            ${product.isActive ? 'bg-[#18582e]/10 text-[#18582e]' : 'bg-gray-100 text-gray-500'}`}>
                                            {product.isActive ? 'Active' : 'Draft'}
                                        </span>
                                    </td>

                                    {/* Actions - Now Always Visible */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
                                                <Eye size={18} strokeWidth={1.5} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-[#18582e] hover:bg-[#18582e]/10 rounded-lg transition-colors" title="Edit">
                                                <Edit size={18} strokeWidth={1.5} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                <Trash2 size={18} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Mock) */}
                <div className="p-5 border-t border-gray-50 flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-medium text-xs">Showing 1 to 4 of 45 products</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-500 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-900 font-medium hover:bg-gray-50 transition-colors">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
}