import catalogphoto1 from "@/assets/photo/catalogphoto1.png";
import {
  FaAngleLeft,
  FaUserCircle,
  // FaPlay, FaPause
} from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { MdOutlineFileDownload, MdOutlineMessage } from "react-icons/md";
import audioframe from "@/assets/photo/audioframe.png";
import { RxCrossCircled } from "react-icons/rx";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import {
  useState,
  // useRef
} from "react";
import { toast } from "sonner";
import { skipToken } from "@reduxjs/toolkit/query";

/* pic */
import Youtube from "@/assets/icons/youtube.png";
import sportify from "@/assets/icons/sportity.png";
import apple from "@/assets/icons/apple.png";
import soundClud from "@/assets/icons/soundCloud.png";
import audio from "@/assets/icons/audio.png";
import deser from "@/assets/icons/deezer.png";
import tidal from "@/assets/icons/tidal.png";
// import AudioPlayer from "../AudioPlayer";
import heart from "@/assets/icons/heart2.png";

import {
  useGetSubmissionDetailsQuery,
  useApproveSubmissionMutation,
  useDeclineSubmissionMutation,
} from "@/redux/features/distribution/distributionApi";
import {
  TrackItemData,
  ContributorItem,
  TrackArtist,
} from "@/redux/features/distribution/distribution.type";
import DistributionDetailsLoading from "./Loading";
import DistributionError from "./Error";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MdOutlineFileDownload } from "react-icons/md";
import AudioPlayer from "../AudioPlayer";

interface PlatformItem {
  name: string;
  streams: string;
  icon: string;
  iconColor: string;
}

const platformPerformance: PlatformItem[] = [
  {
    name: "YouTube",
    streams: "2.3M Streams",
    icon: Youtube,
    iconColor: "#F2F2F21A",
  },
  {
    name: "Spotify",
    streams: "1.8M Streams",
    icon: sportify,
    iconColor: "#F2F2F21A",
  },
  {
    name: "Apple Music",
    streams: "1.6M Streams",
    icon: apple,
    iconColor: "#F2F2F21A",
  },
  {
    name: "SoundCloud",
    streams: "1.3M Streams",
    icon: soundClud,
    iconColor: "#F2F2F21A",
  },
  {
    name: "Audiomack",
    streams: "900K Streams",
    icon: audio,
    iconColor: "#F2F2F21A",
  },
  {
    name: "Deezer",
    streams: "830K Streams",
    icon: deser,
    iconColor: "#F2F2F21A",
  },
  {
    name: "TIDAL",
    streams: "500K Streams",
    icon: tidal,
    iconColor: "#F2F2F21A",
  },
  {
    name: "iHeartRadio",
    streams: "200K Streams",
    icon: heart,
    iconColor: "#F2F2F21A",
  },
];

const TrackItem = ({ track }: { track: TrackItemData }) => {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  // const togglePlay = () => {
  //   if (!audioRef.current) return;
  //   if (isPlaying) {
  //     audioRef.current.pause();
  //   } else {
  //     audioRef.current.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  return (
    <div className="mb-6 border-b border-gray-800 pb-6 last:border-0 last:pb-0 ">
      <div className="flex items-center justify-between mb-3">
        <div className="flex justify-start items-center gap-3">
          <span className="bg-[#122939] text-white px-4 py-2 rounded-lg text-sm">
            Track - {track.trackNumber}
          </span>

          <div>
            <p className="text-lg font-sans">
              {track.title || "Untitled Track"}
            </p>
            <p className="text-gray-400 text-sm ">
              ISRC: {track.isrc || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {
            track.audioFileUrl && (
              <AudioPlayer url={track.audioFileUrl} title="" />
            )
            // (
            //   <>
            //     <audio
            //       ref={audioRef}
            //       src={track.audioFileUrl}
            //       onEnded={() => setIsPlaying(false)}
            //     />
            //     <button
            //       onClick={togglePlay}
            //       className="w-10 h-10 rounded-full bg-[#3A5CFF] flex items-center justify-center text-white hover:bg-[#2f4de0] transition cursor-pointer"
            //     >
            //       {isPlaying ? <FaPause /> : <FaPlay className="pl-0.5" />}
            //     </button>
            //   </>
            // )
          }
          {/* <img src={audioframe} alt="" className="h-10 opacity-50" /> */}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {track.artists?.map((artist: TrackArtist, idx: number) => (
          <div key={idx} className="bg-[#0F171D] rounded-lg p-4 space-y-4">
            <p className="text-sm text-gray-400">{artist.role}</p>
            <p className="font-medium">{artist.name}</p>
            {/* Split percentage not available in current JSON structure, but could be added if available */}
          </div>
        ))}
        {(!track.artists || track.artists.length === 0) && (
          <div className="bg-[#0F171D] rounded-lg p-4 text-center text-gray-500 italic">
            No artists listed for this track
          </div>
        )}
      </div>
    </div>
  );
};

const DistributationDetails = () => {
  const { releaseId } = useParams();
  const navigate = useNavigate();

  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

  const {
    data: submissionDetailResponse,
    isLoading,
    isError,
    refetch,
  } = useGetSubmissionDetailsQuery(releaseId ?? skipToken);

  const [approveSubmission, { isLoading: isApproving }] =
    useApproveSubmissionMutation();
  const [declineSubmission, { isLoading: isDeclining }] =
    useDeclineSubmissionMutation();

  if (isLoading) return <DistributionDetailsLoading />;
  if (isError) return <DistributionError onRetry={refetch} />;

  const data = submissionDetailResponse?.data;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleApprove = async () => {
    if (!releaseId) return;

    try {
      await approveSubmission({
        releaseId,
        payload: { note: "Approved for distribution" },
      }).unwrap();

      toast.success("Release approved successfully!");
      refetch();
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to approve release");
    }
  };

  const handleDecline = async () => {
    if (!releaseId || !declineReason.trim()) {
      toast.error("Please provide a reason for declining");
      return;
    }

    try {
      await declineSubmission({
        releaseId,
        payload: { reason: declineReason },
      }).unwrap();

      toast.success("Release declined");
      setIsDeclineDialogOpen(false);
      refetch();
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to decline release");
    }
  };

  return (
    <div className="space-y-4">
      <Link to="/distributor-dashboard/distribution">
        <p className="text-sm font-sans cursor-pointer hover:text-[#E5E5E5] flex items-center gap-1">
          <FaAngleLeft />
          Back To Distribution
        </p>
      </Link>

      <div className=" w-full text-white mx-auto mt-6">
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={data?.artworkFile || catalogphoto1 || audioframe}
              alt="Album Artwork"
              className="w-[86px] h-[65px] rounded-lg object-cover"
            />
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">
                {data?.releaseTitle || "Untitled"}
              </h2>
              <p className="text-gray-400">
                {data?.primaryArtist || "Unknown Artist"}
              </p>
            </div>
          </div>
          <div>
            {/* <Button className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 p-2 cursor-pointer mt-6">
              <MdOutlineMessage />
              Message Artist
            </Button> */}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Release Details Section */}
        <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
          <h2 className="text-2xl">Release Distribution Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Type:</p>
                <p className="font-medium">{data?.typeOfRelease || "N/A"}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Date:</p>
                <p className="font-medium">{formatDate(data?.releaseDate)}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Genre:</p>
                <p className="font-medium">{data?.genre || "N/A"}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Language:</p>
                <p className="font-medium">{data?.language || "N/A"}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Primary Artist:</p>
                <p className="font-medium">{data?.primaryArtist || "N/A"}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Explicit Content:</p>
                <p className="font-medium">
                  {data?.isExplicitContent ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Music Video:</p>
                <p className="font-medium">
                  {data?.hasMusicVideo ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Dolby Atmos:</p>
                <p className="font-medium">
                  {data?.hasDolbyAtmosVersion ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Submitted By:</p>
                <p className="font-medium">
                  {data?.submittedBy?.name || "N/A"}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Submitted At:</p>
                <p className="font-medium">{formatDate(data?.submittedAt)}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Status:</p>
                <p
                  className={`font-medium ${
                    data?.status === "Approved"
                      ? "text-green-500"
                      : data?.status === "Declined"
                        ? "text-red-500"
                        : "text-amber-500"
                  }`}
                >
                  {data?.status || "Draft"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Split Sheet (if applicable) */}
        <div className="p-8 rounded-2xl bg-[#0B1D21] space-y-6 border border-[#2F3B40]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">Split Sheet Information</h2>
            <Button className="bg-[#01D449] hover:bg-[#026322] text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 cursor-pointer">
              <MdOutlineFileDownload className="" />
              Split Sheet
            </Button>
          </div>
          <div className=" bg-[#0D1A25] border border-[#2E3A42] p-4 rounded-2xl">
            <div className=" flex justify-between items-center text-gray-400 text-sm mb-2">
              <p>Split Sheet Details</p>
              <p>Contributors: {data?.contributors?.length || 0}</p>
            </div>
            {data?.contributors && data.contributors.length > 0 ? (
              <div className="space-y-2">
                {data.contributors.map((c: ContributorItem, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-white"
                  >
                    <span>{c.name}</span>
                    <span className="text-green-400 font-medium">
                      {c.share}%
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-center py-2">
                No contributors listed.
              </p>
            )}
          </div>
        </div>

        {/* Track & Contributor Details */}
        <div className="bg-[#0B1D21] rounded-xl p-6 shadow-lg border border-[#2F3B40]">
          <h2 className="text-xl font-semibold mb-6">
            Track & Contributor Details
          </h2>
          {data?.tracks && data.tracks.length > 0 ? (
            data.tracks.map((track: TrackItemData) => (
              <TrackItem key={track.trackId} track={track} />
            ))
          ) : (
            <div className="text-center py-10 text-gray-500 italic">
              No tracks found for this release.
            </div>
          )}
        </div>

        {/* Platform Performance Section */}
        <div className="mt-8">
          <Card className="bg-[#0B1D21] border border-[#2F3B40]">
            <div className="p-6 space-y-8">
              <h2 className="text-xl font-semibold text-white mb-6">
                Distribution Platforms:
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 ">
                {platformPerformance.map((platform, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-12 h-12 ${platform.iconColor} rounded-full flex items-center justify-center mx-auto mb-3`}
                    >
                      <img
                        src={platform.icon}
                        alt={platform.name}
                        className="w-6 h-6 grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <h3 className="text-white font-medium text-sm mb-1">
                      {platform.name}
                    </h3>
                    <p className="text-slate-400 text-xs">{platform.streams}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Distribution Notes */}
        <div className="bg-[#0B1D21] rounded-xl p-6 shadow-lg border border-[#2F3B40]">
          <h2 className="text-2xl font-sans mb-6">Distribution Notes</h2>

          {data?.additionalDetails && (
            <div className="bg-[#171719] rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <FaUserCircle className="text-3xl text-gray-300" />
                <div>
                  <p className="font-semibold">{data.submittedBy?.name}</p>
                  <p className="text-sm text-gray-400">Review Note</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                {data.additionalDetails}
              </p>
            </div>
          )}

          <textarea
            placeholder="Write your message..."
            className="w-full h-[194px] px-4 py-3 rounded-[15px] border border-[rgba(226,232,240,0.54)]
            bg-[rgba(24,39,107,0.30)] text-white placeholder-gray-300
            text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500
            resize-none shadow-sm backdrop-blur-sm transition-all duration-200"
          />

          <div className="flex justify-end">
            <button className="flex w-[228px] h-[48px] px-3 justify-center items-center gap-2 rounded-[15px] border border-[#E2E8F04D] bg-[#3A5CFF] text-white hover:bg-[#2f4de0] transition cursor-pointer">
              Add Note
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8 pb-10">
          <Button
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          {data?.status === "Draft" ||
          data?.status === "Pending" ||
          data?.status === "Pending Review" ? (
            <>
              <Button
                onClick={() => setIsDeclineDialogOpen(true)}
                disabled={isApproving || isDeclining}
                className="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-start gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RxCrossCircled />
                {isDeclining ? "Declining..." : "Decline"}
              </Button>
              <Button
                onClick={handleApprove}
                disabled={isApproving || isDeclining}
                className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaCheck />
                {isApproving ? "Approving..." : "Accept"}
              </Button>
            </>
          ) : (
            <div className="text-gray-400 italic self-center">
              Action already taken: {data?.status}
            </div>
          )}
        </div>
      </div>

      {/* Decline Dialog */}
      <Dialog open={isDeclineDialogOpen} onOpenChange={setIsDeclineDialogOpen}>
        <DialogContent className="bg-[#0B1D21] border border-[#2F3B40] text-white">
          <DialogHeader>
            <DialogTitle>Decline Release</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please provide a reason for declining this distribution request.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter reason for declining..."
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="min-h-[120px] bg-[#17171A] border-[#696B6F] text-white"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeclineDialogOpen(false);
                setDeclineReason("");
              }}
              className="border-[#696B6F] text-white hover:bg-[#2a3441]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDecline}
              disabled={!declineReason.trim() || isDeclining}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeclining ? "Declining..." : "Confirm Decline"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DistributationDetails;
