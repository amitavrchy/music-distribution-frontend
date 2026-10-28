/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { FiCopy, FiCheck } from "react-icons/fi";
import download from "@/assets/icons/photo.png";
import TableSkeleton, {
  ColumnConfig,
} from "@/components/Reuseable/TableSkeleton";
import { useAppSelector } from "@/redux/hooks/redux-hook";
const releasesTableColumns: ColumnConfig[] = [
  { header: "Title", type: "avatar-text", width: "250px" },
  { header: "UPC", type: "text" },
  { header: "Type", type: "text" },
  { header: "Release Date", type: "text" },
  { header: "Status", type: "badge" },
  { header: "Action", type: "text", align: "right" },
];

// UPC Cell Component with Border & Copy Feature
const UpcCell = ({ upc }: { upc: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(upc);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="flex items-center justify-between border border-gray-700 rounded-md px-3 py-1 w-max cursor-pointer">
      <span className="text-sm md:text-base text-gray-300">{upc}</span>
      <button
        onClick={handleCopy}
        className="p-1 rounded-md hover:bg-gray-800 transition ml-2"
        title="Copy UPC"
      >
        {copied ? (
          <FiCheck className="text-green-500 w-4 h-4" />
        ) : (
          <FiCopy className="text-gray-400 w-4 h-4" />
        )}
      </button>
    </div>
  );
};

interface AdminRealiseTableProps {
  data: any[];
  isLoading: boolean;
  isError: boolean;
}

// Main Table Component
const AdminRealiseTable: React.FC<AdminRealiseTableProps> = ({
  data,
  isLoading,
  isError,
}) => {
  const navigate = useNavigate();
  const role = useAppSelector((state) => state.auth.user?.role);

  const goToDetails = (id: string) => {
    navigate(
      role === "ADMIN"
        ? `/admin/catalog/releases/${id}`
        : role === "SUPER_ADMIN"
          ? `/super-admin-dashboard/releases/${id}`
          : `/client-dashboard/catalog/releases/${id}`,
    );
  };

  if (isLoading) {
    return <TableSkeleton columns={releasesTableColumns} />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load releases. Please try again.
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">No releases found.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-[1000px]">
        {/* Table Header */}
        <TableHeader>
          <TableRow className="text-[#BDBDBD] text-sm md:text-base">
            <TableHead className="w-[200px] px-4 py-2">Title</TableHead>
            <TableHead className="px-30 py-2">UPC</TableHead>
            <TableHead className="px-4 py-2">Type</TableHead>
            <TableHead className="px-4 py-2">Release Date</TableHead>
            <TableHead className="text-right px-4 py-2">Status</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody className="text-white">
          {data.map((product) => (
            <TableRow
              key={product._id || product.id}
              className="border-b border-gray-800 cursor-pointer hover:bg-[#131320]"
            >
              {/* Title & Artist */}
              <TableCell className="px-4 py-3 flex items-center gap-3">
                <img
                  src={product.image || download}
                  alt=""
                  className="h-6 w-6 md:h-8 md:w-8 rounded object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-medium">
                    {product.releaseTitle}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500">
                    {product.albumLevelArtistName}
                  </span>
                </div>
              </TableCell>

              {/* UPC with Border */}
              <TableCell className="px-10 py-3">
                <UpcCell upc={product.upc || "N/A"} />
              </TableCell>

              {/* Type */}
              <TableCell className="px-4 py-3 text-sm md:text-base text-gray-400">
                {product.typeOfRelease}
              </TableCell>

              {/* Release Date */}
              <TableCell className="px-4 py-3 text-sm md:text-base text-gray-400">
                {product.releaseDate
                  ? new Date(product.releaseDate).toLocaleDateString()
                  : "N/A"}
              </TableCell>

              {/* Status + Arrow */}
              <TableCell className="px-4 py-3 text-right text-sm md:text-base font-medium flex items-center justify-end gap-2">
                <span
                  onClick={() => goToDetails(product._id || product.id)}
                  className="bg-[#0E261F] text-[#01D449] px-4 py-2 rounded-full text-xs md:text-sm font-medium"
                >
                  {product.status}
                </span>
                <FaChevronRight className="w-4 h-4 text-[#3A5CFF]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminRealiseTable;
