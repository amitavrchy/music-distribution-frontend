import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Minus,
  Plus,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import img from "@/assets/image44.png";
import ShippingDialog from "@/components/ShippingDialog";
import { useCart } from "@/contexts/CartContext";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { setCartItemId } from "@/redux/features/cart/cartSlice";
import { useCurrentUser } from "@/hooks/useCurrentUse";
import {
  useAddItemToCartMutation,
  useGetProductByIdQuery,
} from "@/redux/features/commerce/commerceApi";
import RelatedProducts from "./RelatedProducts";

const ProductDetailPage: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [isShippingDialogOpen, setIsShippingDialogOpen] = useState(false);
  const { openCart } = useCart();
  const [loadingProduct, setLoadingProduct] = useState<string | number | null>(
    null,
  );
  const [showFeedback, setShowFeedback] = useState<string | number | null>(
    null,
  );

  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id as string, {
    skip: !id,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useCurrentUser();
  const [addItemToSync] = useAddItemToCartMutation();

  const handleAddToCart = async () => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    if (product?.id) {
      setLoadingProduct(product.id);
      try {
        const response = await addItemToSync({
          userId: user.id,
          productId: product.id.toString(),
          quantity: quantity,
        }).unwrap();

        if (response.id) {
          dispatch(setCartItemId({ id: product.id, cartItemId: response.id }));
        }

        // Show feedback
        setShowFeedback(product.id);
        setTimeout(() => setShowFeedback(null), 1500);
      } catch (error) {
        console.error("Failed to sync cart item with API:", error);
      } finally {
        setLoadingProduct(null);
      }
    }

    openCart(); // Open cart modal after adding
  };

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") setQuantity((prev) => prev + 1);
    else if (type === "decrease" && quantity > 1)
      setQuantity((prev) => prev - 1);
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const infoVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return (
      <div className="w-full min-w-0 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-pulse">
          {/* Image skeleton */}
          <div className="lg:w-1/2">
            <div className="bg-gray-800 rounded-2xl w-full aspect-square max-h-[500px]" />
          </div>
          {/* Info skeleton */}
          <div className="lg:w-1/2 space-y-5">
            <div className="h-8 w-3/4 bg-gray-800 rounded-lg" />
            <div className="h-6 w-1/4 bg-gray-800 rounded-lg" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-800 rounded" />
              <div className="h-4 w-5/6 bg-gray-800 rounded" />
              <div className="h-4 w-4/6 bg-gray-800 rounded" />
            </div>
            <div className="h-12 w-full bg-gray-800 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-red-500 px-4 text-center">
        Product not found or error loading.
      </div>
    );
  }

  return (
    <>
      <title>{product.name} - Product Details</title>

      <div className="w-full min-w-0">
        <div className="py-6 sm:py-12">
          {/* Product Details Section */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-10 lg:mb-20">

            {/* Left: Main Product Image */}
            <motion.div
              className="w-full lg:w-1/2"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-gray-900/50 rounded-2xl p-3 sm:p-6 relative group">
                <img
                  src={product.imageUrl || img}
                  alt={product.name}
                  className="w-full h-auto max-h-[400px] sm:max-h-[500px] object-cover rounded-xl"
                />

                {/* Hover overlay — desktop only */}
                <div className="hidden sm:flex absolute inset-0 items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all duration-300 rounded-2xl opacity-0 group-hover:opacity-100">
                  <button
                    onClick={handleAddToCart}
                    className="p-4 bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300"
                    title="Add To Cart"
                  >
                    <ShoppingCart size={32} className="text-white" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              className="w-full lg:w-1/2"
              variants={infoVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* sticky only works well in row-layout on lg+ */}
              <div className="lg:sticky lg:top-24 space-y-5 sm:space-y-6">

                {/* Name + Price */}
                <div>
                  <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-200 leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-300">
                    Description
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                    {product.description ||
                      "Experience ultimate comfort and style with our premium essential tee. Made from 100% organic cotton, this tee features a modern fit and sustainable construction. Perfect for everyday wear or special occasions."}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-base sm:text-lg text-gray-300 font-semibold mb-2">
                    Features
                  </h3>
                  <ul className="text-gray-400 space-y-1.5 text-sm sm:text-base">
                    {product.features && product.features.length > 0 ? (
                      product.features.map((feature: any, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-2 h-2 shrink-0 bg-emerald-400 rounded-full" />
                          {typeof feature === "string" ? feature : feature.name}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 shrink-0 bg-emerald-400 rounded-full" />
                          Premium organic cotton fabric
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 shrink-0 bg-emerald-400 rounded-full" />
                          Sustainable and eco-friendly
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 shrink-0 bg-emerald-400 rounded-full" />
                          Modern tailored fit
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 shrink-0 bg-emerald-400 rounded-full" />
                          Machine washable
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800" />

                {/* Quantity + Add to Cart */}
                <div className="space-y-4">
                  {/* Row: stepper + button */}
                  <div className="flex items-center gap-3">
                    {/* Quantity stepper — fixed width, touch-friendly */}
                    <div className="flex items-center bg-gray-800 rounded-full p-1 border border-gray-700 shrink-0">
                      <button
                        onClick={() => handleQuantityChange("decrease")}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors text-blue-400 cursor-pointer active:scale-90"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-4 text-base font-bold min-w-[36px] text-gray-200 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange("increase")}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors text-blue-400 cursor-pointer active:scale-90"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    {/* Add to Cart button — takes remaining space */}
                    <button
                      onClick={handleAddToCart}
                      disabled={loadingProduct === product?.id}
                      className={`flex-1 text-white cursor-pointer font-semibold
                        py-3 sm:py-4 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base
                        transition duration-300 ease-in-out
                        shadow-[0_0_100px_rgba(58,92,181,0.5)]
                        ${showFeedback === product?.id ? "bg-green-600" : "bg-[radial-gradient(50%_50%_at_50%_50%,#7B92FF_0%,#2941B5_100%)]"}
                        hover:shadow-[0_0_160px_rgba(58,92,181,0.7)]
                        active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed`}
                    >
                      {loadingProduct === product?.id ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Adding...
                        </>
                      ) : showFeedback === product?.id ? (
                        "Added! ✓"
                      ) : (
                        <>
                          <ShoppingCart size={18} />
                          Add To Cart
                        </>
                      )}
                    </button>
                  </div>

                  {/* Shipping link */}
                  <button
                    onClick={() => setIsShippingDialogOpen(true)}
                    className="text-xs sm:text-sm text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-2 cursor-pointer"
                  >
                    Shipping, Exchange and Returns Policy
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products Section */}
          <RelatedProducts />
        </div>

        {/* Shipping Dialog */}
        {isShippingDialogOpen && (
          <ShippingDialog onClose={() => setIsShippingDialogOpen(false)} />
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;
