"use client";

import React from "react";
import InputField from "@/components/InputField";
import { useTranslation } from "react-i18next";

type InfoFormData = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  floor: string;
  property?: string;
  whatsapp: boolean;
};

interface InfoFormProps {
  formData: InfoFormData;
  setFormData: React.Dispatch<React.SetStateAction<InfoFormData>>;
  errors: Record<string, boolean>;
}

const InfoForm: React.FC<InfoFormProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";

  const handleChange = (key: keyof InfoFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="py-10">
      <form
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        <div>
          <InputField
            label={t("fullName")}
            placeholder={t("fullNamePlaceholder")}
            value={formData.fullName}
            onChange={(val) => handleChange("fullName", val)}
            required
            error={errors.fullName}
            type="text"
            inputMode="text"
            pattern="^[A-Za-z\u0600-\u06FF\s]+$"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <InputField
              label={t("address")}
              placeholder={t("addressPlaceholder")}
              value={formData.address}
              onChange={(val) => handleChange("address", val)}
              required
              error={errors.address}
              type="text"
              inputMode="text"
              pattern="^[A-Za-z0-9\u0600-\u06FF\s.,/-]*$"
            />
          </div>
          <div>
            <InputField
              label=""
              placeholder={t("floor")}
              value={formData.floor}
              onChange={(val) => handleChange("floor", val)}
              required
              error={errors.floor}
              type="text"
              inputMode="numeric"
              pattern="[0-9٠-٩]*"
            />
          </div>
          <div>
            <InputField
              label=""
              placeholder={t("property")}
              value={formData.property ?? ""}
              onChange={(val) => handleChange("property", val)}
              required
              error={errors.property}
              type="text"
              inputMode="text"
              pattern="^[A-Za-z0-9\u0600-\u06FF\s.,/-]*$"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <InputField
              label={t("phone")}
              placeholder={t("phonePlaceholder")}
              value={formData.phone}
              onChange={(val) => handleChange("phone", val)}
              required
              type="tel"
              pattern="[0-9٠-٩]*"
              inputMode="numeric"
              error={errors.phone}
            />
          </div>

          <label className="text-sm text-darkOlive flex gap-2 items-center">
            <input
              type="checkbox"
              checked={formData.whatsapp}
              onChange={(e) => handleChange("whatsapp", e.target.checked)}
              className="accent-mossGreen"
            />
            {t("whatsapp")}
          </label>
        </div>

        <div>
          <InputField
            label={t("email")}
            placeholder={t("emailPlaceholder")}
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
            type="email"
            inputMode="email"
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            error={errors.email}
          />
        </div>
      </form>
    </div>
  );
};

export default InfoForm;
