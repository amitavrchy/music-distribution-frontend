import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { FaPlus, FaSpinner } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  useCreateCouponMutation,
  useUpdateCouponMutation,
  Coupon,
} from "@/redux/features/commerce/commerceApi";

// Zod Schema
const couponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").toUpperCase(),
  type: z.enum(["PERCENT", "FIXED"]),
  value: z.coerce.number().positive("Value must be a positive number"),
  isActive: z.boolean().default(true),
  expiresAt: z.string().min(1, "Expiry date is required"),
});

type CouponFormValues = z.infer<typeof couponSchema>;

interface AddCouponModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingCoupon: Coupon | null;
  onSuccess: () => void;
}

const AddCouponModal: React.FC<AddCouponModalProps> = ({
  isOpen,
  onOpenChange,
  editingCoupon,
  onSuccess,
}) => {
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
  const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();

  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
      type: "PERCENT",
      value: 0,
      isActive: true,
      expiresAt: "",
    },
  });

  useEffect(() => {
    if (editingCoupon) {
      form.reset({
        code: editingCoupon.code,
        type: editingCoupon.type,
        value: editingCoupon.value,
        isActive: editingCoupon.isActive,
        expiresAt: new Date(editingCoupon.expiresAt)
          .toISOString()
          .split("T")[0],
      });
    } else {
      form.reset({
        code: "",
        type: "PERCENT",
        value: 0,
        isActive: true,
        expiresAt: "",
      });
    }
  }, [editingCoupon, isOpen, form]);

  const onSubmit = async (values: CouponFormValues) => {
    try {
      const payload = {
        ...values,
        expiresAt: new Date(values.expiresAt).toISOString(),
      };

      if (editingCoupon && editingCoupon.id) {
        await updateCoupon({ id: editingCoupon.id, data: payload }).unwrap();
        toast.success("Coupon updated successfully");
      } else {
        await createCoupon(payload).unwrap();
        toast.success("Coupon created successfully");
      }

      onSuccess();
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          `Failed to ${editingCoupon ? "update" : "create"} coupon`,
      );
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) form.reset();
      }}
    >
      <DialogContent className="bg-[#121E21] border border-gray-700 text-white sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {editingCoupon
              ? "Modify the details of the existing coupon."
              : "Add a new discount coupon to your store."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {/* Code */}
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Coupon Code *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. SUMMER50"
                        className="bg-[#253638] border-gray-600 text-white rounded-xl h-12 uppercase"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Type */}
              {/* <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Discount Type *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#253638] border-gray-600 text-white rounded-xl h-12">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#17171A] text-white border-gray-700">
                        <SelectItem value="PERCENT">Percentage (%)</SelectItem>
                        <SelectItem value="FIXED">Fixed Amount ($)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              /> */}

              {/* Value */}
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Discount Value *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="50"
                        className="bg-[#253638] border-gray-600 text-white rounded-xl h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Expiry Date */}
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Expires At *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="bg-[#253638] border-gray-600 text-white rounded-xl h-12 cursor-pointer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 p-4 bg-[#253638] border border-gray-600 rounded-xl h-12 space-y-0 mt-4">
                    <FormControl>
                      <Checkbox
                        id="active"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-gray-400 data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500"
                      />
                    </FormControl>
                    <Label
                      htmlFor="active"
                      className="text-sm text-gray-300 cursor-pointer"
                    >
                      Active
                    </Label>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gray-600 text-white bg-transparent hover:bg-gray-800 rounded-xl h-12 px-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreating || isUpdating}
                className="bg-[#3A5CFF] hover:bg-sky-600 text-white font-sans text-base px-10 h-12 rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                {isCreating || isUpdating ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaPlus />
                )}
                {isCreating || isUpdating
                  ? editingCoupon
                    ? "Updating..."
                    : "Creating..."
                  : editingCoupon
                    ? "Update Coupon"
                    : "Create Coupon"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCouponModal;
