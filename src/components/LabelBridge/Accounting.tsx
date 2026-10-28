import React from "react";
import { motion } from "framer-motion";
// import img3 from "@/assets/photo/New folder/Frame 1321317706.png";
// import img4 from "@/assets/cart11.png";
import img3 from "@/assets/kareme/photo/lebel3.svg";
import img4 from "@/assets/kareme/photo/lebel4.svg";

// --- Data Definitions ---
const splitSheetContent = {
  title: "Accounting",
  description: `Managing a budget can be one of the most exhausting aspects of running a label or being an artist. 
  There's no need to waste money on complex systems or overpriced accountants! The Label Bridge accounting and royalty 
  processing system was crafted by real record label executives to simplify your workload. With Label Bridge, you can manage everything by the click of a button.
  Our platform enables you to process royalty statements from any digital store quickly, no matter how intricate or extensive they may be. Need 
  to pay an advance? Keep track of expenses? License your music? We equip you with the tools necessary to manage additional income and deals, while also providing our clients 
  with clear visibility into their profit and loss statements.`,
  imageSrc: "/images/image_6fc1e0.png",
  imageAlt: "Split Sheet Administration Form Mockup",
};

const digitalDistributionContent = {
  title: "Analytics & Data",
  prefixNumber: "",
  description: `As an independent record label or artist, navigating the process of distributing your music into top online music stores can often be daunting. Label Bridge's distribution service streamlines this process, allowing you to maintain control while saving both time and money. No matter the size of your label or the stage of your career, Label Bridge is here to help you reach your goals. Once your release is distributed across our network of digital stores and streaming services, you can start generating revenue without any hidden fees or additional costs. Furthermore, you will gain full access to Label Bridge’s innovative music technology ecosystem with no subscription fees required. With over 100 partner stores and a dedicated support team, we are committed to helping you achieve priority placements for your releases and elevate your music career to new heights!`,
  imageSrc: "/images/image_ed7c42.png",
  imageAlt: "Digital Distribution Platforms List Mockup",
};

// --- React Component ---
const Accounting: React.FC = () => {
  return (
    <div className="relative w-full mx-auto p-4 sm:p-8 md:p-12 lg:p-4 text-white overflow-hidden">
      <div className="w-full mx-auto relative">
        {/* Vertical Dashed Line (Desktop Only) */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 hidden md:block "></div>

        {/* Top Half: Split Sheet Administration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 mb-12 md:mb-24 items-center">
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
              src={img3}
              alt={splitSheetContent.imageAlt}
              className="w-full  h-auto rounded-lg shadow-xl"
            />
          </motion.div>
        </div>

        {/* Bottom Half: Digital Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
          {/* Image Mockup */}
          <motion.div
            className="flex justify-center md:justify-end order-1 md:order-1 px-4 sm:px-6 md:px-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={img4}
              alt={digitalDistributionContent.imageAlt}
              className="w-full h-auto rounded-lg shadow-xl"
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

export default Accounting;
