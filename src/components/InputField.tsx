"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  name?: string;
  dir?: "rtl" | "ltr";
  error?: boolean;
  inputMode?: "numeric" | "text" | "tel" | "email";
  pattern?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = "",
  value,
  onChange,
  required = false,
  type = "text",
  name,
  dir,
  inputMode,
  pattern,
  error = false,
}) => {
  const { i18n } = useTranslation();
  const isRtl = dir ? dir === "rtl" : i18n.language === "first_lang";

  const normalizeArabicDigits = (value: string): string => {
  return value.replace(/[٠-٩]/g, (char) => String("٠١٢٣٤٥٦٧٨٩".indexOf(char)));
};


  return (
    <div className="flex flex-col w-full">
      <label className="text-xl font-bold text-mossGreen mb-3">
        {label}
        {label && required && <span> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        inputMode={inputMode}
        pattern={pattern}
        onChange={(e) => {
          const inputValue = e.target.value;

          if (type === "tel" || type === "number" || inputMode === "numeric") {
            // Allow only digits
            if (!/^[0-9٠-٩]*$/.test(inputValue)) return;
          }

          if (type === "text" && pattern) {
            const regex = new RegExp(pattern);
            if (!regex.test(inputValue) && inputValue !== "") return;
          }

          onChange(normalizeArabicDigits(inputValue));
        }}
        placeholder={placeholder}
        dir={isRtl ? "rtl" : "ltr"}
        className="border rounded-lg px-2 py-3 text-lg
         text-darkOlive placeholder-gray-400 
         focus:outline-none focus:ring-1 focus:ring-forestGreen"
      />
      {error && (
        <p className="text-red-500 text-sm">
          {label
            ? `${label} ${
                i18n.language === "first_lang" ? "مطلوب" : "is required"
              }`
            : ""}
        </p>
      )}
    </div>
  );
};

export default InputField;
