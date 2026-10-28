"use client";

import { useState } from "react";
import Youtube from "@/assets/icons/youtube.png";
import Spotify from "@/assets/icons/sportity.png";
import Apple from "@/assets/icons/apple.png";
import SoundCloud from "@/assets/icons/soundCloud.png";
import Audio from "@/assets/icons/audio.png";
import Deezer from "@/assets/icons/deezer.png";
import Tidal from "@/assets/icons/tidal.png";
import Heart from "@/assets/icons/heart2.png";

export function DistributionPreferences() {
  const [platforms, setPlatforms] = useState({
    youtube: true,
    spotify: false,
    appleMusic: true,
    soundcloud: true,
    tiktok: true,
    audiomack: false,
    deezer: false,
    hearthis: false,
  });

  const [autoDistribution, setAutoDistribution] = useState(true);

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setPlatforms((prev) => ({
      ...prev,
      [platform]: checked,
    }));
  };

  const platformList = [
    {
      id: "youtube",
      label: "YouTube",
      img: Youtube,
      checked: platforms.youtube,
    },
    {
      id: "spotify",
      label: "Spotify",
      img: Spotify,
      checked: platforms.spotify,
    },
    {
      id: "appleMusic",
      label: "Apple Music",
      img: Apple,
      checked: platforms.appleMusic,
    },
    {
      id: "soundcloud",
      label: "SoundCloud",
      img: SoundCloud,
      checked: platforms.soundcloud,
    },
    { id: "tiktok", label: "TikTok", img: Tidal, checked: platforms.tiktok },
    {
      id: "audiomack",
      label: "Audiomack",
      img: Audio,
      checked: platforms.audiomack,
    },
    { id: "deezer", label: "Deezer", img: Deezer, checked: platforms.deezer },
    {
      id: "hearthis",
      label: "HearThis",
      img: Heart,
      checked: platforms.hearthis,
    },
  ];

  return (
    <div className="bg-[#0D1D22] rounded-lg p-8">
      {/* Header */}
      <h2 className="text-white text-lg font-medium mb-6">
        Distribution Preferences
      </h2>

      {/* Platforms */}
      <div className="mb-6">
        <h3 className="text-white text-sm font-medium mb-4">
          Default Platforms
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {platformList.map((platform) => (
            <label
              key={platform.id}
              htmlFor={platform.id}
              className="flex items-center space-x-2 cursor-pointer bg-slate-900/50 rounded-md p-2 hover:bg-slate-800"
            >
              <input
                type="checkbox"
                id={platform.id}
                checked={platform.checked}
                onChange={(e) =>
                  handlePlatformChange(platform.id, e.target.checked)
                }
                className="h-4 w-4 cursor-pointer accent-blue-600"
              />
              <img
                src={platform.img}
                alt={platform.label}
                className="w-6 h-6 object-contain"
              />
              <span className="text-slate-300 text-sm">{platform.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Auto Distribution */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white text-sm font-medium">Auto-Distribution</h3>
          <p className="text-slate-400 text-sm mt-1">
            Automatically send submissions to all default platforms upon
            approval.
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={autoDistribution}
            onChange={(e) => setAutoDistribution(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-600 transition"></div>
          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
        </label>
      </div>
    </div>
  );
}
