"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ClearanceCard from "@/components/ClearanceCard";
import { useRouter } from "next/navigation";

type Card = {
  title: string;
  imageSrc: string;
  link: string;
  enabled?: boolean;
};

const Services = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "ar";

  const tabs = [
    { key: "payments", label: t("footer.payments") },
    { key: "realEstate", label: t("footer.realEstate") },
    { key: "adminServices", label: t("footer.adminServices") },
  ];

  const router = useRouter();

  const [activeTab, setActiveTab] = useState("payments");

  // ✅ Read ?tab=... safely in browser only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab && ["payments", "realEstate", "adminServices"].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, []);

  const data: Record<string, Card[]> = {
    payments: (t("cards", { returnObjects: true }) as Card[]).filter(
      (card) => card.enabled !== false
    ),
    realEstate: (t("cards2", { returnObjects: true }) as Card[]).filter(
      (card) => card.enabled !== false
    ),
    adminServices: (t("cards3", { returnObjects: true }) as Card[]).filter(
      (card) => card.enabled !== false
    ),
  };

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="w-11/12 mx-auto py-10">
        <p className="text-4xl xl:text-[40px] font-bold text-darkOlive mb-8">
          {t("services")}
        </p>

        <div
          className={`flex ${isArabic ? "flex-row-reverse" : "flex-row"} gap-6`}
        >
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={`relative cursor-pointer pb-1 font-bold md:text-lg text-sm ${
                activeTab === tab.key ? "text-mossGreen" : "text-darkOlive"
              }`}
              onClick={() => {
                setActiveTab(tab.key);
                router.push(`?tab=${tab.key}`);
              }}
            >
              <span>{tab.label}</span>
              {activeTab === tab.key && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-mossGreen"
                />
              )}
            </div>
          ))}
        </div>

        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {data[activeTab].map((card, index) => (
            <div key={index}>
              <ClearanceCard
                imageSrc={card.imageSrc}
                title={card.title}
                link={card.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
