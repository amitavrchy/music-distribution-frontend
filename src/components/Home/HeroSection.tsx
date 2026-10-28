import heroImage from "../../assets/Home/heroImage.png";

import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div>
      <div className="bg-gradient-to-br from-teal-500 to-blue-600 mt-[70px]">
        {/* Hero Section */}
        <div className="max-w-[1200px] mx-auto px-3 md:px-10 xl:px-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6 mb-5 pt-10 lg:pb-28">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#13161B] font-bold leading-tight">
                  Fast & Reliable
                  <br />
                  <span className="relative text-[#FEFAF5] inline-block">
                    Courier Service
                    {/* Curved underline SVG */}
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3"
                      viewBox="0 0 300 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 8C50 2 100 1 150 3C200 5 250 7 295 8"
                        stroke="#FB923C"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-md my-10">
                  Safe, fast, and reliable deliveries—our platform connects you.
                  to the fastest routes and top-tier couriers.
                </p>
              </div>
              <button className="bg-transparent border-1 cursor-pointer border-white text-white hover:bg-[#EF6820] hover:border-transparent hover:text-white px-8 py-3 rounded-[8px] text-lg font-semibold">
                <Link to="/signup">Get Started</Link>
              </button>
            </div>

            {/* Right Content - Delivery Person with Floating Icons */}
            <div className="hidden lg:block -mb-8">
              <img src={heroImage} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
