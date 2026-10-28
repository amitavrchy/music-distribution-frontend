import React from "react";
import { motion } from "framer-motion";
import giter from "@/assets/photo/New folder/giter.jpg";

interface InstrumentItem {
  id: number;
  text: string;
  side: "left" | "right";
}

const instruments: InstrumentItem[] = [
  { id: 1, text: "Digital Distribution", side: "left" },
  { id: 2, text: "Accounting", side: "right" },
  { id: 3, text: "Analytics & Data", side: "left" },
  { id: 4, text: "Catalogue Arrangement", side: "right" },
  { id: 5, text: "Release Management", side: "left" },
  { id: 6, text: "Split Sheet Administration", side: "right" },
];

const EcosystemSection: React.FC = () => {
  const leftInstruments = instruments.filter((item) => item.side === "left");
  const rightInstruments = instruments.filter((item) => item.side === "right");

  const InstrumentCard: React.FC<{ item: InstrumentItem }> = ({ item }) => {
    const textAlignClass =
      item.side === "left"
        ? "text-right md:text-right text-center"
        : "text-left md:text-left text-center";

    return (
      <motion.div
        className={`p-4 space-y-16 ${textAlignClass}`}
        initial={{ opacity: 0, x: item.side === "left" ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <p className="text-3xl sm:text-4xl font-extrabold text-gray-500 opacity-70">
          {item.id}
        </p>

        <p className="text-base sm:text-lg font-medium text-white">
          {item.text}
        </p>
      </motion.div>
    );
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center p-6 sm:p-8">
      {/* Title */}
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-10 sm:mb-12 uppercase tracking-wider text-center px-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        WHAT INSTRUMENTS SHAPE OUR ECOSYSTEM?
      </motion.h2>

      <div
        className="
        grid 
        grid-cols-1 
        md:grid-cols-3 
        gap-10 
        max-w-6xl 
        w-full 
        items-center
      "
      >
        {/* LEFT ITEMS */}
        <div className="flex flex-col justify-center md:justify-around order-2 md:order-1">
          {leftInstruments.map((item) => (
            <InstrumentCard key={item.id} item={item} />
          ))}
        </div>

        {/* CENTER IMAGE */}
        <motion.div
          className="flex justify-center items-center order-1 md:order-2"
          initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.06, rotate: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="w-full h-auto max-w-[260px] sm:max-w-xs md:max-w-md lg:max-w-lg shadow-2xl rounded-xl overflow-hidden"
          >
            <img
              src={giter}
              alt="Electric guitar"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[606px] object-cover"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT ITEMS */}
        <div className="flex flex-col justify-center md:justify-around order-3">
          {rightInstruments.map((item) => (
            <InstrumentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcosystemSection;
