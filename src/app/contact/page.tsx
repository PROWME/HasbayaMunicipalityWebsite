"use client";

import React from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ContactForm from "@/components/ContactForm";
import { FaSquareFacebook } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";

const Contact = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";

  return (
    <div className="min-h-screen flex md:flex-row flex-col">
      <div
        className="md:w-1/2 relative bg-cover bg-center flex items-center justify-center py-10 md:py-0"
        style={{ backgroundImage: `url("/stone-bg.png")` }}
      >
        <div className="absolute inset-0 bg-white opacity-95 z-0" />

        <div
          className={`relative z-10 mx-auto w-11/12 md:w-5/6 flex flex-col justify-center h-full ${
            isArabic ? "mr-auto" : "ml-auto"
          }`}
        >
          <p className="text-black text-lg 2xl:text-xl font-semibold mb-3 uppercase">
            {t("contactPage.getInTouch")}
          </p>

          <p className="text-4xl xl:text-[40px] font-bold text-darkOlive mb-4">
            {t("contactPage.helpTitle")}
          </p>

          <p
            className="text-slateSteel text-base md:text-lg mb-8"
            dangerouslySetInnerHTML={{ __html: t("contactPage.description") }}
          />

          <div className="flex items-center gap-3 mb-4">
            <a
              href={`mailto:${t("footer.email")}`}
              className="flex items-center gap-3 mb-4 hover:underline"
            >
              <MdEmail className="text-mossGreen text-3xl" />
              <span className="text-charcoal font-medium text-base md:text-lg">
                {t("footer.email")}
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <a
              href={`tel:${t("footer.phone").replace(/\s+/g, "")}`}
              className="flex items-center gap-3 mb-6 hover:underline"
            >
              <MdPhone className="text-mossGreen text-3xl" />
              <span
                className="text-charcoal font-medium text-base md:text-lg"
                dir="ltr"
              >
                {t("footer.phone")}
              </span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/share/1A3C2Rmw83/" target="_blank" rel="noreferrer">
              <FaSquareFacebook className="text-mossGreen hover:text-forestGreen text-3xl" />
            </a>
            <a
              href="https://www.instagram.com/hasbaya_municipality/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="text-mossGreen hover:text-forestGreen text-3xl" />
            </a>
          </div>
        </div>
      </div>

      <div
        className="md:w-1/2 w-full relative bg-cover bg-center flex min-h-screen"
        style={{ backgroundImage: `url("/contact.jpg")` }}
      >
        <div className="absolute inset-0 bg-black/50 opacity-95 z-0" />
        <div className="flex flex-col justify-center relative w-full items-center">
          <ContactForm />
        </div>
      </div>
      <ToastContainer
        position={isArabic ? "bottom-left" : "bottom-right"}
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default Contact;
