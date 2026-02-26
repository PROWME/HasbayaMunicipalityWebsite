"use client";

import React from "react";
import { FiCalendar } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowRightLong } from "react-icons/fa6";

interface ProjectItem {
  id: number;
  images: string[];
  title_first_lang: string;
  title_english: string;
  description_first_lang: string;
  description_english: string;
  createdAt: string;
}

interface Props {
  projectsItem: ProjectItem;
  lang: string;
}

const ProjectsCard: React.FC<Props> = ({ projectsItem, lang }) => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";

  const title =
    lang === "first_lang"
      ? projectsItem.title_first_lang
      : projectsItem.title_english;

  const date = new Date(projectsItem.createdAt).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition h-96 flex flex-col">
      <div className="h-1/2 relative w-full">
        <Image
          src={`${projectsItem.images[0]}`}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 justify-between h-1/2">
        <div>
          <div className="flex items-center text-base font-medium text-mossGreen gap-1">
            <FiCalendar />
            <span>{date}</span>
          </div>
          <p className="font-semibold text-lg text-darkOlive">{title}</p>
        </div>
        <Link href={`/projects/${projectsItem.id}`}>
          <motion.button
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="group relative bg-mossGreen hover:opacity-90 w-full py-2 rounded-lg 
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
      </div>
    </div>
  );
};

export default ProjectsCard;
