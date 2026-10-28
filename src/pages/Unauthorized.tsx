import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ShieldAlert } from "lucide-react";
import video from "@/assets/video/animation-Video.mp4";

const Unauthorized = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-40 pointer-events-none"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#061511]/98 via-[#061511]/84 to-[#061511]/98 -z-10" />

      {/* Content Container */}
      <div className="flex flex-col items-center justify-center text-white px-4 z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center space-y-8 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Animated Icon */}
            <div className="relative mb-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ShieldAlert size={80} className="text-[#ff4b2b]" />
              </motion.div>
            </div>

            <h1 className="text-4xl font-black text-white select-none">
              Unauthorized
            </h1>
            <h2 className="mt-2 text-xl font-semibold text-white/90">
              Access Denied
            </h2>
            <p className="mt-4 text-white/60 text-sm leading-relaxed">
              You do not have permission to view this page. If you believe this
              is an error, please contact your administrator.
            </p>
          </motion.div>

          {/* Action Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pt-4"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl bg-linear-to-r from-[#ff4b2b]/20 to-[#ff416c]/20 hover:from-[#ff4b2b]/30 hover:to-[#ff416c]/30 border border-[#ff4b2b]/30 text-[#ff4b2b] font-medium transition-all group"
            >
              <Home className="size-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Go Back Home</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-xs uppercase tracking-[0.3em] font-light text-white/40"
        >
          Secure Area
        </motion.p>
      </div>
    </div>
  );
};

export default Unauthorized;
