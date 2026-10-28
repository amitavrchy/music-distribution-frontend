import userPlaceholder from "@/assets/photo/user.svg";
import { Link } from "react-router-dom";

interface ArtistCardProps {
  id: string;
  name: string;
  genre: string;
  totalRelease: number;
  releaseType: string;
  distributor: string;
  label: string;
  totalTracks: number;
  dateRange: string;
  imageUrl?: string;
}

const BackCatalogCard = ({
  id,
  name,
  genre,
  totalRelease,
  releaseType,
  distributor,
  label,
  totalTracks,
  dateRange,
  imageUrl,
}: ArtistCardProps) => (
  <div className="bg-[#0D1F22] p-5 rounded-lg shadow-md text-white border-t-2 border-r border-l border-[#303B40]">
    <div className="flex items-center gap-4">
      <img
        src={imageUrl || userPlaceholder}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm italic">{genre}</p>
      </div>
    </div>
    <div className="mt-4 space-y-3">
      {/* ... details ... */}
      <div className="flex justify-between">
        <p className="text-base text-[#BDBDBD]"> Total Release:</p>
        <p className="text-base"> {totalRelease}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-base text-[#BDBDBD]"> Release Type:</p>
        <p className="text-base"> {releaseType}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-base text-[#BDBDBD]">Distributor:</p>
        <p className="text-base"> {distributor}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-base text-[#BDBDBD]">Label: </p>
        <p className="text-base">{label}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-base text-[#BDBDBD]">Total Track: </p>
        <p className="text-base">{totalTracks}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-base text-[#BDBDBD]">Date Range:</p>
        <p className="text-base">{dateRange}</p>
      </div>
    </div>
    <Link
      to={`view/${id}`}
      className="block w-full text-center mt-4 px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-400 transition cursor-pointer"
    >
      View Details
    </Link>
  </div>
);

export default BackCatalogCard;
