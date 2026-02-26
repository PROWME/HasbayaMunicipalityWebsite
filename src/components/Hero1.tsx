"use client";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import { FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import SwiperCore from "swiper";
import Image from "next/image";

const slides = ["/hero1/img1.jpg", "/hero1/img2.png", "/hero1/img3.png"];

const Hero1 = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";
  const [swiperKey, setSwiperKey] = React.useState(0);

  useEffect(() => {
    setSwiperKey((prev) => prev + 1); // force Swiper remount on language change
  }, [i18n.language]);

  const swiperRef = useRef<SwiperCore | null>(null);
  useEffect(() => {
    // Manually update Swiper instance when language changes
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [i18n.language]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent mismatch on hydration

  return (
    <div className="relative md:h-screen h-[100svh] w-screen">
      {mounted && (
        <Swiper
          key={swiperKey} // Force full remount on language change
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          slidesPerView={1}
          className="absolute inset-0 h-full w-full"
        >
          {slides.map((bg, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[100svh]">
                <Image
                  src={bg}
                  alt={`Slide ${index + 1}`}
                  width={1920}
                  height={1080}
                  priority={index === 0}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-4 bg-black bg-opacity-40">
        <p
          className={` font-semibold ${
            isArabic ? "text-lg xl:text-xl" : "text-lg 2xl:text-xl xl:text-lg"
          }`}
        >
          {t("municipality")}
        </p>
        <Image
          src="/Vector.png"
          alt="Decorative line"
          width={250}
          height={20}
          className="mb-4"
        />
        <p
          className={` mb-6 ${
            isArabic
              ? "max-w-xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              : "max-w-3xl text-2xl sm:text-4xl md:text-5xl lg:text-[65px]"
          }`}
        >
          {t("slogan")}
        </p>
        <Link href="/history">
          <motion.button
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="group relative bg-coralRed hover:opacity-90 px-10 py-3 rounded-full 
            text-base font-semibold transition flex items-center justify-center"
          >
            {t("explore")}
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

export default Hero1;
