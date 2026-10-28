import React from "react";
import { motion, Variants } from "framer-motion";
// import cart from "@/assets/kareme/photo/new1.png";
// import cart from "@/assets/cart1.png";
// import cart from "@/assets/kareme/photo/photo1.svg";
import cart from "@/assets/kareme/photo/photo1.svg";

// import Blueangle from "@/assets/blueAngle.png";

const FeaturesSection: React.FC = () => {
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const textBlockVariants: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative overflow-hidden text-gray-100">
      {/* Background SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="560"
        height="1000"
        viewBox="0 0 560 1000"
        fill="none"
        className="absolute -top-96 left-0 pointer-events-none opacity-90"
      >
        <g
          style={{ mixBlendMode: "plus-lighter" }}
          opacity="0.8"
          filter="url(#filter0_f_1763_8444)"
        >
          <path
            d="M-175.654 94L-269.986 178.875L407.417 905.294L465.131 853.366L-175.654 94Z"
            fill="url(#paint0_linear_1763_8444)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_1763_8444"
            x="-363.986"
            y="0"
            width="923.117"
            height="999.294"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="47"
              result="effect1_foregroundBlur_1763_8444"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1763_8444"
            x1="-222.82"
            y1="136.438"
            x2="441.424"
            y2="874.697"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3A5CFF" />
            <stop offset="0.88" stopColor="#010411" />
          </linearGradient>
        </defs>
      </svg>

      {/* Outer Border */}
      <div className="absolute -top-96 left-0 w-full h-full opacity-20 pointer-events-none"></div>

      <div className="w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Artist Philosophy */}
          <motion.div
            variants={textBlockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 relative bg-gray-900/40 border border-gray-700/50 
                       border-l-[#2C3E95] border-b-[#2C3E95]
                       rounded-xl p-5 sm:p-6 lg:p-8"
          >
            {/* <img
              src={Blueangle}
              alt=""
              className="absolute top-4 left-4 w-7 h-7 sm:w-9 sm:h-9"
            /> */}

            <h2 className="mb-3 text-xl font-semibold tracking-tight sm:text-2xl">
              ARTIST-CENTRIC PHILOSOPHY
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              At Marlow, our philosophy centers around an Artist-Centric
              approach. We offer bespoke services designed to support you and
              your team while ensuring full ownership of your content. We focus
              on optimizing revenue across platforms, real-time earnings
              tracking, and premium label services—without sacrificing creative
              freedom.
            </p>
          </motion.div>

          {/* <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center w-full"
          >
            <div className="w-full  bg-gray-900/30 border border-gray-700/40 rounded-xl p-4 sm:p-6">
              <img
                src={cart}
                alt="Revenue overview"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </motion.div> */}

          {/* Image */}

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center w-full"
          >
            <div className="w-full bg-gray-900/30 border border-gray-700/40 rounded-xl p-4 sm:p-6">
              <img
                src={cart}
                alt="Revenue overview"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* --- Bottom Row --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* LABEL BRIDGE */}
          <motion.div
            variants={textBlockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col p-4 sm:p-6 md:p-6 bg-gray-900/40 rounded-lg border border-gray-700/50 shadow-lg border-t-[#2C3E95] w-full"
          >
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-gray-200 sm:text-2xl">
              LABEL BRIDGE
            </h2>
            <p className="text-sm sm:text-base md:text-base leading-relaxed sm:leading-relaxed md:leading-relaxed text-gray-300">
              Label Bridge is a dynamic music technology ecosystem created by
              Marlow aimed at empowering independent artists and labels to
              distribute, monetize, and manage their music more efficiently.
              Specifically crafted for independent musicians, producers, and
              small labels, Label Bridge offers a straightforward solution for
              getting music onto streaming platforms. It also provides essential
              tools for maximizing revenue and tracking royalties. With all the
              resources you need to build and manage your career like a major
              label, you can easily access everything from your mobile device or
              computer.
            </p>
          </motion.div>

          {/* SONGWRITERS & PRODUCER'S */}
          <motion.div
            variants={textBlockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col p-4 sm:p-6 md:p-6 bg-gray-900/40 rounded-lg border border-gray-700/50 shadow-lg w-full"
          >
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-gray-200 sm:text-2xl">
              SONGWRITERS & PRODUCER'S
            </h2>
            <p className="text-sm sm:text-base md:text-base leading-relaxed sm:leading-relaxed md:leading-relaxed text-gray-300">
              Marlow is dedicated to providing transformative opportunities
              for songwriters and producers at every stage of their career
              journey. In the music realm, the term "placement" signifies the
              successful licensing or sale of a songwriter's or producer's work
              to various platforms, including artists, films, television shows,
              and other media. For songwriters, this typically means having
              their original compositions recorded and made available by an
              artist. For producers, it could entail having their beats or
              production featured in songs, commercials, or other creative
              projects. Achieving placements can represent a significant
              milestone, unlocking pathways to royalties, increased visibility,
              and additional opportunities. We collaborate closely with our
              clients to help them realize this ambition.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
