import { useParams, useNavigate } from "react-router-dom";
import { FaAngleLeft, FaPlay, FaPause } from "react-icons/fa";
import { useGetAdminReleaseByIdQuery } from "@/redux/features/releaseAdminDistributor/releaseAdminDistributorApi";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";
import { Button } from "@/components/ui/button";
import catalogphoto1 from "@/assets/photo/catalogphoto1.png";
import { useState, useRef } from "react";

const AdminRealiseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAdminReleaseByIdQuery(id || "");

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) return <ComponentLoader />;

  if (isError || !response?.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
        <p className="text-xl text-red-500 mb-4">
          Error loading release details
        </p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const data = response.data;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-sans cursor-pointer hover:text-gray-300 flex items-center gap-1 text-white"
        >
          <FaAngleLeft />
          Back to Releases
        </button>
      </div>

      <div className="flex items-center gap-6 text-white bg-[#0B1D21] p-6 rounded-2xl border border-[#2F3B40]">
        <img
          src={catalogphoto1}
          alt="Artwork"
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{data.releaseTitle}</h1>
          <p className="text-gray-400 text-lg">
            {data.albumLevelArtistName || "Unknown Artist"}
          </p>
          <div className="mt-2 text-sm">
            <span
              className={`px-3 py-1 rounded-full ${
                data.status === "Approved"
                  ? "bg-green-900 text-green-400"
                  : data.status === "Declined"
                    ? "bg-red-900 text-red-400"
                    : "bg-amber-900 text-amber-400"
              }`}
            >
              {data.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Release Info */}
        <div className="bg-[#0B1D21] p-8 rounded-2xl border border-[#2F3B40] text-white">
          <h2 className="text-xl font-semibold mb-6">Release Information</h2>
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <span className="text-gray-400">Release Type</span>
            <span className="font-medium text-right">{data.typeOfRelease}</span>

            <span className="text-gray-400">Genre</span>
            <span className="font-medium text-right">{data.genre}</span>

            <span className="text-gray-400">Language</span>
            <span className="font-medium text-right">{data.language}</span>

            <span className="text-gray-400">Release Date</span>
            <span className="font-medium text-right">
              {formatDate(data.releaseDate)}
            </span>

            <span className="text-gray-400">Pre-order Date</span>
            <span className="font-medium text-right">
              {formatDate(data.preOrderDate || undefined)}
            </span>

            <span className="text-gray-400">Label Name</span>
            <span className="font-medium text-right">{data.labelName}</span>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-[#0B1D21] p-8 rounded-2xl border border-[#2F3B40] text-white">
          <h2 className="text-xl font-semibold mb-6">Technical & Legal</h2>
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <span className="text-gray-400">Explicit Content</span>
            <span className="font-medium text-right">
              {data.isExplicitContent ? "Yes" : "No"}
            </span>

            <span className="text-gray-400">Dolby Atmos</span>
            <span className="font-medium text-right">
              {data.hasDolbyAtmosVersion ? "Yes" : "No"}
            </span>

            <span className="text-gray-400">External Rights</span>
            <span className="font-medium text-right">
              {data.hasExternalRightsHolder ? "Yes" : "No"}
            </span>

            <span className="text-gray-400">Extended Mix</span>
            <span className="font-medium text-right">
              {data.hasExtendedMixForDjStores ? "Yes" : "No"}
            </span>

            <span className="text-gray-400">Copyright Holder</span>
            <span className="font-medium text-right">
              {data.copyrightHolder}
            </span>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="bg-[#0B1D21] p-8 rounded-2xl border border-[#2F3B40] text-white">
        <h2 className="text-xl font-semibold mb-6">Credits & Splits</h2>
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="text-gray-400 mb-1">Producer Credits</p>
            <p className="font-medium">{data.producerCredits || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Lyricist Credits</p>
            <p className="font-medium">{data.lyricistCredits || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Master Splits</p>
            <p className="font-medium">{data.masterSplits || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Artists Section */}
      <div className="bg-[#0B1D21] p-8 rounded-2xl border border-[#2F3B40] text-white">
        <h2 className="text-xl font-semibold mb-6">Artists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.releaseArtists.map((ra, idx) => (
            <div
              key={idx}
              className="bg-[#0F171D] p-4 rounded-xl border border-gray-800"
            >
              <p className="text-xs text-blue-400 font-semibold mb-1 uppercase">
                {ra.role}
              </p>
              <p className="font-bold text-lg">{ra.artist.name}</p>
              <p className="text-sm text-gray-400">{ra.artist.stageName}</p>
              <p className="text-xs text-gray-500 mt-2">{ra.artist.email}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tracks Section */}
      <div className="bg-[#0B1D21] p-8 rounded-2xl border border-[#2F3B40] text-white">
        <h2 className="text-xl font-semibold mb-6">Tracks</h2>
        <div className="space-y-4">
          {data.tracks.map((track) => (
            <div
              key={track.trackId}
              className="bg-[#0F171D] p-4 rounded-xl border border-gray-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#122939] rounded flex items-center justify-center font-bold">
                  {track.trackNumber}
                </div>
                <div>
                  <p className="font-semibold">
                    {track.trackTitle || "Untitled Track"}
                  </p>
                  <p className="text-xs text-gray-400">
                    ISRC: {track.trackIsrc || "N/A"} | {track.trackMix}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {track.audioFileUrl && (
                  <div className="flex items-center gap-2">
                    <TrackPlayer url={track.audioFileUrl} />
                  </div>
                )}
                <div className="text-right">
                  <p className="text-xs text-gray-400">{track.trackGenre}</p>
                  <p className="text-xs text-gray-400">{track.trackLanguage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Split Sheet Section */}
      {data.splitSheetAgreements.length > 0 && (
        <div className="bg-[#0B1D21] p-8 rounded-2xl border border-[#2F3B40] text-white">
          <h2 className="text-xl font-semibold mb-6">Split Sheet Agreements</h2>
          {data.splitSheetAgreements.map((split) => (
            <div
              key={split.splitId}
              className="bg-[#0F171D] p-6 rounded-xl border border-gray-800 mb-4"
            >
              <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
                <h3 className="font-bold">{split.songTitle}</h3>
                <span className="text-xs text-gray-400">
                  ISRC: {split.isrc}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {split.contributors.map((c) => (
                  <div
                    key={c.contributorId}
                    className="flex justify-between text-sm bg-[#122939] p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{c.fullName}</p>
                      <p className="text-xs text-gray-400">
                        {c.contribution} | {c.publisher}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">
                        {c.percentageSplit}%
                      </p>
                      <p className="text-[10px] text-gray-500">
                        IPI: {c.ipiCaeNumber}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back Catalogue Section */}
      {data.backCatalogue.length > 0 && (
        <div className="bg-[#0B1D21] p-8 rounded-2xl border border-[#2F3B40] text-white">
          <h2 className="text-xl font-semibold mb-6">Back Catalogue Info</h2>
          {data.backCatalogue.map((cat) => (
            <div
              key={cat.catalogueId}
              className="bg-[#0F171D] p-4 rounded-xl border border-gray-800 grid md:grid-cols-4 gap-4 text-xs"
            >
              <div>
                <p className="text-gray-400">Distributor</p>
                <p>{cat.distributor}</p>
              </div>
              <div>
                <p className="text-gray-400">UPC</p>
                <p>{cat.upc}</p>
              </div>
              <div>
                <p className="text-gray-400">Catalogue #</p>
                <p>{cat.catalogueNumber}</p>
              </div>
              <div>
                <p className="text-gray-400">P Line / C Line</p>
                <p>
                  {cat.releasePLine} / {cat.releaseCLine}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="text-center text-gray-500 text-xs">
        <p>Created: {new Date(data.createdAt).toLocaleString()}</p>
        <p>Last Updated: {new Date(data.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

const TrackPlayer = ({ url }: { url: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={url} onEnded={() => setIsPlaying(false)} />
      <button
        onClick={togglePlay}
        className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition"
      >
        {isPlaying ? (
          <FaPause size={12} />
        ) : (
          <FaPlay size={12} className="ml-0.5" />
        )}
      </button>
    </>
  );
};

export default AdminRealiseDetails;
