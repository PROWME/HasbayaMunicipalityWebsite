"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  title: string;
  documents: string[];
  uses?: string[];
  case?: string[];
  example?: string[];
}

const FAQs = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const isRtl = i18n.language === "first_lang";
  const faqItems: FaqItem[] = t("faqItems", {
    returnObjects: true,
  }) as FaqItem[];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-white min-h-screen md:py-10">
      <p className="text-4xl xl:text-[40px] font-bold md:text-center text-darkOlive md:pt-10 pb-10 w-11/12 mx-auto">
        {t("faqTitle")}
      </p>

      <div className="flex flex-col gap-4 w-11/12 mx-auto pb-12">
        {faqItems.map((item, index) => {
          const isOpen = activeIndex === index;
          const bgColor = index % 2 === 0 ? "bg-mossGreen" : "bg-mossGreen/50";
          const textColor = "text-white";

          return (
            <div key={index} className={`rounded shadow overflow-hidden ${bgColor}`}>
              <button
                className={`w-full flex items-center justify-between p-4 font-semibold md:text-2xl text-xl ${textColor}`}
                onClick={() => toggleIndex(index)}
                dir={isRtl ? "rtl" : "ltr"}
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={`transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="bg-white text-darkOlive overflow-hidden px-4 py-4 space-y-3 md:text-2xl text-xl"
                  >
                    <div>
                      <p className="mb-1">{t("documentsTitle")}:</p>
                      <ul className="list-disc list-inside ps-6 space-y-1">
                        {item.documents.map((doc, idx) => (
                          <li key={idx}>{doc}</li>
                        ))}
                      </ul>
                    </div>

                    {item.case && item.case.length > 0 && (
                      <div>
                        <p className="mb-1">{t("caseTitle")}:</p>
                        <ul className="list-disc list-inside ps-6 space-y-1">
                          {item.case.map((doc, idx) => (
                            <li key={idx}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.uses && item.uses.length > 0 && (
                      <div>
                        <p className="md:text-2xl text-xl mb-1">{t("usesTitle")}:</p>
                        <ul className="list-disc list-inside ps-6 space-y-1">
                          {item.uses.map((use, idx) => (
                            <li key={idx}>{use}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.example && item.example.length > 0 && (
                      <div>
                        <p className="md:text-2xl text-xl mb-1">{t("exampleTitle")}:</p>
                        <ul className="list-disc list-inside ps-6 space-y-1">
                          {item.example.map((use, idx) => (
                            <li key={idx}>{use}</li>
                          ))}
                        </ul>
                        <p className="md:text-2xl text-xl mt-1">{t("fact")}:</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQs;
