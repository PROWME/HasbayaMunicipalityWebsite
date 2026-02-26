"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import InputField from "@/components/InputField";
import { usePathname } from "next/navigation";

type ClearanceRequestData = {
  reason?: string;
  taxpayer?: string;
  propertyNumber: string;
  sectionNumber: string;
};

interface ClearanceRequestSectionProps {
  formData: ClearanceRequestData;
  setFormData: React.Dispatch<React.SetStateAction<ClearanceRequestData>>;
  errors: Record<string, boolean>;
}

const ClearanceRequestSection: React.FC<ClearanceRequestSectionProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";
  const pathname = usePathname();

  const handleChange = (key: keyof ClearanceRequestData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const getTitleKey = (): string => {
    const titles: Record<string, string> = {
      "/payments/clearance": "clearanceRequestTitle",
      "/realEstate/appraisal-report": "appraisalReport",
      "/realEstate/easement-and-zoning": "easementAndZoning",
      "/realEstate/occupancy-certificate": "occupancyCertificate",
      "/realEstate/property-contents": "propertyContents",
      "/realEstate/unauthorized-construction": "unauthorizedConstruction",
      "/adminServices/permit-request": "permitRequest",
    };
    return titles[pathname] || "duesRequestTitle";
  };

  const shouldShowReason = pathname === "/payments/clearance";
  const shouldShowTaxpayer =
    !pathname.startsWith("/realEstate/") &&
    !pathname.startsWith("/adminServices/");

  return (
    <div className="pb-10">
      <p className="text-xl md:text-2xl font-bold text-darkOlive pb-8">
        {t(getTitleKey())}
      </p>

      <form
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        {shouldShowReason && (
          <InputField
            label={t("reason")}
            placeholder={t("reasonPlaceholder")}
            value={formData.reason ?? ""}
            onChange={(val) => handleChange("reason", val)}
            required
            error={errors.reason}
            type="text"
            inputMode="text"
            pattern=".*"
          />
        )}

        {shouldShowTaxpayer && (
          <InputField
            label={t("taxpayerLabel")}
            placeholder={t("taxpayerPlaceholder")}
            value={formData.taxpayer ?? ""}
            onChange={(val) => handleChange("taxpayer", val)}
            required
            error={errors.taxpayer}
            type="text"
            inputMode="text"
            pattern="^[A-Za-z\u0600-\u06FF\s]+$"
          />
        )}

        <InputField
          label={t("propertyNumber")}
          placeholder={t("propertyNumberPlaceholder")}
          value={formData.propertyNumber}
          onChange={(val) => handleChange("propertyNumber", val)}
          required
          error={errors.propertyNumber}
          type="text"
          inputMode="numeric"
          pattern="[0-9٠-٩]*"
        />

        <div className="flex flex-col gap-1">
          <InputField
            label={t("sectionNumber")}
            placeholder={t("sectionNumberPlaceholder")}
            value={formData.sectionNumber}
            onChange={(val) => handleChange("sectionNumber", val)}
            error={errors.sectionNumber}
            type="text"
            inputMode="numeric"
            pattern="[0-9٠-٩]*"
          />
          <p className="text-gray-600 text-xl">{t("locationNote")}</p>
        </div>
      </form>
    </div>
  );
};

export default ClearanceRequestSection;
