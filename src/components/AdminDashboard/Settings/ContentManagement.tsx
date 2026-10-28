"use client";

import { useState } from "react";
import { User } from "@/redux/types/auth.type";

interface ContentManagementProps {
  user: User;
}

export function ContentManagement({ user }: ContentManagementProps) {
  console.log("user", user);
  const [enableModeration, setEnableModeration] = useState(true);
  const [contentManagement, setContentManagement] = useState("Automatic");
  const [seoTitle, setSeoTitle] = useState("Music Dashboard");
  const [language, setLanguage] = useState("English (US)");

  return (
    <div className="bg-[#0D1D22] p-8 rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-white">Content Management</h2>

      {/* Enable Content Moderation Checkbox */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="checkbox"
            id="enable-moderation"
            checked={enableModeration}
            onChange={(e) => setEnableModeration(e.target.checked)}
            className="sr-only"
          />
          <label
            htmlFor="enable-moderation"
            className={`flex items-center justify-center w-4 h-4 border rounded cursor-pointer ${
              enableModeration
                ? "bg-blue-600 border-blue-600"
                : "bg-gray-700 border-gray-600"
            }`}
          >
            {enableModeration && (
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </label>
        </div>
        <label
          htmlFor="enable-moderation"
          className="text-white cursor-pointer"
        >
          Enable Content Moderation
        </label>
      </div>

      {/* Content Management Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm text-gray-300">
          Content Management
        </label>
        <div className="relative">
          <select
            value={contentManagement}
            onChange={(e) => setContentManagement(e.target.value)}
            className="w-full bg-[#253438] h-12 rounded-md px-3 py-2 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* SEO Title Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm text-gray-300">SEO Title</label>
        <div className="relative">
          <select
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full bg-[#253438] h-12 rounded-md px-3 py-2 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Music Dashboard">Music Dashboard</option>
            <option value="Content Hub">Content Hub</option>
            <option value="Media Center">Media Center</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Language Localization Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm text-gray-300">
          Language Localization
        </label>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-[#253438] h-12 rounded-md px-3 py-2 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="English (US)">English (US)</option>
            <option value="English (UK)">English (UK)</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
