"use client";

export default function Preloader() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative flex flex-col items-center">
                
                {/* Brand Name */}
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a1a1a] tracking-widest animate-pulse">
                    WIBHA
                </h1>
            

                {/* Elegant Custom Spinner */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-12 h-12 border-4 border-gray-100 rounded-full"></div>
                    <div className="absolute w-12 h-12 border-4 border-transparent border-t-[#18582e] rounded-full animate-spin"></div>
                </div>

            </div>
        </div>
    );
}