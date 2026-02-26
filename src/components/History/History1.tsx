"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const History1 = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";

  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen overflow-x-hidden">
      <div
        className={`md:w-1/2 w-full bg-primaryGreen text-white flex items-center py-10 md:py-0 ${
          isArabic ? "text-right" : ""
        }`}
      >
        <div className="md:w-5/6 w-11/12 mx-auto flex flex-col">
          <p className="uppercase font-bold text-lg 2xl:text-xl mb-6">
            {t("historyPage.historyTitleSmall")}
          </p>
          <p
            className={`mb-6 ${
              isArabic
                ? "md:text-4xl lg:text-5xl text-3xl max-w-sm font-bold"
                : "text-4xl xl:text-[40px] max-w-lg font-bold"
            }`}
          >
            {t("historyPage.historyTitle")}
          </p>
          <p
            className={`text-white  max-w-3xl mb-6 ${
              isArabic ? "text-sm md:text-lg" : "text-base 2xl:text-lg"
            }`}
            style={{ fontFamily: "Tajawal" }}
          >
            {t("historyPage.historyDescription")}
          </p>
          <p
            className={` max-w-2xl ${
              isArabic ? "text-sm md:text-lg" : "text-base 2xl:text-lg"
            }`}
            style={{ fontFamily: "Tajawal" }}
          >
            <strong className="font-semibold">
              {t("historyPage.history3Author")}
            </strong>
          </p>
          <p
            className={` max-w-2xl italic ${
              isArabic ? "text-sm md:text-lg" : "text-base 2xl:text-lg "
            }`}
            style={{ fontFamily: "Tajawal" }}
          >
            {t("historyPage.history3Source")}
          </p>
        </div>
      </div>

      <div className="md:w-1/2 w-full">
        <Image
          src="/history/history1.jpg"
          alt="Hasbaya aerial view"
          width={800}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default History1;
