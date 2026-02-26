"use client";

import React, { useEffect, useState, forwardRef } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { usePathname } from "next/navigation";

const Navbar = forwardRef<HTMLDivElement>((props, ref) => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isWhitePage =
    pathname === "/history" ||
    pathname === "/media" ||
    pathname === "/contact" ||
    pathname.startsWith("/news") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/services") ||
    pathname.startsWith("/payments") ||
    pathname.startsWith("/adminServices") ||
    pathname.startsWith("/realEstate");

  useEffect(() => {
    if (isWhitePage) return;

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isWhitePage]);

  return (
    <nav
      ref={ref}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isWhitePage ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between items-center">
          <DesktopNavbar scrolled={scrolled || isWhitePage} />
          <MobileNavbar scrolled={scrolled || isWhitePage} />
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
