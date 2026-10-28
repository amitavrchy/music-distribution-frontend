import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FaPlus, FaSearch, FaFilter } from "react-icons/fa";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  Product,
} from "@/redux/features/commerce/commerceApi";
import AddProductModal from "./AddProductModal";
import ProductTable from "./ProductTable";
import { toast } from "sonner";

const ShopManagement = () => {
  // Pagination and Filter states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // API Hooks
  const queryParams = {
    page,
    limit,
    search: search || undefined,
    isActive: statusFilter === "all" ? undefined : statusFilter === "active",
  };
  const { data: response, isLoading: isFetching } =
    useGetProductsQuery(queryParams);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const products = response?.data || [];
  const meta = response?.meta;

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1); // Reset to first page on filter change
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  const confirmDelete = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete.id).unwrap();
        toast.success(`Product "${productToDelete.name}" deleted`);
        setIsDeleteDialogOpen(false);
        setProductToDelete(null);
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete product");
      }
    }
  };

  return (
    <div className="space-y-10 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-white">
            Product Management
          </h1>
          <p className="text-gray-400 text-base">
            Create and manage products for your online store.
          </p>
        </div>
        <Button
          onClick={openAddModal}
          className="bg-[#3A5CFF] hover:bg-sky-600 text-white font-sans text-base px-6 py-6 rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2"
        >
          Add Product <FaPlus />
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-sky-400 transition-colors" />
          <Input
            placeholder="Search products by name..."
            value={search}
            onChange={handleSearchChange}
            className="bg-[#0E2223] border-gray-700 text-white pl-11 h-12 rounded-xl focus:ring-sky-500 focus:border-sky-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="bg-[#0E2223] border-gray-700 text-white h-12 w-full md:w-[180px] rounded-xl outline-none">
              <div className="flex items-center gap-2">
                {" "}
                <FaFilter className="text-gray-500 hidden md:block" />{" "}
                <SelectValue placeholder="All Status" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#17171A] text-white border-gray-700">
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Modular Components */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        editingProduct={editingProduct}
      />

      <ProductTable
        products={products}
        isLoading={isFetching}
        onEdit={handleEdit}
        onDelete={confirmDelete}
        isDeleting={isDeleting}
        meta={meta}
        onPageChange={setPage}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#121E21] border border-gray-700 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Delete Product</DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              Are you sure you want to delete product{" "}
              <span className="text-white font-semibold">
                "{productToDelete?.name}"
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-transparent border-gray-600 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopManagement;
