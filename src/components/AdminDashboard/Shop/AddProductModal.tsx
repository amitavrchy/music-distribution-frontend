import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Loader2,
  X,
  Image as ImageIcon,
  Check,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  useCreateProductMutation,
  useUpdateProductMutation,
  Product,
} from "@/redux/features/commerce/commerceApi";

// Zod Schema
const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  image: z.any().optional(),
  isActive: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface AddProductModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct: Product | null;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

// Preview Card Component
const ProductPreview = ({
  name,
  price,
  imageUrl,
  stock,
}: {
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}) => (
  <div className="hidden lg:block sticky top-0 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm h-fit">
    <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
      <Info size={14} />
      Live Store Preview
    </h3>
    <div className="max-w-[240px] mx-auto">
      <div className="aspect-square bg-zinc-900 rounded-xl overflow-hidden mb-3 border border-white/5 group relative shadow-2xl">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-2">
            <ImageIcon size={32} />
            <span className="text-xs">No Image</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          {stock > 0 ? (
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
              In Stock: {stock}
            </span>
          ) : (
            <span className="bg-rose-500/20 text-rose-400 text-[10px] px-2 py-0.5 rounded-full border border-rose-500/30">
              Out of Stock
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h4 className="text-white text-sm font-semibold truncate w-32">
            {name || "Product Name"}
          </h4>
          <p className="text-sky-400 text-xs font-bold">${price || "0.00"}</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-blue-600/50 flex items-center justify-center text-white/50">
          <ImageIcon size={14} />
        </div>
      </div>
    </div>
  </div>
);

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onOpenChange,
  editingProduct,
}) => {
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [features, setFeatures] = React.useState<string[]>([]);
  const [currentFeature, setCurrentFeature] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: undefined,
      isActive: true,
    },
  });
  React.useEffect(() => {
    if (editingProduct) {
      form.reset({
        name: editingProduct.name,
        description: editingProduct.description || "",
        price: editingProduct.price,
        stock: editingProduct.stock,
        isActive: editingProduct.isActive,
      });
      setImagePreview(editingProduct.imageUrl || null);
      // Handle features
      if (editingProduct.features) {
        setFeatures(
          editingProduct.features.map((f: any) =>
            typeof f === "string" ? f : f.name,
          ),
        );
      } else {
        setFeatures([]);
      }
    } else {
      form.reset({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image: undefined,
        isActive: true,
      });
      setFeatures([]);
      setImagePreview(null);
    }
  }, [editingProduct, isOpen, form]);

  const handleAddFeature = () => {
    if (currentFeature.trim()) {
      setFeatures([...features, currentFeature.trim()]);
      setCurrentFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description || "");
      formData.append("price", values.price.toString());
      formData.append("stock", values.stock.toString());
      formData.append("isActive", String(values.isActive));

      if (features.length > 0) {
        features.forEach((feature) => {
          formData.append("features", feature);
        });
      }

      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      if (editingProduct) {
        await updateProduct({
          id: editingProduct.id,
          data: formData,
        }).unwrap();
        toast.success("Product updated successfully");
      } else {
        await createProduct(formData).unwrap();
        toast.success("Product created successfully");
      }

      onOpenChange(false);
      form.reset();
      setFeatures([]);
      setImagePreview(null);
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(
        error?.data?.message ||
          `Failed to ${editingProduct ? "update" : "create"} product`,
      );
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          form.reset();
          setFeatures([]);
        }
      }}
    >
      <DialogContent className="bg-zinc-950/90 border border-white/10 text-white sm:max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] no-scrollbar">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        <DialogHeader className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
              <Plus className="text-blue-400" size={20} />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                {editingProduct ? "Edit Product" : "Create New Product"}
              </DialogTitle>
              <DialogDescription className="text-gray-400 text-sm">
                {editingProduct
                  ? "Refine your product details to keep your inventory up to date."
                  : "Launch a new product into your digital storefront."}
              </DialogDescription>
            </div>
          </motion.div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 mt-6 relative z-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Basic Info Section */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    <span className="w-8 h-px bg-gray-800" />
                    Basic Information
                  </div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-xs">
                          Product Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Premium Athlete Hoodie"
                            className="bg-zinc-900/50 border-white/5 focus:border-blue-500/50 focus:ring-blue-500/20 text-white rounded-xl h-12 transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-400 text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-xs">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Craft a compelling story for this product..."
                            className="bg-zinc-900/50 border-white/5 focus:border-blue-500/50 focus:ring-blue-500/20 text-white rounded-xl min-h-[120px] transition-all resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-400 text-[10px]" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Pricing & Stock Section */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    <span className="w-8 h-px bg-gray-800" />
                    Pricing & Inventory
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 text-xs">
                            Price ($)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                $
                              </span>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="bg-zinc-900/50 border-white/5 focus:border-blue-500/50 focus:ring-blue-500/20 text-white rounded-xl h-12 pl-8 transition-all"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-rose-400 text-[10px]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 text-xs">
                            Stock Quantity
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              className="bg-zinc-900/50 border-white/5 focus:border-blue-500/50 focus:ring-blue-500/20 text-white rounded-xl h-12 transition-all"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-rose-400 text-[10px]" />
                        </FormItem>
                      )}
                    />
                  </div>
                </motion.div>

                {/* Media & Features Section */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    <span className="w-8 h-px bg-gray-800" />
                    Media & Features
                  </div>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange } }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-xs">
                          Product Image
                        </FormLabel>
                        <FormControl>
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="relative w-full aspect-video bg-zinc-900/50 border-2 border-dashed border-white/5 hover:border-blue-500/50 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group overflow-hidden"
                          >
                            {imagePreview ? (
                              <>
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <ImageIcon className="text-white" size={24} />
                                  <span className="text-white text-xs ml-2 font-medium">Change Image</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="p-3 bg-zinc-800 rounded-full group-hover:bg-blue-600/20 transition-colors">
                                  <ImageIcon className="text-gray-500 group-hover:text-blue-400" size={24} />
                                </div>
                                <div className="text-center">
                                  <p className="text-sm text-gray-400 font-medium">Click to upload image</p>
                                  <p className="text-[10px] text-gray-500">PNG, JPG or WebP (max 5MB)</p>
                                </div>
                              </>
                            )}
                            <input
                              type="file"
                              ref={fileInputRef}
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  onChange(file);
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setImagePreview(reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-rose-400 text-[10px]" />
                      </FormItem>
                    )}
                  />

                  {/* Enhanced Features Input */}
                  <div className="space-y-3">
                    <Label className="text-gray-300 text-xs">
                      Key Highlights / Features
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={currentFeature}
                        onChange={(e) => setCurrentFeature(e.target.value)}
                        placeholder="Add a standout feature..."
                        className="bg-zinc-900/50 border-white/5 focus:border-blue-500/50 focus:ring-blue-500/20 text-white rounded-xl h-11 transition-all"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddFeature();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl w-11 h-11 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {features.map((feature, idx) => (
                          <motion.span
                            key={`${feature}-${idx}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-2 group hover:bg-blue-500/20 transition-all font-medium"
                          >
                            <Check size={12} className="text-blue-500" />
                            {feature}
                            <button
                              type="button"
                              onClick={() => removeFeature(idx)}
                              className="hover:text-rose-400 text-blue-400/50 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3 p-4 bg-zinc-900/30 border border-white/5 rounded-xl transition-all hover:bg-zinc-900/50 cursor-pointer group">
                        <FormControl>
                          <Checkbox
                            id="active"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-colors"
                          />
                        </FormControl>
                        <div className="space-y-0.5 pointer-events-none">
                          <Label
                            htmlFor="active"
                            className="text-sm text-gray-200 cursor-pointer font-medium"
                          >
                            Public Visibility
                          </Label>
                          <p className="text-[10px] text-gray-500">
                            When enabled, this product will be live in your
                            storefront.
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </motion.div>
              </motion.div>

              <DialogFooter className="pt-6 border-t border-white/5 flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="px-6 h-12 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-8 h-12 rounded-xl shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 min-w-[180px]"
                >
                  {isCreating || isUpdating ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Check size={18} />
                  )}
                  <span>
                    {isCreating || isUpdating
                      ? editingProduct
                        ? "Saving..."
                        : "Publishing..."
                      : editingProduct
                        ? "Save Changes"
                        : "Publish Product"}
                  </span>
                </button>
              </DialogFooter>
            </form>
          </Form>

          {/* Right Side Preview */}
          <ProductPreview
            name={form.watch("name")}
            price={form.watch("price")}
            imageUrl={imagePreview || ""}
            stock={form.watch("stock")}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
