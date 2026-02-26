"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const newsList = [
  {
    date: "May 20, 2025",
    title: "Rehabilitation Work Begins on Village Road",
    description:
      "Lorem Ipsum is simply dummy text. Lorem Ipsum has been lorem ...",
    image: "/news/1.jpg",
  },
  {
    date: "April 15, 2025",
    title: "Spring Festival Preparation Underway",
    description: "Village getting ready for spring with decorations and joy.",
    image: "/news/2.jpg",
  },
  {
    date: "March 5, 2025",
    title: "New Waste Management Initiative",
    description:
      "Sustainable solutions introduced to manage waste efficiently.",
    image: "/news/3.jpg",
  },
];

const News = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";

  return (
    <div
      className="relative w-full py-16 bg-cover bg-center"
      style={{ backgroundImage: `url("/news.jpg")` }}
    >
      <div className="absolute inset-0 bg-white opacity-80 z-0" />
      <div className="relative z-10 mx-auto w-11/12">
        <div className="pb-10 flex justify-between">
          <p className="text-3xl md:text-4xl  text-darkOlive">
            News & Announcements
          </p>
        </div>
        <Swiper
          key={i18n.language}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {newsList.map((news, idx) => (
            <SwiperSlide key={idx}>
              <div className="rounded-xl bg-white shadow-md h-[600px] flex flex-col">
                <Image
                  src={news.image}
                  alt="news"
                  width={400}
                  height={200}
                  className="w-full h-[60%] object-cover rounded-t-xl"
                />
                <div className="p-4 flex flex-col gap-3 h-[40%]">
                  <div className="flex items-center gap-2 text-richBlack text-lg">
                    <FaRegCalendarAlt />
                    <span>{news.date}</span>
                  </div>
                  <p className="font-semibold text-darkOlive text-xl h-1/3">
                    {t(news.title)}
                  </p>
                  <p className="text-base text-richBlack h-1/3">
                    {t(news.description)}
                  </p>
                  <a
                    href="#"
                    className="text-primaryGreen mt-auto text-lg font-semibold inline-flex 
                    items-center gap-2 hover:underline"
                  >
                    {t("readMore")}{" "}
                    <FaArrowRightLong
                      size={14}
                      className={isArabic ? "rotate-180 transform" : ""}
                    />
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default News;
