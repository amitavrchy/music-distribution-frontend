// import img1 from "@/assets/cart12.png";
import img1 from "@/assets/kareme/photo/lebel5.svg";

import React from "react";

// --- Data Definitions ---
const catalogueContent = {
  title: "CATALOGUE ARRANGEMENT",
  description: `At LabelBridge, we firmly believe that the organization of a music catalog is essential for effectively managing an artist's or label's collection. A well-structured catalog ensures that tracks are systematically arranged and readily available for distribution and sales. Each track is typically assigned an International Standard Recording Code (ISRC), which serves as a unique identifier, facilitating the efficient tracking of audio recordings across multiple platforms and aiding in royalty management. Furthermore, albums and compilations receive a Universal Product Code (UPC), which plays a similar role in retail, helping with sales tracking and inventory oversight. Effective catalog organization, complete with precise metadata and coding, not only streamlines the distribution process but also boosts visibility on streaming platforms and in retail spaces, thereby maximizing an artist's exposure and revenue potential. By keeping a meticulously organized organized catalog, music creators can ensure their works are properly managed and protected in an increasingly competitive landscape.`,
  imageSrc: "/images/image_2d0ec2.png",
  imageAlt: "Catalogue Arrangement Menu Mockup",
};

// --- React Component ---
const CatalogueArrangementSoloSection: React.FC = () => {
  return (
    <div className=" min-h-max py-16 px-4 sm:px-8 lg:px-0 text-white overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 w-full mx-auto items-center">
        {/* 1. Text Content (Left Side on Desktop) */}
        <div className="text-left order-2 md:order-1">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 uppercase tracking-wide">
            {catalogueContent.title}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {catalogueContent.description}
          </p>
        </div>

        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <img
            src={img1}
            alt={catalogueContent.imageAlt}
            className="w-full h-auto rounded-lg shadow-2xl bg-gray-800 p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogueArrangementSoloSection;
