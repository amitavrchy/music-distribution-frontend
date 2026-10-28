import { useState, useMemo } from "react";
import SplitSheetCard, { SplitSheetAPI } from "./SplitSheetCard";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { useGetAllSplitSheetsQuery } from "@/redux/features/newRelease/newReleaseApi";
import { useGetAdminSplitSheetsQuery } from "@/redux/features/admin/adminApi";
import { useAppSelector } from "@/redux/hooks/redux-hook";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CardSkeleton from "@/components/Reuseable/CardSkeleton";

const SplitSheetGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const role = useAppSelector((state) => state.auth.user?.role);
  const isAdmin =
    role === "ADMIN" || role === "SUPER_ADMIN" || role === "DISTRIBUTOR";

  const {
    data: clientResponse,
    isLoading: isLoadingClient,
    isError: isErrorClient,
  } = useGetAllSplitSheetsQuery({}, { skip: isAdmin });

  const {
    data: adminResponse,
    isLoading: isLoadingAdmin,
    isError: isErrorAdmin,
  } = useGetAdminSplitSheetsQuery({ page, limit }, { skip: !isAdmin });

  const isLoading = isAdmin ? isLoadingAdmin : isLoadingClient;
  const isError = isAdmin ? isErrorAdmin : isErrorClient;
  const response = isAdmin ? adminResponse : clientResponse;

  const metadata = isAdmin ? adminResponse?.metadata : null;

  const filteredSplitSheets = useMemo(() => {
    const sheets: SplitSheetAPI[] = response?.data || [];
    const term = searchTerm.toLowerCase();
    return sheets.filter((split) => {
      return (
        split.songTitle.toLowerCase().includes(term) ||
        (split.isrc && split.isrc.toLowerCase().includes(term))
      );
    });
  }, [response?.data, searchTerm]);

  if (isLoading) {
    return <CardSkeleton count={limit} />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        <p>Failed to load split sheets. Please try again later.</p>
      </div>
    );
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-10">
      {/* Search Input */}
      <div className="w-full sm:w-72 md:w-96 lg:w-[736px] relative">
        <Input
          className="w-full border h-12 bg-[#17171A] border-[#696B6F] rounded-[15px] px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm md:text-base border-none"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
          <IoSearch className="w-4 h-4 md:w-5 md:h-5" />
        </span>
      </div>

      {/* Grid */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSplitSheets.map((split) => (
            <SplitSheetCard key={split.splitId} split={split} />
          ))}
          {filteredSplitSheets.length === 0 && (
            <p className="col-span-full text-center text-gray-400">
              No split sheets found.
            </p>
          )}
        </div>

        {/* Pagination Controls (Admin only) */}
        {isAdmin && metadata && metadata.totalPage > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4">
            <div className="text-gray-400 text-sm order-2 sm:order-1">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, metadata.total)} of {metadata.total} split
              sheets
            </div>
            <div className="flex items-center gap-4 order-1 sm:order-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  page === 1
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-[#3A5CFF] text-white hover:bg-blue-600"
                }`}
              >
                <FaChevronLeft className="w-3 h-3" />
                Previous
              </button>
              <div className="text-white text-sm font-medium">
                Page {page} of {metadata.totalPage}
              </div>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === metadata.totalPage}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  page === metadata.totalPage
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-[#3A5CFF] text-white hover:bg-blue-600"
                }`}
              >
                Next
                <FaChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitSheetGrid;
