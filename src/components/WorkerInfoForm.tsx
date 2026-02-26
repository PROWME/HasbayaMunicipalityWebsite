"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import InputField from "@/components/InputField";
import DropdownField from "./DropdownField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface WorkerFormData {
  name: string;
  surname: string;
  nationality: string;
  fatherName: string;
  motherName: string;
  nationalId: string;
  gender: string;
  socialStatus: string;
  unAssistance: string;
  birthDate: Date | null;
  lebanonEntryDate: Date | null;
  municipalityEntryDate: Date | null;

  mobilePhone: string;
  landlinePhone: string;
  bloodType: string;
  educationLevel: string;
  militaryService: string;
}

interface WorkerInfoFormProps {
  formData: WorkerFormData;
  setFormData: React.Dispatch<React.SetStateAction<WorkerFormData>>;
  errors: Record<string, boolean>;
}

const WorkerInfoForm: React.FC<WorkerInfoFormProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const { t } = useTranslation("mainInfo");

  const handleChange = (
    field: keyof WorkerFormData,
    value: string | Date | null
  ) => {
    setFormData((prev: WorkerFormData) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col gap-6 py-8">
      <p className="text-2xl font-bold text-darkOlive">{t("mainInfoTitle")}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <InputField
          label={t("name")}
          placeholder={t("namePlaceholder")}
          value={formData.name}
          onChange={(val) => handleChange("name", val)}
          required
          error={errors.name}
          type="text"
          inputMode="text"
          pattern="^[A-Za-z\u0600-\u06FF\s]+$"
        />
        <InputField
          label={t("surname")}
          placeholder={t("surnamePlaceholder")}
          value={formData.surname}
          onChange={(val) => handleChange("surname", val)}
          required
          error={errors.surname}
          type="text"
          inputMode="text"
          pattern="^[A-Za-z\u0600-\u06FF\s]+$"
        />
        <InputField
          label={t("nationality")}
          placeholder={t("nationalityPlaceholder")}
          value={formData.nationality}
          onChange={(val) => handleChange("nationality", val)}
          required
          error={errors.nationality}
          type="text"
          inputMode="text"
          pattern="^[A-Za-z\u0600-\u06FF\s]+$"
        />
        <InputField
          label={t("fatherName")}
          placeholder={t("fatherNamePlaceholder")}
          value={formData.fatherName}
          onChange={(val) => handleChange("fatherName", val)}
          type="text"
          inputMode="text"
          pattern="^[A-Za-z\u0600-\u06FF\s]+$"
        />
        <InputField
          label={t("motherName")}
          placeholder={t("motherNamePlaceholder")}
          value={formData.motherName}
          onChange={(val) => handleChange("motherName", val)}
          type="text"
          inputMode="text"
          pattern="^[A-Za-z\u0600-\u06FF\s]+$"
        />
        <InputField
          label={t("nationalId")}
          placeholder={t("nationalIdPlaceholder")}
          value={formData.nationalId}
          onChange={(val) => handleChange("nationalId", val)}
          type="text"
          inputMode="numeric"
          pattern="^[0-9٠-٩]*$"
        />
        <DropdownField
          label={t("gender")}
          options={t("genderOptions", { returnObjects: true }) as string[]}
          value={formData.gender}
          onChange={(val) => handleChange("gender", val)}
          required
          error={errors.gender}
        />
        <DropdownField
          label={t("socialStatus")}
          options={t("statusOptions", { returnObjects: true }) as string[]}
          value={formData.socialStatus}
          onChange={(val) => handleChange("socialStatus", val)}
          required
          error={errors.socialStatus}
        />
        <DropdownField
          label={t("unAssistance")}
          options={t("unOptions", { returnObjects: true }) as string[]}
          value={formData.unAssistance}
          onChange={(val) => handleChange("unAssistance", val)}
        />
        <div className="flex flex-col">
          <label className="text-xl font-bold text-mossGreen mb-3">
            {t("birthDateLabel")} *
          </label>
          <DatePicker
            selected={formData.birthDate}
            onChange={(date) => handleChange("birthDate", date)}
            className="border rounded-lg px-2 py-3 text-lg text-darkOlive placeholder-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-forestGreen"
            placeholderText={t("birthDatePlaceholder")}
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
          {errors.birthDate && (
            <p className="text-red-500 text-sm mt-1">
              {t("toast.requiredField")}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-xl font-bold text-mossGreen mb-3">
            {t("lebanonEntryDate")} *
          </label>
          <DatePicker
            selected={formData.lebanonEntryDate}
            onChange={(date) => handleChange("lebanonEntryDate", date)}
            className="border rounded-lg px-2 py-3 text-lg text-darkOlive placeholder-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-forestGreen"
            placeholderText={t("lebanonEntryDatePlaceholder")}
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
          {errors.lebanonEntryDate && (
            <p className="text-red-500 text-sm mt-1">
              {t("toast.requiredField")}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-xl font-bold text-mossGreen mb-3">
            {t("municipalityEntryDate")} *
          </label>
          <DatePicker
            selected={formData.municipalityEntryDate}
            onChange={(date) => handleChange("municipalityEntryDate", date)}
            className="border rounded-lg px-2 py-3 text-lg text-darkOlive placeholder-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-forestGreen"
            placeholderText={t("municipalityEntryDatePlaceholder")}
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
          {errors.municipalityEntryDate && (
            <p className="text-red-500 text-sm mt-1">
              {t("toast.requiredField")}
            </p>
          )}
        </div>

        <InputField
          type="tel"
          label={t("mobilePhone")}
          placeholder={t("mobilePhonePlaceholder")}
          value={formData.mobilePhone}
          onChange={(val) => handleChange("mobilePhone", val)}
          required
          error={errors.mobilePhone}
          inputMode="numeric"
          pattern="^[0-9٠-٩]*$"
        />
        <InputField
          label={t("landlinePhone")}
          type="tel"
          placeholder={t("landlinePhonePlaceholder")}
          value={formData.landlinePhone}
          onChange={(val) => handleChange("landlinePhone", val)}
          inputMode="numeric"
          pattern="^[0-9٠-٩]*$"
        />
        <DropdownField
          label={t("bloodType")}
          options={t("bloodTypeOptions", { returnObjects: true }) as string[]}
          value={formData.bloodType}
          onChange={(val) => handleChange("bloodType", val)}
        />
        <DropdownField
          label={t("educationLevel")}
          options={t("educationOptions", { returnObjects: true }) as string[]}
          value={formData.educationLevel}
          onChange={(val) => handleChange("educationLevel", val)}
          required
          error={errors.educationLevel}
        />
        <DropdownField
          label={t("militaryService")}
          options={t("yesNoOptions", { returnObjects: true }) as string[]}
          value={formData.militaryService}
          onChange={(val) => handleChange("militaryService", val)}
        />
      </div>
    </div>
  );
};

export default WorkerInfoForm;
