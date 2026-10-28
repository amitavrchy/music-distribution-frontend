import React from "react";
import { FaTrash, FaEdit, FaSpinner, FaCopy, FaCheck } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Coupon } from "@/redux/features/commerce/commerceApi";

interface CouponTableProps {
  coupons: Coupon[];
  isLoading: boolean;
  onEdit: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
  isDeleting: boolean;
}

const CouponTable: React.FC<CouponTableProps> = ({
  coupons,
  isLoading,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(text);
      toast.success("Coupon code copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="bg-[#0E2223] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-sky-500/5 to-transparent">
        <h2 className="text-xl font-semibold text-white tracking-tight">Active Coupons</h2>
        <p className="text-gray-400 text-sm mt-1">Manage and monitor your store's promotional codes.</p>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full text-white">
          <TableHeader>
            <TableRow className="text-gray-400 text-xs uppercase tracking-wider border-white/5 bg-white/5">
              <TableHead className="px-6 py-4 font-medium">Coupon ID</TableHead>
              <TableHead className="px-6 py-4 font-medium">Coupon Code</TableHead>
              <TableHead className="px-6 py-4 font-medium">Type</TableHead>
              <TableHead className="px-6 py-4 font-medium">Value</TableHead>
              <TableHead className="px-6 py-4 font-medium">Status</TableHead>
              <TableHead className="px-6 py-4 font-medium">Expires At</TableHead>
              <TableHead className="px-6 py-4 text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-24">
                  <div className="flex flex-col items-center gap-3">
                    <FaSpinner className="animate-spin text-sky-400" size={32} />
                    <p className="text-gray-400 font-medium">Fetching coupons...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : coupons.length > 0 ? (
              coupons.map((coupon) => (
                <TableRow
                  key={coupon.id}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition-all duration-200 group"
                >
                  <TableCell className="px-6 py-5 text-xs font-mono text-gray-500">
                    <span className="bg-gray-800/50 px-2 py-1 rounded" title={String(coupon.id)}>
                      {String(coupon.id).substring(0, 8)}...
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sky-400 uppercase tracking-wide bg-sky-400/10 px-3 py-1 rounded-lg border border-sky-400/20">
                        {coupon.code}
                      </span>
                      <button
                        onClick={() => handleCopy(coupon.code || "")}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-sky-400 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                        title="Copy Code"
                      >
                        {copiedId === coupon.code ? <FaCheck className="text-green-400" /> : <FaCopy size={14} />}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {coupon.type}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span className="text-base font-semibold text-white">
                      {coupon.type === "PERCENT"
                        ? `${coupon.value}%`
                        : `$${coupon.value}`}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ring-1 ring-inset ${
                        coupon.isActive
                          ? "bg-green-500/10 text-green-400 ring-green-500/20"
                          : "bg-red-500/10 text-red-400 ring-red-500/20"
                      }`}
                    >
                      {coupon.isActive ? (
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Active
                        </span>
                      ) : (
                        "Inactive"
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-5 text-gray-400 text-sm font-medium">
                    {new Date(coupon.expiresAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </TableCell>
                  <TableCell className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                       <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(coupon)}
                        className="text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 rounded-xl h-9 w-9 p-0 cursor-pointer transition-all active:scale-95"
                      >
                        <FaEdit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(coupon)}
                        disabled={isDeleting}
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl h-9 w-9 p-0 cursor-pointer transition-all active:scale-95"
                      >
                        <FaTrash size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-32 text-gray-400 font-medium"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
                       <FaCopy size={24} className="text-gray-600" />
                    </div>
                    No coupons available. Click "Add Coupon" to create one.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CouponTable;
