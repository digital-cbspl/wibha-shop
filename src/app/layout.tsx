import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./layoutwrapper";
import { Suspense } from "react";
import Preloader from "../components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WIBHA",
  description: "Handcrafted Treasures for Modern Living",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        
        <LayoutWrapper>
          <Suspense fallback={<Preloader />}>
          {children}
          </Suspense>
        </LayoutWrapper>

      </body>
    </html>
  );
}