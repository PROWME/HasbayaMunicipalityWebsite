"use client";

import ClearanceCard from "@/components/ClearanceCard";
import React from "react";
import { useTranslation } from "react-i18next";

const MunicipalPayments = () => {
  const { t } = useTranslation("mainInfo");
  const rawCards = t("cards", { returnObjects: true }) as unknown as Array<{
    title: string;
    imageSrc: string;
    link: string;
    enabled?: boolean;
  }>;

  const cards = rawCards.filter((card) => card.enabled !== false);

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="w-11/12 mx-auto min-h-screen py-10">
        <p className="text-4xl xl:text-[40px] font-bold text-darkOlive flex items-end">
          {t("footer.payments")}
        </p>
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ">
          {cards.map((card, index) => (
            <ClearanceCard
              key={index}
              imageSrc={card.imageSrc}
              title={card.title}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MunicipalPayments;
