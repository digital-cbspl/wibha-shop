"use client";

import Link from "next/link";

export default function AdminFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto py-3 px-6 border-t border-gray-100 bg-white/50">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-500 font-medium">
                
                {/* Left Side: Copyright */}
                <div>
                    &copy; {currentYear} WIBHA | All Rights Reserved || Developed by CBSPL.
                </div>

                
            </div>
        </footer>
    );
}