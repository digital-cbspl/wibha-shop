"use client";

import { useState } from "react";
import Filter from "@/src/shop/Filter";
import Product from "@/src/shop/Product";
import SortBy from "@/src/shop/Sortby";
import QuickViewModal from "@/src/components/QuickViewModal";
import { products } from "@/src/data/products"; // ✅ IMPORT

export default function ShopPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <>
      <div className="w-full flex bg-[#EEEEEE] p-4 md:p-6">
        
        <Filter show={showFilter} setShow={setShowFilter} />

        <div className="flex-1 pl-4 md:pl-6">

          <SortBy setShow={setShowFilter} total={products.length} />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 mt-4">
            {products.map((item) => (
              <Product
                key={item.id}
                item={item}
                setSelectedProduct={setSelectedProduct}
              />
            ))}
          </div>

        </div>
      </div>

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}