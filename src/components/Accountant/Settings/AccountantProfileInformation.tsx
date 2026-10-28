import { useState, useEffect } from "react";
import {
  useGetAccountantSettingsQuery,
  useUpdateAccountantSettingsMutation,
} from "@/redux/features/accountant/accountantApi";
import { toast } from "react-hot-toast";

const AccountantProfileInformation = () => {
  const { data, isLoading, error } = useGetAccountantSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateAccountantSettingsMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        fullName: data.data.fullName || "",
        email: data.data.email || "",
        phoneNumber: data.data.phoneNumber || "",
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateSettings(formData).unwrap();
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-xl">
          Error loading profile. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#17171A] rounded-xl p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-white">Profile Information</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#1E1E21] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#1E1E21] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#1E1E21] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            placeholder="+1234567890"
          />
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

export default AccountantProfileInformation;
