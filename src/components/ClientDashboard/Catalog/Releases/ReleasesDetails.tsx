import { useState } from "react";
import { Copy, ArrowLeft, Loader2 } from "lucide-react";
import realesphoto from "@/assets/photo/realesphoto.png";
import { Link, useParams } from "react-router-dom";
import { useGetSingleReleaseQuery } from "@/redux/features/newRelease/newReleaseApi";
import { useAppSelector } from "@/redux/hooks/redux-hook";

interface Track {
  trackId: string;
  trackTitle: string;
  trackIsrc: string;
  trackGenre: string;
}

export default function ReleasesDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleReleaseQuery(id, {
    skip: !id,
  });
  const [copied, setCopied] = useState<"upc" | "isrc" | null>(null);
  const role = useAppSelector((state) => state.auth.user?.role);

  const release = data?.data;

  const handleCopy = (text: string, type: "upc" | "isrc") => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1500);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-[#3A5CFF] animate-spin" />
        <p className="text-gray-400 mt-4">Loading release details...</p>
      </div>
    );
  }

  if (isError || !release) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-red-500">Error loading release details</h2>
        <Link
          to={
            role === "DISTRIBUTOR"
              ? "/distributor-dashboard/catalog/releases"
              : role === "CLIENT"
                ? "/client-dashboard/catalog/releases"
                : role === "ADMIN"
                  ? "/admin/catalog/releases"
                  : "/client-dashboard/catalog/releases"
          }
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Back to Releases
        </Link>
      </div>
    );
  }

  // Get primary artist from releaseArtists or albumLevelArtistName
  const artistName =
    release.albumLevelArtistName ||
    release.releaseArtists?.[0]?.artist?.name ||
    "Unknown Artist";

  // Get first track's ISRC as a default if needed, or from release if available (though it's not in the JSON)
  const firstTrackIsrc = release.tracks?.[0]?.trackIsrc || "N/A";
  const upc = "N/A"; // Missing in provided JSON structure

  return (
    <div className="text-white flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full">
        <Link
          to={
            role === "DISTRIBUTOR"
              ? "/distributor-dashboard/catalog/releases"
              : role === "CLIENT"
                ? "/client-dashboard/catalog/releases"
                : role === "ADMIN"
                  ? "/admin/catalog/releases"
                  : "/client-dashboard/catalog/releases"
          }
        >
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition cursor-pointer">
            <ArrowLeft size={18} />
            <span>Back To Releases</span>
          </button>
        </Link>
      </div>

      {/* Album Section */}
      <div className="flex flex-col items-center text-center mt-8">
        {/* Cover Art */}
        <div className="w-80 h-80 rounded-xl overflow-hidden shadow-lg bg-[#171719] flex items-center justify-center border border-gray-800">
          <img
            src={realesphoto}
            alt={release.releaseTitle}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-center items-center gap-3 mt-6">
          {/* Title */}
          <h1 className="text-[32px] font-sans font-semibold uppercase">
            {release.releaseTitle}
          </h1>

          {/* Status */}
          <span
            className={`text-base px-4 py-1 rounded-full ${
              release.status === "Draft"
                ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                : "bg-[#0B2A1E] text-[#01D449]"
            }`}
          >
            {release.status}
          </span>
        </div>

        {/* Artist & Metadata */}
        <p className="text-gray-400 mt-3 text-xl">By {artistName}</p>
        <p className="text-gray-400 text-xl">
          {release.typeOfRelease} • Released on{" "}
          {new Date(release.releaseDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        {/* Codes (UPC / ISRC) */}
        <div className="flex gap-6 mt-6">
          {/* UPC */}
          <div className="bg-[#171719] px-4 py-4 rounded-lg flex items-center gap-2 border border-gray-800">
            <span className="text-gray-400 text-sm">UPC</span>
            <button
              onClick={() => handleCopy(upc, "upc")}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 cursor-pointer disabled:text-gray-600"
              disabled={upc === "N/A"}
            >
              {upc}
              {upc !== "N/A" && <Copy size={16} />}
            </button>
            {copied === "upc" && (
              <span className="text-green-400 text-xs ml-2">Copied!</span>
            )}
          </div>

          {/* ISRC */}
          <div className="bg-[#171719] px-4 py-4 rounded-lg flex items-center gap-2 border border-gray-800">
            <span className="text-gray-400 text-sm">ISRC</span>
            <button
              onClick={() => handleCopy(firstTrackIsrc, "isrc")}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 cursor-pointer disabled:text-gray-600"
              disabled={firstTrackIsrc === "N/A"}
            >
              {firstTrackIsrc}
              {firstTrackIsrc !== "N/A" && <Copy size={16} />}
            </button>
            {copied === "isrc" && (
              <span className="text-green-400 text-xs ml-2">Copied!</span>
            )}
          </div>
        </div>
      </div>

      {/* Tracks Table */}
      <div className="w-full max-w-5xl mt-12 bg-[#171719] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-sm bg-gray-900/50">
              <th className="py-4 px-6">#</th>
              <th className="py-4 px-6">Title</th>
              <th className="py-4 px-6">ISRC</th>
              <th className="py-4 px-6">UPC</th>
              <th className="py-4 px-6">Primary Genre</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {release.tracks?.length > 0 ? (
              release.tracks.map((track: Track, index: number) => (
                <tr
                  key={track.trackId}
                  className="text-sm hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                  <td className="py-4 px-6 font-medium">
                    {track.trackTitle || release.releaseTitle}
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    {track.trackIsrc || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-gray-400">{upc}</td>
                  <td className="py-4 px-6 text-gray-400">
                    {track.trackGenre || release.genre || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500">
                  No tracks found for this release.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
