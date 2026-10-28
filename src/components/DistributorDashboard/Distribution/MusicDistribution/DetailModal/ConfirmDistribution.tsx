import catalogphoto1 from "@/assets/photo/catalogphoto1.png";
// import audioframe1 from "@/assets/photo/audioframe1.svg";
// import audioframe2 from "@/assets/photo/audioframe2.svg";
// import videoPlayerBackground from "@/assets/photo/music_player_background.mp4"

import { FaCircleExclamation } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Card } from "@/components/ui/card";
// import { SubmissionDetailsData } from "@/redux/features/distribution/distribution.type";
import useControlDispatch from "@/contexts/control/hooks/useControlDispatch";
import useControlData from "@/contexts/control/hooks/useControlData";
// import { useGetSubmissionDetailsQuery } from "@/redux/features/distribution/distributionApi";
// import { useGetSingleReleaseQuery } from "@/redux/features/newRelease/newReleaseApi";
import ConfirmDistributionSkeleton from "./Loading";
import DistributionError from "./Error";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetReleaseDetailsQuery } from "@/redux/features/releaseAdminDistributor/releaseAdminDistributorApi";
import {
  useApproveSubmissionMutation,
  useDeclineSubmissionMutation,
  useManualDistributeMutation,
  useUpdatePlatformDeliveryMutation,
} from "@/redux/features/distribution/distributionApi";
// import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useState } from "react";
import { useMemo } from "react";
import AudioPlayer from "../../AudioPlayer";
import { createPortal } from "react-dom";

const STORE_PLATFORMS = [
  "Spotify",
  "Apple Music",
  "YouTube",
  "SoundCloud",
  "Audiomack",
  "Deezer",
  "TIDAL",
  "iHeartRadio",
];

type QueuedPlatform = {
  platform: string;
  status: "Queued" | "Delivered" | "Failed";
};

const ConfirmDistribution = () => {
  // console.log(data)

  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(STORE_PLATFORMS);
  const [queuedPlatforms, setQueuedPlatforms] = useState<QueuedPlatform[]>([]);
  const [activeDistributionId, setActiveDistributionId] = useState<string | null>(null);
  const { closeModal } = useControlDispatch();
  const { releaseId } = useControlData();
  // const {
  //         data,
  //         isLoading, isError } = useGetSubmissionDetailsQuery(releaseId ?? skipToken);

  const { data, isLoading, isError } = useGetReleaseDetailsQuery(
    releaseId ?? skipToken,
  );

  const [
    approveSubmission,
    {
      isLoading: isApproveLoading,
      // isSuccess: isApproveSuccess,
      // isError: isApproveError,
    },
  ] = useApproveSubmissionMutation();

  const [
    declineSubmission,
    {
      isLoading: isDeclineLoading,
      // isSuccess: isDeclineSuccess,
      // isError: isDeclineError,
    },
  ] = useDeclineSubmissionMutation();

  const [manualDistribute, { isLoading: isDistributing }] =
    useManualDistributeMutation();
  const [updatePlatformDelivery, { isLoading: isUpdatingPlatform }] =
    useUpdatePlatformDeliveryMutation();

  const togglePlatform = (name: string) => {
    setSelectedPlatforms((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  };

  const handleManualDistribute = async () => {
    if (!releaseId) return;
    if (selectedPlatforms.length === 0) {
      toast.error("Select at least one store");
      return;
    }

    try {
      const result = await manualDistribute({
        releaseId,
        platforms: selectedPlatforms,
      }).unwrap();
      setActiveDistributionId(result.data.distributionId);
      setQueuedPlatforms(result.data.platforms);
      toast.success(result.message || "Files queued for manual delivery");
    } catch (error) {
      const message =
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
          ? String(error.data.message)
          : "Approve the release before sending files";
      toast.error(message);
    }
  };

  const handleMarkDelivered = async (platform: string) => {
    if (!activeDistributionId) return;
    try {
      const result = await updatePlatformDelivery({
        distributionId: activeDistributionId,
        platform,
        status: "Delivered",
      }).unwrap();
      setQueuedPlatforms(result.data.platforms);
      toast.success(`${platform} marked delivered`);
    } catch {
      toast.error(`Could not update ${platform}`);
    }
  };

  const handleApprove = async () => {
    if (!releaseId) return;

    try {
      await approveSubmission({ releaseId }).unwrap();

      toast.success("Distribution approved successfully");

      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Failed to approve distribution");
    }
  };

  const handleDecline = async () => {
    if (!releaseId) return;

    if (!declineReason.trim()) {
      toast.error("Decline reason is required");

      return;
    }

    try {
      await declineSubmission({
        releaseId,
        payload: { reason: declineReason },
      }).unwrap();
      toast.success("Distribution declined successfully");
      setDeclineReason("");
      setShowDeclineModal(false);
      closeModal();
    } catch {
      toast.error("Failed to decline distribution");
    }
  };

  // const {
  //         data: releaseData,
  //         isLoading: isReleaseLoading, isError: isReleaseError, error } = useGetSingleReleaseQuery(releaseId ?? skipToken);

  const release = useMemo(() => data?.data, [data]);
  const tracks = useMemo(() => release?.tracks || [], [release]);

  if (isError) return <DistributionError />;
  if (
    isLoading
    // || isReleaseLoading
  )
    return <ConfirmDistributionSkeleton />;

  const renderDeclineModal = () => {
    if (!showDeclineModal) return null;

    return createPortal(
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
        <div className="bg-[#0B1D21] p-6 rounded-lg w-[400px] space-y-4 shadow-xl">
          <h2 className="text-xl font-bold text-white">Decline Reason</h2>

          <textarea
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            placeholder="Enter decline reason..."
            className="w-full p-2 rounded bg-[#0F2435] text-white border border-gray-600 outline-none"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeclineModal(false)}
              className="bg-gray-500 px-4 py-2 rounded text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleDecline}
              className="bg-red-500 px-4 py-2 rounded text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>,

      document.body,
    );
  };

  console.log(release);
  const track = release?.tracks?.[0];

  console.log(tracks);
  return (
    <div>
      <div className=" w-full text-white mx-auto">
        <p className="text-2xl font-sans  gap-1">Confirm Distribution</p>

        <div className=" w-full text-white   mx-auto mt-6">
          <div className=" flex items-center justify-between">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={catalogphoto1}
                alt="Album Artwork"
                className="w-[86px] h-[65px] rounded-lg"
              />
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">{release?.releaseTitle}</h2>
                <p className="text-gray-400">{release?.primaryArtist}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PArt-2 */}
      <div className="space-y-6">
        <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
          <h2 className="text-2xl">General Release Information</h2>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Label Name:</p>
                <p className="font-medium">{release?.labelName}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Catalogue Number: </p>
                <p className="font-medium">{release?.catalogueNumber}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Type: </p>
                <p className="font-medium">{release?.typeOfRelease}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Date: </p>
                <p className="font-medium">
                  {release?.releaseDate
                    ? new Date(release.releaseDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Distributor: </p>
                <p className="font-medium">{release?.distributor}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Artist: </p>
                <p className="font-medium">{release?.primaryArtist}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Artwork Link: </p>
                <p className="font-medium underline text-blue-600">
                  View Artwork
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">UPC: </p>
                <p className="font-medium">{release?.upc}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Title: </p>
                <p className="font-medium">{release?.releaseTitle}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release C Link: </p>
                <p className="font-medium">{release?.releaseCLine}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release P Link: </p>
                <p className="font-medium">{release?.releasePLine} </p>
              </div>
            </div>
          </div>
        </div>
        {/* part-2 */}
        <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
          <h2 className="text-2xl">Track Details</h2>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">ISRC: </p>
                <p className="font-medium">{track?.isrc} </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Copyright Holder: </p>
                <p className="font-medium">
                  {release?.labelName || track?.publisher}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Language: </p>
                <p className="font-medium">{track?.language} </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">TikTok Start Time: </p>
                <p className="font-medium">0:15</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 cursor-pointer audio-player">
                {/* <img src={audioframe1} alt="" className="w-full sm:w-auto" />
                <img src={audioframe2} alt="" className="w-full sm:w-auto" /> */}

                {tracks.map((track) => (
                  <AudioPlayer
                    key={track.trackId}
                    url={track.audioFileUrl}
                    title=""
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Artist: </p>
                <p className="font-medium">{release?.primaryArtist} </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Publishe: </p>
                <p className="font-medium">{track?.publisher}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Explicit: </p>
                <p className="font-medium underline text-blue-600">
                  {track?.explicit ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Territory: </p>
                <p className="font-medium">{track?.territoryRestrictions} </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Mix/Version: </p>
                <p className="font-medium">{track?.mix} </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Genre: </p>
                <p className="font-medium">{track?.genre}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Original Release </p>
                <p className="font-medium">
                  {track?.originalReleaseDate
                    ? new Date(track.originalReleaseDate).toLocaleDateString()
                    : "N/A"}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* part-3 */}
        <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40] marker">
          <h2 className="text-2xl">Artist Metadata </h2>{" "}
          <h2 className="text-lg mt-2">Artist: {release?.primaryArtist} </h2>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Label Name:</p>
                <p className="font-medium">{release?.labelName}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Catalogue Number: </p>
                <p className="font-medium">{release?.catalogueNumber}</p>
              </div>

              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Spotify ID: </p>
                <p className="font-medium text-blue-600">
                  spotify:artist:someid
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Distributor: </p>
                <p className="font-medium">Distrokid</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Artist: </p>
                <p className="font-medium">Gemini Chachi</p>
              </div>

              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Spotify ID: </p>
                <p className="font-medium text-blue-600">
                  spotify:artist:someid
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Title: </p>
                <p className="font-medium">The World is Yours</p>
              </div>

              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release P Link: </p>
                <p className="font-medium">(P) 2024 Marlow</p>
              </div>
            </div>
          </div>
          <hr className="text-[#044A20]" />
          <h2 className="text-lg marker">Artist: LeeLee Babii</h2>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Label Name:</p>
                <p className="font-medium">Marlow</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Catalogue Number: </p>
                <p className="font-medium">ONELS-OOI</p>
              </div>

              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Spotify ID: </p>
                <p className="font-medium text-blue-600">
                  spotify:artist:someid
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Distributor: </p>
                <p className="font-medium">Distrokid</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Artist: </p>
                <p className="font-medium">Gemini Chachi</p>
              </div>

              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Spotify ID: </p>
                <p className="font-medium text-blue-600">
                  spotify:artist:someid
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Title: </p>
                <p className="font-medium">The World is Yours</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release C Link: </p>
                <p className="font-medium">(c) 2024 Marlow</p>
              </div>
            </div>
          </div>
        </div>

        {/* Part-4 Distribution Platforms: */}
        <div>
          {/* Platform Performance Section */}
          <div className="mt-[40px] bg-[#0D2223]">
            <Card className="border border-[#c6c6c630]">
              <div className="p-6 space-y-8">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Distribution Platforms:
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {STORE_PLATFORMS.map((name) => {
                    const queued = queuedPlatforms.find((item) => item.platform === name);
                    const selected = selectedPlatforms.includes(name);
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => togglePlatform(name)}
                        className={`rounded-xl border px-3 py-3 text-left transition ${
                          selected
                            ? "border-[#3A5CFF] bg-[#13283a]"
                            : "border-[#2F3B40] bg-transparent"
                        }`}
                      >
                        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#1c3a40] text-sm font-semibold text-white">
                          {name.slice(0, 1)}
                        </div>
                        <p className="text-sm font-medium text-white">{name}</p>
                        <p className="text-xs text-slate-400">
                          {queued?.status || (selected ? "Selected" : "Skipped")}
                        </p>
                      </button>
                    );
                  })}
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-white">Audio files</h3>
                  {tracks.length === 0 ? (
                    <p className="text-sm text-slate-400">No tracks on this release.</p>
                  ) : (
                    tracks.map((track) => (
                      <div
                        key={track.trackId}
                        className="flex items-center justify-between gap-3 rounded-lg border border-[#2F3B40] px-3 py-2"
                      >
                        <div>
                          <p className="text-sm text-white">{track.title || "Untitled track"}</p>
                          <p className="text-xs text-slate-400">
                            {track.audioFileUrl ? "Ready to send" : "Audio file missing"}
                          </p>
                        </div>
                        {track.audioFileUrl ? (
                          <a
                            href={track.audioFileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-[#8eb6ff]"
                          >
                            Download
                          </a>
                        ) : null}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Last */}
        <div className="w-full sm:w-2/3 flex flex-col sm:flex-row items-start sm:items-center gap-3 p-5 rounded-2xl shadow-2xl bg-[#0F2435] text-white">
          <span className="text-2xl">
            <FaCircleExclamation />
          </span>
          <p className="text-sm sm:text-base">
            Approve the release, download the audio files, then queue the stores.
            Mark each store delivered after you upload the files manually.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          {/* Cancel Button */}
          <button
            onClick={() => setShowDeclineModal(true)}
            disabled={isDeclineLoading}
            className="bg-gray-300 text-black px-5 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer flex justify-center items-center gap-2 w-full sm:w-auto"
          >
            {isDeclineLoading ? (
              "Declining..."
            ) : (
              <>
                <RxCross2 />
                Cancel
              </>
            )}
          </button>

          {/* Distribution Button */}
          <button
            onClick={handleApprove}
            disabled={isApproveLoading}
            className="border border-[#3A5CFF] text-white px-5 py-2 rounded-lg hover:bg-[#13283a] transition cursor-pointer w-full sm:w-auto disabled:opacity-50"
          >
            {isApproveLoading ? "Approving..." : "Approve"}
          </button>
          <button
            onClick={handleManualDistribute}
            disabled={isDistributing}
            className="bg-[#3A5CFF] text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer w-full sm:w-auto disabled:opacity-50"
          >
            {isDistributing ? "Queuing files..." : "Send files manually"}
          </button>
          {activeDistributionId &&
            queuedPlatforms
              .filter((item) => item.status !== "Delivered")
              .map((item) => (
                <button
                  key={item.platform}
                  onClick={() => handleMarkDelivered(item.platform)}
                  disabled={isUpdatingPlatform}
                  className="bg-[#0E3026] text-[#01D449] px-4 py-2 rounded-lg w-full sm:w-auto"
                >
                  Mark {item.platform} delivered
                </button>
              ))}
        </div>
      </div>
      {renderDeclineModal()}
    </div>
  );
};

export default ConfirmDistribution;
