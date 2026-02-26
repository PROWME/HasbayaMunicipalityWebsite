"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const Hero5 = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";

  return (
    <div
      className="relative w-full h-[60svh] md:h-[80vh] bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url("/hero5_bg.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="absolute inset-0 z-10 flex flex-col items-center
       justify-center text-white text-center px-4 bg-black bg-opacity-40"
      >
        <p className="text-4xl xl:text-[40px] font-bold mb-4">
          {t("yourVoiceTitle")}
        </p>
        <p className="md:text-lg text-base mb-6 max-w-sm" style={{ fontFamily: "Tajawal" }}>
          {t("yourVoiceDescription")}
        </p>
        <Link href="/contact">
          <motion.button
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="group relative bg-coralRed hover:opacity-90 px-10 py-3 rounded-full 
          text-base font-semibold transition flex items-center justify-center"
          >
            {t("yourVoiceButton")}
            <motion.span
              variants={{
                rest: { x: 0, opacity: 0 },
                hover: { x: isArabic ? -8 : 8, opacity: 1 },
              }}
              transition={{ duration: 0.3 }}
              className={`absolute ${
                isArabic ? "left-4" : "right-4"
              } pointer-events-none`}
            >
              <FaArrowRightLong
                size={20}
                className={isArabic ? "rotate-180" : ""}
              />
            </motion.span>
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Hero5;
