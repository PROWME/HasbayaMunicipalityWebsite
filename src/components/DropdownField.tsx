"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

interface CustomDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  required = false,
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("mainInfo");

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col w-full relative" ref={dropdownRef}>
      <label className="text-xl font-bold text-mossGreen mb-2">
        {label}
        {required && <span> *</span>}
      </label>

      <div
        className="relative border rounded-lg flex items-center justify-between
          px-5 py-3 text-lg text-darkOlive bg-white cursor-pointer hover:ring-1 hover:ring-gray-400"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value || <span>&nbsp;</span>}
        <FaChevronDown
          size={13}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white z-10 shadow rounded mt-1 overflow-auto">
          {options.map((option, idx) => (
            <div
              key={idx}
              className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-1">{t("toast.requiredField")}</p>
      )}
    </div>
  );
};

export default CustomDropdown;
