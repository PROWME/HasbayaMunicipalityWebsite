"use client";

import React, { useState } from "react";
import InputField from "./InputField";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";

interface Props {
  onClose: () => void;
}

const LoginForm: React.FC<Props> = ({ onClose }) => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";
  const router = useRouter();
  const [lockTime, setLockTime] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: false, password: false });

const handleLogin = async () => {
  const newErrors = {
    username: !username.trim(),
    password: !password.trim(),
  };

  setErrors(newErrors);

  if (newErrors.username || newErrors.password) {
    toast.error(t("login.requiredFields"));
    return;
  }

  // Check if currently locked
  if (lockTime !== null && Date.now() < lockTime) {
    const remainingMs = lockTime - Date.now();
    const remainingMinutes = Math.ceil(remainingMs / 60000);
    toast.error(
      t("login.rateLimiteWithTime", { minutes: remainingMinutes })
    );
    return;
  }

  try {
    setLoading(true);
    const response = await axios.post("/api/auth/login", {
      username,
      password,
    });

    Cookies.set("token", response.data.token);
    Cookies.set("name", response.data.user.name);
    Cookies.set("username", response.data.user.username);
    toast.success(t("login.success"));
    onClose();

    router.push("/admin/news");
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string; timeLeft?: number }>;

    if (error.response?.status === 401) {
      toast.error(t("login.invalidCredentials"));
    } else if (error.response?.status === 429) {
      const timeLeft = error.response.data.timeLeft ?? 1; // fallback 1 minute
      const lockUntil = Date.now() + timeLeft * 60 * 1000;
      setLockTime(lockUntil);

      toast.error(
        t("login.rateLimiteWithTime", { minutes: timeLeft })
      );
    } else {
      toast.error(t("login.failed"));
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault(); // Still needed for SPA, but won't block password manager
        await handleLogin(); // Your existing login logic
      }}
      autoComplete="on"
    >
      <div className="space-y-4">
        <InputField
          label={t("login.username")}
          value={username}
          name="username"
          onChange={(val) => {
            setUsername(val);
            setErrors((prev) => ({ ...prev, username: false }));
          }}
          type="text"
          required
          error={errors.username}
        />
        <InputField
          label={t("login.password")}
          value={password}
          onChange={(val) => {
            setPassword(val);
            setErrors((prev) => ({ ...prev, password: false }));
          }}
          type="password"
          name="password"
          required
          error={errors.password}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-lg py-2 flex items-center justify-center gap-2 text-white transition 
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-mossGreen hover:bg-opacity-80"
    }`}
        >
          {loading ? (
            <>
              <ImSpinner2 className="animate-spin" size={18} />
            </>
          ) : (
            t("login.button")
          )}
        </button>
      </div>
      <ToastContainer
        position={isArabic ? "bottom-left" : "bottom-right"}
        autoClose={3000}
        hideProgressBar={false}
      />
    </form>
  );
};

export default LoginForm;
