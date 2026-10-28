import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Product, PaginationMeta } from "@/redux/features/commerce/commerceApi";
import {
  FaEdit,
  FaTrash,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  isDeleting: boolean;
  meta?: PaginationMeta;
  onPageChange: (page: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoading,
  onEdit,
  onDelete,
  isDeleting,
  meta,
  onPageChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-[#0E2223] border border-gray-700 rounded-2xl overflow-hidden shadow-md">
        <div className="p-6 border-b border-gray-700 font-sans">
          <h2 className="text-xl font-semibold text-white">
            Inventory Overview
          </h2>
        </div>
        <div className="overflow-x-auto">
          <Table className="w-full text-white">
            <TableHeader>
              <TableRow className="text-gray-400 text-sm md:text-base border-gray-800">
                <TableHead className="px-6 py-4">Product</TableHead>
                <TableHead className="px-6 py-4 text-center">Price</TableHead>
                <TableHead className="px-6 py-4 text-center">Stock</TableHead>
                <TableHead className="px-6 py-4 text-center">Status</TableHead>
                <TableHead className="px-6 py-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20">
                    <FaSpinner
                      className="animate-spin mx-auto text-sky-400"
                      size={24}
                    />
                    <p className="text-gray-400 mt-2">Loading products...</p>
                  </TableCell>
                </TableRow>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-b border-gray-800 hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800 shrink-0 border border-gray-700">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://placehold.co/100x100?text=No+Image";
                            }}
                          />
                        </div>
                        <span className="font-medium text-white">
                          {product.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-sky-400 font-semibold">
                      ${product.price}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-gray-400">
                      {product.stock}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${product.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => onEdit(product)}
                          className="text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 rounded-full w-10 h-10 p-0 cursor-pointer"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => onDelete(product)}
                          disabled={isDeleting}
                          className="text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-full w-10 h-10 p-0 cursor-pointer"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-20 text-gray-500"
                  >
                    No products found in inventory.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <div className="flex flex-col md:flex-row items-center justify-between px-2 py-4 gap-4">
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="text-white font-medium">
              {(meta.page - 1) * meta.limit + 1}
            </span>{" "}
            to{" "}
            <span className="text-white font-medium">
              {Math.min(meta.page * meta.limit, meta.total)}
            </span>{" "}
            of <span className="text-white font-medium">{meta.total}</span>{" "}
            products
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(meta.page - 1)}
              disabled={meta.page <= 1 || isLoading}
              className="bg-[#0E2223] border-gray-700 text-white hover:bg-gray-800 disabled:opacity-50 h-9"
            >
              <FaChevronLeft className="mr-2 h-3 w-3" /> Previous
            </Button>
            <div className="flex items-center gap-1">
              {/* Simple page numbers (could be optimized for many pages) */}
              {[...Array(meta.totalPage)].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={meta.page === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(i + 1)}
                  disabled={isLoading}
                  className={`w-9 h-9 p-0 ${meta.page === i + 1 ? "bg-[#3A5CFF] text-white" : "bg-[#0E2223] border-gray-700 text-white hover:bg-gray-800"}`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(meta.page + 1)}
              disabled={meta.page >= meta.totalPage || isLoading}
              className="bg-[#0E2223] border-gray-700 text-white hover:bg-gray-800 disabled:opacity-50 h-9"
            >
              Next <FaChevronRight className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
