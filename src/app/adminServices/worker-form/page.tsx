"use client";

import CodeEntrySection from "@/components/CodeEntrySection";
import FileUploadBox from "@/components/FileUploadBox";
import SendButton from "@/components/SendButton";
import TextAreaWithCount from "@/components/TextAreaWithCount";
import WorkerInfoForm from "@/components/WorkerInfoForm";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackToRequests from "@/components/BackToRequests";

interface WorkerFormData {
  name: string;
  surname: string;
  nationality: string;
  fatherName: string;
  motherName: string;
  nationalId: string;
  gender: string;
  socialStatus: string;
  unAssistance: string;
  birthDate: Date | null;
  lebanonEntryDate: Date | null;
  municipalityEntryDate: Date | null;

  mobilePhone: string;
  landlinePhone: string;
  bloodType: string;
  educationLevel: string;
  militaryService: string;
}

const WorkerForm = () => {
  const { t,i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";

  const [showCodeForm, setShowCodeForm] = useState(false);
  const [code, setCode] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [residenceNote, setResidenceNote] = useState("");
  const [preDisplacementAddress, setPreDisplacementAddress] = useState("");
  const [entryMethod, setEntryMethod] = useState("");
  const [personalPhoto, setPersonalPhoto] = useState<File | null>(null);

  const [workerFormData, setWorkerFormData] = useState<WorkerFormData>({
    name: "",
    surname: "",
    nationality: "",
    fatherName: "",
    motherName: "",
    nationalId: "",
    gender: "",
    socialStatus: "",
    unAssistance: "",
    birthDate: null,
    lebanonEntryDate: null,
    municipalityEntryDate: null,
    mobilePhone: "",
    landlinePhone: "",
    bloodType: "",
    educationLevel: "",
    militaryService: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    if (!code.trim()) newErrors.code = true;
    if (!birthDate) newErrors.birthDate = true;
    if (!workerFormData.name.trim()) newErrors.name = true;
    if (!workerFormData.surname.trim()) newErrors.surname = true;
    if (!workerFormData.nationality.trim()) newErrors.nationality = true;
    if (!workerFormData.gender) newErrors.gender = true;
    if (!workerFormData.socialStatus) newErrors.socialStatus = true;
    if (!workerFormData.mobilePhone.trim()) newErrors.mobilePhone = true;
    if (!workerFormData.educationLevel) newErrors.educationLevel = true;
    if (!workerFormData.birthDate) newErrors.workerBirthDate = true;
    if (!residenceNote.trim()) newErrors.residenceNote = true;
    if (!preDisplacementAddress.trim()) newErrors.preDisplacementAddress = true;
    if (!entryMethod.trim()) newErrors.entryMethod = true;
    if (!personalPhoto) newErrors.personalPhoto = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setCode("");
    setBirthDate(null);
    setWorkerFormData({
      name: "",
      surname: "",
      nationality: "",
      fatherName: "",
      motherName: "",
      nationalId: "",
      gender: "",
      socialStatus: "",
      unAssistance: "",
      birthDate: null,
      lebanonEntryDate: null,
      municipalityEntryDate: null,
      mobilePhone: "",
      landlinePhone: "",
      bloodType: "",
      educationLevel: "",
      militaryService: "",
    });
    setResidenceNote("");
    setPreDisplacementAddress("");
    setEntryMethod("");
    setPersonalPhoto(null);
    setErrors({});
    setShowCodeForm(false);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error(t("toast.validationError"));
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();

    // Basic fields
    formDataToSend.append("code", code);
    if (birthDate) {
      formDataToSend.append("birthDate", birthDate.toISOString());
    }

    // Worker info fields
    Object.entries(workerFormData).forEach(([key, value]) => {
      formDataToSend.append(
        key,
        value instanceof Date ? value.toISOString() : String(value)
      );
    });

    // Textarea fields
    formDataToSend.append("residenceNote", residenceNote);
    formDataToSend.append("preDisplacementAddress", preDisplacementAddress);
    formDataToSend.append("entryMethod", entryMethod);

    // File
    if (personalPhoto) {
      formDataToSend.append("personalPhoto", personalPhoto);
    }

    try {
      const response = await axios.post(
        "/api/worker-form",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(t("toast.submitSuccess"));
        resetForm();
      } else {
        toast.error(t("toast.serverError"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(t("toast.networkError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="w-11/12 mx-auto py-10">
        <BackToRequests />

        <p className="text-4xl xl:text-[40px] font-bold text-darkOlive pb-8">
          {t("adminServices.title4")}
        </p>

        <div className="gap-4 flex flex-col md:text-2xl text-xl text-coralRed font-semibold max-w-xl pb-8">
          <p>{t("clearanceNote1")}</p>
          <p>{t("clearanceNote2")}</p>
        </div>

        <CodeEntrySection
          showForm={showCodeForm}
          setShowForm={setShowCodeForm}
          code={code}
          setCode={setCode}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          errors={errors}
        />

        <div className="flex flex-col">
          <WorkerInfoForm
            formData={workerFormData}
            setFormData={setWorkerFormData}
            errors={errors}
          />

          <TextAreaWithCount
            label={t("residenceNote")}
            maxLength={250}
            value={residenceNote}
            onChange={setResidenceNote}
            required
            errors={errors.residenceNote}
          />
          <TextAreaWithCount
            label={t("preDisplacementAddress")}
            maxLength={150}
            value={preDisplacementAddress}
            onChange={setPreDisplacementAddress}
            required
            errors={errors.preDisplacementAddress}
          />

          <TextAreaWithCount
            label={t("entryMethod")}
            maxLength={150}
            value={entryMethod}
            onChange={setEntryMethod}
            required
            errors={errors.entryMethod}
          />
          <div className="pt-6">
            <FileUploadBox
              label={t("personalPhoto")}
              required
              file={personalPhoto}
              setFile={setPersonalPhoto}
              error={errors.personalPhoto}
            />
          </div>

          <SendButton
            text={t("send")}
            onClick={handleSubmit}
            loading={isSubmitting}
          />
        </div>
      </div>
      <ToastContainer
        position={isArabic ? "bottom-left" : "bottom-right"}
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default WorkerForm;
