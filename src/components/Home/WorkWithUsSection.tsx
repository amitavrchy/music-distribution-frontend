import vic from "@/assets/vic.png";
// import BrandLogo from "@/assets/logo 1.png";

import { BrandMark } from "@/components/BrandMark";

import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
// import CommonWrapper from "@/common/CommonWrapper";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

export default function WorkWithUsSection() {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden text-white">
      {/* Bottom green glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-3/4 h-1/2 rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,0,0.3) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Main Card */}
      <div className="relative z-10 flex w-full flex-col items-center space-y-8 rounded-2xl border border-[#3E4744] px-6 py-10 text-center after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-[70%] after:-translate-x-1/2 after:rounded-full after:bg-[linear-gradient(90deg,transparent_0%,#01A037_50%,transparent_100%)] sm:px-10 sm:py-14 md:px-16 md:py-16 lg:py-20">
        {/* Top Tag */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex items-center gap-2 sm:gap-3 bg-[#3A5CFF0D] rounded-3xl px-4 sm:px-6 h-12 sm:h-14 border-t border-[#075D2F]"
        >
          {/* <img
            src={BrandLogo}
            alt="Brand Logo"
            className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
          /> */}

          <Link
            to="/"
            className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 "
          >
            <BrandMark size={36} />
          </Link>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-light tracking-[0.25em] uppercase">
            Work with us
          </p>
        </motion.div>

        {/* Heading */}
        <motion.h1
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl"
        >
          MARLOW CONNECTS CLIENTS <br className="hidden sm:block" />
          WORLDWIDE, EMPOWERING INDEPENDENT <br className="hidden md:block" />
          ARTISTS AND BRANDS.
        </motion.h1>

        {/* Button */}
        <div className="p-2 bg-[#1E3B2C] rounded-full">
          <motion.button
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="
              flex items-center gap-3
              px-6 sm:px-10 md:px-14
              py-3
              text-sm sm:text-base md:text-lg
              font-semibold
              rounded-full
              shadow-[0_0_180px_rgba(12,160,62,0.6)]
              bg-[radial-gradient(50%_50%_at_50%_50%,#16C55F_0%,#0CA03E_100%)]
              transition-transform duration-300 hover:scale-105
              whitespace-nowrap
            "
          >
            <Link to="/login">
              {" "}
              <span>Launch Your Music</span>
            </Link>
            {/* <RocketIcon className="h-5 w-5 sm:h-6 sm:w-6" /> */}
            <img src={vic} alt="" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// import { RocketIcon } from "lucide-react";
// import BrandLogo from "@/assets/logo 1.png";
// import { motion, Variants } from "framer-motion";
// import CommonWrapper from "@/common/CommonWrapper";

// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (custom: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" },
//   }),
// };

// export default function WorkWithUsSection() {
//   return (
//     <CommonWrapper className="relative  rounded-2xl flex flex-col items-center justify-center min-h-screen  text-white p-4 overflow-hidden">
//       {/* Subtle green glow effect at the bottom */}
//       <div
//         className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/2 rounded-full filter blur-3xl opacity-30"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(0,255,0,0.3) 0%, rgba(0,0,0,0) 70%)",
//         }}
//       ></div>

//       <div className="relative border border-[#3E4744] px-[220px] py-[80px] rounded-2xl z-10 flex flex-col items-center text-center mx-auto space-y-8 after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:h-[2px] after:w-[60%] after:bg-[linear-gradient(90deg,transparent_0%,#01A037_50%,transparent_100%)] after:rounded-full">
//         {/* Top Tag */}
//         <motion.div
//           custom={0}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           variants={fadeUp}
//           className="flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8 bg-[#3A5CFF0D] rounded-3xl w-[240px] md:w-[270px] h-[52px] mx-auto border-t border-[#075D2F]"
//         >
//           <img
//             src={BrandLogo}
//             alt="Small Logo"
//             className="h-8 w-8 object-contain logo-spin"
//           />

//           <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 font-light tracking-[0.25em] uppercase">
//             Work with us
//           </p>
//         </motion.div>

//         {/* Main Heading */}
//         <motion.h1
//           custom={1}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           variants={fadeUp}
//           className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tight px-4"
//         >
//           MARLOW CONNECTS CLIENTS <br /> WORLDWIDE, EMPOWERING INDEPENDENT{" "}
//           <br />
//           ARTISTS AND BRANDS.
//         </motion.h1>

//         {/* "Launch Your Music" Button */}
//         <div className="p-2 bg-[#1E3B2C] w-fit mx-auto rounded-full">
//           <motion.button
//             custom={2}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeUp}
//             className="text-white font-semibold px-[54px] py-[13px] rounded-[29.455px] flex items-center justify-center gap-[10px] transition duration-300 ease-in-out shadow-[0_0_180px_rgba(12,160,62,0.6)] bg-[radial-gradient(50%_50%_at_50%_50%,#16C55F_0%,#0CA03E_100%)] whitespace-nowrap cursor-pointer"
//           >
//             <span>Launch Your Music</span>
//             <RocketIcon className="h-6 w-6" />
//           </motion.button>
//         </div>
//       </div>
//     </CommonWrapper>
//   );
// }
