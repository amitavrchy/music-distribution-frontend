import { motion } from "framer-motion";
// import smallLogoIcon from "@/assets/logo 1.png";
import { BrandMark } from "@/components/BrandMark";
import smallLOGO from "@/assets/smallLOGO.svg";
import angle3 from "@/assets/Eff.png";
import ReuseButon from "./Shared/ReuseButon";
import { Link } from "react-router-dom";

interface HeroProps {
  className?: string;
}

export const HeroItems: React.FC<HeroProps> = ({ className = "" }) => {
  const title1 = "MARLOW".split("");
  const title2 = "DISTRIBUTION".split("");

  return (
    <section
      className={`relative z-10 -mt-24 flex h-[100vh] min-h-[100vh] w-full flex-col items-center justify-center overflow-hidden text-center text-white md:-mt-28 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute top-0 left-1/2 z-0 flex w-full -translate-x-1/2 justify-center"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={angle3}
          alt=""
          className="w-full max-w-full select-none opacity-90"
        />
      </motion.div>

      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 mx-auto mb-4 sm:mb-5 md:mb-6 lg:mb-8 rounded-full sm:rounded-3xl bg-[#1c1712] border-t border-[#8c6a3d] px-3 sm:px-4 w-[85%] max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[418px] h-[38px] sm:h-[42px] md:h-[46px] lg:h-[52px]"
      >
        {/* <img
          src={smallLogoIcon}
          alt="Small Logo"
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 object-contain logo-spin"
        /> */}
        <Link
          to="/"
          className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 "
        >
          <BrandMark size={36} />
        </Link>

        <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-white font-light tracking-wider sm:tracking-widest uppercase text-center whitespace-nowrap">
          DISTRIBUTION | BRANDING | STRATEGY
        </p>
      </motion.div>

      {/* Title */}

      <h1 className="relative z-10 mx-auto mb-8 max-w-full font-extrabold leading-tight tracking-wide">
        <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-3xl font-semibold sm:text-4xl lg:text-5xl">
          <span>WELCOME TO</span>
          <span className="flex">
            {title1.map((char, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="mx-px"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px #f0fdf4",
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </span>
        <span className="mt-3 flex justify-center text-3xl font-semibold sm:text-4xl lg:text-5xl">
          {title2.map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.08 + 0.5,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              style={{
                color: "transparent",
                WebkitTextStroke: "2px #f0fdf4",
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
        <span className="mt-4 block text-lg font-medium tracking-wide text-[#e7e4dc] sm:text-2xl md:text-3xl">
          FOR ARTISTS WHO KEEP THE MASTERS
        </span>
      </h1>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="flex justify-center"
      >
        <Link className="cursor-pointer" to="/news-articles">
          <ReuseButon
            text="Learn More"
            icon={smallLOGO}
            onClick={() => console.log("Learn more")}
          />
        </Link>
      </motion.div>
    </section>
  );
};

// import { motion } from "framer-motion";
// import smallLogoIcon from "@/assets/logo 1.png";
// import smallLOGO from "@/assets/smallLOGO.svg";
// import angle3 from "@/assets/Eff.png";
// import ReuseButon from "./Shared/ReuseButon";
// import { Link } from "react-router-dom";

// interface HeroProps {
//   className?: string;
// }

// export const HeroItems: React.FC<HeroProps> = ({ className = "" }) => {
//   const title1 = "MARLOW".split("");
//   const title2 = "DISTRIBUTION".split("");

//   return (
//     <section
//       className={`relative text-white text-center pt-20 md:pt-28 xl:pt-[110px] pb-16 z-10 ${className}`}
//     >
//       {/* Background Accent */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 xl:-mt-72 w-full flex justify-center z-0 pointer-events-none">
//         <img
//           src={angle3}
//           alt="Background Accent"
//           className="w-full max-w-[1600px] opacity-90 select-none"
//         />
//       </div>

//       {/* Top Badge */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 mx-auto mb-4 sm:mb-5 md:mb-6 lg:mb-8 rounded-full sm:rounded-3xl bg-[#1c1712] border-t border-[#8c6a3d] px-3 sm:px-4 w-[85%] max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[418px] h-[38px] sm:h-[42px] md:h-[46px] lg:h-[52px]"
//       >
//         <img
//           src={smallLogoIcon}
//           alt="Small Logo"
//           className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 object-contain logo-spin"
//         />

//         <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-white font-light tracking-wider sm:tracking-widest uppercase text-center whitespace-nowrap">
//           DISTRIBUTION | BRANDING | STRATEGY
//         </p>
//       </motion.div>

//       {/* Title */}

//       <h1 className="font-extrabold leading-snug sm:leading-tight md:leading-tight tracking-wide mb-6 sm:mb-8 md:mb-8">
//         <span className="text-3xl sm:text-5xl md:text-6xl font-bold flex justify-center flex-wrap items-center">
//           {/* Static text */}
//           <span className="mr-4">WELCOME TO</span>

//           {/* Animated letters with proper spacing */}
//           <span className="flex mr-4">
//             {title1.map((char, idx) => (
//               <motion.span
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   delay: idx * 0.1,
//                   type: "spring",
//                   stiffness: 300,
//                   damping: 20,
//                 }}
//                 className="tracking-widest mx-[1px]"
//                 style={{
//                   color: "transparent",
//                   WebkitTextStroke: "2px #f0fdf4",
//                 }}
//               >
//                 {char}
//               </motion.span>
//             ))}
//           </span>
//         </span>

//         <br className="block md:hidden" />
//         <br />
//         <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl flex justify-center flex-wrap gap-1">
//           {title2.map((char, idx) => (
//             <motion.span
//               key={idx}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 delay: idx * 0.08 + 0.5,
//                 type: "spring",
//                 stiffness: 300,
//                 damping: 20,
//               }}
//               className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-widest"
//               style={{
//                 color: "transparent",
//                 WebkitTextStroke: "2px #f0fdf4",
//               }}
//             >
//               {" "}
//               {char}
//             </motion.span>
//           ))}{" "}
//           <span>FOR ARTISTS WHO KEEP</span>{" "}
//         </span>
//         <br />
//         <span className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
//           {" "}
//           THE MASTERS{" "}
//         </span>
//       </h1>

//       {/* CTA */}
//       <motion.div
//         initial={{ opacity: 0, y: 16 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 1.2, duration: 0.5 }}
//         className="flex justify-center"
//       >
//         <Link className="cursor-pointer" to="/news-articles">
//           <ReuseButon
//             text="Learn More"
//             icon={smallLOGO}
//             onClick={() => console.log("Learn more")}
//           />
//         </Link>
//       </motion.div>
//     </section>
//   );
// };
