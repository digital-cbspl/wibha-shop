"use client";

import Image from "next/image";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Product({ item, setSelectedProduct }: any) {
   const router = useRouter();
  return (
    <div className="group cursor-pointer"  onClick={() => router.push(`/product/${item.slug}`)}>

      <div className="relative bg-[#ede7e4] overflow-hidden w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[500px]">

        <Image
          src={item.image.src || item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />

        {/* Icons */}
        <div className="absolute right-4 top-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition duration-300">

          <IconBtn>
            <Heart size={16} />
          </IconBtn>

          <IconBtn
            onClick={(e: any) => {
              e.stopPropagation();
              setSelectedProduct(item); // ✅ modal trigger
            }}
          >
            <Eye size={16} />
          </IconBtn>

          <IconBtn>
            <ShoppingBag size={16} />
          </IconBtn>

        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition pointer-events-none" onClick={(e) => e.stopPropagation()}/>
      </div>

      <div className="mt-3 text-center">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {item.name}
        </h3>
        <p className="text-[#18582e] font-semibold">
          {item.price}
        </p>
      </div>

    </div>
  );
}

function IconBtn({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full shadow bg-white hover:bg-[#18582e] hover:text-white transition cursor-pointer"
    >
      {children}
    </button>
  );
}