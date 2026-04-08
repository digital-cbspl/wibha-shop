"use client";

import Image from "next/image";

export default function Product({ item }: any) {
  return (
    <div className="group">

      {/* Image */}
      <div className="bg-[#ede7e4] p-6 rounded-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={200}
          height={200}
          className="mx-auto object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="mt-3 text-center">
        <h3 className="text-sm font-medium text-gray-800">
          {item.name}
        </h3>
        <p className="text-[#18582e] font-semibold">
          {item.price}
        </p>
      </div>

    </div>
  );
}