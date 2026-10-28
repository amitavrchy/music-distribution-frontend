import React from "react";
import { motion } from "framer-motion";
// import img2 from "@/assets/photo/Frame 1321317706.png";
// import img1 from "@/assets/Frame 1321317706.png";
import img1 from "@/assets/kareme/photo/lebel1.svg";
import img2 from "@/assets/kareme/photo/lebel2.svg";

// --- Data Definitions ---
const splitSheetContent = {
  title: "SPLIT SHEET ADMINISTRATION",
  description: `As a songwriter, collaborator, or producer, having a split sheet is essential to establish proof of ownership and your percentage share for each song you create. Without it, your Performing Rights Organization (PRO), publisher, or publishing administrator may struggle to verify your ownership percentage and collect your music royalty earnings. Label Bridge simplifies this process with our in-house Split Sheet Administration. Now, you can complete your split sheet anytime and anywhere, and ensure that all parties involved in the creation of the record can sign off via email confirmation.`,
  imageSrc: "/images/image_6fc1e0.png",
  imageAlt: "Split Sheet Administration Form Mockup",
};

const digitalDistributionContent = {
  title: "DIGITAL DISTRIBUTION",
  prefixNumber: "",
  description: `As an independent record label or artist, navigating the process of distributing your music into top online music stores can often be daunting. Label Bridge's distribution service streamlines this process, allowing you to maintain control while saving both time and money. No matter the size of your label or the stage of your career, Label Bridge is here to help you reach your goals. Once your release is distributed across our network of digital stores and streaming services, you can start generating revenue without any hidden fees or additional costs. Furthermore, you will gain full access to Label Bridge’s innovative music technology ecosystem with no subscription fees required. With over 100 partner stores and a dedicated support team, we are committed to helping you achieve priority placements for your releases and elevate your music career to new heights!`,
  imageSrc: "/images/image_ed7c42.png",
  imageAlt: "Digital Distribution Platforms List Mockup",
};

// --- React Component ---
const SplitSectionsPage: React.FC = () => {
  return (
    <div className="relative  w-full mx-auto p-4 sm:p-8 md:p-12 lg:p-10 text-white overflow-hidden">
      <div className="w-full  mx-auto relative">
        <div className="absolute left-1/2 top-0 h-full w-0.5 hidden md:block "></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            className="text-left order-2 md:order-1 px-4 sm:px-6 md:px-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 uppercase tracking-wide">
              {splitSheetContent.title}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              {splitSheetContent.description}
            </p>
          </motion.div>
          {/* Image Mockup */}
          <motion.div
            className="flex justify-center md:justify-start order-1 md:order-2 px-4 sm:px-6 md:px-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={img1}
              alt={splitSheetContent.imageAlt}
              className="w-full  h-auto rounded-lg shadow-xl"
            />
          </motion.div>
        </div>

        {/* Bottom Half: Digital Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-15 md:gap-16 lg:gap-24 items-center">
          {/* Image Mockup */}
          <motion.div
            className="flex justify-center md:justify-end order-1 md:order-1 px-4 sm:px-6 md:px-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={img2}
              alt={digitalDistributionContent.imageAlt}
              className="w-full  h-auto rounded-lg shadow-xl"
            />
          </motion.div>
          {/* Text Content */}
          <motion.div
            className="text-left order-2 md:order-2 px-4 sm:px-6 md:px-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 uppercase tracking-wide">
              {digitalDistributionContent.title}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              <span className="text-amber-400 text-4xl sm:text-5xl font-extrabold mr-2 align-middle">
                {digitalDistributionContent.prefixNumber}
              </span>
              {digitalDistributionContent.description}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SplitSectionsPage;
