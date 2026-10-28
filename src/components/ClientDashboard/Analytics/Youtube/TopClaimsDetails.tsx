import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useGetAnalyticsClaimsQuery } from "@/redux/features/analytics/analyticsApi";

import { Skeleton } from "@/components/ui/skeleton";

interface TopClaimsDetailsProps {
  platform: string;
  period: string;
}

const ClaimTableSkeleton = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <TableRow key={i}>
        <TableCell className="px-2 md:px-4 py-3 flex items-center gap-2 md:gap-3">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32 md:w-44" />
            <Skeleton className="h-3 w-20 md:w-28" />
          </div>
        </TableCell>
        <TableCell className="text-center px-2 md:px-4 py-3">
          <Skeleton className="h-4 w-12 mx-auto" />
        </TableCell>
        <TableCell className="text-center px-2 md:px-4 py-3">
          <Skeleton className="h-4 w-12 mx-auto" />
        </TableCell>
        <TableCell className="text-center px-2 md:px-4 py-3">
          <Skeleton className="h-4 w-12 mx-auto" />
        </TableCell>
        <TableCell className="text-right pr-4 md:pr-8 py-3">
          <Skeleton className="h-4 w-16 ml-auto" />
        </TableCell>
      </TableRow>
    ))}
  </>
);

export function TopClaimsDetails({ platform, period }: TopClaimsDetailsProps) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: response,
    isLoading,
    isError,
  } = useGetAnalyticsClaimsQuery({
    page,
    limit,
    platform,
    period,
  });

  const claims = response?.data || [];
  const metadata = response?.metadata;

  if (isError) return <div className="text-white">Error loading claims.</div>;

  return (
    <div className=" space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-lg md:text-2xl font-medium text-white">Claims</h1>

        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row lg:justify-end items-stretch gap-4 w-full">
          {/* Limit Filter */}
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

      <div className="overflow-x-auto">
        <Table className="w-full min-w-[600px]">
          <TableHeader>
            <TableRow className="text-[#BDBDBD]">
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
              <ClaimTableSkeleton />
            ) : claims.length > 0 ? (
              claims.map((item) => (
                <TableRow key={item.claimId}>
                  <TableCell className="px-2 md:px-4 py-3 flex items-center gap-2 md:gap-3">
                    <img
                      src={item.thumbnailUrl}
                      alt=""
                      className="h-5 w-5 md:h-7 md:w-7 object-cover rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-sm text-gray-500">
                        {item.claimant}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center px-2 md:px-4 py-3">
                    {item.views.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center px-2 md:px-4 py-3">
                    ${item.adSupported}
                  </TableCell>
                  <TableCell className="text-center px-2 md:px-4 py-3">
                    ${item.youtubePremium}
                  </TableCell>
                  <TableCell className="text-right pr-4 md:pr-8 py-3 font-semibold">
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
                  No claims found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
