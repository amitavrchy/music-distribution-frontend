import { useState } from "react";
import { toast } from "sonner";
import { BrandMark } from "@/components/BrandMark";
import { brand } from "@/brand";
import { pageShell } from "@/layout/pageShell";
// import { Send, Instagram, Youtube, Facebook, X } from "lucide-react";
// import logoImage from "@/assets/logo 1.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import youtube from "@/assets/kareme/icon/youtube.svg";
import instagram from "@/assets/kareme/icon/instagram.svg";
import facebook from "@/assets/kareme/icon/facebook.svg";
import twitter from "@/assets/kareme/icon/twitter.svg";
import sendmail from "@/assets/kareme/icon/sendmail.svg";
// import { Send } from "lucide-react";

const DRIPPING_CSS = `
@keyframes drip {
  0% { transform: translateY(0) scale(1); opacity: 1; text-shadow: 0 0 5px rgba(255,255,255,0.8); }
  50% { transform: translateY(5px) scale(0.95); opacity: 0.9; }
  75% { transform: translateY(12px) scale(0.9); opacity: 0.5; }
  100% { transform: translateY(0) scale(1); opacity: 1; text-shadow: 0 0 5px rgba(255,255,255,0.8); }
}
`;

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list. Marlow will write when there's something worth hearing.");
      setEmail("");
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DRIPPING_CSS }} />

      <footer className="relative  pointer-events-auto bg-linear-to-b from-[#0D1E20] to-[#0D1E20] text-white font-['Inter']">
        <div className={`${pageShell} grid grid-cols-1 items-start gap-10 py-12 md:grid-cols-3 lg:py-16`}>
          {/* LEFT SECTION */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            {/* Rotating Logo */}
            {/* <div
              className="w-14 h-14  rounded-full  flex items-center justify-center ml-10"

            >
              <img
                src={logoImage}
                alt="Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
              />
            </div> */}
            <Link
              to="/"
              className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ml-10"
            >
              {/* Rotating Star Ring */}
              <BrandMark size={36} />
            </Link>

            {/* Footer Text Image */}
            <div className="text-center md:text-left">
              <p className="text-2xl font-semibold tracking-[0.22em]">MARLOW</p>
              <p className="mt-1 text-[11px] tracking-[0.28em] text-[#d7c4a3]">
                DISTRIBUTION
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
              <motion.a
                href="https://www.youtube.com"
                className="w-10 h-10 sm:w-10 sm:h-10 lg:w-12 lg:h-12 cursor-pointer rounded-full flex items-center justify-center transition-transform duration-300 bg-[#291213] hover:bg-[#3f1113]"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="YouTube"
              >
                <img src={youtube} className="w-10 h-10" />
              </motion.a>

              <motion.a
                href="https://www.instagram.com"
                className="w-10 h-10 sm:w-10 sm:h-10 lg:w-12 lg:h-12 cursor-pointer rounded-full flex items-center justify-center transition-transform duration-300 bg-[#242027] hover:bg-[#372d3f]"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Instagram"
              >
                <img src={instagram} className="w-10 h-10" />
              </motion.a>

              <motion.a
                href="https://www.facebook.com"
                className="w-10 h-10 sm:w-10 sm:h-10 lg:w-12 lg:h-12 cursor-pointer rounded-full flex items-center justify-center transition-transform duration-300 bg-[#122640] hover:bg-[#0f2d55]"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Facebook"
              >
                <img src={facebook} className="w-10 h-10" />
              </motion.a>

              <motion.a
                href="https://x.com"
                className="w-10 h-10 sm:w-10 sm:h-10 lg:w-12 lg:h-12 cursor-pointer rounded-full flex items-center justify-center transition-transform duration-300 bg-[#061416] hover:bg-gray-900"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="X"
              >
                <img src={twitter} className="w-10 h-10" />
              </motion.a>
            </div>
          </div>

          {/* MIDDLE SECTION */}
          <div className="flex flex-col items-center md:items-start space-y-8">
            {/* Manually written nav links */}
            <nav className="flex flex-wrap justify-center md:justify-start gap-5">
              <Link
                to="/"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="/labelbridge"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base cursor-pointer"
              >
                Label Bridge
              </Link>
              <Link
                to="/news-articles"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base cursor-pointer"
              >
                News & Articles
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base cursor-pointer"
              >
                About
              </Link>
              <Link
                to="/shop"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base cursor-pointer"
              >
                Shop
              </Link>
            </nav>
            <div className="flex flex-row sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-xl">
              {/* Input Wrapper */}
              <div
                className="relative flex items-center w-full rounded-full
    border border-[rgba(198,198,198,0.19)]
    bg-[linear-gradient(160deg,rgba(12,16,34,0.24)_-6.01%,rgba(41,183,84,0.06)_38.62%),rgba(12,16,34,0.6)]
    px-5 py-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                whileTap={{ scale: 0.9 }}
                aria-label="Submit email"
                className="self-end sm:self-auto"
              >
                <img
                  src={sendmail}
                  alt="Send"
                  className="w-12 h-12 sm:w-14 sm:h-14 cursor-pointer rounded-full "
                />
              </motion.button>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col items-center md:items-center space-y-6 w-full max-w-sm md:max-w-none">
            <div className="grid grid-cols-2 md:flex md:flex-col md:space-y-2 gap-2 w-full md:w-auto text-center md:text-left">
              {/* Manually written footer links */}
              <Link
                to="/privacy-policy"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base underline"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base underline"
              >
                Terms & Condition
              </Link>

              <div className="flex flex-col items-center md:items-start col-span-2 md:col-span-1">
                <p className="text-gray-400 text-sm mb-1 underline ">Email</p>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-white hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base break-all"
                >
                  {brand.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
