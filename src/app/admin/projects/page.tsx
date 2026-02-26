"use client";

import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import AdminLayout from "@/components/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useTranslation } from "react-i18next";
import ProjectsTable from "@/components/ProjectsTable";
import ProjectsForm from "@/components/ProjectsForm";

export default function ProjectsPage() {
  const { t } = useTranslation("mainInfo");
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="flex justify-between items-center mb-4 ">
          <p className="md:text-4xl text-2xl font-bold text-darkOlive">
            {t("projects")}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-mossGreen hover:opacity-80 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FiPlus />
            {t("admin.addProjects")}
          </button>
        </div>

        <ProjectsTable key={refreshKey} />

        {showForm && (
          <div
            className="fixed inset-0 z-50 flex items-center 
          justify-center bg-black bg-opacity-50"
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg 
            w-11/12 mx-auto max-w-2xl relative h-[90vh] flex flex-col"
            >
              <div
                className="flex items-center justify-between 
              mb-4 border-b pb-4"
              >
                <p className="text-xl font-bold text-darkOlive">
                  {t("admin.addProjectsTitle")}
                </p>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-mossGreen hover:opacity-80"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="overflow-y-auto">
                <ProjectsForm
                  onSuccess={() => {
                    setShowForm(false);
                    setRefreshKey((prev) => prev + 1);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}
