import React from "react";
import { motion } from "framer-motion";
import gurni from "@/assets/photo/New folder/gurni.png";

const labelClientsContent = {
  title: "FOR OUR LABEL CLIENTS",
  description: `For our independent label clients, our release management tools enable their artists to submit demos for consideration. Clients can quickly accept and distribute tracks, reject submissions, or mark them as pending. Additionally, our portal facilitates private messaging, allowing seamless communication between clients and their artists.`,
};

const independentArtistsContent = {
  title: "FOR OUR INDEPENDENT ARTISTS",
  description: `We take a hands-on approach with our clients’ data and analytics, allowing us to identify opportunities before they become apparent to others. This proactive strategy enables us to support our clients’ marketing needs and ensure their records receive the recognition they truly deserve. If a record starts to gain traction and could benefit from a financial boost, Marlow is open to discussing a marketing budget in exchange for a percentage of its masters. We’re here to help you every step of the way!`,
};

const ClientsAndArtistsSection: React.FC = () => {
  return (
    <div className="  min-h-screen flex justify-start flex-col items-center py-16 px-4 sm:px-8 lg:px-0 overflow-hidden">
      {/* Label Clients Text */}
      <div className="max-w-6xl w-full mb-12 md:mb-12 md:mr-64 text-left md:text-left px-4 md:px-0 order-1 md:order-1">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wider">
          {labelClientsContent.title}
        </h2>
        <p className="max-w-5xl text-gray-300 text-lg leading-relaxed">
          {labelClientsContent.description}
        </p>
      </div>

      {/* Central Section: Left-Image-Right Layout */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl order-2">
        {/* Empty Left (hidden on mobile) */}
        <div className="md:w-1/3 hidden md:block"></div>

        {/* Center Image with circular motion */}
        <motion.div
          className="md:w-1/3 flex justify-center items-center"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        >
          <img
            src={gurni}
            alt="Vinyl Record"
            className="w-48 sm:w-60 md:w-72 lg:w-96 rounded-full object-contain"
          />
        </motion.div>

        {/* Empty Right (hidden on mobile) */}
        <div className="md:w-1/3 hidden md:block"></div>
      </div>

      {/* Independent Artists Text */}
      <div className="max-w-3xl w-full mt-12 md:mt-12 md:ml-64 text-left md:text-left px-4 md:px-0 order-3 md:order-3">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wider">
          {independentArtistsContent.title}
        </h2>
        <p className="max-w-5xl text-gray-300 text-lg leading-relaxed">
          {independentArtistsContent.description}
        </p>
      </div>
    </div>
  );
};

export default ClientsAndArtistsSection;
