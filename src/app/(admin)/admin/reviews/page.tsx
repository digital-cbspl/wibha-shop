"use client";

import { useState } from "react";
import { 
    Search, 
    Filter, 
    MoreHorizontal, 
    Trash2, 
    MessageSquare,
    Eye,
    Star,
    ChevronDown
} from "lucide-react";

// Mock data based on your database structure (reviews joined with users and products)
const reviews = [
    { 
        id: 1, 
        user: "Bishnu Prasad Dash", 
        product: "Suit Pieces", 
        rating: 5, 
        reviewText: "Excellent product. The material quality is superb and exactly as described.", 
        date: "Apr 09, 2026" 
    },
    { 
        id: 2, 
        user: "Ariana Grand", 
        product: "Handwoven Ikat Saree", 
        rating: 5, 
        reviewText: "Absolutely beautiful craftsmanship. Highly recommend!", 
        date: "Apr 10, 2026" 
    },
    { 
        id: 3, 
        user: "John Doe", 
        product: "Linen Kurta Set", 
        rating: 4, 
        reviewText: "Very comfortable, but the fitting was slightly looser than expected. Still a great purchase.", 
        date: "Apr 12, 2026" 
    },
    { 
        id: 4, 
        user: "Elena Gilbert", 
        product: "Pattachitra Wall Art", 
        rating: 2, 
        reviewText: "The frame arrived with a small scratch on the corner. The painting itself is fine.", 
        date: "Apr 14, 2026" 
    },
];

// Helper component to render stars
const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                    key={star} 
                    size={14} 
                    className={star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} 
                />
            ))}
        </div>
    );
};

export default function ReviewsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-medium text-[#1a1a1a]">Product Reviews</h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor customer feedback and product ratings.</p>
                </div>
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
                            placeholder="Search by product or customer..." 
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
                                
                                {/* Rating Filter */}
                                <div className="mb-6">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Rating Score</h3>
                                    <div className="space-y-3">
                                        {[5, 4, 3, 2, 1].map((stars) => (
                                            <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#18582e] focus:ring-[#18582e]/20 cursor-pointer" />
                                                <StarRating rating={stars} />
                                                <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900">({stars})</span>
                                            </label>
                                        ))}
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
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase w-[300px]">Customer Details</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase w-[200px]">Product</th>
                                <th className="py-4 px-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Rating & Review</th>
                                <th className="py-4 px-6 md:px-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {reviews.map((review) => (
                                <tr key={review.id} className="hover:bg-gray-50/30 transition-colors group">
                                    
                                    {/* Customer Info */}
                                    <td className="py-4 px-6 md:px-8 align-top">
                                        <div className="flex items-start gap-4 mt-1">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-serif font-bold border border-blue-100 shrink-0 text-sm">
                                                {review.user.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{review.user}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{review.date}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Product */}
                                    <td className="py-4 px-6 align-top">
                                        <p className="text-sm font-medium text-gray-900 group-hover:text-[#18582e] transition-colors line-clamp-2 mt-1">{review.product}</p>
                                        <p className="text-xs text-gray-400 mt-1">ID: #{review.id}</p>
                                    </td>

                                    {/* Review Content */}
                                    <td className="py-4 px-6 align-top">
                                        <div className="space-y-2 mt-1">
                                            <StarRating rating={review.rating} />
                                            <p className="text-sm text-gray-600 leading-relaxed max-w-md line-clamp-2">
                                                "{review.reviewText}"
                                            </p>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="py-4 px-6 md:px-8 text-right align-top">
                                        <div className="flex items-center justify-end gap-1.5 mt-1 hidden sm:flex">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Read Full Review">
                                                <MessageSquare size={16} strokeWidth={1.5} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="View Product">
                                                <Eye size={16} strokeWidth={1.5} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Review">
                                                <Trash2 size={16} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                        {/* Mobile fallback */}
                                        <button className="sm:hidden p-2 text-gray-400 hover:bg-gray-50 rounded-lg mt-1">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-5 border-t border-gray-50 flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-medium text-xs">Showing 1 to 4 of 24 reviews</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-500 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-900 font-medium hover:bg-gray-50 transition-colors">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
}