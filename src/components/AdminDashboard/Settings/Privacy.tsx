"use client";

import { useState } from "react";
import { User } from "@/redux/types/auth.type";

interface PrivacyProps {
  user: User;
}

export function Privacy({ user }: PrivacyProps) {
  console.log("user", user);
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [termsOfService, setTermsOfService] = useState("");
  const [dataRetention, setDataRetention] = useState("1 Year");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const retentionOptions = [
    "1 Year",
    "2 Years",
    "3 Years",
    "5 Years",
    "Indefinite",
  ];

  return (
    <div className="p-8 bg-[#0D1D22] rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-white">
        Privacy & Legal Settings
      </h2>

      {/* Privacy Policy */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Privacy Policy
        </label>
        <textarea
          value={privacyPolicy}
          onChange={(e) => setPrivacyPolicy(e.target.value)}
          placeholder="Your privacy policy goes here..."
          className="w-full h-24 px-3 py-2 border border-[#B3B3B3] bg-[#253438]  rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Terms of Service */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Terms of Service
        </label>
        <textarea
          value={termsOfService}
          onChange={(e) => setTermsOfService(e.target.value)}
          placeholder="Your terms of service goes here..."
          className="w-full h-24 px-3 py-2 border border-[#B3B3B3] bg-[#253438] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Data Retention */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Data Retention
        </label>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-3 py-2 border border-[#B3B3B3] bg-[#253438]  rounded-md text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
          >
            <span>{dataRetention}</span>
            <svg
              className={`w-4 h-4 text-green-500 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 border border-[#B3B3B3] bg-[#253438]  rounded-md shadow-lg z-10">
              {retentionOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setDataRetention(option);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-white hover:bg-gray-700 flex items-center justify-between"
                >
                  <span>{option}</span>
                  {option === dataRetention && (
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
