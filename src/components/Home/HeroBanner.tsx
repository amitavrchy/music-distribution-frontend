// src/components/HeroBanner.tsx
import React from "react";
import { motion, Variants } from "framer-motion";
import musicImage from "@/assets/music image.png";

const HeroBanner: React.FC = () => {
  const textVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const imageVariants: Variants = {
    hidden: { y: 40, scale: 0.9, opacity: 0 },
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 border-hero-blue pointer-events-none" />

      <div className="w-full text-center">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-semibold leading-none tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          MARLOW
        </motion.h1>

        <motion.h2
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-2 text-xl font-medium leading-none tracking-[0.18em] text-[#e7e4dc] sm:text-2xl md:text-3xl"
        >
          DISTRIBUTION
        </motion.h2>

        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.35 }}
          viewport={{ once: true }}
          className="relative mx-auto mt-10 w-full max-w-3xl"
        >
          <div
            className="relative h-64 w-full rounded-2xl bg-cover bg-center sm:h-80 md:h-96"
            style={{ backgroundImage: `url(${musicImage})` }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-r from-orange-500/50 via-cyan-400/50 to-pink-500/50 rounded-full blur-2xl opacity-70 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;

// // src/components/HeroBanner.tsx
// import React from "react";
// import { motion, Variants } from "framer-motion";
// import musicImage from "@/assets/music image.png";

// const HeroBanner: React.FC = () => {
//   const textVariants: Variants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 1.2, ease: "easeOut" },
//     },
//   };

//   const imageVariants: Variants = {
//     hidden: { y: 40, scale: 0.9, opacity: 0 },
//     visible: {
//       y: 0,
//       scale: 1,
//       opacity: 1,
//       transition: { duration: 1.5, ease: "easeOut" },
//     },
//   };

//   return (
//     <section className="relative w-full  bg-[#0E1B20] overflow-hidden">
//       <div className="absolute inset-0 border-hero-blue pointer-events-none" />

//       <div className="max-w-6xl mx-auto px-4 pt-24 text-center">
//         {/* TEXT BLOCK */}
//         <motion.h1
//           variants={textVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="text-white text-5xl md:text-[8rem] lg:text-[10rem] font-extrabold leading-none tracking-tighter"
//         >
//           ONE IS ONE
//         </motion.h1>

//         <motion.h2
//           variants={textVariants}
//           initial="hidden"
//           whileInView="visible"
//           transition={{ delay: 0.2 }}
//           viewport={{ once: true }}
//           className="text-white text-4xl md:text-8xl lg:text-9xl font-extrabold leading-none tracking-tight mt-2"
//         >
//           ENTERTAINMENT
//         </motion.h2>

//         {/* IMAGE BLOCK — PUSHED DOWN */}
//         <motion.div
//           variants={imageVariants}
//           initial="hidden"
//           whileInView="visible"
//           transition={{ delay: 0.5 }}
//           viewport={{ once: true }}
//           className="relative w-3xl mx-auto -mt-32"
//         >
//           <div
//             className="w-full h-[811px]  bg-cover bg-center relative"
//             style={{ backgroundImage: `url(${musicImage})` }}
//           >
//             {/* Glow */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-40 h-40 bg-gradient-to-r from-orange-500/50 via-cyan-400/50 to-pink-500/50 rounded-full blur-2xl opacity-70 animate-pulse" />
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;
