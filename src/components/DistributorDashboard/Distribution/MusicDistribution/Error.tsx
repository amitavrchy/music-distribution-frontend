import React from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const Error: React.FC<ErrorProps> = ({
  title = "Something went wrong",
  message = "We couldn't load the data. Please try again.",
  onRetry,
}) => {
  return (
    <div className="w-full flex items-center justify-center py-20 px-4">
      <div className="bg-[#0B1D21] border border-red-500/30 rounded-xl p-8 max-w-md w-full text-center shadow-lg">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <FaExclamationTriangle className="text-red-500 text-5xl" />
        </div>

        {/* Title */}
        <h2 className="text-white text-xl font-semibold mb-2">{title}</h2>

        {/* Message */}
        <p className="text-gray-400 mb-6">{message}</p>

        {/* Retry button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
          >
            <FaRedo />
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;
