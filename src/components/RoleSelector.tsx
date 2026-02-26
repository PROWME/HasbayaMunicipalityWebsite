"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import FileUploader from "@/components/FileUploader";
import CheckPoint from "@/components/CheckPoint";
import { usePathname } from "next/navigation";

interface RoleSelectorProps {
  role: "owner" | "agent" | "tenant";
  setRole: (role: "owner" | "agent" | "tenant") => void;
  agentFiles: File[];
  setAgentFiles: React.Dispatch<React.SetStateAction<File[]>>;
  tenantDoc1Files?: File[];
  setTenantDoc1Files?: React.Dispatch<React.SetStateAction<File[]>>;
  tenantDoc2Files?: File[];
  setTenantDoc2Files?: React.Dispatch<React.SetStateAction<File[]>>;
  errors: Record<string, boolean>;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  role,
  setRole,
  agentFiles,
  setAgentFiles,
  tenantDoc1Files,
  setTenantDoc1Files,
  tenantDoc2Files,
  setTenantDoc2Files,
  errors,
}) => {
  const { t } = useTranslation("mainInfo");
  const maxFiles = 10;
  const pathname = usePathname();

  const handleUpload = (
    newFiles: FileList | null,
    setState: React.Dispatch<React.SetStateAction<File[]>>,
    currentFiles: File[]
  ) => {
    if (!newFiles) return;
    const fileArray = Array.from(newFiles);
    const updated = [...currentFiles, ...fileArray].slice(0, maxFiles);
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
    <div className="w-full border-b border-gray-400 py-10">
      <div className="flex gap-10 flex-wrap">
        <div className="flex flex-col gap-2">
          <CheckPoint
            text={t("owner")}
            checked={role === "owner"}
            onClick={() => setRole("owner")}
          />
        </div>

        <div className="flex flex-col gap-5">
          <CheckPoint
            text={t("legalRep")}
            checked={role === "agent"}
            onClick={() => setRole("agent")}
          />
          {role === "agent" && (
            <div className="flex flex-col gap-3">
              <p className="text-lg text-darkOlive font-bold">
                {t("legalDocNote")} *
              </p>
              <FileUploader
                files={agentFiles}
                maxFiles={maxFiles}
                onUpload={(f) => handleUpload(f, setAgentFiles, agentFiles)}
                onRemove={(i) => handleRemove(i, setAgentFiles, agentFiles)}
                required
              />
              {errors.agentFiles && (
                <p className="text-red-500 text-sm">
                  {t("toast.requiredField")}
                </p>
              )}
            </div>
          )}
        </div>

        {pathname === "/adminServices/permit-request" && (
          <div className="flex flex-col gap-5">
            <CheckPoint
              text={t("tenant")}
              checked={role === "tenant"}
              onClick={() => setRole("tenant")}
            />
            {role === "tenant" && (
              <div className="flex flex-col gap-3">
                <p className="text-lg text-darkOlive font-bold">
                  {t("tenantNote1")} *
                </p>
                <FileUploader
                  files={tenantDoc1Files ?? []}
                  maxFiles={maxFiles}
                  onUpload={(f) =>
                    tenantDoc1Files &&
                    setTenantDoc1Files?.([
                      ...tenantDoc1Files,
                      ...Array.from(f ?? []),
                    ])
                  }
                  onRemove={(i) => {
                    if (tenantDoc1Files && setTenantDoc1Files) {
                      const updated = [...tenantDoc1Files];
                      updated.splice(i, 1);
                      setTenantDoc1Files(updated);
                    }
                  }}
                  required
                />
                {errors.tenantDoc1Files && (
                  <p className="text-red-500 text-sm">
                    {t("toast.requiredField")}
                  </p>
                )}

                <p className="text-lg text-darkOlive font-bold">
                  {t("tenantNote2")} *
                </p>
                <FileUploader
                  files={tenantDoc2Files ?? []}
                  maxFiles={maxFiles}
                  onUpload={(f) =>
                    tenantDoc2Files &&
                    setTenantDoc2Files?.([
                      ...tenantDoc2Files,
                      ...Array.from(f ?? []),
                    ])
                  }
                  onRemove={(i) => {
                    if (tenantDoc2Files && setTenantDoc2Files) {
                      const updated = [...tenantDoc2Files];
                      updated.splice(i, 1);
                      setTenantDoc2Files(updated);
                    }
                  }}
                  required
                />
                {errors.tenantDoc2Files && (
                  <p className="text-red-500 text-sm">
                    {t("toast.requiredField")}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelector;
