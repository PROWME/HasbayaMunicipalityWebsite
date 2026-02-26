"use client";

import { useEffect, useRef, useState } from "react";
import i18next from "@/lib/i18n";
import { I18nextProvider, useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const [direction, setDirection] = useState("rtl");
  const [fontClass, setFontClass] = useState("font-arabic");
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const isArabic = i18n.language === "first_lang";
    setDirection(isArabic ? "rtl" : "ltr");
    setFontClass(isArabic ? "font-arabic" : "font-english");
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [i18n.language]);

useEffect(() => {
  const nav = navRef.current;
  if (!nav) return;

  // ✅ Manually set height initially
  setNavHeight(nav.offsetHeight);

  const observer = new ResizeObserver(() => {
    setNavHeight(nav.offsetHeight);
  });

  observer.observe(nav);

  return () => observer.disconnect();
}, []);

  const shouldAddPadding = pathname !== "/";

  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  const routeTitles: Record<string, string> = {
    "/": "Hasbaya Municipality",
    "/history": "History - Hasbaya Municipality",
    "/services": "Services - Hasbaya Municipality",
    "/projects": "Projects - Hasbaya Municipality",
    "/news": "News - Hasbaya Municipality",
    "/media": "Media - Hasbaya Municipality",
    "/contact": "Contact Us - Hasbaya Municipality",
  };

  useEffect(() => {
    if (!mounted) return;
    const title = routeTitles[pathname] || "Hasbaya Municipality";
    document.title = title;
  }, [pathname, mounted]);

  return (
    <html lang={i18n.language} dir={direction}>
      <I18nextProvider i18n={i18next}>
        <body className={fontClass}>
          {!isAdminRoute && <Navbar ref={navRef} />}
          <main
            style={shouldAddPadding ? { paddingTop: navHeight } : undefined}
          >
            {children}
          </main>
          {!isAdminRoute && <Footer />}
        </body>
      </I18nextProvider>
    </html>
  );
}
