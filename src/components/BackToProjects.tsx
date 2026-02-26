"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const BackToProjects: React.FC = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";
  const router = useRouter();

  return (
    <p
      onClick={() => router.push("/projects")}
      className={`ttext-darkOlive text-xl pb-5 w-fit underline cursor-pointer ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      {t("backToProjects")}
    </p>
  );
};

export default BackToProjects;
