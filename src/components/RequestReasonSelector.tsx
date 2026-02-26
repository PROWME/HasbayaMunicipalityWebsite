"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import CheckPoint from "@/components/CheckPoint";
import FileUploader from "@/components/FileUploader";
import InputField from "@/components/InputField";

interface RequestReasonSelectorProps {
  selectedReason: "transfer" | "sale" | "license" | "other";
  setSelectedReason: React.Dispatch<
    React.SetStateAction<"transfer" | "sale" | "license" | "other">
  >;
  saleFiles: File[];
  setSaleFiles: React.Dispatch<React.SetStateAction<File[]>>;
  otherReason: string;
  setOtherReason: React.Dispatch<React.SetStateAction<string>>;
  errors: Record<string, boolean>;
}

const RequestReasonSelector: React.FC<RequestReasonSelectorProps> = ({
  selectedReason,
  setSelectedReason,
  saleFiles,
  setSaleFiles,
  otherReason,
  setOtherReason,
  errors,
}) => {
  const { t } = useTranslation("mainInfo");
  const maxFiles = 10;

  const handleUpload = (
    files: FileList | null,
    setState: React.Dispatch<React.SetStateAction<File[]>>,
    currentFiles: File[]
  ) => {
    if (!files) return;
    const newFiles = Array.from(files);
    const updated = [...currentFiles, ...newFiles].slice(0, maxFiles);
    setState(updated);
  };

  const handleRemove = (
    index: number,
    setState: React.Dispatch<React.SetStateAction<File[]>>,
    currentFiles: File[]
  ) => {
    const updated = [...currentFiles];
    updated.splice(index, 1);
    setState(updated);
  };

  return (
    <div className="space-y-6 pb-10">
      <p className="text-xl md:text-2xl font-bold underline text-darkOlive pb-6">
        {t("requestReason")}
      </p>

      <CheckPoint
        text={t("reasonTransfer")}
        checked={selectedReason === "transfer"}
        onClick={() => setSelectedReason("transfer")}
      />

      <div className="space-y-2">
        <CheckPoint
          text={t("reasonSale")}
          checked={selectedReason === "sale"}
          onClick={() => setSelectedReason("sale")}
        />
        {selectedReason === "sale" && (
          <div className="ms-6 mt-1">
            <FileUploader
              files={saleFiles}
              maxFiles={maxFiles}
              onUpload={(f) => handleUpload(f, setSaleFiles, saleFiles)}
              onRemove={(i) => handleRemove(i, setSaleFiles, saleFiles)}
              required
            />
            {errors.saleFiles && (
              <p className="text-red-500 text-sm">{t("toast.requiredField")}</p>
            )}
          </div>
        )}
      </div>

      <CheckPoint
        text={t("reasonLicense")}
        checked={selectedReason === "license"}
        onClick={() => setSelectedReason("license")}
      />

      <div className="space-y-2">
        <CheckPoint
          text={t("reasonOther")}
          checked={selectedReason === "other"}
          onClick={() => setSelectedReason("other")}
        />
        {selectedReason === "other" && (
          <div className="ms-6 mt-1 lg:w-1/3 md:w-1/2">
            <InputField
              value={otherReason}
              onChange={setOtherReason}
              placeholder={t("otherReasonPlaceholder")}
              required
              error={errors.otherReason}
              label=""
            />
            {errors.otherReason && (
              <p className="text-red-500 text-sm">{t("toast.requiredField")}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestReasonSelector;
