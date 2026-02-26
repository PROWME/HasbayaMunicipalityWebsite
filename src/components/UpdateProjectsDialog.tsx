"use client";

import React, { useState } from "react";
import Image from "next/image";
import InputField from "./InputField";
import FileUploader from "./FileUploader";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";
import Cookies from "js-cookie";
import { FiX } from "react-icons/fi";

interface ProjectsItem {
  id: number;
  images: string[];
  title_first_lang: string;
  title_english: string;
  description_first_lang: string;
  description_english: string;
  createdAt: string;
}

interface UpdateProjectsDialogProps {
  projectsItem: ProjectsItem;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UpdateProjectsDialog({
  projectsItem,
  onClose,
  onSuccess,
}: UpdateProjectsDialogProps) {
  const { t } = useTranslation("mainInfo");
  const [titleAr, setTitleAr] = useState(projectsItem.title_first_lang);
  const [titleEn, setTitleEn] = useState(projectsItem.title_english);
  const [descAr, setDescAr] = useState(projectsItem.description_first_lang);
  const [descEn, setDescEn] = useState(projectsItem.description_english);
  const [images, setImages] = useState<File[]>([]);
  const [oldImages, setOldImages] = useState(projectsItem.images);
  const [removedOldImages, setRemovedOldImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setImages((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveOldImage = (imgPath: string) => {
    setOldImages((prev) => prev.filter((img) => img !== imgPath));
    setRemovedOldImages((prev) => [...prev, imgPath]);
  };

  const handleUpdate = async () => {
    const token = Cookies.get("token");

    if (
      !titleAr.trim() ||
      !titleEn.trim() ||
      !descAr.trim() ||
      !descEn.trim()
    ) {
      toast.error(t("toast.validationError"));
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();

    images.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("title_first_lang", titleAr);
    formData.append("title_english", titleEn);
    formData.append("description_first_lang", descAr);
    formData.append("description_english", descEn);
    formData.append("removedImages", JSON.stringify(removedOldImages));
    formData.append("keptOldImages", JSON.stringify(oldImages));

    try {
      await axios.put(
        `/api/projects/updateProjects/${projectsItem.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(t("admin.projectsUpdated"));
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(t("admin.updateErrorP"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 mx-auto max-w-2xl relative h-[90vh] flex flex-col">
        <div className="flex items-center justify-between mb-4 border-b pb-4">
          <p className="text-xl font-bold text-darkOlive">
            {t("admin.updateProjectsTitle")}
          </p>
          <button onClick={onClose} className="text-mossGreen hover:opacity-80">
            <FiX size={24} />
          </button>
        </div>

        <div className="overflow-y-auto space-y-4 flex-1 px-1">
          <div className="grid grid-cols-2 gap-4">
            {oldImages.map((imgPath, index) => (
              <div key={index} className="relative group">
                <Image
                  src={`${imgPath}`}
                  alt={`projects-${index}`}
                  width={500}
                  height={300}
                  className="rounded object-cover w-full h-auto"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOldImage(imgPath)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-90 hover:opacity-100"
                >
                  <FiX size={16} />
                </button>
              </div>
            ))}
          </div>

          <FileUploader
            files={images}
            onUpload={handleUpload}
            onRemove={handleRemove}
            required={false}
            error={false}
          />

          <InputField
            label={t("admin.titleAr")}
            value={titleAr}
            onChange={setTitleAr}
            required
          />
          <InputField
            label={t("admin.titleEn")}
            value={titleEn}
            onChange={setTitleEn}
            required
          />
          <InputField
            label={t("admin.descAr")}
            value={descAr}
            onChange={setDescAr}
            required
          />
          <InputField
            label={t("admin.descEn")}
            value={descEn}
            onChange={setDescEn}
            required
          />

          <button
            onClick={handleUpdate}
            disabled={isSubmitting}
            className={`w-1/3 ms-auto rounded-lg py-2 flex items-center justify-center gap-2 text-white transition mt-4
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-mossGreen hover:bg-opacity-80"
              }`}
          >
            {isSubmitting ? (
              <ImSpinner2 className="animate-spin" size={18} />
            ) : (
              t("admin.update")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
