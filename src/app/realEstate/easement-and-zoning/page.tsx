"use client";

import BackToRequests from "@/components/BackToRequests";
import ClearanceInfoSection from "@/components/ClearanceInfoSection";
import ClearanceRequestSection from "@/components/ClearanceRequestSection";
import DocumentUploader from "@/components/DocumentUploader";
import InfoForm from "@/components/InfoForm";
import RequestReasonSelector from "@/components/RequestReasonSelector";
import RoleSelector from "@/components/RoleSelector";
import SendButton from "@/components/SendButton";
import TextAreaWithCount from "@/components/TextAreaWithCount";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EasementAndZoning = () => {
  const { t, i18n } = useTranslation("mainInfo");
  const isArabic = i18n.language === "first_lang";

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    floor: "",
    property: "",
    whatsapp: false,
    propertyNumber: "",
    sectionNumber: "",
  });

  const [role, setRole] = useState<"owner" | "agent" | "tenant">("owner");
  const [agentFiles, setAgentFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // ⬇️ New lifted file states
  const [frontIdFile, setFrontIdFile] = useState<File | null>(null);
  const [backIdFile, setBackIdFile] = useState<File | null>(null);
  const [extractFile, setExtractFile] = useState<File | null>(null);
  const [comprehensivePropertyStatement, setComprehensivePropertyStatement] =
    useState<File[]>([]);
  const [selectedReason, setSelectedReason] = useState<
    "transfer" | "sale" | "license" | "other"
  >("transfer");
  const [saleFiles, setSaleFiles] = useState<File[]>([]);
  const [otherReason, setOtherReason] = useState("");
  const [selectedType, setSelectedType] = useState<"id" | "extract">("id");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};

    // Basic fields
    if (!formData.fullName.trim()) newErrors.fullName = true;
    if (!formData.phone.trim()) newErrors.phone = true;
    if (!formData.address.trim()) newErrors.address = true;
    if (!formData.floor.trim()) newErrors.floor = true;
    if (!formData.property.trim()) newErrors.property = true;
    if (!formData.propertyNumber.trim()) newErrors.propertyNumber = true;

    // Role-specific
    if (role === "agent" && agentFiles.length === 0)
      newErrors.agentFiles = true;

    // DocumentUploader validations
    if (selectedType === "id" && (!frontIdFile || !backIdFile)) {
      newErrors.documentVerification = true;
    }
    if (selectedType === "extract" && !extractFile) {
      newErrors.documentVerification = true;
    }

    if (selectedType === "id") {
      if (!frontIdFile) newErrors.frontIdFile = true;
      if (!backIdFile) newErrors.backIdFile = true;
    }

    if (selectedType === "extract") {
      if (!extractFile) newErrors.extractFile = true;
    }

    if (selectedReason === "sale" && saleFiles.length === 0) {
      newErrors.saleFiles = true;
    }

    if (selectedReason === "other" && !otherReason.trim()) {
      newErrors.otherReason = true;
    }

    if (comprehensivePropertyStatement.length === 0) {
      newErrors.comprehensivePropertyStatement = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      floor: "",
      property: "",
      whatsapp: false,
      propertyNumber: "",
      sectionNumber: "",
    });

    setRole("owner");
    setAgentFiles([]);
    setNotes("");
    setErrors({});

    setFrontIdFile(null);
    setBackIdFile(null);
    setExtractFile(null);
    setSelectedType("id");
    setComprehensivePropertyStatement([]);

    setSelectedReason("transfer");
    setSaleFiles([]);
    setOtherReason("");
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error(t("toast.validationError"));
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      data.append(key, String(val));
    });

    data.append("role", role);
    data.append("notes", notes);
    data.append("selectedReason", selectedReason);
    data.append("otherReason", otherReason);

    if (frontIdFile) data.append("frontId", frontIdFile);
    if (backIdFile) data.append("backId", backIdFile);
    if (extractFile) data.append("extract", extractFile);
    comprehensivePropertyStatement.forEach((file) =>
      data.append("comprehensivePropertyStatement", file)
    );
    agentFiles.forEach((file) => data.append("agentFiles", file));

    try {
      const res = await fetch(
        "/api/easement-zoning",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();
      if (result.success) {
        toast.success(t("toast.submitSuccess"));
        resetForm();
      } else {
        toast.error(t("toast.serverError"));
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="w-11/12 mx-auto py-10">
        <BackToRequests />

        <p className="text-4xl xl:text-[40px] font-bold text-darkOlive pb-8">
          {t("realEstate.title2")}
        </p>

        <div className="gap-4 flex flex-col md:text-2xl text-xl text-coralRed font-semibold max-w-xl pb-8">
          <p>{t("clearanceNote1")}</p>
          <p>{t("clearanceNote2")}</p>
        </div>

        <div className="flex flex-col border-b border-gray-400">
          <RoleSelector
            role={role}
            setRole={setRole}
            agentFiles={agentFiles}
            setAgentFiles={setAgentFiles}
            errors={errors}
          />
          <InfoForm
            formData={{
              fullName: formData.fullName,
              phone: formData.phone,
              email: formData.email,
              address: formData.address,
              floor: formData.floor,
              property: formData.property,
              whatsapp: formData.whatsapp,
            }}
            setFormData={(partialData) =>
              setFormData((prev) => ({
                ...prev,
                ...(typeof partialData === "function"
                  ? partialData(prev)
                  : partialData),
              }))
            }
            errors={errors}
          />

          <ClearanceRequestSection
            formData={{
              propertyNumber: formData.propertyNumber,
              sectionNumber: formData.sectionNumber,
            }}
            setFormData={(partialData) =>
              setFormData((prev) => ({
                ...prev,
                ...(typeof partialData === "function"
                  ? partialData(prev)
                  : partialData),
              }))
            }
            errors={errors}
          />

          <RequestReasonSelector
            selectedReason={selectedReason}
            setSelectedReason={setSelectedReason}
            saleFiles={saleFiles}
            setSaleFiles={setSaleFiles}
            otherReason={otherReason}
            setOtherReason={setOtherReason}
            errors={errors}
          />
          <DocumentUploader
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            frontIdFile={frontIdFile}
            setFrontIdFile={setFrontIdFile}
            backIdFile={backIdFile}
            setBackIdFile={setBackIdFile}
            extractFile={extractFile}
            setExtractFile={setExtractFile}
            comprehensivePropertyStatement={comprehensivePropertyStatement}
            setComprehensivePropertyStatement={
              setComprehensivePropertyStatement
            }
            errors={errors}
          />
        </div>
        <TextAreaWithCount
          label={t("notes")}
          maxLength={250}
          onChange={setNotes}
          value={notes}
        />
        <SendButton
          text={t("send")}
          onClick={handleSubmit}
          loading={isSubmitting}
        />
        <ClearanceInfoSection />
      </div>
      <ToastContainer
        position={isArabic ? "bottom-left" : "bottom-right"}
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default EasementAndZoning;
