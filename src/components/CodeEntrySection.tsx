"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import InputField from "@/components/InputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CodeEntrySectionProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  birthDate: Date | null;
  setBirthDate: React.Dispatch<React.SetStateAction<Date | null>>;
  errors: Record<string, boolean>;
}

const CodeEntrySection: React.FC<CodeEntrySectionProps> = ({
  showForm,
  setShowForm,
  code,
  setCode,
  birthDate,
  setBirthDate,
  errors,
}) => {
  const { t } = useTranslation("mainInfo");

  return (
    <div className="flex flex-col pb-3 border-b border-gray-400">
      <button
        onClick={() => setShowForm(true)}
        className="bg-mossGreen text-white px-5 py-2 rounded shadow hover:bg-forestGreen transition w-fit"
      >
        {t("openCodeEntry")}
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="border rounded-lg shadow-lg p-6 bg-white max-w-md w-11/12">
            <p className="text-xl font-bold text-mossGreen mb-6">
              {t("codeEntryTitle")}
            </p>

            <div className="space-y-4">
              <InputField
                label={t("codeLabel")}
                placeholder={t("codePlaceholder")}
                value={code}
                onChange={setCode}
                required
                error={errors.code}
                type="number"
                inputMode="numeric"
                pattern="[0-9٠-٩]*"
              />
              {/* {errors.code && (
                <p className="text-red-500 text-sm">
                  {t("toast.requiredField")}
                </p>
              )} */}

              <div className="flex flex-col w-full">
                <label className="text-xl font-bold text-mossGreen mb-3">
                  {t("birthDateLabel")} *
                </label>
                <DatePicker
                  selected={birthDate}
                  onChange={(date) => date && setBirthDate(date)}
                  className="border rounded-lg px-2 py-3 text-lg text-darkOlive placeholder-gray-400 w-full focus:outline-none focus:ring-1 focus:ring-forestGreen"
                  placeholderText={t("birthDatePlaceholder")}
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                {errors.birthDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {t("toast.requiredField")}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 hover:opacity-80 text-darkOlive px-4 py-2 rounded shadow transition"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-mossGreen hover:bg-forestGreen text-white px-4 py-2 rounded shadow transition"
                >
                  {t("submit")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEntrySection;
