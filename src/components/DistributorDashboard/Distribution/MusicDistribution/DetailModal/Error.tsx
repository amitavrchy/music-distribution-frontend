import { FaCircleExclamation } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import tenancy from "@/assets/icons/tenancy.svg";
import { Card } from "@/components/ui/card";

interface DistributionErrorProps {
  message?: string;
  onRetry?: () => void;
  onCancel?: () => void;
}

const DistributionError = ({
  message = "Something went wrong while fetching the release details.",
  onRetry,
  onCancel,
}: DistributionErrorProps) => {
  return (
    <div className="w-full text-white mx-auto space-y-6">
      {/* Error Header */}
      <div className="flex items-center gap-3 bg-[#0F2435] p-5 rounded-2xl shadow-2xl">
        <span className="text-3xl text-red-500">
          <FaCircleExclamation />
        </span>
        <p className="text-base sm:text-lg">{message}</p>
      </div>

      {/* Optional Retry / Cancel Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        {onCancel && (
          <button
            className="bg-gray-300 text-black px-5 py-2 rounded-lg hover:bg-gray-400 transition flex justify-center items-center gap-2 w-full sm:w-auto"
            onClick={onCancel}
          >
            <RxCross2 />
            Cancel
          </button>
        )}

        {onRetry && (
          <button
            className="bg-[#3A5CFF] text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition flex justify-center items-center gap-2 w-full sm:w-auto"
            onClick={onRetry}
          >
            <img src={tenancy} alt="" className="h-5 w-5" />
            Retry
          </button>
        )}
      </div>

      {/* Optional Card for additional info */}
      <Card className="border border-[#c6c6c630] bg-[#0D2223] p-6">
        <p className="text-gray-400 text-sm">
          Please check your internet connection or contact support if the issue
          persists.
        </p>
      </Card>
    </div>
  );
};

export default DistributionError;
