import { motion } from "framer-motion";

import img1 from "@/assets/image 2.png";
import ProductGallery from "./ProductGallery";
import ReuseButon from "../Shared/ReuseButon";

interface HeroProps {
  className?: string;
}

export const ShopBanner: React.FC<HeroProps> = ({ className = "" }) => {
  const title1 = "DIVERSE ".split("");
  const title2 = "PRODUCT".split("");

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col md:flex-col lg:flex-row ">
        {/* LEFT SECTION */}
        <section
          // padding
          className={`relative z-10 py-16 text-center text-white md:py-24 lg:w-1/2 ${className}`}
        >
          <h1 className="font-extrabold leading-snug sm:leading-tight md:leading-tight tracking-wide mb-6 sm:mb-8 md:mb-8">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl flex justify-center flex-wrap gap-1">
              EXPLORE OUR{" "}
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
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "2px #f0fdf4",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>

            <br className="block md:hidden" />
            <br />

            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl flex justify-center flex-wrap gap-1">
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
                  className="text-3xl sm:text-5xl md:text-4xl lg:text-5xl font-bold tracking-widest"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "2px #f0fdf4",
                  }}
                >
                  {char}
                </motion.span>
              ))}{" "}
              RANGE AND SHOP
            </span>

            <br />

            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              OUR COLLECTION
            </span>
          </h1>
          <p className="mb-2">
            Wear the Vibe. Support the Movement. Exclusive March from the
            Marlow Roster.
          </p>

          <ReuseButon
            text="Shop Now"
            onClick={() =>
              document.getElementById("product-lineup")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          />
        </section>

        {/* RIGHT IMAGE SECTION */}
        <section className=" flex justify-center lg:justify-end px-4 mt-16 lg:w-1/3 ">
          <img
            src={img1}
            alt="banner"
            className="w-full max-w-md lg:max-w h-auto object-contain lg-[577px] "
          />
        </section>
      </div>

      <div>
        <ProductGallery />
        <div className="h-24 md:h-32 flex items-center justify-center">
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=""
          >
            <span
              className=" text-white font-semibold 
          px-[54px] py-[13px]
          rounded-[29.455px]
          flex items-center justify-center gap-2.5
          transition duration-300 ease-in-out
          shadow-[0_0_180px_rgba(58,92,181,0.6)]
          bg-[radial-gradient(50%_50%_at_50%_50%,#7B92FF_0%,#2941B5_100%)]
          whitespace-nowrap cursor-pointer"
            >
              <p>Explore More</p>
            </span>
          </motion.button> */}
        </div>
      </div>
    </div>
  );
};
