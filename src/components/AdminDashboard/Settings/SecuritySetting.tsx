import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEye, FaEyeSlash, FaDesktop, FaMobileAlt } from "react-icons/fa";
import { User } from "@/redux/types/auth.type";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

interface PasswordManagementProps {
  user: User;
}

const PasswordManagement = ({ user }: PasswordManagementProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypeNewPassword, setShowRetypeNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = async () => {
    if (!formData.currentPassword || !formData.newPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (formData.newPassword !== formData.retypeNewPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      const response = await changePassword({
        password: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      if (response.success) {
        toast.success("Password changed successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          retypeNewPassword: "",
        });
      }
    } catch (err) {
      console.error("Failed to change password", err);
      const errorData = err as { data?: { message?: string } };
      toast.error(
        errorData.data?.message ||
          "Failed to change password. Please try again.",
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#0D1D22] p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Security Settings
        </h2>

        <h3 className="text-lg font-semibold mb-4 text-white">
          Change Password
        </h3>
        <div className="space-y-4">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-sm text-gray-600">
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
                className="border border-[#B3B3B3] rounded-xl px-6 py-6 w-full bg-[#253438]"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-2 top-4 text-sm text-[#10B981] cursor-pointer"
              >
                {showCurrentPassword ? (
                  <FaEyeSlash className="h-4 w-8" />
                ) : (
                  <FaEye className="h-4 w-8" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm text-gray-600">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) =>
                    handleInputChange("newPassword", e.target.value)
                  }
                  className="border border-[#B3B3B3] rounded-xl px-6 py-6 w-full bg-[#253438]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-4 text-sm text-[#10B981] cursor-pointer"
                >
                  {showNewPassword ? (
                    <FaEyeSlash className="h-4 w-8" />
                  ) : (
                    <FaEye className="h-4 w-8" />
                  )}
                </button>
              </div>
            </div>

            {/* Re-type New Password */}
            <div className="space-y-2">
              <Label
                htmlFor="retypeNewPassword"
                className="text-sm text-gray-600"
              >
                Re-type New Password
              </Label>
              <div className="relative">
                <Input
                  id="retypeNewPassword"
                  type={showRetypeNewPassword ? "text" : "password"}
                  value={formData.retypeNewPassword}
                  onChange={(e) =>
                    handleInputChange("retypeNewPassword", e.target.value)
                  }
                  className="border border-[#B3B3B3] rounded-xl px-6 py-6 w-full bg-[#253438]"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowRetypeNewPassword(!showRetypeNewPassword)
                  }
                  className="absolute right-2 top-4 text-sm text-[#10B981] cursor-pointer"
                >
                  {showRetypeNewPassword ? (
                    <FaEyeSlash className="h-4 w-8" />
                  ) : (
                    <FaEye className="h-4 w-8" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handlePasswordChange}
          disabled={isLoading}
          className=" text-lg flex justify-center items-center gap-[10px] w-full sm:w-[206px] h-[52px] px-4 py-[10px] rounded-[12px] bg-[#3A5CFF] text-white hover:bg-blue-500 cursor-pointer mt-4 shrink-0 disabled:bg-gray-500"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </div>

      {/* Login Devices */}
      <div className="bg-[#0D1D22] p-8 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-white">Login Devices</h3>
        <div className="space-y-4">
          {user.loginDevices?.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between p-4 bg-[#1B2B33] rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#253438] rounded-lg text-[#10B981]">
                  {device.deviceType === "desktop" ? (
                    <FaDesktop className="h-6 w-6" />
                  ) : (
                    <FaMobileAlt className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">
                    {device.browser} on {device.os}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {device.ipAddress} • {device.city || "Unknown City"},{" "}
                    {device.country || "Unknown Country"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {device.isActive ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active Now
                  </span>
                ) : (
                  <p className="text-gray-400 text-sm italic">
                    Last login:{" "}
                    {new Date(device.lastLoginAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
          {(!user.loginDevices || user.loginDevices.length === 0) && (
            <p className="text-gray-400 italic">
              No recent login devices found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordManagement;
