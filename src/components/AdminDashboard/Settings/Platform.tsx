"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { User } from "@/redux/types/auth.type";

interface PlatformSettingsProps {
  user: User;
}

export default function PlatformSettings({ user }: PlatformSettingsProps) {
  const clientSetting = user.clientSettings?.[0];

  const [platformName] = useState(
    clientSetting?.defaultDistributionPlatforms?.join(", ") ||
      "No Platforms Set",
  );
  const [logoUrl] = useState(
    user.profilePictureUrl ||
      "https://placehold.co/120x50/10B981/FFFFFF?text=NEXTWAVE",
  );
  const [timezone, setTimezone] = useState("est");

  return (
    <div className="p-8 bg-[#0D1D22] rounded-xl shadow-md">
      <h1 className="text-xl font-semibold text-white mb-6">
        Platform Settings
      </h1>

      <div className="space-y-6">
        {/* Platform Name */}
        <div className="space-y-2">
          <label htmlFor="platform-name" className="text-sm text-gray-400">
            Default Distribution Platforms
          </label>
          <input
            id="platform-name"
            value={platformName}
            readOnly
            className="w-full p-3 rounded-xl bg-[#253438] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
          />
        </div>

        {/* Logo URL */}
        <div className="space-y-2">
          <label htmlFor="logo-url" className="text-sm text-gray-400">
            Profile Banner / Logo URL
          </label>
          <div className="relative">
            <input
              id="logo-url"
              value={logoUrl}
              readOnly
              className="w-full p-3 pr-10 rounded-xl bg-[#253438] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => window.open(logoUrl, "_blank")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Time Zone */}
        <div className="space-y-2">
          <label htmlFor="timezone" className="text-sm text-gray-400">
            Time Zone
          </label>
          <select
            id="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#253438] text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="utc">UTC</option>
            <option value="est">EST (Eastern Standard Time)</option>
            <option value="pst">PST (Pacific Standard Time)</option>
            <option value="cst">CST (Central Standard Time)</option>
            <option value="gmt">GMT (Greenwich Mean Time)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
