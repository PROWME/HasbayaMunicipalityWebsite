"use client";

import React from "react";
import Image from "next/image";
import { IoIosArrowDropright } from "react-icons/io";
import { useTranslation } from "react-i18next";

const ProjectCard = ({
  iconSrc,
  title,
  description,
  isCompleted,
}: {
  iconSrc: string;
  title: string;
  description: string;
  isCompleted?: boolean;
}) => {
  return (
    <div className="rounded-lg p-4 flex justify-between items-center bg-white gap-4 shadow-md">
      <div className="flex md:flex-row flex-col md:items-center items-start gap-4">
        <div
          className={`rounded-full p-2 ${
            isCompleted ? "bg-primaryGreen" : "bg-vibrantOrange"
          }`}
        >
          <Image src={iconSrc} alt="icon" width={24} height={24} />
        </div>
        <div>
          <p className="font-semibold md:text-lg text-base mb-1 text-darkOlive">
            {title}
          </p>
          <p className="text-sm text-richBlack">{description}</p>
        </div>
      </div>
      <div className="text-primaryGreen text-3xl">
        <IoIosArrowDropright />
      </div>
    </div>
  );
};

const OnGoingProjects = () => {
  const { t } = useTranslation("mainInfo");

  return (
    <div className="md:min-h-screen bg-white py-10 lg:py-0">
      <div className="w-11/12 mx-auto flex md:min-h-screen flex-col lg:flex-row gap-8 items-center justify-between">
        <div className="w-full lg:w-1/2">
          <Image
            src="/projects.jpg"
            alt="Hasbaya Ongoing Projects"
            width={600}
            height={600}
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>

        <div className="w-full lg:w-[40%] flex flex-col gap-6">
          <div>
            <p className="md:text-lg text-base uppercase text-darkOlive font-medium">
              {t("ongoingProjectsLabel")}
            </p>
            <p className="text-3xl md:text-4xl font-medium text-darkOlive mt-4 md:max-w-md">
              {t("ongoingProjectsTitle")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <ProjectCard
              iconSrc="/icons/selection1.svg"
              title={t("project1Title")}
              description={t("project1Desc")}
            />
            <ProjectCard
              iconSrc="/icons/selection1.svg"
              title={t("project2Title")}
              description={t("project2Desc")}
            />
            <ProjectCard
              iconSrc="/icons/complete_selection.svg"
              title={t("project3Title")}
              description={t("project3Desc")}
              isCompleted
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnGoingProjects;
