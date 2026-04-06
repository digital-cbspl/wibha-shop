"use client";

import { useEffect, useState } from "react";

const messages = [
  "CASH ON DELIVERY AVAILABLE",
  "FREE SHIPPING ON ORDERS ABOVE ₹999",
  "NEW ARRIVALS JUST DROPPED",
  "EXCLUSIVE OFFERS THIS WEEK"
];

export default function TopBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white text-center text-sm py-2 tracking-wide">
      {messages[index]}
    </div>
  );
}