"use client";

import { SlidersHorizontal } from "lucide-react";

export default function SortBy({ setShow }: any) {
  return (
    <div className="flex items-center justify-between mb-6">

      {/* Filter Button (mobile) */}
      <button
        className="md:hidden flex items-center gap-2 border px-3 py-2 rounded"
        onClick={() => setShow(true)}
      >
        <SlidersHorizontal size={16} />
        Filter
      </button>

      {/* Sort */}
      <div className="ml-auto">
        <select className="border px-3 py-2 rounded outline-none">
          <option>Sort by</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>

    </div>
  );
}