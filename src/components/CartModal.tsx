import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Minus, Plus, X, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hook";
import {
  clearCart,
  selectCart,
  applyCoupon,
} from "@/redux/features/cart/cartSlice";
import { useCurrentUser } from "@/hooks/useCurrentUse";
import {
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useValidateCouponMutation,
} from "@/redux/features/commerce/commerceApi";
import { toast } from "sonner";

interface CartModalProps {
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const [discountCode, setDiscountCode] = useState("");
  const cart = useAppSelector(selectCart);
  const { items: cartItems, appliedDiscount, shippingCost } = cart;
  const dispatch = useAppDispatch();
  const user = useCurrentUser();
  console.log(cartItems);
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [clearCartAPI] = useClearCartMutation();
  const [validateCoupon, { isLoading: isValidating }] =
    useValidateCouponMutation();

  const handleQuantityChange = async (
    id: number | string,
    isDecrease: boolean,
  ) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const newQuantity = isDecrease ? item.quantity - 1 : item.quantity + 1;

    // Sync with API if user is logged in and we have a cartItemId
    if (user?.id && item.cartItemId) {
      try {
        if (newQuantity <= 0) {
          await removeCartItem(item.cartItemId).unwrap();
        } else {
          await updateCartItem({
            cartItemId: item.cartItemId,
            data: { quantity: newQuantity },
          }).unwrap();
        }
      } catch (error) {
        console.error("Failed to sync quantity change with API:", error);
      }
    }
  };

  const handleRemoveItem = async (id: number | string) => {
    const item = cartItems.find((i) => i.id === id);

    if (user?.id && item?.cartItemId) {
      try {
        await removeCartItem(item.cartItemId).unwrap();
      } catch (error) {
        console.error("Failed to remove item from API:", error);
      }
    }
  };

  const handleClearCart = async () => {
    dispatch(clearCart());
    if (user?.id) {
      try {
        await clearCartAPI(user.id).unwrap();
      } catch (error) {
        console.error("Failed to clear cart from API:", error);
      }
    }
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    if (!user?.id) {
      toast.error("Please login to apply coupon");
      return;
    }

    try {
      const result = await validateCoupon({
        code: discountCode,
        userId: user.id,
      }).unwrap();

      // Assuming the API returns the coupon object directly or with a success property
      // Based on the user's snippet, it seems to be direct objects.
      // If it's a direct object with { type, value }, we use it.
      if (result) {
        let discountValue = 0;
        if (result.type === "PERCENT") {
          discountValue = (subtotal * result.value) / 100;
        } else {
          discountValue = result.value;
        }

        dispatch(applyCoupon({ code: result.code, discount: discountValue }));
        toast.success(`Coupon "${result.code}" applied!`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid or expired coupon code");
    }
  };

  const subtotal = cart.totalPrice;
  const shipping = cartItems.length > 0 ? shippingCost : 0;
  const total = Math.max(0, subtotal + shipping - appliedDiscount);

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-end"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="bg-[#0C1022] w-full sm:max-w-md h-full shadow-2xl overflow-hidden border-l border-blue-900/30 flex flex-col"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-800">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            My Cart ({cartItems.length} items)
          </h2>
          <div className="flex items-center gap-4">
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-4">Your cart is empty</p>
              <Link to="/shop">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full 
                    text-white font-medium transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 sm:gap-4 bg-gray-900/40 p-3 sm:p-4 
                    rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-xs sm:text-sm font-medium mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-emerald-400 font-semibold text-sm mb-3">
                      ${item.price * item.quantity}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-gray-800 rounded-full border border-gray-700">
                        <button
                          onClick={() => handleQuantityChange(item.id, true)}
                          className="w-8 h-8 flex items-center justify-center text-blue-400 
                            hover:text-white hover:bg-gray-700 rounded-l-full transition-colors cursor-pointer"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-white text-sm w-10 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, false)}
                          className="w-8 h-8 flex items-center justify-center text-blue-400 
                            hover:text-white hover:bg-gray-700 rounded-r-full transition-colors cursor-pointer"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors cursor-pointer p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section - Fixed */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-800">
            {/* Discount Code */}
            <div className="p-4 sm:p-5 pb-3 sm:pb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Discount code"
                  className="flex-1 bg-gray-900/60 border rounded-[33px] border-gray-800 
                    px-3 sm:px-4 py-2 sm:py-3 text-white text-xs sm:text-sm 
                    placeholder-gray-500 focus:outline-none focus:border-blue-500 
                    transition-colors"
                />
                <button
                  onClick={handleApplyDiscount}
                  disabled={isValidating}
                  className="bg-[#152844] rounded-[20px] hover:bg-blue-700 px-4 sm:px-6 
                    py-2 sm:py-3 text-white text-xs sm:text-sm font-medium 
                    transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                >
                  {isValidating ? "Validating..." : "Apply"}
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="px-4 sm:px-5 pb-3 sm:pb-4 space-y-2 sm:space-y-3">
              <div className="flex justify-between text-gray-400 text-xs sm:text-sm">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-xs sm:text-sm">
                <span>Shipping</span>
                <span className="text-white">${shipping.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 text-xs sm:text-sm">
                  <span>Discount</span>
                  <span>-${appliedDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-semibold text-base sm:text-lg pt-2 sm:pt-3 border-t border-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="p-4 sm:p-5 pt-0">
              <Link to="/checkout" onClick={onClose}>
                <button
                  className="w-full text-white font-semibold py-4 rounded-[29.455px]
                    flex items-center justify-center gap-2.5 transition duration-300 
                    ease-in-out shadow-[0_0_180px_rgba(58,92,181,0.6)]
                    bg-[radial-gradient(50%_50%_at_50%_50%,#7B92FF_0%,#2941B5_100%)]
                    hover:shadow-[0_0_200px_rgba(58,92,181,0.8)] cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </Link>

              <button
                onClick={onClose}
                className="w-full mt-3 py-3 text-gray-400 hover:text-white 
                  transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CartModal;
