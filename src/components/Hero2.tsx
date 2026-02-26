"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

const Hero2 = () => {
  const { t, i18n } = useTranslation("mainInfo");

  const isArabic = i18n.language === "first_lang";

  return (
    <div className="bg-white lg:py-0 py-10 ">
      <div
        className="w-11/12 mx-auto flex lg:flex-row flex-col 
      h-full lg:min-h-screen lg:justify-between items-center gap-4"
      >
        {/* Text Section */}
        <motion.div
          className={`lg:w-1/2 ${isArabic ? "text-right" : " lg:text-left"}`}
          initial={{ x: isArabic ? 100 : -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p
            className={`text-lg 2xl:text-xl xl:text-lg uppercase text-darkOlive font-semibold mb-2 ${
              isArabic ? "text-lg xl:text-xl" : ""
            }`}
          >
            {t("welcome")}
          </p>
          <p
            className={`text-4xl xl:text-[40px] text-darkOlive mb-4  font-bold ${
              isArabic ? "max-w-md " : "max-w-lg"
            }`}
          >
            {t("heroTitle")}
          </p>
          <p className={`text-darkOlive text-base md:text-lg mb-6  ${
              isArabic ? "max-w-lg " : "max-w-2xl"
            }`} style={{ fontFamily: "Tajawal" }}>
            {t("heroDescription")}
          </p>
          <Link href="/history">
            <motion.button
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="group relative bg-mossGreen hover:opacity-90 px-10 py-3 rounded-full 
            text-base font-semibold transition flex items-center justify-center text-white"
            >
              {t("readMore")}
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
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="lg:w-1/2"
          initial={{ x: isArabic ? -100 : 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src="/hero2-image.jpg"
            alt="Hasbaya"
            width={600}
            height={400}
            className="rounded-xl object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero2;
