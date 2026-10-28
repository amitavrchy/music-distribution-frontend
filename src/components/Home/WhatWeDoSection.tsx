import { motion } from "framer-motion";
// import smallLogoIcon from "@/assets/logo 1.png";

import { BrandMark } from "@/components/BrandMark";

import CommonWrapper from "../../common/CommonWrapper";
import { Link } from "react-router-dom";

const WhatWeDoSection = () => {
  const lines = [
    "Empowering creators to thrive in the ever-",
    "evolving global music landscape",
    "through cutting-edge technology",
    "and dedicated support.",
  ];

  return (
    <CommonWrapper>
      <div className="text-center title">
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-4 sm:mb-6 md:mb-8  bg-[#3A5CFF0D] rounded-3xl border-t border-[#075A2F] w-[180px] sm:w-[195px] md:w-[200px] lg:w-[240px]  h-[50px] sm:h-[48px] md:h-[52px] mx-auto"
        >
          {/* <img
            src={smallLogoIcon}
            alt="Small Logo"
            className="h-9 w-9 object-contain logo-spin"
          /> */}

          <Link
            to="/"
            className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 "
          >
            <BrandMark size={36} />
          </Link>

          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 font-light tracking-[0.25em] uppercase">
            WHAT WE DO
          </p>
        </motion.div>

        {/* Main Heading */}
        <div className="mx-auto max-w-3xl">
          {lines.map((line, index) => (
            <motion.h1
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                delay: index * 0.2,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="text-lg font-medium uppercase leading-snug tracking-wide text-[#F2F2F2] sm:text-xl md:text-2xl"
            >
              {line}
            </motion.h1>
          ))}
        </div>
      </div>
    </CommonWrapper>
  );
};

export default WhatWeDoSection;
