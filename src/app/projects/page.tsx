"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/components/ComingSoon";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ProjectsCard from "@/components/ProjectsCard";

interface ProjectItem {
  id: number;
  images: string[];
  title_first_lang: string;
  title_english: string;
  description_first_lang: string;
  description_english: string;
  createdAt: string;
}

const Projects = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          "/api/projects/getAllProjects"
        );
        setProjects(res.data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };

    fetchProjects();

    const interval = setInterval(() => {
      fetchProjects();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (projects.length === 0) {
    return <ComingSoon />;
  }

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="w-11/12 mx-auto min-h-screen py-10">
        <p className="text-4xl xl:text-[40px] font-bold text-darkOlive flex items-end">
          {t("projects")}
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 
          md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10"
        >
          {projects.map((item) => (
            <ProjectsCard
              key={item.id}
              projectsItem={item}
              lang={i18n.language}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
