import React from "react";
import Image from "next/image";

const images = [
  "/history/h1.jpg",
  "/history/h2.jpg",
  "/history/h2_3.jpg",
  "/history/h4.jpg",
];

const History2 = () => {
  return (
    <div
      className="relative w-full lg:h-auto min-h-screen bg-cover bg-center lg:py-0 py-10"
      style={{ backgroundImage: `url("/stone-bg.png")` }}
    >
      <div className="absolute inset-0 bg-white opacity-95 z-0" />

      <div className="w-11/12 mx-auto lg:h-auto min-h-screen relative z-10 flex flex-wrap justify-between items-center gap-6">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="w-full sm:w-[45%] lg:w-[22%] h-[50vh] overflow-hidden rounded-xl shadow-md
            transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={src}
              alt={`history-${idx}`}
              width={400}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default History2;
