"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  const { t, i18n } = useTranslation("mainInfo");
  const isRtl = i18n.language === "first_lang";

  return (
    <nav
      className={`flex items-center flex-wrap gap-1 text-darkOlive text-base `}
    >
      {crumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <Link href={crumb.href} className="underline hover:text-mossGreen md:text-4xl text-3xl">
            {`${t("backPrefix")} ${crumb.label}`}
          </Link>
          {index < crumbs.length - 1 &&
            (isRtl ? (
              <GoChevronLeft size={16} className="text-mossGreen" />
            ) : (
              <GoChevronRight size={16} className="text-mossGreen" />
            ))}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
