"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineGlobal } from "react-icons/ai";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { FiLogIn } from "react-icons/fi";
import LoginForm from "./LoginForm";

const links = [
  { key: "history", href: "/history" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "news", href: "/news" },
  { key: "media", href: "/media" },
  { key: "contact", href: "/contact" },
];

export default function DesktopNavbar({ scrolled }: { scrolled: boolean }) {
  const { t, i18n } = useTranslation("mainInfo");
  const [showDropdown, setShowDropdown] = useState(false);
  const currentLang = i18n.language;
  const pathname = usePathname();
  const [showLogin, setShowLogin] = useState(false);
  const isArabic = i18n.language === "first_lang";

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
    <div className="hidden md:flex items-center justify-between w-full py-2">
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

      <div className="flex items-center gap-6 relative">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link key={link.key} href={link.href}>
              <span
                className={`${isActive ? "underline" : ""} hover:underline ${
                  isDarkText ? "text-darkOlive" : "text-white"
                }`}
              >
                {t(link.key)}
              </span>
            </Link>
          );
        })}

        <div className="relative flex items-center">
          <button
            name="language"
            onClick={() => setShowDropdown(!showDropdown)}
            className={`${
              isDarkText
                ? "text-darkOlive hover:text-mossGreen"
                : "text-white hover:text-gray-200"
            } transition`}
          >
            <AiOutlineGlobal className="w-5 h-5" />
          </button>

          {showDropdown && (
            <div
              className={`absolute top-6 w-28 bg-white rounded shadow-md z-50 text-sm ${
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
        <div className="relative flex items-center">
          <button
            name="login"
            onClick={() => setShowLogin(!showLogin)}
            className={`transition ${
              isDarkText ? "text-darkOlive" : "text-white"
            }`}
          >
            <FiLogIn className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
          </button>

          {showLogin && (
            <div
              className={`absolute top-8 ${
                isArabic ? "left-0" : "right-0"
              } bg-white rounded-lg shadow-lg p-4 w-80 z-50 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              <LoginForm onClose={() => setShowLogin(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
