"use client";

import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { useState } from "react";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, i18n } = useTranslation("mainInfo");
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isArabic = i18n.language === "first_lang";
  const direction = isArabic ? "rtl" : "ltr";

  // Logout function
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("name");
    router.push("/");
  };

  return (
    <div className="w-full overflow-x-hidden" dir={direction}>
      <button
        onClick={() => setIsSidebarOpen(true)}
        type="button"
        className={`inline-flex items-center p-2 mt-2 ${
          isArabic ? "me-3" : "ms-3"
        } text-sm rounded-lg sm:hidden 
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200`}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6 text-mossGreen"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed top-0 ${
          isArabic ? "right-0" : "left-0"
        } z-50 w-64 min-h-screen bg-mossGreen text-white transform transition-transform duration-300
        ${
          isSidebarOpen
            ? "translate-x-0"
            : isArabic
            ? "translate-x-full"
            : "-translate-x-full"
        }
        sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full w-11/12 mx-auto overflow-y-auto">
          <div className="mb-6 flex pt-4">
            <Image
              src="/Final_logo_Hasbaya_Municipality.png"
              alt="Logo"
              width={100}
              height={60}
            />
          </div>

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin/news"
                className={`flex items-center p-2 rounded-lg text-lg ${
                  pathname === "/admin/news"
                    ? "bg-white text-mossGreen"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {t("admin.news")}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/projects"
                className={`flex items-center p-2 rounded-lg text-lg ${
                  pathname === "/admin/projects"
                    ? "bg-white text-mossGreen"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {t("projects")}
              </Link>
            </li>
          </ul>

          <div className="absolute bottom-4 mx-auto p-2 rounded-lg w-11/12 hover:bg-white/10 cursor-pointer text-lg">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg text-white"
            >
              <FiLogOut />
              {t("admin.logout")}
            </button>
          </div>
        </div>
      </aside>

      <div className={`${isArabic ? "p-4 sm:mr-64" : "p-4 sm:ml-64"}`}>
        <ToastContainer
          position={isArabic ? "bottom-left" : "bottom-right"}
          autoClose={3000}
        />
        {children}
      </div>
    </div>
  );
}
