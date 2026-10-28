import React from "react";
import { motion, Variants } from "framer-motion";
import { X } from "lucide-react";

interface ShippingDialogProps {
  onClose: () => void;
}

const ShippingDialog: React.FC<ShippingDialogProps> = ({ onClose }) => {
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const dialogVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="bg-[#1a1f2e] rounded-lg max-w-md w-full shadow-2xl overflow-hidden"
        variants={dialogVariants}
        initial="hidden"
        animate="visible"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-700">
          <h2 className="text-white text-base sm:text-lg font-semibold">
            Shipping & Returns
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6 border-b border-gray-700">
          <div className="mb-4">
            <span className="text-white text-xs sm:text-sm font-medium">
              Standard / 3-5 Business Days / Estimated cost: $15.00
            </span>
            <p className="text-gray-400 text-xs mt-1 leading-relaxed">
              Reliable and affordable, our Standard shipping option ensures your
              items reach your doorstep within 3 to 5 business days.
            </p>
          </div>
          <div>
            <span className="text-white text-xs sm:text-sm font-medium">
              Express / 1-2 Business Days / Estimated cost: $40.00
            </span>
            <p className="text-gray-400 text-xs mt-1 leading-relaxed">
              Need it fast? Opt for Express shipping and receive your order
              within 1 to 2 business days.
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <h3 className="text-white text-base sm:text-lg font-semibold mb-2">
            Exchange & Returns
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed">
            Request a hassle-free return through your account, and we'll handle
            the rest. Home Returns are always free, and we offer an extended 100
            days delivery confirmation date to send back your items.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShippingDialog;
