/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import fannel from "@/assets/icons/fanel.svg";
import short from "@/assets/icons/short.svg";
import { RiDownloadLine } from "react-icons/ri";
import TableHere from "./TableHere";
import { useGetAllReleasesQuery } from "@/redux/features/newRelease/newReleaseApi";
import Pagination from "@/components/Reuseable/Pagination";
import { exportToExcel } from "@/utils/exportUtils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TableSkeleton, {
  ColumnConfig,
} from "@/components/Reuseable/TableSkeleton";

const ReleasesTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const { data, isLoading } = useGetAllReleasesQuery({
    limit: 1000,
    page: 1, // Always fetch first page of large batch for client-side ops
  });

  const processedData = useMemo(() => {
    if (!data?.data) return [];

    let result = [...data.data];

    // 1. Filtering by Search
    if (search) {
      const searchTerm = search.toLowerCase();
      result = result.filter(
        (item: any) =>
          (item?.releaseTitle &&
            item.releaseTitle.toLowerCase().includes(searchTerm)) ||
          (item?.artistName &&
            item.artistName.toLowerCase().includes(searchTerm)) ||
          (item?.upc && item.upc.toLowerCase().includes(searchTerm)),
      );
    }

    // 2. Filtering by Status
    if (statusFilter !== "All") {
      result = result.filter((item: any) => item.status === statusFilter);
    }

    // 3. Sorting
    if (sortConfig) {
      result.sort((a: any, b: any) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data?.data, search, statusFilter, sortConfig]);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return processedData.slice(startIndex, startIndex + itemsPerPage);
  }, [processedData, page, itemsPerPage]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleExport = () => {
    const exportHeaders = {
      releaseTitle: "Title",
      artistName: "Artist",
      typeOfRelease: "Type",
      releaseDate: "Release Date",
      status: "Status",
      upc: "UPC",
    };

    const dataToExport = processedData.map((item: any) => ({
      ...item,
      releaseDate: new Date(item.releaseDate).toLocaleDateString(),
    }));

    exportToExcel(
      dataToExport,
      `Releases_Export_${new Date().toISOString().split("T")[0]}.xlsx`,
      exportHeaders,
    );
  };

  const releasesTableColumns: ColumnConfig[] = [
    { header: "Title", type: "avatar-text", width: "250px" },
    { header: "Type", type: "text" },
    { header: "Release Date", type: "text" },
    { header: "Status", type: "badge" },
    { header: "Action", type: "text", align: "right" },
  ];

  return (
    <div className="space-y-9">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Left: Titles */}
        <div className="space-y-2">
          <h1 className="text-sm md:text-base font-sans text-gray-400">
            Catalog
          </h1>
          <h2 className="text-xl md:text-2xl font-sans font-semibold text-white">
            Releases
          </h2>
        </div>

        {/* Right: Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="w-full sm:w-72 md:w-96 relative">
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full border h-12 bg-[#171719] border-[#696B6F] rounded-[15px] px-3 py-2 pr-10 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="Search releases..."
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
              <IoSearch className="w-4 h-4 md:w-5 md:h-5" />
            </span>
          </div>

          {/* Filter Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-[#171719] flex h-12 px-3 justify-center items-center rounded-[15px] border border-slate-200/30 gap-2 hover:bg-[#1F1F21] transition cursor-pointer">
                <img
                  src={fannel}
                  alt="Filter Icon"
                  className="w-5 h-5 md:w-6 md:h-6"
                />
                <span className="text-sm md:text-base font-sans">
                  {statusFilter === "All" ? "Filter" : statusFilter}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#171719] border-[#696B6F] text-white">
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("All");
                  setPage(1);
                }}
              >
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("Approved");
                  setPage(1);
                }}
              >
                Approved
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("Draft");
                  setPage(1);
                }}
              >
                Draft
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("Pending Review");
                  setPage(1);
                }}
              >
                Pending Review
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-[#171719] flex h-12 px-3 justify-center items-center rounded-[15px] border border-slate-200/30 gap-2 hover:bg-[#1F1F21] transition cursor-pointer">
                <img
                  src={short}
                  alt="Sort Icon"
                  className="w-5 h-5 md:w-6 md:h-6"
                />
                <span className="text-sm md:text-base font-sans">Sort</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#171719] border-[#696B6F] text-white">
              <DropdownMenuItem onClick={() => handleSort("releaseTitle")}>
                Title{" "}
                {sortConfig?.key === "releaseTitle" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("releaseDate")}>
                Release Date{" "}
                {sortConfig?.key === "releaseDate" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("typeOfRelease")}>
                Type{" "}
                {sortConfig?.key === "typeOfRelease" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={processedData.length === 0}
            className="bg-[#3A5CFF] flex h-12 px-3 justify-center items-center rounded-[15px] border border-slate-200/30 gap-2 hover:bg-[#2E4AE0] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RiDownloadLine className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-sm md:text-base font-sans">Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-4 w-full">
          {isLoading ? (
            <TableSkeleton columns={releasesTableColumns} />
          ) : (
            <>
              <TableHere releases={paginatedData} />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>
                    Showing{" "}
                    {processedData.length > 0
                      ? (page - 1) * itemsPerPage + 1
                      : 0}{" "}
                    to {Math.min(page * itemsPerPage, processedData.length)} of{" "}
                    {processedData.length} entries
                  </span>

                  <div className="flex items-center gap-2">
                    <span>Show</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setPage(1);
                      }}
                      className="bg-[#171719] border border-[#696B6F] rounded px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {[10, 20, 50, 100].map((val) => (
                        <option key={val} value={val}>
                          {val}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Pagination
                  currentPage={page}
                  totalPage={totalPages || 1}
                  onPageChange={(newPage) => setPage(newPage)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReleasesTable;
