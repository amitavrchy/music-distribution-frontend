import { useState } from "react";
import { useChangeAccountantPasswordMutation } from "@/redux/features/accountant/accountantApi";
import { toast } from "react-hot-toast";

const AccountantSecuritySettings = () => {
  const [changePassword, { isLoading }] = useChangeAccountantPasswordMutation();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    try {
      await changePassword(formData).unwrap();
      toast.success("Password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(
        error?.data?.message || "Failed to change password. Please try again.",
      );
    }
  };

  return (
    <div className="bg-[#17171A] rounded-xl p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-white">Security Settings</h2>
      <p className="text-gray-400">
        Update your password to keep your account secure
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-[#1E1E21] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-[#1E1E21] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-[#1E1E21] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            placeholder="Confirm new password"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors text-white"
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountantSecuritySettings;
