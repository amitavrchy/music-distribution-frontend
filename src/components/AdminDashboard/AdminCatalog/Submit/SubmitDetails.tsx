/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSubmissionDetailsQuery,
  useApproveSubmissionMutation,
  useDeclineSubmissionMutation,
} from "@/redux/features/distribution/distributionApi";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";
import ComponentError from "@/components/Reuseable/ComponentError";
import MiniTitle from "@/components/ClientDashboard/Shared/MiniTitle";
import catalogphoto1 from "@/assets/photo/catalogphoto1.png";
import toast from "react-hot-toast";

const SubmitDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetSubmissionDetailsQuery(id || "");
  const [approveSubmission, { isLoading: isApproving }] =
    useApproveSubmissionMutation();
  const [declineSubmission, { isLoading: isDeclining }] =
    useDeclineSubmissionMutation();

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (error || !data?.data) {
    return <ComponentError />;
  }

  const release = data.data;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const handleApprove = async () => {
    const note = window.prompt(
      "Enter approval note (optional):",
      "Approved for distribution",
    );
    if (note === null) return; // User cancelled

    try {
      await approveSubmission({
        releaseId: id!,
        payload: { note },
      }).unwrap();
      toast.success("Release approved successfully!");
      navigate(-1);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to approve release");
    }
  };

  const handleDecline = async () => {
    const reason = window.prompt("Enter reason for declining:");
    if (!reason) return; // Must provide a reason

    try {
      await declineSubmission({
        releaseId: id!,
        payload: { reason },
      }).unwrap();
      toast.success("Release declined");
      navigate(-1);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to decline release");
    }
  };

  return (
    <div>
      <div className="w-full text-white mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={catalogphoto1}
              alt="Album Artwork"
              className="w-32 h-32 rounded-lg"
            />
            <div>
              <div>
                <h2 className="text-2xl font-bold">{release.releaseTitle}</h2>
                <p className="text-gray-400">{release.primaryArtist}</p>
                <div className="mt-2 text-sm">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      release.status === "Approved"
                        ? "text-green-500"
                        : release.status === "Declined"
                          ? "text-red-500"
                          : "text-yellow-500"
                    }`}
                  >
                    {release.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {release.status === "Pending Review" && (
              <>
                <button
                  onClick={handleApprove}
                  disabled={isApproving || isDeclining}
                  className="px-6 py-2 bg-green-600 rounded-md text-white hover:bg-green-700 cursor-pointer disabled:opacity-50"
                >
                  {isApproving ? "Approving..." : "Approve Release"}
                </button>
                <button
                  onClick={handleDecline}
                  disabled={isApproving || isDeclining}
                  className="px-6 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 cursor-pointer disabled:opacity-50"
                >
                  {isDeclining ? "Declining..." : "Decline Release"}
                </button>
              </>
            )}
            <button
              className="px-6 py-2 bg-gray-600 rounded-md text-white hover:bg-gray-700 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <MiniTitle title="General Release Information" />
        <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
          <h2 className="text-2xl">General Release Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Title:</p>
                <p className="font-medium">{release.releaseTitle}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Type of Release:</p>
                <p className="font-medium">{release.typeOfRelease}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Primary Artist:</p>
                <p className="font-medium">{release.primaryArtist}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Date:</p>
                <p className="font-medium">{formatDate(release.releaseDate)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Genre:</p>
                <p className="font-medium">{release.genre || "N/A"}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Language:</p>
                <p className="font-medium">{release.language || "N/A"}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Explicit Content:</p>
                <p className="font-medium">
                  {release.isExplicitContent ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Status:</p>
                <p
                  className={`font-medium ${
                    release.status === "Approved"
                      ? "text-green-500"
                      : release.status === "Declined"
                        ? "text-red-500"
                        : "text-yellow-500"
                  }`}
                >
                  {release.status}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Pre-Order Date:</p>
                <p className="font-medium">
                  {release.preOrderDate
                    ? formatDate(release.preOrderDate)
                    : "N/A"}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Dolby Atmos:</p>
                <p className="font-medium">
                  {release.hasDolbyAtmosVersion ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Music Video:</p>
                <p className="font-medium">
                  {release.hasMusicVideo ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Submitted At:</p>
                <p className="font-medium">{formatDate(release.submittedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Artists Section */}
        {release.artists && release.artists.length > 0 && (
          <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
            <h2 className="text-2xl">Artist Information</h2>
            {release.artists.map((artist, index) => (
              <div key={artist.artistId}>
                {index > 0 && <hr className="my-4 border-[#044A20]" />}
                <h3 className="text-lg mb-4">
                  {artist.name} - {artist.role}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-start gap-2">
                      <p className="text-[#E5E5E5]">Name:</p>
                      <p className="font-medium">{artist.name}</p>
                    </div>
                    <div className="flex justify-start gap-2">
                      <p className="text-[#E5E5E5]">Role:</p>
                      <p className="font-medium">{artist.role}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-start gap-2">
                      <p className="text-[#E5E5E5]">Email:</p>
                      <p className="font-medium">{artist.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Territories Section */}
        {release.territories && release.territories.length > 0 && (
          <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
            <h2 className="text-2xl">Distribution Territories</h2>
            <div className="flex flex-wrap gap-2">
              {release.territories.map((territory, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#1E2A2F] rounded-lg text-sm"
                >
                  {territory}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Submitted By Section */}
        <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
          <h2 className="text-2xl">Submission Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Submitted By:</p>
                <p className="font-medium">{release.submittedBy.name}</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Email:</p>
                <p className="font-medium">{release.submittedBy.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Submission Date:</p>
                <p className="font-medium">{formatDate(release.submittedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        {release.additionalDetails && (
          <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
            <h2 className="text-2xl">Additional Details</h2>
            <p className="text-gray-300">{release.additionalDetails}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitDetails;
