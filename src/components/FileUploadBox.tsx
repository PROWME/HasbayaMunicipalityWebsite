"use client";

import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";

interface FileUploadBoxProps {
  label: string;
  required?: boolean;
  accept?: string;
  name?: string;
  file: File | null;
  setFile: (file: File | null) => void;
  error?: boolean;
  fullWidth?: boolean;
}

const FileUploadBox: React.FC<FileUploadBoxProps> = ({
  label,
  required = false,
  accept = "*",
  name = "file-upload",
  file,
  setFile,
  error = false,
  fullWidth = false,
}) => {
  const { t } = useTranslation("mainInfo");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleRemove = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      className={`flex flex-col space-y-5 ${
        fullWidth ? "w-full" : "lg:w-1/3 md:w-1/2 sm:w-1/2"
      }`}
    >
      <div className="border-2 border-mossGreen rounded px-3 py-2 ">
        <label className="text-darkOlive text-lg flex flex-col gap-2">
          <span>
            {label}
            {required && <span>*</span>}
          </span>

          <div
            className={`transition px-5 py-1 rounded flex items-center justify-center gap-2 text-white ${
              file
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-mossGreen hover:bg-forestGreen cursor-pointer"
            }`}
          >
            {t("upload")}
            <MdFileUpload size={20} />
            <input
              ref={fileInputRef}
              type="file"
              name={name}
              accept={accept}
              disabled={!!file}
              hidden
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFileChange(e.target.files)
              }
            />
          </div>
        </label>
      </div>
      {error && (
        <p className="text-red-500 text-sm">{t("toast.requiredField")}</p>
      )}
      {file && (
        <div className="border-b border-darkOlive pb-2 rounded-lg flex items-center justify-between text-gray-600 text-lg">
          <span className="truncate">
            {label} - {file.name}
          </span>
          <button type="button" onClick={handleRemove}>
            <IoIosCloseCircleOutline size={25} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploadBox;
