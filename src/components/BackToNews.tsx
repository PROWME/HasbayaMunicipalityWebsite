"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const BackToNews: React.FC = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <p
      onClick={handleBack}
      className={`text-darkOlive text-xl pb-5 w-fit underline cursor-pointer ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      {t("backToNews")}
    </p>
  );
};

export default BackToNews;
