import Image from "next/image";
import Link from "next/link";
import { products } from "@/src/data/products";
import RelatedCarousel from "@/src/components/RelatedCarousel";

// ✅ Generate static paths
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// ✅ Product Page
export default async function ProductPage({ params }: any) {
  const { slug } = await params;

  const product = products.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold text-red-500">
          Product not found
        </h2>
      </div>
    );
  }

  // ✅ Related products
  const relatedProducts = products
    .filter((p) => p.slug !== product.slug)
   ;

  return (
    <>
      {/* ================= PRODUCT SECTION ================= */}
      <div className="p-6 md:p-10 grid md:grid-cols-2 gap-10">

        {/* Image */}
        <div className="relative w-full h-[400px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-cover rounded"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-semibold mb-4">
            {product.name}
          </h1>

          <p className="text-green-700 text-2xl mb-4">
            {product.price}
          </p>

          <p className="text-gray-600 mb-6">
            This is a beautiful handcrafted product perfect for your home decor.
            Made with high-quality materials and designed with care.
          </p>

          <div className="flex gap-4">
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
              Add to Cart
            </button>

            <button className="border px-6 py-2 rounded hover:bg-gray-100 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      <div className="p-6 md:p-10">
        <h2 className="text-2xl font-semibold mb-6">
          Related Products
        </h2>

        <RelatedCarousel products={relatedProducts} />
      </div>

      {/* ================= REVIEWS SECTION ================= */}
      <div className="p-6 md:p-10">
        <h2 className="text-2xl font-semibold mb-6">
          Customer Reviews
        </h2>

        {/* Sample Reviews */}
        <div className="space-y-4">
          <div className="border p-4 rounded">
            <p className="font-semibold">Rahul Sharma ⭐⭐⭐⭐⭐</p>
            <p className="text-gray-600 text-sm">
              Amazing quality! Totally worth the price.
            </p>
          </div>

          <div className="border p-4 rounded">
            <p className="font-semibold">Priya Das ⭐⭐⭐⭐</p>
            <p className="text-gray-600 text-sm">
              Beautiful design, fast delivery.
            </p>
          </div>
        </div>

        {/* Add Review */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">
            Write a Review
          </h3>

          <textarea
            className="w-full border p-3 rounded mb-3"
            placeholder="Write your review..."
          />

          <button className="bg-black text-white px-5 py-2 rounded">
            Submit Review
          </button>
        </div>
      </div>
    </>
  );
}