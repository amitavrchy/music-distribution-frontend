import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import MiniTitle from "@/components/ClientDashboard/Shared/MiniTitle";

const PaymentSetting = () => {
  const [currency, setCurrency] = useState("USD");
  const [paymentGateway, setPaymentGateway] = useState("Stripe");

  return (
    <div className="bg-[#0D1D22] p-8 rounded-xl shadow-md">
      <MiniTitle title="Financial & Payment Settings" />
      <div className=" mx-auto ">
        <div className="bg-card  rounded-lg  space-y-6">
          <div className=" mt-6 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="currency"
                className="text-sm text-muted-foreground mb-3"
              >
                Default Currency
              </Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger
                  id="currency"
                  className="bg-muted/50 text-white border border-[#B3B3B3] rounded-xl px-6 py-6 w-full bg-[#253438] h-12"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="text-white bg-black">
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="payment-gateway"
                className="text-sm text-muted-foreground mb-3 "
              >
                Payment Gateway
              </Label>
              <Select value={paymentGateway} onValueChange={setPaymentGateway}>
                <SelectTrigger
                  id="payment-gateway"
                  className="bg-muted/50 border border-[#B3B3B3] rounded-xl px-6 py-6 w-full bg-[#253438] h-12  "
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="text-white bg-black">
                  <SelectItem value="Stripe">Stripe</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                  <SelectItem value="Square">Square</SelectItem>
                  <SelectItem value="Razorpay">Razorpay</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSetting;
