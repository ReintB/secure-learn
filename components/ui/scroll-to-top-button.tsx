"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll ke atas"
      className={`fixed z-50 bottom-6 right-6 p-3 rounded-full shadow-lg bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-300 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        visible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-90 pointer-events-none"
      }`}
      style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)" }}
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}
