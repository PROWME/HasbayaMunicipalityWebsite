"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaSquareFacebook } from "react-icons/fa6";

const images = [
  "/social/1.jpg",
  "/social/2.jpg",
  "/social/3.jpg",
  "/social/4.jpg",
];

const SocialSection = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";

  return (
    <div
      className="relative w-full md:min-h-screen bg-cover bg-center lg:py-0 md:py-20 py-10"
      style={{ backgroundImage: `url("/stone-bg.png")` }}
    >
      <div className="absolute inset-0 bg-white opacity-95 z-0" />

      <div className="relative z-10 w-11/12 md:min-h-screen mx-auto flex flex-col justify-center gap-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <motion.div
            initial={{ x: isArabic ? 100 : -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-4"
          >
            <p className="text-4xl xl:text-[40px] font-bold text-darkOlive">
              {t("stayConnectedTitle")}
            </p>
            <p className="text-darkOlive md:text-lg text-base" style={{ fontFamily: "Tajawal" }}>
              {t("stayConnectedDescription")}
            </p>
          </motion.div>

          <motion.div
            initial={{ x: isArabic ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex gap-4 justify-end w-full md:w-fit"
          >
            <a
              href="https://www.facebook.com/share/1A3C2Rmw83/"
              target="_blank"
              className="text-primaryGreen hover:text-forestGreen text-3xl"
            >
              <FaSquareFacebook />
            </a>
            <a
              href="https://www.instagram.com/hasbaya_municipality/"
              target="_blank"
              className="text-primaryGreen hover:text-forestGreen text-3xl"
            >
              <FaInstagram />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ x: isArabic ? -100 : 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-4"
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[1/1] w-full transform transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={src}
                alt={`social-${i}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="rounded-xl object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SocialSection;
