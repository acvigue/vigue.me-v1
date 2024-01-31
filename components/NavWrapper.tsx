"use client";

import { useEffect, useState } from "react";

export default function NavWrapper({ children }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Navigation Menu"
      className={
        "sticky top-0 z-10 mx-auto flex w-full flex-nowrap justify-center px-8 md:px-0" +
        "bg-white !bg-opacity-40 py-3 backdrop-blur-md dark:bg-gray-900 print:hidden " +
        (scrollY > 130 ? "border-b border-gray-100/50 dark:border-gray-800/50" : "")
      }
    >
      {children}
    </nav>
  );
}
