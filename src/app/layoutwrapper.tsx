"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import TopBar from "../layout/TopBar";
// import GlobalPreloader from "../components/GlobalPreloader";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const excludedRoutes = ["/admin"];

  const isExcluded = excludedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    if (isExcluded) return;

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [isExcluded]);

  if (loading && !isExcluded) {
    return <div>Loading...</div>; // or <GlobalPreloader />
  }

  if (isExcluded) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </>
  );
}