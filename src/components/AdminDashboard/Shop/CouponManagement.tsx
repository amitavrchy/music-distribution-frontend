import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  useGetCouponsQuery,
  useDeleteCouponMutation,
  Coupon,
} from "@/redux/features/commerce/commerceApi";
import AddCouponModal from "./AddCouponModal";
import CouponTable from "./CouponTable";

const CouponManagement = () => {
  // API Hooks
  const { data: response, isLoading: isFetching } = useGetCouponsQuery();
  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

  const coupons = response || [];

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

  const openAddModal = () => {
    setEditingCoupon(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setIsAddModalOpen(true);
  };

  const confirmDelete = (coupon: Coupon) => {
    setCouponToDelete(coupon);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (couponToDelete && couponToDelete.id) {
      try {
        await deleteCoupon(couponToDelete.id).unwrap();
        toast.success(`Coupon "${couponToDelete.code}" deleted`);
        setIsDeleteDialogOpen(false);
        setCouponToDelete(null);
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete coupon");
      }
    }
  };

  return (
    <div className="space-y-10 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-white">
            Coupon Management
          </h1>
          <p className="text-gray-400 text-base">
            Create and manage discount coupons for your store.
          </p>
        </div>
        <Button
          onClick={openAddModal}
          className="bg-[#3A5CFF] hover:bg-sky-600 text-white font-sans text-base px-6 py-6 rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2"
        >
          Add Coupon <FaPlus />
        </Button>
      </div>

      {/* Modular Components */}
      <AddCouponModal
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        editingCoupon={editingCoupon}
        onSuccess={() => setEditingCoupon(null)}
      />

      <CouponTable
        coupons={coupons}
        isLoading={isFetching}
        onEdit={openEditModal}
        onDelete={confirmDelete}
        isDeleting={isDeleting}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#121E21] border border-gray-700 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Delete Coupon</DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              Are you sure you want to delete coupon{" "}
              <span className="text-white font-semibold">
                "{couponToDelete?.code}"
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

export default CouponManagement;
