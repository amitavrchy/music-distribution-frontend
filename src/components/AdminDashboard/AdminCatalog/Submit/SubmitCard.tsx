import { Link } from "react-router-dom";

export type ReviewStatus = "In Review" | "Declined" | "Approved";

interface ArtistCardProps {
  releaseId: string;
  name: string;
  type: string;
  releaseType: string;
  totalTracks: number;
  releaseDate: string;
  submitDate: string;
  reviewStatus: ReviewStatus;
}

const SubmitCard = ({
  releaseId,
  name,
  type,
  releaseType,
  totalTracks,
  releaseDate,
  submitDate,
  reviewStatus,
}: ArtistCardProps) => {
  return (
    <div className="bg-[#0D1F22] p-5 rounded-xl shadow-md text-white border-t-2 border-r border-l border-[#303B40]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-semibold">{name}</h3>
        </div>
        <p
          className={`font-semibold px-3 py-1 rounded-[15px] text-sm ${
            reviewStatus === "Approved"
              ? "bg-[#0D3226] text-green-600"
              : reviewStatus === "Declined"
                ? "bg-[#21201F] text-red-600"
                : "bg-[#25301F] text-yellow-600"
          }`}
        >
          {reviewStatus}
        </p>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <p className="text-base text-[#BDBDBD]">Artist:</p>
          <p className="text-base">{releaseType}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-base text-[#BDBDBD]">Type:</p>
          <p className="text-base">{type}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-base text-[#BDBDBD]">Tracks:</p>
          <p className="text-base">{totalTracks}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-base text-[#BDBDBD]">Release Date:</p>
          <p className="text-base">{releaseDate}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-base text-[#BDBDBD]">Submit Date:</p>
          <p className="text-base">{submitDate}</p>
        </div>
      </div>

      {/* Button */}
      <Link to={`/super-admin-dashboard/submit/${releaseId}`}>
        <button className="w-full mt-4 px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-400 transition cursor-pointer">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default SubmitCard;
