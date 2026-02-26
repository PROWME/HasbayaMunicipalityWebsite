"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BackToProjects from "@/components/BackToProjects";

interface ProjectItem {
  id: number;
  images: string[];
  title_first_lang: string;
  title_english: string;
  description_first_lang: string;
  description_english: string;
  createdAt: string;
  updatedAt: string;
}

interface ArrowProps {
  onClick?: () => void;
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-2 transform -translate-y-1/2 
    z-10 text-3xl text-mossGreen hover:scale-110 transition"
  >
    <FiChevronLeft />
  </button>
);

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-2 transform -translate-y-1/2 
    z-10 text-3xl text-mossGreen hover:scale-110 transition"
  >
    <FiChevronRight />
  </button>
);

const ProjectsDetail: React.FC = () => {
  const { id } = useParams();
  const { i18n } = useTranslation("mainInfo");
  const [projectItem, setProjectItem] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const fetchProjectItem = async () => {
      try {
        const res = await axios.get(`/api/projects/${id}`);
        setProjectItem(res.data);
      } catch (error) {
        console.error("Error fetching project item", error);
      }
    };

    fetchProjectItem();
  }, [id]);

  if (!projectItem) return <p>Loading...</p>;

  const title =
    i18n.language === "first_lang"
      ? projectItem.title_first_lang
      : projectItem.title_english;

  const description =
    i18n.language === "first_lang"
      ? projectItem.description_first_lang
      : projectItem.description_english;

  const formattedDate = new Date(projectItem.createdAt).toLocaleDateString();

  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="w-11/12 mx-auto py-10">
        <BackToProjects />

        <p className="text-4xl xl:text-[40px] font-bold text-darkOlive pb-2">
          {title}
        </p>

        <div className="mt-2 flex items-center text-base text-mossGreen gap-1">
          <FiCalendar />
          <span>{formattedDate}</span>
        </div>

        <hr className="my-4 border-gray-500" />

        <div className="max-w-3xl mx-auto my-6 relative">
          {projectItem.images.length === 1 ? (
            <div className="relative w-full h-64">
              <Image
                src={`${projectItem.images[0]}`}
                alt={title}
                fill
                className="object-cover rounded"
              />
            </div>
          ) : (
            <Slider {...sliderSettings}>
              {projectItem.images.map((img, idx) => (
                <div key={idx} className="relative w-full h-64">
                  <Image
                    src={`${img}`}
                    alt={`${title} ${idx + 1}`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>

        <p className="text-mossGreen font-semibold text-2xl md:text-3xl pt-10">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectsDetail;
