"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const stats = [
  {
    icon: "/icons/distance1.gif",
    value: "695",
    key: "population",
  },
  {
    icon: "/icons/altitude1.gif",
    value: "759",
    key: "altitude",
  },
  {
    icon: "/icons/area1.gif",
    value: "1.4 km²",
    key: "area",
  },
  {
    icon: "/icons/population1.gif",
    value: "23 km",
    key: "distance",
  },
];

export default function VillageStats() {
  const { t, i18n } = useTranslation("mainInfo");

  return (
    <div className="bg-white md:pb-20 pb-10">
      <div
        className={`w-11/12 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center ${
          i18n.language === "first_lang" ? "rtl" : ""
        }`}
      >
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-softBeige p-4 rounded-xl mb-4">
              <Image
                src={item.icon}
                alt={t(item.key)}
                width={40}
                height={40}
                unoptimized
              />
            </div>
            <p className="text-xl md:text-2xl font-semibold text-darkOlive mb-1">
              {t(item.value)}
            </p>
            <p className="text-base md:text-lg text-darkOlive">{t(item.key)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
