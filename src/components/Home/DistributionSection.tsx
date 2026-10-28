// src/components/DistributionSection.tsx
import React from "react";
import { motion } from "framer-motion";
import sampleVideo from "@/assets/video/1st video.mp4";
import sampleVideo1 from "@/assets/video/secound video.mp4";

const DistributionSection: React.FC = () => {
  return (
    <div>
      {/* ===================== DISTRIBUTION SECTION ===================== */}
      <div className="relative overflow-hidden">
        <div className="w-full mx-auto px-2 sm:px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 md:gap-16 shadow-lg border border-gray-800 bg-[#081E19] justify-center items-center rounded-2xl">
            {/* Left Column - VIDEO */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg flex justify-center items-center"
            >
              <video
                src={sampleVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-xl"
              />
            </motion.div>

            {/* Right Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="px-2 sm:px-4 md:px-6"
            >
              <h2 className="mb-4 text-2xl font-semibold uppercase leading-tight tracking-tight text-white sm:text-3xl md:mb-5">
                DISTRIBUTION
              </h2>

              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
                Music distribution involves making music accessible across
                multiple platforms. It includes delivering music to streaming
                services and digital stores for listening, purchasing, and
                royalty collection. Marlow manages the technical process of
                uploading, formatting, and delivering music to all major
                platforms.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ===================== GAP ADDED HERE ===================== */}
        <div className="mt-12"></div>

        {/* ===================== PUBLISHING SECTION ===================== */}
        <div className="w-full mx-auto px-2 sm:px-6 md:px-0 mb-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 rounded-2xl md:gap-16 shadow-lg border border-gray-800 bg-[#081E19] justify-center items-center">
            {/* Right Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="px-2 sm:px-4 md:px-6 order-2 lg:order-1"
            >
              <h2 className="mb-4 text-2xl font-semibold uppercase leading-tight tracking-tight text-white sm:text-3xl md:mb-5">
                PUBLISHING
              </h2>

              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
                Music publishing involves the protection and management of
                songwriting copyrights. Marlow ensures your compositions
                are properly registered, monetized, and distributed across
                platforms while collecting all publishing royalties.
              </p>
            </motion.div>

            {/* Left Column - VIDEO */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg flex justify-center items-center order-1 lg:order-2"
            >
              <video
                src={sampleVideo1}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto  rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionSection;
