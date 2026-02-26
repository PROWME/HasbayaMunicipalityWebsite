"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

const ClearanceInfoSection: React.FC = () => {
  const { t } = useTranslation("mainInfo");
  const pathname = usePathname();

  const notes = t("notesDetailsStructured", { returnObjects: true }) as {
    points: {
      title: string;
      subPoints?: string[];
      note?: string;
    }[];
  };

  return (
    <div className={`pt-10 text-darkOlive font-bold text-xl md:text-2xl`}>
      <p>{t("paymentReminder")}</p>

      <div className="py-10 space-y-10">
        <p>{t("processingTimeTitle")}</p>
        <p>{t("processingTimeDetails")}</p>
        <p>{t("processingTimeNote")}</p>
      </div>

      <p>{t("contactInfo")}</p>
      {pathname === "/payments/clearance" && (
        <div className="py-10 space-y-10">
          <p>{t("notesTitle")}</p>

          <ol className="list-decimal space-y-4 ps-5">
            {notes.points.map((point, idx) => (
              <li key={idx}>
                <p className="mb-2">{point.title}</p>
                {point.subPoints && (
                  <ul className="list-disc ps-5 space-y-2">
                    {point.subPoints.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                )}
                {point.note && <p className="pt-10">{point.note}</p>}
              </li>
            ))}
          </ol>
        </div>
      )}
      {pathname === "/realEstate/appraisal-report" && (
        <div className="space-y-10 py-10">
          <p>{t("notesTitle")}</p>
          <p>{t("appraisalCommitteeDescription")}</p>
        </div>
      )}
    </div>
  );
};

export default ClearanceInfoSection;
