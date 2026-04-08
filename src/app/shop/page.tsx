"use client";

import Filter from "@/src/shop/Filter";
import Product from "@/src/shop/Product";
import SortBy from "@/src/shop/Sortby";
import { useState } from "react";

const products = Array.from({ length: 12 }).map((_, i) => ({
  name: `Product ${i + 1}`,
  price: `$${30 + i}`,
  image: "/p1.png",
}));

export default function ShopPage() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="w-full flex">

      <Filter show={showFilter} setShow={setShowFilter} />

      <div className="flex-1 p-6">

        <SortBy setShow={setShowFilter} />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item, i) => (
            <Product key={i} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
}