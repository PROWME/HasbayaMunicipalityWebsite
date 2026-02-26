"use client";

import React from "react";
import CheckPoint from "@/components/CheckPoint";
import FileUploader from "@/components/FileUploader";
import { useTranslation } from "react-i18next";

interface BuildingStatusSelectorProps {
  status: "no" | "yes";
  setStatus: React.Dispatch<React.SetStateAction<"no" | "yes">>;
  permitType: "none" | "withoutHousing" | "withHousing";
  setPermitType: React.Dispatch<
    React.SetStateAction<"none" | "withoutHousing" | "withHousing">
  >;
  permitFilesNoHousing: File[];
  setPermitFilesNoHousing: React.Dispatch<React.SetStateAction<File[]>>;
  permitFilesWithHousing: File[];
  setPermitFilesWithHousing: React.Dispatch<React.SetStateAction<File[]>>;
  housingFiles: File[];
  setHousingFiles: React.Dispatch<React.SetStateAction<File[]>>;
  errors: Record<string, boolean>;
}

const BuildingStatusSelector: React.FC<BuildingStatusSelectorProps> = ({
  status,
  setStatus,
  permitType,
  setPermitType,
  permitFilesNoHousing,
  setPermitFilesNoHousing,
  permitFilesWithHousing,
  setPermitFilesWithHousing,
  housingFiles,
  setHousingFiles,
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
    <div className="flex flex-col gap-6 pb-10">
      <p className="text-xl md:text-2xl font-bold underline text-darkOlive pb-4">
        {t("buildingStatus")}
      </p>

      <CheckPoint
        text={t("noConstruction")}
        checked={status === "no"}
        onClick={() => setStatus("no")}
      />

      <CheckPoint
        text={t("withConstruction")}
        checked={status === "yes"}
        onClick={() => {
          setStatus("yes");
          setPermitType("none");
        }}
      />

      {status === "yes" && (
        <div className="ms-5 space-y-2">
          <CheckPoint
            text={t("unlicensed")}
            checked={permitType === "none"}
            onClick={() => setPermitType("none")}
          />

          <CheckPoint
            text={t("licensedNoHousing")}
            checked={permitType === "withoutHousing"}
            onClick={() => setPermitType("withoutHousing")}
          />
          {permitType === "withoutHousing" && (
            <div className="flex flex-col gap-2 ms-5">
              <p className="text-lg text-darkOlive font-bold">
                {t("buildingPermitLabel")} *
              </p>
              <FileUploader
                files={permitFilesNoHousing}
                maxFiles={maxFiles}
                onUpload={(f) =>
                  handleUpload(f, setPermitFilesNoHousing, permitFilesNoHousing)
                }
                onRemove={(i) =>
                  handleRemove(i, setPermitFilesNoHousing, permitFilesNoHousing)
                }
              />
              {errors.permitFilesNoHousing && (
                <p className="text-red-500 text-sm">
                  {t("toast.requiredField")}
                </p>
              )}
            </div>
          )}

          <CheckPoint
            text={t("licensedWithHousing")}
            checked={permitType === "withHousing"}
            onClick={() => setPermitType("withHousing")}
          />
          {permitType === "withHousing" && (
            <div className="flex flex-col gap-4 ms-5">
              <div className="flex flex-col gap-2">
                <p className="text-lg text-darkOlive font-bold">
                  {t("buildingPermitLabel")} *
                </p>
                <FileUploader
                  files={permitFilesWithHousing}
                  maxFiles={maxFiles}
                  onUpload={(f) =>
                    handleUpload(
                      f,
                      setPermitFilesWithHousing,
                      permitFilesWithHousing
                    )
                  }
                  onRemove={(i) =>
                    handleRemove(
                      i,
                      setPermitFilesWithHousing,
                      permitFilesWithHousing
                    )
                  }
                />
                {errors.permitFilesWithHousing && (
                  <p className="text-red-500 text-sm">
                    {t("toast.requiredField")}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg text-darkOlive font-bold">
                  {t("housingPermitLabel")} *
                </p>
                <FileUploader
                  files={housingFiles}
                  maxFiles={maxFiles}
                  onUpload={(f) =>
                    handleUpload(f, setHousingFiles, housingFiles)
                  }
                  onRemove={(i) =>
                    handleRemove(i, setHousingFiles, housingFiles)
                  }
                />
                {errors.housingFiles && (
                  <p className="text-red-500 text-sm">
                    {t("toast.requiredField")}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BuildingStatusSelector;
