"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import i18n from "@/lib/i18n";
import { AiOutlineGlobal } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { FiLogIn } from "react-icons/fi";
import LoginForm from "./LoginForm";

const links = [
  { name: "history", href: "/history" },
  { name: "services", href: "/services" },
  { name: "projects", href: "/projects" },
  { name: "news", href: "/news" },
  { name: "media", href: "/media" },
  { name: "contact", href: "/contact" },
];

export default function MobileNavbar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation("mainInfo");
  const pathname = usePathname();
  const [showLogin, setShowLogin] = useState(false);
  const isArabic = i18n.language === "first_lang";

  const currentLang = i18n.language;

  const changeLanguage = (lang: string) => {
    Cookies.set("lang", lang);
    i18n.changeLanguage(lang);
    setShowDropdown(false);
  };

  const isWhiteNav =
    pathname === "/history" ||
    pathname === "/media" ||
    pathname === "/contact" ||
    pathname === "/news" ||
    pathname === "/projects" ||
    pathname === "/services";

  const isDarkText = scrolled || isWhiteNav;

  return (
    <div className="md:hidden flex justify-between items-center w-full py-2">
      <Link href="/">
        <Image
          src="/Final_logo_Hasbaya_Municipality.png"
          alt="Logo"
          width={80}
          height={40}
          priority
          className="object-contain"
        />
      </Link>
      <div className="flex gap-3">
        <div>
          <button onClick={() => setOpen(true)}>
            <Menu
              className={`${
                isDarkText
                  ? "text-darkOlive hover:text-mossGreen"
                  : "text-white hover:text-mossGreen"
              }`}
            />
          </button>
        </div>

        <div className="relative">
          <button
            name="language"
            onClick={() => setShowDropdown(!showDropdown)}
            className={`${
              isDarkText
                ? "text-darkOlive hover:text-mossGreen"
                : "text-white hover:text-mossGreen"
            }`}
          >
            <AiOutlineGlobal className="w-6 h-6" />
          </button>

          {showDropdown && (
            <div
              className={`absolute mt-2 w-28 bg-white rounded shadow-md z-50 text-sm ${
                currentLang === "first_lang" ? "left-0" : "right-0"
              }`}
            >
              <button
                onClick={() => changeLanguage("english")}
                className={`block w-full px-4 py-2 text-left hover:bg-gray-100 text-black ${
                  currentLang === "english" ? "font-bold" : ""
                }`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage("first_lang")}
                className={`block w-full px-4 py-2 text-left hover:bg-gray-100 text-black ${
                  currentLang === "first_lang" ? "font-bold" : ""
                }`}
              >
                العربية
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            name="login"
            onClick={() => setShowLogin(!showLogin)}
            className={`transition ${
              isDarkText ? "text-darkOlive" : "text-white"
            }`}
          >
            <FiLogIn className={`w-6 h-6 ${isArabic ? "rotate-180" : ""}`} />
          </button>

          {showLogin && (
            <div
              className={`absolute top-8 ${
                isArabic ? "left-0" : "right-0"
              } bg-white rounded-lg shadow-lg p-4 w-80 z-50 ${
                isArabic ? "text-right" : "text-left"
              }`}
              dir={isArabic ? "rtl" : "ltr"}
            >
              <LoginForm onClose={() => setShowLogin(false)} />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className={`fixed top-0 h-full w-72 bg-mossGreen text-white shadow-lg z-50 px-6 ${
                currentLang === "first_lang" ? "left-0" : "right-0"
              }`}
              initial={{ x: currentLang === "first_lang" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: currentLang === "first_lang" ? "-100%" : "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="flex justify-between py-2">
                <Image
                  src="/Final_logo_Hasbaya_Municipality.png"
                  alt="Logo"
                  width={80}
                  height={40}
                  priority
                  className="object-contain"
                />
                <button onClick={() => setOpen(false)}>
                  <X className="w-6 h-6 hover:text-gray-200" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-4">
                {links.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link key={link.name} href={link.href}>
                      <span
                        className={`hover:underline ${
                          isActive ? "underline" : ""
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {t(link.name)}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
