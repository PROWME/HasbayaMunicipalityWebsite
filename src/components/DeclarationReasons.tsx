"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import InputField from "./InputField";

interface DeclarationReasonsProps {
  reasons: string[];
  setReasons: React.Dispatch<React.SetStateAction<string[]>>;
  otherReason: string;
  setOtherReason: React.Dispatch<React.SetStateAction<string>>;
  errors: Record<string, boolean>;
}

const DeclarationReasons: React.FC<DeclarationReasonsProps> = ({
  reasons,
  setReasons,
  otherReason,
  setOtherReason,
  errors,
}) => {
  const { t } = useTranslation("mainInfo");

  const options = [
    "restoration",
    "constructionWall",
    "supportWall",
    "landLeveling",
    "tent",
    "portableHouse",
    "piles",
    "sewage",
    "demolition",
    "other",
  ];

  const handleCheckboxChange = (key: string) => {
    if (reasons.includes(key)) {
      setReasons(reasons.filter((r) => r !== key));
    } else {
      setReasons([...reasons, key]);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <p className="text-xl md:text-2xl font-bold text-darkOlive">
        {t("declarationTitle")} *
      </p>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 xl:w-2/3 w-fit">
        {options.map((key) => (
          <label
            key={key}
            className="flex items-center gap-3 text-darkOlive cursor-pointer text-lg md:text-xl"
          >
            <input
              type="checkbox"
              checked={reasons.includes(key)}
              onChange={() => handleCheckboxChange(key)}
              className="w-5 h-5 accent-mossGreen rounded border-gray-400 focus:ring-mossGreen focus:outline-none"
            />
            <span>{t(`reasons.${key}`)}</span>
          </label>
        ))}
      </div>
      {errors.declarationReasons && !errors.otherReason && (
        <p className="text-red-500 text-sm">{t("toast.requiredField")}</p>
      )}
      {reasons.includes("other") && (
        <div className="md:w-1/2 w-full">
          <InputField
            label={t("reasons.other")}
            placeholder={t("reasonPlaceholder")}
            value={otherReason}
            onChange={setOtherReason}
            required
            error={errors.otherReason}
          />
          {/* {errors.otherReason && (
            <p className="text-red-500 text-sm">{t("toast.requiredField")}</p>
          )} */}
        </div>
      )}
    </div>
  );
};

export default DeclarationReasons;
