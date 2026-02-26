"use client";

import React from "react";
import { FaSpinner } from "react-icons/fa";

interface SendButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const SendButton: React.FC<SendButtonProps> = ({
  text,
  onClick,
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`mt-6 px-10 py-3 rounded-xl text-lg transition w-fit flex items-center gap-3
        ${
          disabled || loading
            ? "bg-gray-300 text-darkOlive cursor-not-allowed"
            : "bg-mossGreen text-white hover:bg-forestGreen"
        }
      `}
    >
      {loading && (
        <FaSpinner className="animate-spin text-xl" />
      )}
      <span>{text}</span>
    </button>
  );
};

export default SendButton;
