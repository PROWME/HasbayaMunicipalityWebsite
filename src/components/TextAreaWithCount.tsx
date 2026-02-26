"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface TextAreaWithCountProps {
  label: string;
  maxLength?: number;
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  errors?: boolean;
}

const TextAreaWithCount: React.FC<TextAreaWithCountProps> = ({
  label,
  maxLength = 250,
  value = "",
  onChange,
  required = false,
  errors = false,
}) => {
  const { t } = useTranslation("mainInfo");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value.slice(0, maxLength);
    onChange(newText);
  };

  return (
    <div className="w-full">
      <label className="block text-mossGreen py-3 md:text-2xl text-xl max-w-sm">
        {label} {required && <span>*</span>}
      </label>
      <textarea
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        required={required}
        className="lg:w-1/3 md:w-1/2 sm:w-1/2 w-full border border-darkOlive rounded p-2 text-base text-darkOlive resize-none h-40 focus:outline-none"
      />
      <div className="text-lg mt-1 text-darkOlive">
        {value.length}/{maxLength}
      </div>
      {errors && (
        <p className="text-red-500 text-sm">{t("toast.requiredField")}</p>
      )}
    </div>
  );
};

export default TextAreaWithCount;
