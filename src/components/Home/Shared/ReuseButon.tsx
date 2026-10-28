import { motion } from "framer-motion";

interface FancyButtonProps {
  text: string;
  icon?: string | null; // FIXED HERE
  onClick?: () => void;
  className?: string;
}

const ReuseButon: React.FC<FancyButtonProps> = ({
  text,
  icon,
  onClick,
  className = "",
}) => {
  return (
    <div className="p-1.5 bg-[#202933] w-fit mx-auto rounded-[29.455px]">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className={`
          text-white font-semibold
          px-[54px] py-[13px]
          rounded-[29.455px]
          flex items-center justify-center gap-[10px]
          transition duration-300 ease-in-out
          shadow-[0_0_180px_rgba(58,92,181,0.6)]
          bg-[radial-gradient(50%_50%_at_50%_50%,#7B92FF_0%,#2941B5_100%)]
          whitespace-nowrap cursor-pointer
          ${className}
        `}
      >
        {text}

        {icon && <img src={icon} alt="icon" className="w-6" />}
      </motion.button>
    </div>
  );
};

export default ReuseButon;
