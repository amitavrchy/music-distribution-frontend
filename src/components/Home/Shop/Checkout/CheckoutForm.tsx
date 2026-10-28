import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useClearCartMutation,
  useConfirmPaymentMutation,
} from "@/redux/features/commerce/commerceApi";
import { clearCart as clearLocalCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks/redux-hook";

interface CheckoutFormProps {
  amount: number;
  userId: string;
  orderId: string | null;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount, userId, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [clearCart] = useClearCartMutation();
  const [confirmPayment] = useConfirmPaymentMutation();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An unexpected error occurred.");
      } else {
        setMessage("An unexpected error occurred.");
      }
      toast.error(error.message || "Payment failed");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast.success("Payment Successful!");

      if (orderId) {
        try {
          await confirmPayment(orderId).unwrap();
        } catch (err) {
          console.error("Failed to record payment", err);
        }
      }

      try {
        await clearCart(userId).unwrap();
        dispatch(clearLocalCart());
      } catch (err) {
        console.error("Failed to clear cart after payment", err);
      }

      // Redirect to a success page or back to shop
      if (orderId) {
        navigate(`/orders/${orderId}`);
      } else {
        navigate("/shop");
      }
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      </div>

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full text-white font-semibold py-4 rounded-[29.455px]
                    flex items-center justify-center gap-2.5 transition duration-300 
                    ease-in-out shadow-[0_0_180px_rgba(58,92,181,0.6)]
                    bg-[radial-gradient(50%_50%_at_50%_50%,#7B92FF_0%,#2941B5_100%)]
                    hover:shadow-[0_0_200px_rgba(58,92,181,0.8)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              Processing...
            </div>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </span>
      </button>

      {/* Show any error or success messages */}
      {message && (
        <div
          id="payment-message"
          className="text-red-400 text-sm text-center mt-4"
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
