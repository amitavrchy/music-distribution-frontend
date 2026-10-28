import { motion } from "framer-motion";

// Icons
import apple from "@/assets/icons/AppleMusic.svg";
import utube from "@/assets/icons/youtube.png";
import Spotify from "@/assets/icons/sportity.png";
import SoundCloud from "@/assets/icons/SoundCloud.svg";
import Audiomack from "@/assets/icons/Audiomack.svg";
import Deezer from "@/assets/icons/Deezer.svg";
import TIDAL from "@/assets/icons/tidal.png";
import iHeartRadio from "@/assets/hart.png";

const MusicPlatforms: React.FC = () => {
  const platforms = [
    { name: "Apple", icon: apple },
    { name: "YouTube", icon: utube },
    { name: "Spotify", icon: Spotify },
    { name: "SoundCloud", icon: SoundCloud },
    { name: "Audiomack", icon: Audiomack },
    { name: "Deezer", icon: Deezer },
    { name: "TIDAL", icon: TIDAL },
    { name: "iHeartRadio", icon: iHeartRadio },
  ];

  // Duplicate once (best practice for marquee)
  const items = [...platforms, ...platforms];

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex gap-10 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((platform, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0"
            whileHover={{ y: -8, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          >
            <div className="flex flex-col items-center p-8 space-y-3 rounded-xl border border-[#1A1A1A] bg-[#091315] shadow-2xl">
              {/* Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center">
                <img
                  src={platform.icon}
                  alt={platform.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Name */}
              <span className="text-white text-xs md:text-sm font-medium whitespace-nowrap">
                {platform.name}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MusicPlatforms;

// import { motion } from "framer-motion";

// // Import your platform logos
// import apple from "@/assets/icons/AppleMusic.svg";
// import utube from "@/assets/icons/youtube.png";
// import Spotify from "@/assets/icons/sportity.png";
// import SoundCloud from "@/assets/icons/SoundCloud.svg";
// import Audiomack from "@/assets/icons/Audiomack.svg";
// import Deezer from "@/assets/icons/Deezer.svg";
// import TIDAL from "@/assets/icons/tidal.png";
// import iHeartRadio from "@/assets/icons/apple.png";

// const MusicPlatforms: React.FC = () => {
//   const platforms = [
//     { name: "Apple", icon: apple },
//     { name: "YouTube", icon: utube },
//     { name: "Apple Music", icon: Spotify },
//     { name: "SoundCloud", icon: SoundCloud },
//     { name: "Audiomack", icon: Audiomack },
//     { name: "Deezer", icon: Deezer },
//     { name: "TIDAL", icon: TIDAL },
//     { name: "iHeartRadio", icon: iHeartRadio },
//   ];

//   // Triple for seamless loop
//   const duplicatedPlatforms = [...platforms, ...platforms, ...platforms];

//   return (
//     <div className="flex items-center justify-center p-2 relative">
//       <div className=" max-w-[1300px] relative overflow-hidden">
//         <motion.div
//           className="flex gap-10"
//           animate={{ x: ["0%", "-33.333%"] }}
//           transition={{
//             x: {
//               repeat: Infinity,
//               repeatType: "loop",
//               duration: 10,
//               ease: "linear",
//             },
//           }}
//           whileHover={{ x: "50%" }}
//         >
//           {duplicatedPlatforms.map((platform, index) => (
//             <div key={index} className="flex-shrink-0 relative group">
//               {/* Platform Card */}

//               <div className="flex flex-col items-center   p-8 space-y-3 rounded-xl border border-[#1A1A1A] bg-[#091315] shadow-4xl">
//                 {/* Icon Container */}
//                 <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
//                   <img
//                     src={platform.icon}
//                     alt={platform.name}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>

//                 {/* Platform Name */}
//                 <span className="text-white text-xs md:text-sm font-medium text-center whitespace-nowrap">
//                   {platform.name}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </motion.div>

//         {/* Gradient overlays */}
//         <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
//         <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
//       </div>
//     </div>
//   );
// };

// export default MusicPlatforms;
