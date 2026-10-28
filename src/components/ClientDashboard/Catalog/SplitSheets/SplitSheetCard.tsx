import React from "react";
import { Link } from "react-router-dom";
import img1 from "@/assets/photo/split1.png";
import { useAppSelector } from "@/redux/hooks/redux-hook";

export type SplitSheetAPI = {
  splitId: string;
  releaseId: string;
  songTitle: string;
  isrc: string;
  releaseDate: string;
  recordLabelId: string | null;
  createdAt: string;
  updatedAt: string;
};

interface SplitSheetCardProps {
  split: SplitSheetAPI;
}

const SplitSheetCard: React.FC<SplitSheetCardProps> = ({ split }) => {
  const role = useAppSelector((state) => state.auth.user?.role);
  console.log(role);

  // Fallback data for fields not present in the GET /split-sheets response
  const displayData = {
    songTitle: split.songTitle,
    recordingArtists: "Unknown Artist", // API doesn't provide artist name directly here
    label: split.recordLabelId || "Marlow",
    recordLabelFull: split.recordLabelId || "Marlow",
    upc: split.isrc,
    iswc: split.isrc,
    releaseDate: new Date(split.releaseDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    type: "Single", // Default type
    imageUrl: img1, // Default image
    genre: "N/A",
    duration: "N/A",
    producers: [],
    writers: [],
    description: "No description available.",
  };

  return (
    <div className="bg-[#0C1F21] p-2 rounded-xl overflow-hidden shadow-lg flex flex-col border border-[#2C403E]">
      <img
        src={displayData.imageUrl}
        alt={displayData.songTitle}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <h2 className="text-2xl font-sans">{displayData.songTitle}</h2>
          <p className="text-[#3A5CFF] text-xl">
            {displayData.recordingArtists}
          </p>
          <p className="text-[#BDBDBD] text-base">{displayData.label}</p>
          <hr className="text-[#2C2C2C]" />

          <div className="text-[#BDBDBD] text-sm mt-2 space-y-3">
            <div className="flex justify-between items-center">
              <p>
                ISRC: <span className="text-white">{displayData.upc}</span>
              </p>
              <p>
                Type: <span className="text-white">{displayData.type}</span>
              </p>
            </div>
            <p>
              Release Date:{" "}
              <span className="text-white">{displayData.releaseDate}</span>
            </p>
          </div>
        </div>
        <Link
          to={
            role === "ADMIN"
              ? `/admin/catalog/split-sheet/${split.splitId}`
              : `/client-dashboard/catalog/split-sheet/${split.splitId}`
          }
          state={displayData}
        >
          <div className="mt-4 flex gap-2">
            <button className="text-base flex-1 py-2 bg-[#3A5CFF] text-white rounded-[15px] hover:bg-blue-500 transition cursor-pointer">
              View Split Sheet
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SplitSheetCard;
