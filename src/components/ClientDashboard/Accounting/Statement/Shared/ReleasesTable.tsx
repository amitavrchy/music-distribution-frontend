import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FiCopy, FiCheck } from "react-icons/fi";
import download from "@/assets/icons/download.svg";

import { ReleaseDetail } from "@/redux/features/accounting/accounting.type";

// UPC Cell Component with Copy Feature
const UpcCell = ({ upc }: { upc: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upc);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 cursor-pointer">
      <span className="text-sm md:text-base text-gray-400">{upc}</span>
      <button
        onClick={handleCopy}
        className="p-1 rounded-md hover:bg-gray-100 transition cursor-pointer"
        title="Copy UPC"
      >
        {copied ? (
          <FiCheck className="text-green-500 w-4 h-4" />
        ) : (
          <FiCopy className="text-gray-500 w-4 h-4" />
        )}
      </button>
    </div>
  );
};

// Main Table
const ReleasesTable = ({ data }: { data: ReleaseDetail[] }) => {
  if (data.length === 0) {
    return <div className="text-center">No data available</div>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
      <div className="xl:col-span-4 w-full">
        {/* re-part */}
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1000px]">
            {/* Table Header */}
            <TableHeader>
              <TableRow className="text-[#BDBDBD] text-sm md:text-base">
                <TableHead className="w-[200px] px-2 md:px-4 py-2">
                  Title
                </TableHead>
                <TableHead className="text-center px-2 md:px-4 py-2">
                  UPC
                </TableHead>
                <TableHead className="text-right pr-4 md:pr-8 py-2">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="text-white">
              {data?.map((release, index) => (
                <TableRow key={index}>
                  {/* Title & Artist */}
                  <TableCell className="px-2 md:px-4 py-3 flex items-center gap-2 md:gap-3">
                    <img
                      src={release.image || download}
                      alt=""
                      className="h-5 w-5 md:h-7 md:w-7 rounded"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm md:text-base font-medium">
                        {release.releaseTitle}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500">
                        {release.mainArtist}
                      </span>
                    </div>
                  </TableCell>

                  {/* UPC with Copy Button */}
                  <TableCell className="text-center px-2 md:px-4 py-3">
                    <UpcCell upc={release.upc} />
                  </TableCell>

                  {/* Payment Amount */}
                  <TableCell className="text-right pr-4 md:pr-8 py-3 text-sm md:text-base font-medium">
                    ${release.amount} USD
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ReleasesTable;
