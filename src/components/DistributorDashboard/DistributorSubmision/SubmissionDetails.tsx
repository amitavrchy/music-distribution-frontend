/* eslint-disable @typescript-eslint/no-explicit-any */
import catalogphoto1 from "@/assets/photo/catalogphoto1.png";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { MdOutlineMessage } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import {
  useGetSubmissionDetailsQuery,
  useApproveSubmissionMutation,
  useDeclineSubmissionMutation,
} from "@/redux/features/distribution/distributionApi";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks/redux-hook";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";

const SubmissionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const role = useAppSelector((state) => state.auth.user?.role);

  const { data, isLoading, isError } = useGetSubmissionDetailsQuery(id || "");
  const [approveSubmission, { isLoading: isApproving }] =
    useApproveSubmissionMutation();
  const [declineSubmission, { isLoading: isDeclining }] =
    useDeclineSubmissionMutation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleApprove = async () => {
    if (!id) return;

    try {
      await approveSubmission({
        releaseId: id,
        payload: { note: "Approved for distribution" },
      }).unwrap();

      toast.success("Submission approved successfully!");
      // navigate("/distributor-dashboard/submissions");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to approve submission");
    }
  };

  const handleDecline = async () => {
    if (!id || !declineReason.trim()) {
      toast.error("Please provide a reason for declining");
      return;
    }

    try {
      await declineSubmission({
        releaseId: id,
        payload: { reason: declineReason },
      }).unwrap();

      toast.success("Submission declined");
      setIsDeclineDialogOpen(false);
      navigate(
        role === "ADMIN"
          ? "/admin/catalog/submit"
          : "/distributor-dashboard/submissions",
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to decline submission");
    }
  };

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (isError || !data?.data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-400 text-lg">
          Error loading submission details
        </div>
      </div>
    );
  }

  const submission = data.data;

  return (
    <div className="space-y-4">
      <Link
        to={
          role === "ADMIN"
            ? "/admin/catalog/submit"
            : "/distributor-dashboard/submissions"
        }
      >
        <p className="text-sm font-sans cursor-pointer hover:text-[#E5E5E5] flex items-center gap-1">
          <FaAngleLeft />
          Back To Submissions
        </p>
      </Link>

      <div className="w-full text-white mx-auto mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={catalogphoto1}
              alt="Album Artwork"
              className="w-[86px] h-[65px] rounded-lg"
            />
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">{submission.releaseTitle}</h2>
              <p className="text-gray-400">{submission.primaryArtist}</p>
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

      {/* Release Distribution Details */}
      <div className="space-y-6">
        <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
          <h2 className="text-2xl">Release Distribution Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Type:</p>
                <p className="font-medium">{submission.typeOfRelease}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Date:</p>
                <p className="font-medium">
                  {formatDate(submission.releaseDate)}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Genre:</p>
                <p className="font-medium">{submission.genre}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Language:</p>
                <p className="font-medium">{submission.language}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Primary Artist:</p>
                <p className="font-medium">{submission.primaryArtist}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Explicit Content:</p>
                <p className="font-medium">
                  {submission.isExplicitContent ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Music Video:</p>
                <p className="font-medium">
                  {submission.hasMusicVideo ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Dolby Atmos:</p>
                <p className="font-medium">
                  {submission.hasDolbyAtmosVersion ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Submitted By:</p>
                <p className="font-medium">{submission.submittedBy.name}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Submitted At:</p>
                <p className="font-medium">
                  {formatDate(submission.submittedAt)}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Territories:</p>
                <p className="font-medium">
                  {submission.territories.join(", ")}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Status:</p>
                <p className="font-medium">{submission.status}</p>
              </div>
            </div>
          </div>

          {submission.additionalDetails && (
            <div className="mt-6">
              <p className="text-[#E5E5E5] mb-2">Additional Details:</p>
              <p className="font-medium text-gray-300">
                {submission.additionalDetails}
              </p>
            </div>
          )}
        </div>

        {/* Artists */}
        {submission.artists && submission.artists.length > 0 && (
          <div className="p-8 rounded-2xl bg-[#0B1D21] space-y-6 border border-[#2F3B40]">
            <h2 className="text-2xl">Artists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {submission.artists.map((artist) => (
                <div
                  key={artist.artistId}
                  className="bg-[#0F171D] rounded-lg p-4 space-y-2"
                >
                  <p className="text-sm text-gray-400">{artist.role}</p>
                  <p className="font-medium">{artist.name}</p>
                  <p className="text-sm text-gray-400">{artist.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button
            onClick={() => setIsDeclineDialogOpen(true)}
            disabled={isApproving || isDeclining}
            className="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-start gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RxCrossCircled />
            {isDeclining ? "Declining..." : "Decline"}
          </Button>
          {submission.status === "Draft" && (
            <Button
              onClick={handleApprove}
              disabled={isApproving || isDeclining}
              className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaCheck />
              {isApproving ? "Approving..." : "Approve"}
            </Button>
          )}
        </div>
      </div>

      {/* Decline Dialog */}
      <Dialog open={isDeclineDialogOpen} onOpenChange={setIsDeclineDialogOpen}>
        <DialogContent className="bg-[#0B1D21] border border-[#2F3B40] text-white">
          <DialogHeader>
            <DialogTitle>Decline Submission</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please provide a reason for declining this submission. This will
              be sent to the artist.
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
              {isDeclining ? "Declining..." : "Decline Submission"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionDetails;
