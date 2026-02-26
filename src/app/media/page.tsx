"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Dialog } from "@mui/material";

const images = {
  largeTop: "/media/1.jpg",
  smallTop1: "/media/2.jpg",
  smallTop2: "/media/3.jpg",
  stacked1: "/media/4.jpg",
  stacked2: "/media/5.jpg",
  tallCenter: "/media/6.jpg",
  wideRight: "/media/7.jpg",
  bottom1: "/media/8.jpg",
  bottom2: "/media/9.jpg",
};

const Media = () => {
  const { t } = useTranslation("mainInfo");
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="w-11/12 mx-auto min-h-screen py-10">
        <p
          className="text-4xl xl:text-[40px] font-bold text-darkOlive
         flex items-end"
        >
          {t("historyPage.scenesOfVillage")}
        </p>
        <div className="pt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div
            className="relative md:col-span-2 h-56 md:h-64 cursor-pointer"
            onClick={() => handleImageClick(images.largeTop)}
          >
            <Image
              src={images.largeTop}
              alt="media-1"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div
            className="relative h-56 md:h-64 cursor-pointer"
            onClick={() => handleImageClick(images.smallTop1)}
          >
            <Image
              src={images.smallTop1}
              alt="media-2"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div
            className="relative h-56 md:h-64 cursor-pointer"
            onClick={() => handleImageClick(images.smallTop2)}
          >
            <Image
              src={images.smallTop2}
              alt="media-3"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div
              className="relative h-56 md:h-full cursor-pointer"
              onClick={() => handleImageClick(images.stacked1)}
            >
              <Image
                src={images.stacked1}
                alt="media-4"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div
              className="relative h-56 md:h-full cursor-pointer"
              onClick={() => handleImageClick(images.stacked2)}
            >
              <Image
                src={images.stacked2}
                alt="media-5"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          <div
           className="relative h-56 md:h-auto md:row-span-1 cursor-pointer"
            onClick={() => handleImageClick(images.tallCenter)}
          >
            <Image
              src={images.tallCenter}
              alt="media-6"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="md:col-span-2 col-span-1 flex flex-col gap-4">
            <div
              className="relative h-56 md:h-64 cursor-pointer"
              onClick={() => handleImageClick(images.wideRight)}
            >
              <Image
                src={images.wideRight}
                alt="media-7"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              <div
                className="relative md:w-1/2 h-56 md:h-60 cursor-pointer"
                onClick={() => handleImageClick(images.bottom1)}
              >
                <Image
                  src={images.bottom1}
                  alt="media-8"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div
                className="relative md:w-1/2 h-56 md:h-60 cursor-pointer"
                onClick={() => handleImageClick(images.bottom2)}
              >
                <Image
                  src={images.bottom2}
                  alt="media-9"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <div className="flex items-center justify-center rounded-lg overflow-hidden">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Full Image"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "auto", height: "auto", maxHeight: "90vh" }}
            />
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Media;
