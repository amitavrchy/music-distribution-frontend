import { motion } from "framer-motion";
import { BrandMark } from "@/components/BrandMark";

interface HeroProps {
  className?: string;
}

export const LabelBridgeSection: React.FC<HeroProps> = ({ className = "" }) => {
  const title1 = "LABELBRIDGE".split("");

  return (
    <section className={`text-white text-center relative z-10  ${className}`}>
      {/* TOP LOGO WITH ENHANCED GLOW */}
      <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>

          <div className="absolute w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 bg-green-400/30 rounded-full blur-2xl"></div>

          <div className="absolute w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-green-500/20 rounded-full blur-xl"></div>

          {/* <motion.div
            className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-1 border-[#01D449]/20  bg-green-800/30 flex items-center justify-center shadow-lg shadow-green-500/40"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          > */}

          <div className="absolute inset-0 rounded-full bg-linear-to-br from-green-500/10 to-transparent"></div>

          <BrandMark size={72} className="relative z-10" />
          {/* </motion.div> */}

          {/* Floating particles */}
          {/* <motion.div
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2  rounded-full "
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          />
          <motion.div */}
          {/* className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400/80 rounded-full blur-sm"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
              delay: 1,
            }}
          /> */}
        </div>
      </div>

      {/* TITLE */}
      <h1 className="font-extrabold leading-snug sm:leading-tight md:leading-tight tracking-wide mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <span className="flex justify-center flex-wrap gap-1 sm:gap-2 items-center">
          <span className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl">
            What is
          </span>{" "}
          <span className="flex flex-wrap gap-0.5 sm:gap-1 justify-center">
            {title1.map((char, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: idx * 0.07,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide sm:tracking-wider md:tracking-widest inline-block"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px #f0fdf4",
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          <span className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl">
            ?
          </span>
        </span>
      </h1>

      {/* DESCRIPTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="cursor-pointer text-white/90 font-medium max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed sm:leading-relaxed md:leading-loose px-4 sm:px-6 md:px-8 rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300"
      >
        Label Bridge is a dynamic music technology ecosystem aimed at empowering
        independent artists and labels to distribute, monetize, and manage their
        music more efficiently. Specifically crafted for independent musicians,
        producers, and small labels, Label Bridge offers a straightforward
        solution for getting music onto streaming platforms. It also provides
        essential tools for maximizing revenue and tracking royalties. With all
        the resources you need to build and manage your career like a major
        label, you can easily access everything from your mobile device or
        computer.
      </motion.div>
    </section>
  );
};

// import { motion } from "framer-motion";
// import logo from "@/assets/icons/logo.svg";

// interface HeroProps {
//   className?: string;
// }

// export const LabelBridgeSection: React.FC<HeroProps> = ({ className = "" }) => {
//   const title1 = "LABELBRIDGE".split("");

//   return (
//     <section
//       className={`text-white text-center relative z-10 ${className}`}
//     >
//       {/* TOP LOGO */}
//       <div className="flex justify-center">
//         <motion.div
//           className="w-16 h-16 rounded-full  bg-green-800 border-green-400 border opacity-40 flex items-center justify-center mb-3"
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
//         >
//           <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
//         </motion.div>
//       </div>

//       {/* TITLE */}
//       <h1 className="font-extrabold leading-snug sm:leading-tight md:leading-tight tracking-wide mb-6 sm:mb-8 md:mb-10">
//         <span className="text-3xl sm:text-5xl md:text-7xl flex justify-center flex-wrap gap-2">
//           What is{" "}
//           {title1.map((char, idx) => (
//             <motion.span
//               key={idx}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 delay: idx * 0.07,
//                 type: "spring",
//                 stiffness: 300,
//                 damping: 20,
//               }}
//               className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-widest"
//               style={{
//                 color: "transparent",
//                 WebkitTextStroke: "2px #f0fdf4",
//               }}
//             >
//               {char}
//             </motion.span>
//           ))}{" "}
//           ?
//         </span>
//       </h1>

//       {/* DESCRIPTION (no fixed width) */}
//       <motion.div
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.97 }}
//         className="cursor-pointer text-white font-medium max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-4"
//       >
//         Label Bridge is a dynamic music technology ecosystem aimed at empowering
//         independent artists and labels to distribute, monetize, and manage their
//         music more efficiently. Specifically crafted for independent musicians,
//         producers, and small labels, Label Bridge offers a straightforward
//         solution for getting music onto streaming platforms. It also provides
//         essential tools for maximizing revenue and tracking royalties. With all
//         the resources you need to build and manage your career like a major
//         label, you can easily access everything from your mobile device or
//         computer.
//       </motion.div>
//     </section>
//   );
// };
