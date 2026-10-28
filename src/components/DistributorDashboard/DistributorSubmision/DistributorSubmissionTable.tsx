import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useGetSubmissionsQuery } from "@/redux/features/distribution/distributionApi";
import { useState, useMemo } from "react";
import { SubmissionsQueryParams } from "@/redux/features/distribution/distribution.type";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";

function StatusBadge({ status }: { status: string }) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Pending Review":
      case "Pending":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Approved":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Declined":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div
      className={`flex h-10 px-[10px] justify-center items-center gap-[10px] rounded-md border text-sm font-medium ${getStatusStyles(
        status,
      )}`}
    >
      {status}
    </div>
  );
}

export function DistributorSubmissionTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [statusFilter, setStatusFilter] =
    useState<SubmissionsQueryParams["status"]>();
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useGetSubmissionsQuery({
    page,
    limit,
    status: statusFilter,
  });

  // Client-side filtering for type and search
  const filteredSubmissions = useMemo(() => {
    if (!data?.data) return [];

    let filtered = [...data.data];

    // Filter by type
    if (typeFilter) {
      filtered = filtered.filter(
        (submission) =>
          submission.type.toLowerCase() === typeFilter.toLowerCase(),
      );
    }

    // Filter by search query (artist or title)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (submission) =>
          submission.artist.toLowerCase().includes(query) ||
          submission.title.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [data?.data, typeFilter, searchQuery]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (isError) {
    return (
      <div className="w-full mt-[48px]">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-400 text-lg">Error loading submissions</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-[48px]">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 w-full mb-6">
        {/* Search Input */}
        <div className="w-full lg:flex-1 relative">
          <Input
            className="w-full min-w-[200px] h-12 px-4 pr-12 rounded-[15px] border border-[#696B6F] bg-[#17171A] text-sm md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            placeholder="Search by artist or title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute inset-y-0 right-4 flex items-center text-gray-400 cursor-pointer">
            <IoSearch className="w-5 h-5 md:w-6 md:h-6" />
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Status */}
          <Select
            value={statusFilter || "all"}
            onValueChange={(value) =>
              setStatusFilter(
                value === "all"
                  ? undefined
                  : (value as SubmissionsQueryParams["status"]),
              )
            }
          >
            <SelectTrigger className="w-full sm:w-48 md:w-56 lg:w-52 h-12 rounded-[15px] border border-[rgba(226,232,240,0.3)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
              <SelectValue placeholder="All Status" className="text-gray-300" />
            </SelectTrigger>
            <SelectContent className="border-none bg-[#17171A] text-white rounded-lg shadow-lg">
              <SelectGroup>
                <SelectItem
                  value="all"
                  className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                >
                  All Status
                </SelectItem>
                <SelectItem
                  value="PendingReview"
                  className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                >
                  Pending Review
                </SelectItem>
                <SelectItem
                  value="Approved"
                  className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                >
                  Approved
                </SelectItem>
                <SelectItem
                  value="Declined"
                  className="hover:bg-[#131320] p-3 cursor-pointer"
                >
                  Declined
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Type */}
          <Select
            value={typeFilter || "all"}
            onValueChange={(value) =>
              setTypeFilter(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-full sm:w-48 md:w-56 lg:w-52 h-12 rounded-[15px] border border-[rgba(226,232,240,0.3)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
              <SelectValue placeholder="All Type" className="text-gray-300" />
            </SelectTrigger>
            <SelectContent className="border-none bg-[#17171A] text-white rounded-lg shadow-lg">
              <SelectGroup>
                <SelectItem
                  value="all"
                  className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                >
                  All Type
                </SelectItem>
                <SelectItem
                  value="single"
                  className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                >
                  Single
                </SelectItem>
                <SelectItem
                  value="ep"
                  className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                >
                  EP
                </SelectItem>
                <SelectItem
                  value="album"
                  className="hover:bg-[#131320] p-3 cursor-pointer"
                >
                  Album
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#3a4553]">
              <th className="text-left py-4 px-6 text-[#979797] font-medium text-sm">
                Artist
              </th>
              <th className="text-left py-4 px-6 text-[#979797] font-medium text-sm">
                Release
              </th>
              <th className="text-left py-4 px-6 text-[#979797] font-medium text-sm">
                Submission Date
              </th>
              <th className="text-left py-4 px-6 text-[#979797] font-medium text-sm">
                Type
              </th>
              <th className="text-left py-4 px-6 text-[#979797] font-medium text-sm">
                Status
              </th>
              <th className="text-left py-4 px-6 text-[#979797] font-medium text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => (
                <tr
                  key={submission.releaseId}
                  className="border-b border-[#3a4553] hover:bg-[#2a3441]/50 transition-colors"
                >
                  <td className="text-base py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg"
                          alt={submission.artist}
                        />
                        <AvatarFallback className="bg-[#3a4553] text-gray-300 text-xs">
                          {submission.artist
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-300 font-medium">
                        {submission.artist}
                      </span>
                    </div>
                  </td>
                  <td className="text-base py-4 px-6 text-gray-300">
                    {submission.title}
                  </td>
                  <td className="text-base py-4 px-6 text-gray-400">
                    {formatDate(submission.submittedAt)}
                  </td>
                  <td className="text-base py-4 px-6 text-gray-300">
                    {submission.type}
                  </td>
                  <td className="text-base py-4 px-6">
                    <StatusBadge status={submission.status} />
                  </td>
                  <td className="text-base py-4 px-6">
                    <Link
                      to={`/distributor-dashboard/submissions/${submission.releaseId}`}
                    >
                      <Button className="text-base text-blue-400 hover:text-blue-300 p-0 h-auto font-normal cursor-pointer">
                        Details <FaChevronRight />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400">
                  No submissions found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {data?.metadata && (
          <div className="p-6 flex items-center justify-between border-t border-[#3a4553]">
            <div className="text-gray-400 text-sm">
              Page {data.metadata.page} of {data.metadata.totalPage} (
              {data.metadata.total} total)
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="bg-[#17171A] border border-[#696B6F] text-white hover:bg-[#2a3441] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronLeft /> Previous
              </Button>
              <Button
                onClick={() =>
                  setPage((p) => Math.min(data.metadata.totalPage, p + 1))
                }
                disabled={page === data.metadata.totalPage}
                className="bg-[#17171A] border border-[#696B6F] text-white hover:bg-[#2a3441] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next <FaChevronRight />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
