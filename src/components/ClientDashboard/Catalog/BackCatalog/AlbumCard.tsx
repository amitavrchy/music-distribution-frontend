import { useAppSelector } from "@/redux/hooks/redux-hook";
import React from "react";
import { Link } from "react-router-dom";

type AlbumCardProps = {
  title: string;
  artist: string;
  label: string;
  upc: string;
  releaseDate: string;
  type: string;
  imageUrl: string;
  catalogueId?: string;
};

const AlbumCard: React.FC<AlbumCardProps> = ({
  title,
  artist,
  label,
  upc,
  releaseDate,
  type,
  imageUrl,
  catalogueId,
}) => {
  const role = useAppSelector((state) => state.auth.user?.role);
  return (
    <div className="bg-[#0C1F21] p-2 rounded-xl overflow-hidden shadow-lg flex flex-col">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <h2 className="text-white font-sans text-2xl">{title}</h2>
          <p className="text-[#3A5CFF] text-xl">{artist}</p>
          <p className="text-[#BDBDBD] text-base">{label}</p>
          <hr className="text-[#2C2C2C]" />
          <div className="text-[#BDBDBD] text-sm mt-2 space-y-3">
            <div className=" flex justify-between items-center">
              <p>
                UPC: <span className="text-white">{upc}</span>
              </p>
              <p>
                Type: <span className="text-white">{type}</span>{" "}
              </p>
            </div>
            <p>
              Release Date:{" "}
              <span className="text-white">
                {new Date(releaseDate).toLocaleDateString()}
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          {/* Edit Button */}
          <Link
            to={
              role === "DISTRIBUTOR"
                ? `/distributor-dashboard/catalog/back-catalog/edit/${catalogueId}`
                : role === "CLIENT"
                  ? `/client-dashboard/catalog/back-catalog/edit/${catalogueId}`
                  : role === "ADMIN"
                    ? `/admin/catalog/back-catalog/edit/${catalogueId}`
                    : `/client-dashboard/catalog/back-catalog/edit/${catalogueId}`
            }
            className="flex-1"
          >
            <button className="w-full h-12 flex justify-center items-center gap-2 rounded-xl border border-gray-700 bg-white/10 text-white hover:bg-white/20 transition-all duration-300 font-medium cursor-pointer">
              Edit
            </button>
          </Link>

          {/* View Details Button */}
          <Link
            to={
              role === "DISTRIBUTOR"
                ? `/distributor-dashboard/catalog/back-catalog/view/${catalogueId}`
                : role === "CLIENT"
                  ? `/client-dashboard/catalog/back-catalog/view/${catalogueId}`
                  : role === "ADMIN"
                    ? `/admin/catalog/back-catalog/view/${catalogueId}`
                    : `/client-dashboard/catalog/back-catalog/view/${catalogueId}`
            }
            className="flex-1"
          >
            <button className="w-full h-12 flex justify-center items-center gap-2 rounded-xl border border-[#3A5CFF] bg-[#3A5CFF] text-white hover:bg-[#3350d1] transition-all duration-300 font-medium cursor-pointer">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
