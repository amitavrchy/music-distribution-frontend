/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaCopy, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetSubmissionsQuery } from "@/redux/features/distribution/distributionApi";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";
import ComponentError from "@/components/Reuseable/ComponentError";
import { useNavigate } from "react-router-dom";
import albumart from "@/assets/pic7.png";
const ClientSubmit = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading, error } = useGetSubmissionsQuery({ page, limit });

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (error || !data?.data) {
    return <ComponentError />;
  }

  const submissions = data.data;
  const metadata = data.metadata;

  const totalSubmissions = metadata.total;
  const approvedCount = submissions.filter(
    (s: any) => s.status === "Approved",
  ).length; // Note: This only counts items on current page, should ideally come from backend summary or be calculated differently if needed.
  const pendingCount = submissions.filter(
    (s: any) => s.status === "Pending Review",
  ).length;
  const declinedCount = submissions.filter(
    (s: any) => s.status === "Declined",
  ).length;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-500";
      case "Pending Review":
        return "text-yellow-500";
      case "Declined":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div>
        <p className="text-gray-400 text-sm">Catalog</p>
        <h1 className="text-3xl font-medium text-white">Submit</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0B1D21] border border-[#2F3B40] rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Total Submission</p>
          <p className="text-4xl font-bold text-blue-500">{totalSubmissions}</p>
        </div>
        <div className="bg-[#0B1D21] border border-[#2F3B40] rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Approved</p>
          <p className="text-4xl font-bold text-green-500">{approvedCount}</p>
        </div>
        <div className="bg-[#0B1D21] border border-[#2F3B40] rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Pending</p>
          <p className="text-4xl font-bold text-yellow-500">{pendingCount}</p>
        </div>
        <div className="bg-[#0B1D21] border border-[#2F3B40] rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Declined</p>
          <p className="text-4xl font-bold text-red-500">{declinedCount}</p>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-[#0B1D21] border border-[#2F3B40] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="border-b border-[#2F3B40]">
                <th className="text-left p-4 text-gray-400 font-medium">
                  Title
                </th>
                <th className="text-left p-4 text-gray-400 font-medium">UPC</th>
                <th className="text-left p-4 text-gray-400 font-medium">
                  Type
                </th>
                <th className="text-left p-4 text-gray-400 font-medium">
                  Release Date
                </th>
                <th className="text-left p-4 text-gray-400 font-medium">
                  Status
                </th>
                <th className="text-left p-4 text-gray-400 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission: any) => (
                <tr
                  key={submission.releaseId}
                  className="border-b border-[#1A2F35] hover:bg-[#0D2329] transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={albumart}
                        alt=""
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate">
                          {submission.title}
                        </p>
                        <p className="text-gray-400 text-xs sm:text-sm truncate">
                          {submission.artist}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">N/A</span>
                      <button
                        onClick={() => copyToClipboard("N/A")}
                        className="text-gray-400 hover:text-blue-500 transition-colors opacity-50 cursor-not-allowed"
                        title="UPC not available"
                        disabled
                      >
                        <FaCopy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{submission.type}</td>
                  <td className="p-4 text-gray-300">
                    {formatDate(submission.releaseDate)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`font-medium ${getStatusColor(submission.status)}`}
                    >
                      {submission.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/catalog/submit/${submission.releaseId}`,
                        )
                      }
                      className="text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 gap-4 border-t border-[#2F3B40] bg-[#0B1D21]">
          <div className="text-gray-400 text-sm">
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, metadata.total)} of {metadata.total}{" "}
            submissions
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                page === 1
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-[#1E2A2F] text-white hover:bg-[#2A3A41]"
              }`}
            >
              <FaChevronLeft className="w-3 h-3" />
              Previous
            </button>
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-medium bg-[#1E2A2F] px-3 py-1.5 rounded-lg border border-[#304240]">
                {page}
              </span>
              <span className="text-gray-400 text-sm">
                of {metadata.totalPage}
              </span>
            </div>
            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, metadata.totalPage))
              }
              disabled={page === metadata.totalPage}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                page === metadata.totalPage
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-[#1E2A2F] text-white hover:bg-[#2A3A41]"
              }`}
            >
              Next
              <FaChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSubmit;
