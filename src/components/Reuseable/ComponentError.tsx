import React from "react";
import { BiErrorCircle } from "react-icons/bi";

interface ComponentErrorProps {
  message?: string;
  onRetry?: () => void;
}

const ComponentError: React.FC<ComponentErrorProps> = ({
  message = "Something went wrong while fetching data.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#0D1A23] border border-[#323943] rounded-2xl min-h-[200px] text-center space-y-4">
      <BiErrorCircle className="w-12 h-12 text-[#D31301] animate-pulse" />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">
          Oops! Data Unavailable
        </h3>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-[#3A5CFF] hover:bg-[#2E4AE0] text-white rounded-lg transition-colors text-sm font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ComponentError;
