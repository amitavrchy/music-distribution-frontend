"use client";

import { useState } from "react";
import { User } from "@/redux/types/auth.type";

interface TwoFactorSecuritySettingsProps {
  user: User;
}

export function TwoFactorSecuritySettings({
  user,
}: TwoFactorSecuritySettingsProps) {
  const [enforcePasswordPolicies, setEnforcePasswordPolicies] = useState(false);
  const [enableTwoFactor, setEnableTwoFactor] = useState(user.isTFAEnabled);
  const [ipWhitelist, setIpWhitelist] = useState("");

  return (
    <div className="bg-[#0D1D22] p-8 rounded-xl shadow-md">
      <h1 className="text-xl font-semibold text-white mb-6">
        Security Settings
      </h1>

      <div className="space-y-6">
        {/* Password Policies Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="password-policies"
            checked={enforcePasswordPolicies}
            onChange={(e) => setEnforcePasswordPolicies(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="password-policies"
            className="text-sm font-medium text-white cursor-pointer"
          >
            Enforce Password Policies
          </label>
        </div>

        {/* Two-Factor Authentication Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="two-factor"
            checked={enableTwoFactor}
            onChange={(e) => setEnableTwoFactor(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="two-factor"
            className="text-sm font-medium text-white cursor-pointer"
          >
            Enable Two-Factor Authentication (2FA)
          </label>
        </div>

        {/* IP Whitelisting Section */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-white">
            IP Whitelisting (comma-separated)
          </label>
          <textarea
            value={ipWhitelist}
            onChange={(e) => setIpWhitelist(e.target.value)}
            placeholder="..."
            className="w-full min-h-[120px] mt-2 bg-[#253438] border border-gray-600 text-white placeholder:text-gray-400 rounded-md p-3 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
