import { useState, useEffect } from "react";
import {
  useGetAccountantSettingsQuery,
  useUpdateAccountantSettingsMutation,
} from "@/redux/features/accountant/accountantApi";
import { toast } from "react-hot-toast";

const AccountantPaymentSettings = () => {
  const { data, isLoading, error } = useGetAccountantSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateAccountantSettingsMutation();

  const [formData, setFormData] = useState({
    defaultCurrency: "USD",
    paymentGateway: "Stripe",
    twoFactorEnabled: false,
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        defaultCurrency: data.data.defaultCurrency,
        paymentGateway: data.data.paymentGateway,
        twoFactorEnabled: data.data.twoFactorEnabled,
      });
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateSettings(formData).unwrap();
      toast.success("Payment settings updated successfully!");
    } catch {
      toast.error("Failed to update settings. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading settings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-xl">
          Error loading settings. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#17171A] rounded-xl p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-white">Payment Settings</h2>
      <p className="text-gray-400">
        Configure your payment preferences and security options
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Default Currency
            </label>
            <select
              name="defaultCurrency"
              value={formData.defaultCurrency}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#1E1E21] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Payment Gateway
            </label>
            <select
              name="paymentGateway"
              value={formData.paymentGateway}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#1E1E21] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            >
              <option value="Stripe">Stripe</option>
              <option value="PayPal">PayPal</option>
              <option value="Square">Square</option>
            </select>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-400">
                Add an extra layer of security to your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="twoFactorEnabled"
                checked={formData.twoFactorEnabled}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isUpdating}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors text-white"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountantPaymentSettings;
