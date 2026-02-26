"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { MdEmail, MdPhone } from "react-icons/md";
import Link from "next/link";

const Footer = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";

  return (
    <footer className="bg-primaryGreen text-white py-10 ">
      <div
        className={`w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 lg:gap-8 gap-3 ${
          isArabic ? "text-right md:rtl" : "text-left"
        }`}
      >
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/Final_logo_Hasbaya_Municipality.png"
              alt="Hasbaya al-Matn"
              width={100}
              height={60}
              className="mb-2 cursor-pointer"
            />
          </Link>
        </div>

        {/* Explore */}
        <div>
          <p className="font-semibold text-lg mb-3">{t("explore")}</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/history" className="hover:underline">
                {t("footer.history")}
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:underline">
                {t("footer.projects")}
              </Link>
            </li>
            <li>
              <Link href="/media" className="hover:underline">
                {t("footer.media")}
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:underline">
                {t("footer.newsEvents")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-lg mb-3">{t("footer.services")}</h3>
          <ul className="space-y-2 text-sm">
            {/* <li>{t("footer.suggestions")}</li> */}
            <li>
              <Link href="/payments" className="hover:underline">
                {t("footer.payments")}
              </Link>
            </li>
            <li>
              <Link href="/realEstate" className="hover:underline">
                {t("footer.realEstate")}
              </Link>
            </li>
            <li>
              <Link href="/adminServices" className="hover:underline">
                {t("footer.adminServices")}{" "}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="font-semibold text-lg mb-3">{t("contact")}</p>

          <a
            href={`mailto:${t("footer.email")}`}
            className="flex items-center gap-2 text-sm mb-2 hover:underline"
          >
            <MdEmail />
            <span>{t("footer.email")}</span>
          </a>

          <a
            href={`tel:${t("footer.phone").replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <MdPhone />
            <span dir="ltr">{t("footer.phone")}</span>
          </a>
        </div>
      </div>
      <div className="w-11/12 mx-auto pt-5 text-lg">
        {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
