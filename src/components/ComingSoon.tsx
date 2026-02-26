"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./comingSoon.css";

const ComingSoon = () => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "first_lang";

  const baseText = isArabic ? "قريبًا" : "COMING SOON";
  const directionClass = isArabic ? "rtl-marquee" : "ltr-marquee";

  useEffect(() => {
    const calculateRepeats = () => {
      if (spanRef.current) {
        const spanWidth = spanRef.current.offsetWidth;
        const screenWidth = window.innerWidth;
        const repeats = Math.ceil(screenWidth / spanWidth);
        setCount(repeats);
      }
    };

    calculateRepeats();
    window.addEventListener("resize", calculateRepeats);
    return () => window.removeEventListener("resize", calculateRepeats);
  }, [i18n.language]);

  const repeatedText = Array(count).fill(`${baseText} . `).join("");

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center overflow-hidden relative"
      style={{ backgroundImage: 'url("/social/1.jpg")' }}
    >

      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Hidden span for measuring */}
      <span
        ref={spanRef}
        className="text-measure text-4xl font-bold uppercase invisible absolute"
      >
        {baseText} .
      </span>

      <div className={`marquee ${directionClass}`}>
        <div className="track">
          <span className="text">{repeatedText}</span>
          <span className="text">{repeatedText}</span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
