import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import Image1 from "@/assets/icons/Rectangle 7197.png";
import Image2 from "@/assets/moneyman.png";
import Image3 from "@/assets/Digger.png";
import Image4 from "@/assets/Girl.png";
import Image5 from "@/assets/Gemini.png";
import Image6 from "@/assets/swag.png";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const images = [
  { src: Image1, title: "03Greedo" },
  { src: Image2, title: "GoldChains" },
  { src: Image3, title: "FurStyle" },
  { src: Image4, title: "MoneyVibes" },
  { src: Image5, title: "Stunna Girl" },
  { src: Image6, title: "Gemini Chachi" },
];

export default function ImageCollage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollX = 0;
    let rafId: number;
    const speed = 0.4;

    const animate = () => {
      if (!paused) {
        scrollX += speed;
        if (scrollX >= container.scrollWidth / 2) {
          scrollX = 0;
        }
        container.scrollLeft = scrollX;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [paused]);

  return (
    <section className="w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-6 px-6 overflow-x-scroll no-scrollbar"
      >
        {[...images, ...images].map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className={`
              group relative flex-shrink-0 cursor-pointer
              w-[220px] h-[330px]
              sm:w-[260px] sm:h-[390px]
              md:w-[300px] md:h-[450px]
              lg:w-[340px] lg:h-[510px]
              rounded-2xl overflow-hidden shadow-xl
            even:mt-0 odd:md:mt-12
            `}
          >
            {/* Image */}
            <img
              src={item.src}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <p className="text-white text-lg font-semibold tracking-wide">
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// import { motion, Variants } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import Image1 from "@/assets/icons/Rectangle 7197.png";
// import Image2 from "@/assets/Rectangle 7197.png";
// import Image3 from "@/assets/photo/Rectangle 7197.png";
// import Image4 from "@/assets/photo/New folder/Rectangle 7197.png";
// import Image5 from "@/assets/Gemini.png";
// import Image6 from "@/assets/swag.png";

// // Scroll animation for individual images
// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (custom: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" },
//   }),
// };

// export default function ImageCollage() {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     let scrollPosition = 0;
//     const scrollSpeed = 0.5;
//     let animationFrameId: number;

//     const scroll = () => {
//       if (!isPaused && scrollContainer) {
//         scrollPosition += scrollSpeed;

//         if (scrollPosition >= scrollContainer.scrollWidth / 2) {
//           scrollPosition = 0;
//         }

//         scrollContainer.scrollLeft = scrollPosition;
//       }
//       animationFrameId = requestAnimationFrame(scroll);
//     };

//     animationFrameId = requestAnimationFrame(scroll);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [isPaused]);

//   const images = [Image1, Image2, Image3, Image4 , Image5, Image6];
//   const altTexts = [
//     "Man in purple car with ripped jeans",
//     "Man with gold chains on red background",
//     "Woman in fur coat and denim shorts",
//     "Man holding money on black background",
//     "Gemini style photo",
//     "Swag style photo"
//   ];

//   const imageTitles = [
//     "03Greedo",
//     "GoldChains",
//     "FurStyle",
//     "MoneyVibes",
//     "Stunna Girl",
//     "Gemini Chachi"
//   ];

//   return (
//     <div className="w-full py-6 sm:py-8 md:py-12 lg:py-16 overflow-hidden">
//       <div
//         ref={scrollRef}
//         className="flex gap-4 sm:gap-6 overflow-x-scroll no-scrollbar px-4 sm:px-6 lg:px-8"
//         style={{ scrollBehavior: 'auto' }}
//       >
//         {/* First set of images */}
//         {images.map((image, index) => (
//           <motion.div
//             key={`first-${index}`}
//             custom={index}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeUp}
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//             className={`
//               relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl flex-shrink-0 group cursor-pointer
//               w-[200px] h-[300px]
//               xs:w-[220px] xs:h-[330px]
//               sm:w-[260px] sm:h-[390px]
//               md:w-[300px] md:h-[450px]
//               lg:w-[340px] lg:h-[510px]
//               xl:w-[360px] xl:h-[540px]
//               ${index % 2 === 1 ? 'md:mt-8 lg:mt-12 xl:mt-16' : 'md:mt-0'}
//             `}
//           >
//             <img
//               src={image}
//               alt={altTexts[index]}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>

//             {/* Footer with Title - Only visible on hover */}
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <p className="text-white font-semibold text-sm sm:text-base md:text-lg tracking-wide">
//                 {imageTitles[index]}
//               </p>
//             </div>
//           </motion.div>
//         ))}

//         {/* Duplicate set for seamless loop */}
//         {images.map((image, index) => (
//           <motion.div
//             key={`second-${index}`}
//             custom={index}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeUp}
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//             className={`
//               relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl flex-shrink-0 group cursor-pointer
//               w-[200px] h-[300px]
//               xs:w-[220px] xs:h-[330px]
//               sm:w-[260px] sm:h-[390px]
//               md:w-[300px] md:h-[450px]
//               lg:w-[340px] lg:h-[510px]
//               xl:w-[360px] xl:h-[540px]
//               ${index % 2 === 1 ? 'md:mt-8 lg:mt-12 xl:mt-16' : 'md:mt-0'}
//             `}
//           >
//             <img
//               src={image}
//               alt={altTexts[index]}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>

//             {/* Footer with Title - Only visible on hover */}
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <p className="text-white font-semibold text-sm sm:text-base md:text-lg tracking-wide">
//                 {imageTitles[index]}
//               </p>
//             </div>
//           </motion.div>
//         ))}

//         {/* Third set for extra smooth loop on larger screens */}
//         {images.map((image, index) => (
//           <motion.div
//             key={`third-${index}`}
//             custom={index}
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//             className={`
//               relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl flex-shrink-0 group cursor-pointer
//               w-[200px] h-[300px]
//               xs:w-[220px] xs:h-[330px]
//               sm:w-[260px] sm:h-[390px]
//               md:w-[300px] md:h-[450px]
//               lg:w-[340px] lg:h-[510px]
//               xl:w-[360px] xl:h-[540px]
//               ${index % 2 === 1 ? 'md:mt-8 lg:mt-12 xl:mt-16' : 'md:mt-0'}
//             `}
//           >
//             <img
//               src={image}
//               alt={altTexts[index]}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>

//             {/* Footer with Title - Only visible on hover */}
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <p className="text-white font-semibold text-sm sm:text-base md:text-lg tracking-wide">
//                 {imageTitles[index]}
//               </p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // // // import { motion, Variants } from "framer-motion";
// // // // import Image1 from "@/assets/icons/Rectangle 7197.png";
// // // // import Image2 from "@/assets/Rectangle 7197.png";
// // // // import Image3 from "@/assets/photo/Rectangle 7197.png";
// // // // import Image4 from "@/assets/photo/New folder/Rectangle 7197.png";

// // // // // Scroll animation for individual images
// // // // const fadeUp: Variants = {
// // // //   hidden: { opacity: 0, y: 40 },
// // // //   visible: (custom: number) => ({
// // // //     opacity: 1,
// // // //     y: 0,
// // // //     transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" },
// // // //   }),
// // // // };

// // // // export default function ImageCollage() {
// // // //   return (
// // // //     <div className="flex justify-center items-center p-8">
// // // //       <div className="flex gap-4 max-w-7xl mx-auto items-end flex-wrap sm:flex-nowrap">

// // // //         {/* 1st Image */}
// // // //         <div className="relative overflow-hidden rounded-[20px] shadow-2xl h-[540px] flex-1">
// // // //           <motion.img
// // // //             src={Image1}
// // // //             alt="Man in purple car with ripped jeans"
// // // //             custom={0}
// // // //             initial="hidden"
// // // //             whileInView="visible"
// // // //             viewport={{ once: true, amount: 0.3 }}
// // // //             variants={fadeUp}
// // // //             className="w-[282px] h-[540px] object-cover rounded-[18px] transition-transform duration-500 hover:scale-105 flex-shrink-0"
// // // //           />
// // // //         </div>

// // // //         {/* 2nd Image */}
// // // //         <div className="relative overflow-hidden rounded-[20px] shadow-2xl h-[540px] flex-1 mt-24">
// // // //           <motion.img
// // // //             src={Image2}
// // // //             alt="Man with gold chains on red background"
// // // //             custom={1}
// // // //             initial="hidden"
// // // //             whileInView="visible"
// // // //             viewport={{ once: true, amount: 0.3 }}
// // // //             variants={fadeUp}
// // // //             className="w-[282px] h-[540px] object-cover rounded-[18px] transition-transform duration-500 hover:scale-105 flex-shrink-0 mt-24"
// // // //           />
// // // //         </div>

// // // //         {/* 3rd Image */}
// // // //         <div className="relative overflow-hidden rounded-[20px] shadow-2xl h-[540px] flex-1">
// // // //           <motion.img
// // // //             src={Image3}
// // // //             alt="Woman in fur coat and denim shorts"
// // // //             custom={2}
// // // //             initial="hidden"
// // // //             whileInView="visible"
// // // //             viewport={{ once: true, amount: 0.3 }}
// // // //             variants={fadeUp}
// // // //             className="w-[282px] h-[540px] object-cover rounded-[18px] transition-transform duration-500 hover:scale-105 flex-shrink-0"
// // // //           />
// // // //         </div>

// // // //         {/* 4th Image */}
// // // //         <div className="relative overflow-hidden rounded-[20px] shadow-2xl h-[540px] flex-1 mt-24">
// // // //           <motion.img
// // // //             src={Image4}
// // // //             alt="Man holding money on black background"
// // // //             custom={3}
// // // //             initial="hidden"
// // // //             whileInView="visible"
// // // //             viewport={{ once: true, amount: 0.3 }}
// // // //             variants={fadeUp}
// // // //             className="w-[282px] h-[540px] object-cover rounded-[18px] transition-transform duration-500 hover:scale-105 flex-shrink-0 mt-24"
// // // //           />
// // // //         </div>

// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import { motion, Variants } from "framer-motion";
// // // import Image1 from "@/assets/icons/Rectangle 7197.png";
// // // import Image2 from "@/assets/Rectangle 7197.png";
// // // import Image3 from "@/assets/photo/Rectangle 7197.png";
// // // import Image4 from "@/assets/photo/New folder/Rectangle 7197.png";

// // // // Scroll animation for individual images
// // // const fadeUp: Variants = {
// // //   hidden: { opacity: 0, y: 40 },
// // //   visible: (custom: number) => ({
// // //     opacity: 1,
// // //     y: 0,
// // //     transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" },
// // //   }),
// // // };

// // // export default function ImageCollage() {
// // //   return (
// // //     <div className="w-full bg-gradient-to-b from-black via-gray-900 to-black py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
// // //       <div className="max-w-7xl mx-auto">
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

// // //           {/* 1st Image */}
// // //           <motion.div
// // //             custom={0}
// // //             initial="hidden"
// // //             whileInView="visible"
// // //             viewport={{ once: true, amount: 0.3 }}
// // //             variants={fadeUp}
// // //             className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl h-[400px] sm:h-[450px] lg:h-[540px] lg:mt-0"
// // //           >
// // //             <img
// // //               src={Image1}
// // //               alt="Man in purple car with ripped jeans"
// // //               className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
// // //             />
// // //             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
// // //           </motion.div>

// // //           {/* 2nd Image */}
// // //           <motion.div
// // //             custom={1}
// // //             initial="hidden"
// // //             whileInView="visible"
// // //             viewport={{ once: true, amount: 0.3 }}
// // //             variants={fadeUp}
// // //             className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl h-[400px] sm:h-[450px] lg:h-[540px] lg:mt-16"
// // //           >
// // //             <img
// // //               src={Image2}
// // //               alt="Man with gold chains on red background"
// // //               className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
// // //             />
// // //             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
// // //           </motion.div>

// // //           {/* 3rd Image */}
// // //           <motion.div
// // //             custom={2}
// // //             initial="hidden"
// // //             whileInView="visible"
// // //             viewport={{ once: true, amount: 0.3 }}
// // //             variants={fadeUp}
// // //             className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl h-[400px] sm:h-[450px] lg:h-[540px] lg:mt-0"
// // //           >
// // //             <img
// // //               src={Image3}
// // //               alt="Woman in fur coat and denim shorts"
// // //               className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
// // //             />
// // //             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
// // //           </motion.div>

// // //           {/* 4th Image */}
// // //           <motion.div
// // //             custom={3}
// // //             initial="hidden"
// // //             whileInView="visible"
// // //             viewport={{ once: true, amount: 0.3 }}
// // //             variants={fadeUp}
// // //             className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl h-[400px] sm:h-[450px] lg:h-[540px] lg:mt-16"
// // //           >
// // //             <img
// // //               src={Image4}
// // //               alt="Man holding money on black background"
// // //               className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
// // //             />
// // //             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
// // //           </motion.div>

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { motion, Variants } from "framer-motion";
// // import { useEffect, useRef } from "react";
// // import Image1 from "@/assets/icons/Rectangle 7197.png";
// // import Image2 from "@/assets/Rectangle 7197.png";
// // import Image3 from "@/assets/photo/Rectangle 7197.png";
// // import Image4 from "@/assets/photo/New folder/Rectangle 7197.png";
// // // import CommonWrapper from "../Shared/CommonWrapper";

// // // Scroll animation for individual images
// // const fadeUp: Variants = {
// //   hidden: { opacity: 0, y: 40 },
// //   visible: (custom: number) => ({
// //     opacity: 1,
// //     y: 0,
// //     transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" },
// //   }),
// // };

// // export default function ImageCollage() {
// //   const scrollRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     const scrollContainer = scrollRef.current;
// //     if (!scrollContainer) return;

// //     let scrollPosition = 0;
// //     const scrollSpeed = 1; // Adjust speed (pixels per frame)

// //     const scroll = () => {
// //       scrollPosition += scrollSpeed;

// //       // Reset scroll when reaching the end
// //       if (scrollPosition >= scrollContainer.scrollWidth / 2) {
// //         scrollPosition = 0;
// //       }

// //       scrollContainer.scrollLeft = scrollPosition;
// //     };

// //     const intervalId = setInterval(scroll, 20); // Smooth animation

// //     // Pause on hover
// //     const handleMouseEnter = () => clearInterval(intervalId);
// //     const handleMouseLeave = () => {
// //       const newIntervalId = setInterval(scroll, 20);
// //       return newIntervalId;
// //     };
// // console.log(handleMouseLeave);
// //     scrollContainer.addEventListener('mouseenter', handleMouseEnter);

// //     return () => {
// //       clearInterval(intervalId);
// //       scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
// //     };
// //   }, []);

// //   const images = [Image1, Image2, Image3, Image4];
// //   const altTexts = [
// //     "Man in purple car with ripped jeans",
// //     "Man with gold chains on red background",
// //     "Woman in fur coat and denim shorts",
// //     "Man holding money on black background"
// //   ];

// //   return (

// //     // <CommonWrapper>
// //     <div className="w-full  py-8 sm:py-12 md:py-16 overflow-hidden">
// //       <div
// //         ref={scrollRef}
// //         className="flex gap-4 sm:gap-6 overflow-x-hidden px-4 sm:px-6 lg:px-8"
// //         style={{ scrollBehavior: 'auto' }}
// //       >
// //         {/* First set of images */}
// //         {images.map((image, index) => (
// //           <motion.div
// //             key={`first-${index}`}
// //             custom={index}
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true, amount: 0.3 }}
// //             variants={fadeUp}
// //             className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] h-[400px] sm:h-[450px] lg:h-[540px] ${
// //               index % 2 === 1 ? 'lg:mt-16' : 'lg:mt-0'
// //             }`}
// //           >
// //             <img
// //               src={image}
// //               alt={altTexts[index]}
// //               className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
// //             />
// //             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
// //           </motion.div>
// //         ))}

// //         {/* Duplicate set for seamless loop */}
// //         {images.map((image, index) => (
// //           <motion.div
// //             key={`second-${index}`}
// //             custom={index}
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true, amount: 0.3 }}
// //             variants={fadeUp}
// //             className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] h-[400px] sm:h-[450px] lg:h-[540px] ${
// //               index % 2 === 1 ? 'lg:mt-16' : 'lg:mt-0'
// //             }`}
// //           >
// //             <img
// //               src={image}
// //               alt={altTexts[index]}
// //               className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
// //             />
// //             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //     // </CommonWrapper>
// //   );
// // }

// import { motion, Variants } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import Image1 from "@/assets/icons/Rectangle 7197.png";
// import Image2 from "@/assets/Rectangle 7197.png";
// import Image3 from "@/assets/photo/Rectangle 7197.png";
// import Image4 from "@/assets/photo/New folder/Rectangle 7197.png";
// import Image5 from "@/assets/Gemini.png";
// import Image6 from "@/assets/swag.png";

// // Scroll animation for individual images
// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (custom: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" },
//   }),
// };

// export default function ImageCollage() {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     let scrollPosition = 0;
//     const scrollSpeed = 0.5; // Smooth, slower speed for better UX
//     let animationFrameId: number;

//     const scroll = () => {
//       if (!isPaused && scrollContainer) {
//         scrollPosition += scrollSpeed;

//         // Reset scroll when reaching halfway point for seamless loop
//         if (scrollPosition >= scrollContainer.scrollWidth / 2) {
//           scrollPosition = 0;
//         }

//         scrollContainer.scrollLeft = scrollPosition;
//       }
//       animationFrameId = requestAnimationFrame(scroll);
//     };

//     animationFrameId = requestAnimationFrame(scroll);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [isPaused]);

//   const images = [Image1, Image2, Image3, Image4 , Image5, Image6];
//   const altTexts = [
//     "Man in purple car with ripped jeans",
//     "Man with gold chains on red background",
//     "Woman in fur coat and denim shorts",
//     "Man holding money on black background"
//   ];

//   return (
//     <div className="w-full py-6 sm:py-8 md:py-12 lg:py-16 overflow-hidden
//     ">
//       <div
//         ref={scrollRef}
//         className="flex gap-4 sm:gap-6 overflow-x-scroll no-scrollbar px-4 sm:px-6 lg:px-8"
//         style={{ scrollBehavior: 'auto' }}
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//         onTouchStart={() => setIsPaused(true)}
//         onTouchEnd={() => setIsPaused(false)}
//       >
//         {/* First set of images */}
//         {images.map((image, index) => (
//           <motion.div
//             key={`first-${index}`}
//             custom={index}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeUp}
//             className={`
//               relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl flex-shrink-0
//               w-[200px] h-[300px]
//               xs:w-[220px] xs:h-[330px]
//               sm:w-[260px] sm:h-[390px]
//               md:w-[300px] md:h-[450px]
//               lg:w-[340px] lg:h-[510px]
//               xl:w-[360px] xl:h-[540px]
//               ${index % 2 === 1 ? 'md:mt-8 lg:mt-12 xl:mt-16' : 'md:mt-0'}
//             `}
//           >
//             <img
//               src={image}
//               alt={altTexts[index]}
//               className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>
//           </motion.div>
//         ))}

//         {/* Duplicate set for seamless loop */}
//         {images.map((image, index) => (
//           <motion.div
//             key={`second-${index}`}
//             custom={index}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeUp}
//             className={`
//               relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl flex-shrink-0
//               w-[200px] h-[300px]
//               xs:w-[220px] xs:h-[330px]
//               sm:w-[260px] sm:h-[390px]
//               md:w-[300px] md:h-[450px]
//               lg:w-[340px] lg:h-[510px]
//               xl:w-[360px] xl:h-[540px]
//               ${index % 2 === 1 ? 'md:mt-8 lg:mt-12 xl:mt-16' : 'md:mt-0'}
//             `}
//           >
//             <img
//               src={image}
//               alt={altTexts[index]}
//               className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>
//           </motion.div>
//         ))}

//         {/* Third set for extra smooth loop on larger screens */}
//         {images.map((image, index) => (
//           <motion.div
//             key={`third-${index}`}
//             custom={index}
//             className={`
//               relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl flex-shrink-0
//               w-[200px] h-[300px]
//               xs:w-[220px] xs:h-[330px]
//               sm:w-[260px] sm:h-[390px]
//               md:w-[300px] md:h-[450px]
//               lg:w-[340px] lg:h-[510px]
//               xl:w-[360px] xl:h-[540px]
//               ${index % 2 === 1 ? 'md:mt-8 lg:mt-12 xl:mt-16' : 'md:mt-0'}
//             `}
//           >
//             <img
//               src={image}
//               alt={altTexts[index]}
//               className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
