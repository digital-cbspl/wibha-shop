"use client";

export default function Filter({ show, setShow }: any) {
  return (
    <aside
      className={`fixed md:static top-0 left-0 h-full w-[280px] bg-white z-50 p-6 shadow-md transition-transform ${
        show ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Category */}
      <FilterSection title="Category">
        <label><input type="checkbox" /> Perfume</label>
        <label><input type="checkbox" /> Attar</label>
        <label><input type="checkbox" /> Gift Sets</label>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        <label><input type="checkbox" /> Under ₹1000</label>
        <label><input type="checkbox" /> ₹1000 - ₹3000</label>
        <label><input type="checkbox" /> Above ₹3000</label>
      </FilterSection>

      {/* Close (mobile) */}
      <button
        className="md:hidden mt-4 bg-[#18582e] text-white px-4 py-2 rounded"
        onClick={() => setShow(false)}
      >
        Close
      </button>
    </aside>
  );
}

function FilterSection({ title, children }: any) {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="flex flex-col gap-2 text-sm text-gray-600">
        {children}
      </div>
    </div>
  );
}