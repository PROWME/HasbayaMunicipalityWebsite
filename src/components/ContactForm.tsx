"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const ContactForm = () => {
  const { t } = useTranslation("mainInfo");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.send(
        "service_69x4wna",
        "template_qeh2gfm",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          message: form.message,
        },
        "IwLgWSpLC93b7L_uT"
      );

      toast.success(t("contactPage.success"));
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error(t("contactPage.error"));
    }

    setSending(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-5/6 w-11/12 max-w-3xl mx-auto py-10 2xl:py-0"
    >
      <p className="text-4xl xl:text-[40px] font-bold text-white mb-8">
        {t("contactPage.writeToUs")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="mb-1 text-white font-medium text-start">
            {t("contactPage.firstName")}
          </label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-2 bg-white border-gray-300 focus:border-darkOlive outline-none text-start"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-white font-medium text-start">
            {t("contactPage.lastName")}
          </label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-2 bg-white border-gray-300 focus:border-darkOlive outline-none text-start"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-col">
        <label className="mb-1 text-white font-medium text-start">
          {t("contactPage.emailForm")}
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2 bg-white border-gray-300 focus:border-darkOlive outline-none text-start"
        />
      </div>

      <div className="mb-4 flex flex-col">
        <label className="mb-1 text-white font-medium text-start">
          {t("contactPage.phoneForm")}
        </label>
        <input
          type="tel"
          name="phone"
          pattern="[0-9]*"
          inputMode="numeric"
          required
          value={form.phone}
          onChange={handleChange}
          title="Only numbers are allowed"
          className="border rounded-lg px-4 py-2 bg-white border-gray-300 focus:border-darkOlive outline-none text-start"
        />
      </div>

      <div className="mb-6 flex flex-col">
        <label className="mb-1 text-white font-medium text-start">
          {t("contactPage.message")}
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          required
          className="border rounded-lg px-4 py-2 bg-white border-gray-300 focus:border-darkOlive outline-none text-start"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="bg-mossGreen rounded-xl font-medium hover:opacity-90 w-full py-3 text-white"
      >
        {sending ? t("contactPage.sending") : t("contactPage.send")}
      </button>
    </form>
  );
};

export default ContactForm;