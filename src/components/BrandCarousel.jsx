import React, { useState } from "react";
import bataLogo from "../assets/bata.webp";
import wildStone from "../assets/wildStone.webp"
import redmi from "../assets/redmi.webp"
import plam from "../assets/plam.webp"
import Nivea from "../assets/Nivea.webp"
import himalaya from "../assets/himalaya.webp"
import wow from "../assets/wow.webp"
import mamaearth from "../assets/mamaearth.webp"

const brandLogos = [
  bataLogo,
  wildStone,
  redmi,
  plam,
  Nivea,
  wow ,
  mamaearth,
  himalaya,
];

const BrandCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="py-10 overflow-hidden border-y bg-purple-100 border-gray-400 rounded-none mx-0 shadow-sm">
      <div
        className={`flex gap-8 w-max px-4 transition-transform duration-500 ease-linear ${
          isPaused ? "" : "animate-scroll"
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {[...brandLogos, ...brandLogos].map((logo, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-lg shadow p-3 min-w-[80px] h-30 w-50 flex items-center justify-center"
          >
            <img
              src={logo}
              alt={`brand-${idx}`}
              className="h-15 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandCarousel;