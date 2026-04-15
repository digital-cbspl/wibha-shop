import Image from "next/image";
import Link from "next/link";
import { products } from "@/src/data/products";
import RelatedCarousel from "@/src/components/RelatedCarousel";
import { Star, ShoppingBag, Heart, Truck, ShieldCheck, Tag, ChevronRight, Share2, Check, RefreshCw } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-[#f6f8f7]">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-[#bf0503] mb-4">Product not found</h2>
          <Link href="/shop" className="text-[#18582e] underline underline-offset-4">Return to Shop</Link>
        </div>
      </div>
    );
  }

  // ✅ Related products
  const relatedProducts = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  // Parse price logic for mockup
  const rawPriceMatch = product.price.match(/[\d.]+/);
  const rawPrice = rawPriceMatch ? parseFloat(rawPriceMatch[0]) : 50;
  const oldPrice = (rawPrice * 1.5).toFixed(2);

  return (
    <div className="bg-[#f6f8f7] min-h-[calc(100vh-80px)] font-sans pb-16">

      {/* ================= BREADCRUMBS ================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-xs text-gray-500 font-medium tracking-wide">
          <Link href="/" className="hover:text-[#18582e] transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-1" />
          <Link href="/shop" className="hover:text-[#18582e] transition-colors">Shop</Link>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>
      </div>

      {/* ================= MAIN PRODUCT SECTION ================= */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* LEFT: Image Gallery (60%) */}
          <div className="lg:w-[60%] flex gap-4 lg:sticky lg:top-4 h-fit">
            {/* Desktop Thumbnails */}
            <div className="hidden lg:flex flex-col gap-4 w-20 shrink-0">
              {[1, 2, 3, 4].map((idx) => (
                <div key={idx} className={`relative w-20 h-24 rounded border-2 overflow-hidden cursor-pointer ${idx === 1 ? 'border-[#18582e]' : 'border-transparent hover:border-gray-300'}`}>
                  <Image src={product.image} alt={`${product.name} view ${idx}`} fill className="object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            {/* Main Image View */}
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[600px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-600 hover:text-[#18582e] shadow-sm transition-all z-10">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Info (40%) */}
          <div className="lg:w-[40%] flex flex-col py-4 lg:py-8 lg:pr-8">

            {/* Brand & Title */}
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-widest text-[#18582e] uppercase mb-2">Wibha Exclusives</h2>
              <h1 className="text-3xl md:text-4xl font-serif text-gray-900 leading-tight mb-4">
                {product.name}
              </h1>

              {/* Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 border border-gray-200 bg-white px-3 py-1 rounded-full shadow-sm">
                  <h4 className="font-bold text-gray-800 text-sm">4.8</h4>
                  <Star size={14} fill="#b39024" className="text-[#b39024]" />
                  <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                  <span className="text-xs font-semibold text-gray-500">1.2k Ratings</span>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 mb-6"></div>

            {/* Pricing Section */}
            <div className="mb-8">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                <span className="text-xl text-gray-400 line-through pb-0.5">₹{oldPrice}</span>
                <span className="text-lg font-bold text-[#bf0503] pb-0.5 tracking-wide">(33% OFF)</span>
              </div>
              <p className="text-[#18582e] font-semibold text-sm">inclusive of all taxes</p>
            </div>

            {/* Offers Section */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                <Tag size={18} className="text-[#b39024]" /> Best Offers
              </h3>
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#18582e] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-sm text-gray-800">Special Price</span>
                      <p className="text-xs text-gray-500 mt-0.5">Get extra 10% off (price inclusive of cashback/coupon)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#18582e] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-sm text-gray-800">Bank Offer</span>
                      <p className="text-xs text-gray-500 mt-0.5">5% Unlimited Cashback on Axis Bank Credit Card</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 mb-10 pt-4">
              <button className="flex-1 bg-[#18582e] hover:bg-[#113f20] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#18582e]/20 hover:-translate-y-0.5">
                <ShoppingBag size={20} />
                ADD TO BAG
              </button>
              <button className="flex-1 bg-white border-2 border-gray-200 text-gray-800 hover:border-gray-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                <Heart size={20} className="text-gray-500" />
                WISHLIST
              </button>
            </div>

            <div className="w-full h-px bg-gray-200 mb-8"></div>

            {/* Delivery Options */}
            <div className="mb-10">
              <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                <Truck size={18} /> Delivery Options
              </h3>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="w-full p-4 pr-24 rounded-xl border border-gray-200 outline-none focus:border-[#18582e] transition-colors bg-white font-medium shadow-sm"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-[#bf0503] text-sm hover:text-red-800">
                  Check
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-4">Please enter PIN code to check delivery time & Pay on Delivery Availability</p>

              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-3"><Truck size={16} className="text-gray-400" /> 100% Original Products</li>
                <li className="flex items-center gap-3"><RefreshCw size={16} className="text-gray-400" /> Pay on delivery might be available</li>
                <li className="flex items-center gap-3"><ShieldCheck size={16} className="text-gray-400" /> Easy 14 days returns and exchanges</li>
              </ul>
            </div>

            {/* Product Details Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide border-b border-gray-100 pb-3">Product Details</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Experience unparalleled craftsmanship with our beautifully handcrafted authentic pieces. This {product.name.toLowerCase()} is perfect for elevating your home decor. Crafted with high-quality sustainable materials and designed meticulously with incredible care to detail.
              </p>

              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm mt-6">
                <div>
                  <h4 className="text-gray-400 mb-1 text-xs uppercase tracking-wider">Material</h4>
                  <p className="font-semibold text-gray-800">Premium Ceramic/Clay</p>
                </div>
                <div>
                  <h4 className="text-gray-400 mb-1 text-xs uppercase tracking-wider">Craftsmanship</h4>
                  <p className="font-semibold text-gray-800">Hand-painted</p>
                </div>
                <div>
                  <h4 className="text-gray-400 mb-1 text-xs uppercase tracking-wider">Care Instructions</h4>
                  <p className="font-semibold text-gray-800">Wipe with dry cloth</p>
                </div>
                <div>
                  <h4 className="text-gray-400 mb-1 text-xs uppercase tracking-wider">Origin</h4>
                  <p className="font-semibold text-gray-800">Made in India</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ================= RELATED PRODUCTS ================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 uppercase tracking-widest">
            Similar Products
          </h2>
        </div>
        <RelatedCarousel products={relatedProducts} />
      </section>

      {/* ================= REVIEWS SECTION ================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-10">
        <h2 className="text-2xl font-serif font-bold text-gray-900 uppercase tracking-widest mb-10 border-b border-gray-200 pb-4">
          Customer Reviews (120+)
        </h2>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Reviews Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center">
              <div className="text-6xl font-serif text-[#18582e] mb-2">4.8<span className="text-3xl text-gray-400">/5</span></div>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#b39024" className="text-[#b39024]" />
                ))}
              </div>
              <p className="text-sm text-gray-500 mb-6">Based on 1.2k Verified Buyers</p>
              <button className="w-full py-3 rounded-lg border-2 border-[#18582e] text-[#18582e] font-bold hover:bg-[#18582e] hover:text-white transition-colors">
                Write a Review
              </button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { name: "Aarav K.", date: "2 Weeks Ago", title: "Absolutely stunning craftsmanship", comment: "The detail on this piece is gorgeous. It completely changed the aesthetic of my living room. Fast delivery too!" },
              { name: "Priya S.", date: "1 Month Ago", title: "Worth every penny", comment: "I am totally in love with Wibha products. The authentic vibe is very strong and the quality of the ceramic is fantastic." }
            ].map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-1 text-[#b39024]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#b39024" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{review.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{review.comment}</p>
                <p className="text-xs text-gray-400 font-medium border-l-2 border-[#18582e] pl-3 py-1 bg-gray-50 uppercase tracking-widest">{review.name} <span className="text-green-600 lowercase inline-flex items-center gap-1 ml-2"><Check size={12} /> Verified Buyer</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}