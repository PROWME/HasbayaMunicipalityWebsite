"use client";

import React from "react";

interface CheckPointProps {
  text: string;
  checked?: boolean;
  className?: string;
  onClick?: () => void;
}

const CheckPoint: React.FC<CheckPointProps> = ({
  text,
  checked = true,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 text-darkOlive cursor-pointer select-none ${className}`}
    >
      <span
        className={`
          w-4 h-4 rounded-full border-2 
          ${checked ? "border-mossGreen" : "border-gray-400"}
          flex items-center justify-center
        `}
      >
        {checked && (
          <span className="w-2 h-2 bg-mossGreen rounded-full" />
        )}
      </span>
      <p className="text-xl md:text-2xl">{text}</p>
    </div>
  );
};

export default CheckPoint;
