import { MdErrorOutline, MdRefresh } from "react-icons/md";

interface DistributionErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function DistributionError({
  message = "Something went wrong while fetching the distribution details.",
  onRetry,
}: DistributionErrorProps) {
  return (
    <div className="w-full flex justify-center items-center py-16">
      <div className="bg-[#0B1D21] border border-[#2F3B40] rounded-2xl p-10 w-full max-w-2xl text-center space-y-6 shadow-lg">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-red-500/10 p-5 rounded-full">
            <MdErrorOutline className="text-red-500 text-5xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white">
          Failed to Load Distribution Details
        </h2>

        {/* Message */}
        <p className="text-gray-400 text-sm">{message}</p>

        {/* Actions */}
        <div className="flex justify-center gap-4 pt-4">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 bg-[#3A5CFF] hover:bg-[#2f4de0] px-6 py-3 rounded-xl text-white transition"
            >
              <MdRefresh />
              Try Again
            </button>
          )}

          <button
            onClick={() => window.location.reload()}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl text-white transition"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}
