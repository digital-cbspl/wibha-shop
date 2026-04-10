"use client";

import { SlidersHorizontal } from "lucide-react";

export default function SortBy({
  setShow,
  total = 0,
  start = 1,
  end = 16,
  keyword = "clothes",
  sort,
  setSort,
}: any) {
  return (
    <div className="mb-4">

      {/* Amazon Style Top Bar */}
      <div className="w-full bg-white px-4 py-2 flex items-center justify-between rounded mb-2">

        {/* Left: Result Text */}
        <p className="text-sm text-gray-800">
          <span className="font-semibold">{start}-{end}</span> of{" "}
          <span className="font-semibold">{total}</span> results for{" "}
          <span className="text-[#18582e] font-semibold">
            "{keyword}"
          </span>
        </p>

        {/* Right: Sort */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 hidden sm:block">
            Sort by:
          </label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-200 rounded px-2 py-1 text-sm bg-white"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="new">Newest</option>
            <option value="rating">Avg. Customer Review</option>
          </select>
        </div>
      </div>

      {/* Bottom Row: Filter Button (mobile) */}
      <div className="flex items-center justify-between">
        <button
          className="md:hidden flex items-center gap-2 border px-3 py-2 rounded"
          onClick={() => setShow(true)}
        >
          <SlidersHorizontal size={16} />
          Filter
        </button>
      </div>
    </div>
  );
}