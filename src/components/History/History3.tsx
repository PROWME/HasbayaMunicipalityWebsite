"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const History3 = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";

  return (
    <div className="w-full flex flex-col lg:flex-row min-h-screen overflow-x-hidden">
      <div className="lg:w-1/2 w-full">
        <Image
          src="/history/history33.jpg"
          alt="Hasbaya aerial view"
          width={800}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={`lg:w-1/2 w-full bg-white flex items-center py-10 2xl:py-0 ${
          isArabic ? "text-right" : ""
        }`}
      >
        <div className="lg:w-5/6 w-11/12 mx-auto flex flex-col ">
          <p
            className={`font-bold  text-darkOlive mb-6 ${
              isArabic
                ? "md:text-4xl lg:text-5xl text-3xl"
                : "text-4xl xl:text-[40px] lg:w-2/3"
            }`}
            
          >
            {t("historyPage.history3Para1")}
          </p>
          <p
            className={` max-w-2xl text-slateSteel mb-6 ${
              isArabic ? "text-sm md:text-lg" : "text-sm 2xl:text-lg"
            }`}
            style={{ fontFamily: "Tajawal" }}
          >
            {t("historyPage.history3Para2")}
          </p>
          <p
            className={` max-w-2xl text-slateSteel mb-6 ${
              isArabic ? "text-sm md:text-lg" : "text-sm 2xl:text-lg"
            }`}
            style={{ fontFamily: "Tajawal" }}
          >
            {t("historyPage.history3Para3")}
          </p>
          <p
            className={`max-w-2xl text-slateSteel ${
              isArabic ? "text-sm md:text-lg" : "text-sm 2xl:text-lg"
            }`}
            style={{ fontFamily: "Tajawal" }}
          >
            {t("historyPage.history3Para4")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default History3;
