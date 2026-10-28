import { Music } from "lucide-react";
import music from "@/assets/photo/supportsheet.jpg";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SubmitSupportSheeet() {
  return (
    <div className="min-h-screen  text-white px-6 py-16 flex flex-col items-center">
      {/* Title */}
      <div className="text-center w-full">
        <h1 className="text-5xl font-sans font-semibold">
          {" "}
          SUBMIT EDITORIAL SUPPORT SHEET
        </h1>
        <p className="text-gray-400 mt-2">
          Share your sound with the world. We’re excited to hear your work and
          help you reach your audience.
        </p>
      </div>

      {/* Content */}
      <div className="mt-12 flex flex-col md:flex-row items-center md:items-start gap-10 w-full">
        {/* Left Side - Instructions */}
        <div className="flex-1 mt-20">
          <h2 className="text-3xl font-semibold mb-3">READY TO GET STARTED?</h2>
          <p className="text-gray-400 text-sm mb-6">
            Our submission process is designed to be simple and straightforward.
            Just a few steps to get your music in our hands and ready for the
            world.
          </p>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Music className="text-blue-400 w-5 h-5 mt-1" />
              <span>Fill out the required metadata fields.</span>
            </li>
            <li className="flex items-start gap-3">
              <Music className="text-blue-400 w-5 h-5 mt-1" />
              <span>Upload your audio files and artwork.</span>
            </li>
            <li className="flex items-start gap-3">
              <Music className="text-blue-400 w-5 h-5 mt-1" />
              <span>Review and submit!</span>
            </li>
          </ul>
          <Link to="/client-dashboard/catalog/editorial-submit/form">
            <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 shadow-lg transition cursor-pointer">
              Submit Support Sheet <FaAngleDoubleRight size={18} />
            </button>
          </Link>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={music}
              alt="Submit Music"
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
