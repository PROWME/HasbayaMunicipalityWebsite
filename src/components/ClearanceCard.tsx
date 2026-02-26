"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

interface ClearanceCardProps {
  imageSrc: string;
  title: string;
  link: string;
}

const ClearanceCard: React.FC<ClearanceCardProps> = ({
  imageSrc,
  title,
  link,
}) => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";

  return (
    <div className="w-full h-80 rounded-xl shadow-lg bg-white 
    overflow-hidden flex flex-col">
      <div className="h-1/2">
        <Image
          src={imageSrc}
          alt={title}
          width={300}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3 h-1/2 flex flex-col items-start justify-between">
        <p className="md:text-xl text-lg font-bold text-darkOlive">{title}</p>
        <Link
          href={link}
          className="text-mossGreen md:text-lg text-base flex items-center 
          justify-center gap-3 cursor-pointer"
        >
          <span className="font-bold">{t("file")}</span>
          <FaArrowRightLong size={15} className={isArabic ? "rotate-180" : ""} />
        </Link>
      </div>
    </div>
  );
};

export default ClearanceCard;
