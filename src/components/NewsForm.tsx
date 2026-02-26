"use client";

import React, { useState } from "react";
import axios from "axios";
import InputField from "./InputField";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import FileUploader from "./FileUploader";
import { useTranslation } from "react-i18next";
import { ImSpinner2 } from "react-icons/im";

interface NewsFormProps {
  onSuccess: () => void;
}

export default function NewsForm({ onSuccess }: NewsFormProps) {
  const { t } = useTranslation("mainInfo");

  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = Cookies.get("token");

  const handleUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setImages((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, boolean> = {
      images: images.length === 0,
      titleAr: !titleAr.trim(),
      titleEn: !titleEn.trim(),
      descAr: !descAr.trim(),
      descEn: !descEn.trim(),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      toast.error(t("toast.validationError"));
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    images.forEach((img) => {
      formData.append("images", img);
    });

    formData.append("title_first_lang", titleAr);
    formData.append("title_english", titleEn);
    formData.append("description_first_lang", descAr);
    formData.append("description_english", descEn);

    try {
      await axios.post("/api/news/createNews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(t("admin.newsSuccess"));
      setTitleAr("");
      setTitleEn("");
      setDescAr("");
      setDescEn("");
      setImages([]);
      setErrors({});
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(t("admin.newsError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white h-full overflow-y-auto">
      <div className="space-y-4 px-1">
        <FileUploader
          files={images}
          onUpload={handleUpload}
          onRemove={handleRemove}
          required
          error={errors.images}
        />

        <InputField
          label={t("admin.titleAr")}
          value={titleAr}
          onChange={setTitleAr}
          required
          error={errors.titleAr}
        />

        <InputField
          label={t("admin.titleEn")}
          value={titleEn}
          onChange={setTitleEn}
          required
          error={errors.titleEn}
        />

        <InputField
          label={t("admin.descAr")}
          value={descAr}
          onChange={setDescAr}
          required
          error={errors.descAr}
        />

        <InputField
          label={t("admin.descEn")}
          value={descEn}
          onChange={setDescEn}
          required
          error={errors.descEn}
        />

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-1/3 ms-auto rounded-lg py-2 flex items-center justify-center gap-2 text-white transition 
          ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-mossGreen hover:bg-opacity-80"
          }`}
        >
          {isSubmitting ? (
            <ImSpinner2 className="animate-spin" size={18} />
          ) : (
            t("admin.submitNews")
          )}
        </button>
      </div>
    </div>
  );
}
