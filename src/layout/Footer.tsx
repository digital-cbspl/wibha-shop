"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { Mail } from "lucide-react";
import { logo, mastercard, upi, visa } from "../assets/image/image";

export default function Footer() {
    return (
        <footer className="bg-[#ffffff] text-gray-800 backdrop-blur-sm shadow-lg shadow-gray-200/40 border-t border-gray-50">

            {/* TOP */}
            <div className="max-w-full mx-auto px-4 md:px-15 py-12 grid gap-10 md:grid-cols-5">

                {/* Logo + About */}
                <div>
                    <Image
                        src={logo.src} 
                        alt="Logo"
                        width={140}
                        height={50}
                        className="mb-3 object-contain"
                    />

                    <p className="text-sm text-gray-500 leading-relaxed">
                        Discover timeless traditional products crafted with heritage and care. Bring home the essence of culture in every piece.
                    </p>

                    {/* Social */}
                    <div className="flex gap-3 mt-4">
                        <SocialIcon><FaFacebookF /></SocialIcon>
                        <SocialIcon><FaInstagram /></SocialIcon>
                        <SocialIcon><FaTwitter /></SocialIcon>
                    </div>
                </div>

                {/* Shop */}
                <FooterCol
                    title="Shop"
                    items={[
                        "All Products",
                        "New Arrivals",
                        "Best Sellers",
                        "Offers",
                    ]}
                />

                {/* Company */}
                <FooterCol
                    title="Company"
                    items={[
                        "About Us",
                        "Careers",
                        "Blog",
                        "Privacy Policy",
                    ]}
                />

                {/* Support */}
                <FooterCol
                    title="Support"
                    items={[
                        "Contact Us",
                        "Track Order",
                        "Shipping & Returns",
                        "FAQs",
                    ]}
                />

                {/* Newsletter */}
                <div>
                    <h3 className="font-semibold mb-3">Stay Updated</h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Subscribe to get special offers and updates.
                    </p>

                    <div className="flex border rounded-md overflow-hidden bg-white">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-3 py-2 text-sm outline-none flex-1"
                        />
                        <button className="bg-[#18582e] px-2 flex items-center justify-center text-white">
                            <Mail size={18} />
                        </button>
                    </div>
                </div>

            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-200"></div>

            {/* BOTTOM */}
            <div className="max-w-full mx-auto px-4 md:px-15 py-2 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">

                <p>© {new Date().getFullYear()} WIBHA | All Rights Reserved || Developed by CBSPL. </p>

                {/* Payments */}
                <div className="flex items-center gap-4">

                    <PaymentImg src={visa.src} alt="Visa" />
                    <PaymentImg src={mastercard.src} alt="Mastercard" />
                    <PaymentImg src={upi.src} alt="UPI" />

                </div>

            </div>
        </footer>
    );
}

/* COLUMN */
function FooterCol({ title, items }: any) {
    return (
        <div>
            <h3 className="font-semibold mb-3">{title}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
                {items.map((item: string, i: number) => (
                    <li key={i} className="hover:text-[#18582e] cursor-pointer transition">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* SOCIAL ICON */
function SocialIcon({ children }: any) {
    return (
        <div className="p-2 rounded-full bg-gray-200 hover:bg-[#18582e] hover:text-white cursor-pointer transition">
            {children}
        </div>
    );
}
function PaymentImg({ src, alt }: any) {
    return (
        <div className="h-8 flex items-center justify-center">
            <Image
                src={src}
                alt={alt}
                width={45}
                height={25}
                className="object-contain grayscale hover:grayscale-0 transition duration-300"
            />
        </div>
    );
}