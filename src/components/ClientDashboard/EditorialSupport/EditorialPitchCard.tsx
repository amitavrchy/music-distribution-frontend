import React from "react";
import { Link } from "react-router-dom";
import { albumData } from "./EditorialPitchGrid";
import { FaRegEdit } from "react-icons/fa";

type AlbumCardProps = (typeof albumData)[number];

const EditorialPitchCard: React.FC<AlbumCardProps> = (album) => {
  const slug = encodeURIComponent(album.title);

  return (
    <div className="bg-[#0C1F21] p-2 rounded-xl overflow-hidden shadow-lg flex flex-col border border-[#2C403E]">
      <img
        src={album.imageUrl}
        alt={album.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <h2 className="text-2xl font-sans">{album.title}</h2>
          <p className="text-[#3A5CFF] text-xl">{album.artist}</p>
          <p className="text-[#BDBDBD] text-base">{album.label}</p>
          <hr className="text-[#2C2C2C]" />

          <div className="text-[#BDBDBD] text-sm mt-2 space-y-3">
            <div className="flex justify-between items-center">
              <p>
                UPC: <span className="text-white">{album.upc}</span>
              </p>
              <p>
                Type: <span className="text-white">{album.type}</span>
              </p>
            </div>
            <p>
              Release Date:{" "}
              <span className="text-white">{album.releaseDate}</span>
            </p>
          </div>
        </div>
        <Link to={`/client-dashboard/editorial-submit/${slug}`} state={album}>
          <div className="mt-4 flex gap-2">
            <button className="flex items-center justify-center gap-2 text-base flex-1 py-2 bg-[#3A5CFF] text-white rounded-[14px] hover:bg-blue-500 transition cursor-pointer">
              <FaRegEdit className="text-lg" />
              <span>Editorial Pitch</span>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EditorialPitchCard;
