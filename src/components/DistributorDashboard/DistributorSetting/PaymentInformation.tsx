import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type PaymentMethodKeys =
  | "paymentMethod"
  | "legalName"
  | "bankName"
  | "accountNumber"
  | "routingNumber";

type PaymentMethod = {
  paymentMethod: string;
  legalName: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
};

function PaymentInformation() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      paymentMethod: "Bank Account",
      legalName: "",
      bankName: "",
      accountNumber: "",
      routingNumber: "",
    },
  ]);

  const handleAddNew = () => {
    setPaymentMethods([
      ...paymentMethods,
      {
        paymentMethod: "Bank Account",
        legalName: "",
        bankName: "",
        accountNumber: "",
        routingNumber: "",
      },
    ]);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const updatedMethods = [...paymentMethods];
    const name = e.target.name as PaymentMethodKeys;
    updatedMethods[index][name] = e.target.value;
    setPaymentMethods(updatedMethods);
  };

  return (
    <div className="w-full space-y-6 bg-[#0D1D22] p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Personal Information</h1>
      {paymentMethods.map((method, index) => (
        <div key={index} className="">
          <div className="text-white space-y-2">
            <Label htmlFor="platform" className="text-base font-sans">
              Payment Method
            </Label>
            <div>
              <Select
                value={method.paymentMethod}
                onValueChange={(value) =>
                  handleChange(index, {
                    target: { name: "paymentMethod", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <SelectTrigger className="bg-[#253638] text-white px-4 py-3 rounded-xl border-none w-full hover:bg-[#344b51]">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent className="bg-gray-500 text-white border-none hover:bg-gray-600">
                  <SelectGroup>
                    <SelectItem
                      value="Bank Account"
                      className="hover:bg-[#253638] cursor-pointer"
                    >
                      Bank Account
                    </SelectItem>
                    <SelectItem
                      value="PayPal"
                      className="hover:bg-[#253638] cursor-pointer"
                    >
                      PayPal
                    </SelectItem>
                    <SelectItem
                      value="Credit Card"
                      className="hover:bg-[#253638] cursor-pointer"
                    >
                      Credit Card
                    </SelectItem>
                    <SelectItem
                      value="Apple Pay"
                      className="hover:bg-[#253638] cursor-pointer"
                    >
                      Apple Pay
                    </SelectItem>
                    <SelectItem
                      value="Google Pay"
                      className="hover:bg-[#253638] cursor-pointer"
                    >
                      Google Pay
                    </SelectItem>
                    <SelectItem
                      value="Cash on Delivery"
                      className="hover:bg-[#253638] cursor-pointer"
                    >
                      Cash on Delivery
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 space-y-3 mt-2">
            <div>
              <Label htmlFor="platform" className="text-base font-sans ">
                Legal Name
              </Label>
              <input
                type="text"
                name="legalName"
                value={method.legalName}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                placeholder="Legal Name"
              />
            </div>
            <div>
              <Label htmlFor="platform" className="text-base font-sans ">
                Bank Name
              </Label>
              <input
                type="text"
                name="bankName"
                value={method.bankName}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                placeholder="Bank Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="platform" className="text-base font-sans ">
                Account Number
              </Label>

              <input
                type="text"
                name="accountNumber"
                value={method.accountNumber}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                placeholder="Account Number"
              />
            </div>
            <div>
              <Label htmlFor="platform" className="text-base font-sans ">
                Routing Number
              </Label>
              <input
                type="text"
                name="routingNumber"
                value={method.routingNumber}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                placeholder="Routing Number"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddNew}
        className="w-full p-3 mt-6 bg-blue-600 text-white rounded-xl"
      >
        Add New
      </button>
    </div>
  );
}

export default PaymentInformation;
