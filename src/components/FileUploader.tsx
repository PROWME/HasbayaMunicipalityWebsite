"use client";

import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { MdFileUpload } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface FileUploaderProps {
  files: File[];
  maxFiles?: number; // optional
  onUpload: (files: FileList | null) => void;
  onRemove: (index: number) => void;
  error?: boolean;
  required?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  maxFiles,
  onUpload,
  onRemove,
  error = false,
  required = false,
}) => {
  const { t } = useTranslation("mainInfo");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isDisabled = maxFiles !== undefined && files.length >= maxFiles;

  return (
    <div className="flex flex-col gap-4 w-fit">
      <div className="border border-mossGreen rounded px-3 py-2 flex items-center justify-between gap-4">
        <label
          className={`bg-mossGreen hover:bg-forestGreen text-white px-4 py-1.5 rounded cursor-pointer flex items-center gap-2 text-lg ${
            isDisabled ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {t("upload")}
          <MdFileUpload size={20} />
          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            required={required}
            disabled={isDisabled}
            onChange={(e) => onUpload(e.target.files)}
          />
        </label>
        <span className="text-base text-darkOlive whitespace-nowrap">
          {t("fileCount")}: {files.length}
          {maxFiles !== undefined && `/${maxFiles}`}
        </span>
        {error && (
          <p className="text-red-500 text-sm">{t("toast.validationError")}</p>
        )}
      </div>

      {files.length > 0 && (
        <ul className="flex flex-col gap-2 w-full">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-3 border-b border-darkOlive rounded-lg px-3 py-2 text-gray-700 text-base"
            >
              <span className="truncate max-w-[200px] sm:max-w-[300px]">
                {file.name}
              </span>
              <button type="button" onClick={() => onRemove(index)}>
                <IoIosCloseCircleOutline size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
