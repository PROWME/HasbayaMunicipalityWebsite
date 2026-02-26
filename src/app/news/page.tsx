"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/components/ComingSoon";
import NewsCard from "@/components/NewsCard";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface NewsItem {
  id: number;
  images: string[];
  title_first_lang: string;
  title_english: string;
  description_first_lang: string;
  description_english: string;
  createdAt: string;
}

const News = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          "/api/news/getAllNews"
        );
        setNews(res.data);
      } catch (error) {
        console.error("Failed to fetch news", error);
      }
    };

    fetchNews();

    const interval = setInterval(() => {
      fetchNews();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (news.length === 0) {
    return <ComingSoon />;
  }

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="w-11/12 mx-auto min-h-screen py-10">
        <p
          className="text-4xl xl:text-[40px] font-bold text-darkOlive
         flex items-end"
        >
          {t("news")}
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 
          md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10"
        >
          {news.map((item) => (
            <NewsCard key={item.id} newsItem={item} lang={i18n.language} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
