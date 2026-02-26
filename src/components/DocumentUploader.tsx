"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import CheckPoint from "@/components/CheckPoint";
import FileUploadBox from "@/components/FileUploadBox";
import FileUploader from "./FileUploader";
import { usePathname } from "next/navigation";

interface DocumentUploaderProps {
  propertyFiles?: File[];
  setPropertyFiles?: React.Dispatch<React.SetStateAction<File[]>>;
  constructionFiles?: File[];
  setConstructionFiles?: React.Dispatch<React.SetStateAction<File[]>>;
  divisionFiles?: File[];
  setDivisionFiles?: React.Dispatch<React.SetStateAction<File[]>>;
  comprehensivePropertyStatement?: File[];
  setComprehensivePropertyStatement?: React.Dispatch<
    React.SetStateAction<File[]>
  >;
  easementAndZoning?: File[];
  setEasementAndZoning?: React.Dispatch<React.SetStateAction<File[]>>;
  violationProof?: File[];
  setViolationProof?: React.Dispatch<React.SetStateAction<File[]>>;
  boundarySurvey?: File[];
  setBoundarySurvey?: React.Dispatch<React.SetStateAction<File[]>>;
  surveyMap?: File[];
  setSurveyMap?: React.Dispatch<React.SetStateAction<File[]>>;
  networkDiagram?: File[];
  setNetworkDiagram?: React.Dispatch<React.SetStateAction<File[]>>;

  frontIdFile?: File | null;
  setFrontIdFile?: React.Dispatch<React.SetStateAction<File | null>>;
  backIdFile?: File | null;
  setBackIdFile?: React.Dispatch<React.SetStateAction<File | null>>;
  extractFile?: File | null;
  setExtractFile?: React.Dispatch<React.SetStateAction<File | null>>;

  selectedType: "id" | "extract";
  setSelectedType: React.Dispatch<React.SetStateAction<"id" | "extract">>;

  errors: Record<string, boolean>;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  propertyFiles,
  setPropertyFiles,
  constructionFiles,
  setConstructionFiles,
  divisionFiles,
  setDivisionFiles,
  comprehensivePropertyStatement,
  setComprehensivePropertyStatement,
  easementAndZoning,
  setEasementAndZoning,
  violationProof,
  setViolationProof,
  boundarySurvey,
  setBoundarySurvey,
  surveyMap,
  setSurveyMap,
  networkDiagram,
  setNetworkDiagram,
  frontIdFile,
  setFrontIdFile,
  backIdFile,
  setBackIdFile,
  extractFile,
  setExtractFile,
  selectedType,
  setSelectedType,
  errors,
}) => {
  const { t } = useTranslation("mainInfo");
  const pathname = usePathname();
  // const [selectedType, setSelectedType] = useState<"id" | "extract">("id");
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
    <div className="pb-10">
      <div className="space-y-3 text-darkOlive pb-8">
        <p className="text-xl md:text-2xl font-bold underline">
          {t("documentTitle")}
        </p>
        <p className="text-mossGreen underline font-semibold md:text-xl text-lg">
          {t("documentSubtitle")}
        </p>
      </div>

      <div className="space-y-10">
        <CheckPoint
          text={t("optionId")}
          checked={selectedType === "id"}
          onClick={() => setSelectedType("id")}
        />
        {selectedType === "id" &&
          frontIdFile !== undefined &&
          setFrontIdFile &&
          backIdFile !== undefined &&
          setBackIdFile && (
            <div className="flex flex-col gap-6 ms-6 mt-2">
              <FileUploadBox
                label={t("uploadFrontId")}
                required
                file={frontIdFile}
                setFile={setFrontIdFile}
              />
              {errors.frontIdFile && (
                <p className="text-red-500 text-sm">
                  {t("toast.requiredField")}
                </p>
              )}
              <FileUploadBox
                label={t("uploadBackId")}
                required
                file={backIdFile}
                setFile={setBackIdFile}
              />
              {errors.backIdFile && (
                <p className="text-red-500 text-sm">
                  {t("toast.requiredField")}
                </p>
              )}
            </div>
          )}

        <CheckPoint
          text={t("optionExtract")}
          checked={selectedType === "extract"}
          onClick={() => setSelectedType("extract")}
        />
        {selectedType === "extract" &&
          extractFile !== undefined &&
          setExtractFile && (
            <div className="flex flex-col gap-4 ms-6 mt-2">
              <FileUploadBox
                label={t("uploadExtract")}
                required
                file={extractFile}
                setFile={setExtractFile}
              />
              {errors.extractFile && (
                <p className="text-red-500 text-sm">
                  {t("toast.requiredField")}
                </p>
              )}
            </div>
          )}
      </div>

      {pathname === "/payments/clearance" && (
        <div className="pt-10 space-y-10">
          {propertyFiles && setPropertyFiles && (
            <div className="flex flex-col gap-3">
              <p className="text-lg text-darkOlive font-bold">
                {t("propertyStatement")} *
              </p>
              <FileUploader
                files={propertyFiles}
                maxFiles={maxFiles}
                onUpload={(f) =>
                  handleUpload(f, setPropertyFiles, propertyFiles)
                }
                onRemove={(i) =>
                  handleRemove(i, setPropertyFiles, propertyFiles)
                }
              />
              {errors.propertyFiles && (
                <p className="text-red-500 text-sm">
                  {t("toast.requiredField")}
                </p>
              )}
            </div>
          )}

          {constructionFiles && setConstructionFiles && (
            <div className="flex flex-col gap-3">
              <p className="text-lg text-darkOlive font-bold">
                {t("constructionProof")}
              </p>
              <FileUploader
                files={constructionFiles}
                maxFiles={maxFiles}
                onUpload={(f) =>
                  handleUpload(f, setConstructionFiles, constructionFiles)
                }
                onRemove={(i) =>
                  handleRemove(i, setConstructionFiles, constructionFiles)
                }
              />
            </div>
          )}

          {divisionFiles && setDivisionFiles && (
            <div className="flex flex-col gap-3">
              <p className="text-lg text-darkOlive font-bold">
                {t("divisionMaps")}
              </p>
              <FileUploader
                files={divisionFiles}
                maxFiles={maxFiles}
                onUpload={(f) =>
                  handleUpload(f, setDivisionFiles, divisionFiles)
                }
                onRemove={(i) =>
                  handleRemove(i, setDivisionFiles, divisionFiles)
                }
              />
            </div>
          )}
        </div>
      )}

      {(pathname.startsWith("/realEstate") ||
        pathname === "/adminServices/permit-request" ||
        pathname === "/adminServices/sewage-network") && (
        <div className="pt-10 space-y-10">
          {comprehensivePropertyStatement &&
            setComprehensivePropertyStatement && (
              <div className="flex flex-col gap-3">
                <p className="text-lg text-darkOlive font-bold">
                  {t("comprehensivePropertyStatement")} *
                </p>
                <FileUploader
                  files={comprehensivePropertyStatement}
                  maxFiles={maxFiles}
                  onUpload={(f) =>
                    handleUpload(
                      f,
                      setComprehensivePropertyStatement,
                      comprehensivePropertyStatement
                    )
                  }
                  onRemove={(i) =>
                    handleRemove(
                      i,
                      setComprehensivePropertyStatement,
                      comprehensivePropertyStatement
                    )
                  }
                />
                {errors.comprehensivePropertyStatement && (
                  <p className="text-red-500 text-sm">
                    {t("toast.requiredField")}
                  </p>
                )}
              </div>
            )}
        </div>
      )}

      {pathname === "/adminServices/permit-request" && (
        <div className="pt-10 space-y-10">
          {easementAndZoning && setEasementAndZoning && (
            <div className="flex flex-col gap-3">
              <p className="text-lg text-darkOlive font-bold">
                {t("easementAndZoning")} *
              </p>
              <FileUploader
                files={easementAndZoning}
                maxFiles={maxFiles}
                onUpload={(f) =>
                  handleUpload(f, setEasementAndZoning, easementAndZoning)
                }
                onRemove={(i) =>
                  handleRemove(i, setEasementAndZoning, easementAndZoning)
                }
              />
              {errors.easementAndZoning && (
                <p className="text-red-500 text-sm">
                  {t("toast.requiredField")}
                </p>
              )}
            </div>
          )}

          {boundarySurvey && setBoundarySurvey && (
            <div className="flex flex-col gap-3">
              <p className="text-lg text-darkOlive font-bold max-w-sm">
                {t("boundarySurvey")} *
              </p>
              <FileUploader
                files={boundarySurvey}
                maxFiles={maxFiles}
                onUpload={(f) =>
                  handleUpload(f, setBoundarySurvey, boundarySurvey)
                }
                onRemove={(i) =>
                  handleRemove(i, setBoundarySurvey, boundarySurvey)
                }
              />
              {errors.boundarySurvey && (
                <p className="text-red-500 text-sm">
                  {t("toast.requiredField")}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* done */}
      {pathname === "/adminServices/sewage-network" && (
        <div className="pt-10 space-y-10">
          {surveyMap && setSurveyMap && (
            <div className="flex flex-col gap-3">
              <p className="text-lg text-darkOlive font-bold">
                {t("surveyMap")} *
              </p>
              <FileUploader
                files={surveyMap}
                maxFiles={maxFiles}
                onUpload={(f) => handleUpload(f, setSurveyMap, surveyMap)}
                onRemove={(i) => handleRemove(i, setSurveyMap, surveyMap)}
              />
              {errors.surveyMap && (
                <p className="text-red-500 text-sm">
                  {t("toast.requiredField")}
                </p>
              )}
            </div>
          )}

          {networkDiagram && setNetworkDiagram && (
            <div className="flex flex-col gap-3">
              <p className="text-lg text-darkOlive font-bold max-w-sm">
                {t("networkDiagram")} *
              </p>
              <FileUploader
                files={networkDiagram}
                maxFiles={maxFiles}
                onUpload={(f) =>
                  handleUpload(f, setNetworkDiagram, networkDiagram)
                }
                onRemove={(i) =>
                  handleRemove(i, setNetworkDiagram, networkDiagram)
                }
              />
              {errors.networkDiagram && (
                <p className="text-red-500 text-sm">
                  {t("toast.requiredField")}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* done */}
      {pathname === "/realEstate/unauthorized-construction" &&
        violationProof &&
        setViolationProof && (
          <div className="pt-10">
            <div className="flex flex-col gap-3">
              <p className="text-lg text-darkOlive font-bold">
                {t("violationProof")} *
              </p>
              <FileUploader
                files={violationProof}
                maxFiles={maxFiles}
                onUpload={(f) =>
                  handleUpload(f, setViolationProof, violationProof)
                }
                onRemove={(i) =>
                  handleRemove(i, setViolationProof, violationProof)
                }
              />
              {errors.violationProof && (
                <p className="text-red-500 text-sm">
                  {t("toast.requiredField")}
                </p>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default DocumentUploader;
