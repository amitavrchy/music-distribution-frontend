import { motion, Variants } from "framer-motion";
// import img from "@/assets/Overview.png";
import img from "@/assets/kareme/photo/main.svg";

const Overview = () => {
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full mx-auto">
      <motion.img
        src={img}
        alt="Overview"
        className="w-full h-auto object-contain"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      />
    </div>
  );
};

export default Overview;
