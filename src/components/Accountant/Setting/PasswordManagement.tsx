import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordManagement = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypeNewPassword, setShowRetypeNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      {" "}
      <div className="bg-[#0D1D22] p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Password Management
        </h2>
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
        <button className="w-full py-2 mt-4 bg-blue-600 rounded-md text-white hover:bg-blue-500">
          Update Password
        </button>
      </div>
    </div>
  );
};

export default PasswordManagement;
