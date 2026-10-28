import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import camera from "@/assets/icons/audio.svg";
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
import { useMemo, useState } from "react";
import { useGetAnalyticsAssetsQuery } from "@/redux/features/analytics/analyticsApi";

import { Skeleton } from "@/components/ui/skeleton";

interface TopAssetsDetailsProps {
  platform: string;
  period: string;
}

const AssetTableSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <TableRow key={i}>
        <TableCell className="px-2 md:px-4 py-3 flex items-center gap-2 md:gap-3">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32 md:w-48" />
            <Skeleton className="h-3 w-20 md:w-32" />
          </div>
        </TableCell>
        <TableCell className="text-center px-2 md:px-4 py-3">
          <Skeleton className="h-4 w-16 mx-auto" />
        </TableCell>
        <TableCell className="text-center px-2 md:px-4 py-3">
          <Skeleton className="h-4 w-16 mx-auto" />
        </TableCell>
        <TableCell className="text-center px-2 md:px-4 py-3">
          <Skeleton className="h-4 w-16 mx-auto" />
        </TableCell>
        <TableCell className="text-right pr-4 md:pr-8 py-3">
          <Skeleton className="h-4 w-16 ml-auto" />
        </TableCell>
      </TableRow>
    ))}
  </div>
);

export function TopAssetsDetails({ platform, period }: TopAssetsDetailsProps) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const {
    data: response,
    isLoading,
    isError,
  } = useGetAnalyticsAssetsQuery({
    page,
    limit,
    platform,
    period,
  });

  const metadata = response?.metadata;
  const filteredAssets = useMemo(() => {
    const assets = response?.data || [];
    return assets.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.artist.toLowerCase().includes(search.toLowerCase()),
    );
  }, [response, search]);
  if (isError) return <div className="text-white">Error loading assets.</div>;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left side - Title */}
        <h1 className="text-base sm:text-lg md:text-2xl font-medium text-white">
          Assets
        </h1>

        {/* Right side - Search + Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="w-full sm:w-72 md:w-96 relative">
            <Input
              className="w-full border h-12 bg-[#17171A] border-[#696B6F] rounded-[15px] px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm md:text-base"
              placeholder="Search assets"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
              <IoSearch className="w-4 h-4 md:w-5 md:h-5" />
            </span>
          </div>

          {/* Payment Status Filter */}
          <Select onValueChange={(val) => setLimit(Number(val))}>
            <SelectTrigger className="w-full  sm:w-[200px] md:w-[240px] h-12 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
              <SelectValue placeholder="Limit" className="text-gray-300 " />
            </SelectTrigger>

            <SelectContent className="border-none bg-[#17171A] text-white font-sans shadow-lg rounded-lg">
              <SelectGroup>
                <SelectItem
                  value="10"
                  className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                >
                  10 per page
                </SelectItem>
                <SelectItem
                  value="20"
                  className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                >
                  20 per page
                </SelectItem>
                <SelectItem
                  value="50"
                  className="hover:bg-[#131320] p-3 cursor-pointer"
                >
                  50 per page
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-4 w-full">
          {/* responsive part */}
          <div className="overflow-x-auto">
            <Table className="w-full min-w-[600px]">
              <TableHeader>
                <TableRow className="text-[#BDBDBD] text-sm md:text-base">
                  <TableHead className="w-[200px] px-2 md:px-4 py-2">
                    Title
                  </TableHead>
                  <TableHead className="text-center px-2 md:px-4 py-2">
                    Views
                  </TableHead>
                  <TableHead className="text-center px-2 md:px-4 py-2">
                    AD Supported
                  </TableHead>
                  <TableHead className="text-center px-2 md:px-4 py-2">
                    YouTube Premium
                  </TableHead>
                  <TableHead className="text-right pr-4 md:pr-8 py-2">
                    Total Earning
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-white">
                {isLoading ? (
                  <AssetTableSkeleton />
                ) : filteredAssets.length > 0 ? (
                  filteredAssets.map((item) => (
                    <TableRow key={item.assetId}>
                      <TableCell className="px-2 md:px-4 py-3 flex items-center gap-2 md:gap-3">
                        <img
                          src={item.thumbnailUrl || camera}
                          alt=""
                          className="h-5 w-5 md:h-7 md:w-7 object-cover rounded-md"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm md:text-base font-medium">
                            {item.title}
                          </span>
                          <span className="text-xs md:text-sm text-gray-500">
                            {item.artist}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base">
                        {item.totalViews.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base">
                        ${item.adSupported}
                      </TableCell>
                      <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base">
                        ${item.youtubePremium}
                      </TableCell>
                      <TableCell className="text-right pr-4 md:pr-8 py-3 text-sm md:text-base font-semibold">
                        ${item.totalEarnings}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-6 text-gray-400"
                    >
                      No assets found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      {metadata && metadata.totalPage > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-[#17171A] text-white rounded-lg disabled:opacity-50 cursor-pointer hover:bg-[#2563EB]"
          >
            Previous
          </button>
          <span className="text-white">
            Page {page} of {metadata.totalPage}
          </span>
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, metadata.totalPage))
            }
            disabled={page === metadata.totalPage}
            className="px-4 py-2 bg-[#17171A] text-white rounded-lg disabled:opacity-50 cursor-pointer hover:bg-[#2563EB]"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
