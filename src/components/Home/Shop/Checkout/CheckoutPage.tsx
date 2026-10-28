import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ArrowLeft, Loader2 } from "lucide-react";
import CheckoutForm from "./CheckoutForm";
import { useCurrentUser } from "@/hooks/useCurrentUse";
import {
  useConfirmPaymentMutation,
  useCreatePaymentIntentMutation,
} from "@/redux/features/commerce/commerceApi";
import { clearCart, selectCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hook";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  "pk_test_51RCEahQfgjKiELd5wEJ8zlJmqDNqIyIEn9Yn3vGdyN2v3D4ZTwoPNKg1ofLj9yCf68n8yJgC0mft2prDQSzlKXrX00MveubIL5",
);

const CheckoutPage: React.FC = () => {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentMode, setPaymentMode] = useState<"stripe" | "demo" | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [payable, setPayable] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    postalCode: "",
  });

  const cart = useAppSelector(selectCart);
  const { totalPrice, appliedDiscount, appliedCoupon, shippingCost } = cart;
  const totalAmount =
    totalPrice > 0 ? totalPrice + shippingCost - appliedDiscount : 0;

  const [createPaymentIntent, { isLoading: isCreatingIntent }] =
    useCreatePaymentIntentMutation();
  const [confirmPayment, { isLoading: isConfirming }] =
    useConfirmPaymentMutation();

  useEffect(() => {
    // If user is not logged in or cart is empty, redirect back
    if (!user?.id) {
      toast.error("Please login to proceed to checkout.");
      navigate("/login");
      return;
    }

    if (cart.items.length === 0) {
      toast.error("Your cart is empty.");
      navigate("/shop");
      return;
    }
  }, [user?.id, cart.items.length, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      const response = await createPaymentIntent({
        userId: user.id,
        ...formData,
        couponCode: appliedCoupon || undefined,
      }).unwrap();

      if (response.orderId) setOrderId(response.orderId);
      if (typeof response.totalAmount === "number") {
        setPayable(response.totalAmount);
      }
      if (response.mode === "demo") {
        setPaymentMode("demo");
      } else if (response.clientSecret) {
        setClientSecret(response.clientSecret);
        setPaymentMode("stripe");
      } else {
        toast.error("Failed to initialize payment gateway.");
      }
    } catch (error) {
      console.error("Payment Intent Error:", error);
      toast.error("Failed to initialize payment gateway.");
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 text-gray-300">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Shop
          </Link>
        </div>

        <div className="bg-[#111] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
            <p className="text-gray-400 mb-8">
              Complete your payment securely with Stripe.
            </p>

            {/* Order Summary */}
            <div className="mb-8 p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <h2 className="text-lg font-semibold text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 shrink-0">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-400 line-clamp-1 mr-4">
                      {item.quantity}x {item.title}
                    </span>
                    <span className="text-white">
                      ${item.totalPrice.toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="h-px bg-gray-800 my-4"></div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 shrink-0">Subtotal</span>
                  <span className="text-white">
                    ${cart.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-gray-800 pb-4">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">${shippingCost.toFixed(2)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between items-center text-sm text-emerald-400 border-b border-gray-800 pb-4">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-${appliedDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-xl font-bold text-emerald-400">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            {paymentMode === "demo" && orderId ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Pay</h2>
                <p className="text-sm text-gray-400">
                  Card processing is running in demo mode. This charges the
                  order, reduces stock, and clears the cart.
                </p>
                <button
                  type="button"
                  disabled={isConfirming}
                  onClick={async () => {
                    try {
                      await confirmPayment(orderId).unwrap();
                      dispatch(clearCart());
                      toast.success("Payment successful");
                      navigate(`/orders/${orderId}`);
                    } catch (error) {
                      console.error(error);
                      toast.error("Payment could not be completed");
                    }
                  }}
                  className="w-full h-14 rounded-full bg-[#c4a574] text-[#1a140f] font-bold text-lg disabled:opacity-50 cursor-pointer"
                >
                  {isConfirming
                    ? "Processing..."
                    : `Pay $${(payable ?? totalAmount).toFixed(2)}`}
                </button>
              </div>
            ) : !clientSecret ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Shipping Information
                </h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">
                        Full Name
                      </label>
                      <input
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">
                        Phone Number
                      </label>
                      <input
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="01xxxxxxxxx"
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">
                      Address
                    </label>
                    <input
                      required
                      name="addressLine"
                      value={formData.addressLine}
                      onChange={handleInputChange}
                      placeholder="Street address, P.O. box, etc."
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">
                        City
                      </label>
                      <input
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="new york"
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">
                        Postal Code
                      </label>
                      <input
                        required
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="1207"
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCreatingIntent}
                    className="w-full h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4 cursor-pointer"
                  >
                    {isCreatingIntent ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Initializing...
                      </>
                    ) : (
                      "Continue to Payment"
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <Elements
                options={{
                  clientSecret,
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#2941B5",
                      colorBackground: "#1a1a1a",
                      colorText: "#e5e7eb",
                      colorDanger: "#ef4444",
                      fontFamily: "Inter, system-ui, sans-serif",
                      spacingUnit: "4px",
                      borderRadius: "8px",
                    },
                  },
                }}
                stripe={stripePromise}
              >
                <CheckoutForm
                  amount={totalAmount}
                  userId={user!.id}
                  orderId={orderId}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
