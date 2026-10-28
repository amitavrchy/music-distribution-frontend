import { useState } from "react";
import { TopAssetsDetails } from "./Youtube/TopAssetsDetails";
import { TopClaimsDetails } from "./Youtube/TopClaimsDetails";
import { GeoTrendsDetails } from "./Youtube/GeoTrendsDetails";
import OverView from "./OverView";

const Tabs = ({
  platform = "YouTube",
  period,
}: {
  platform?: string;
  period: string;
}) => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="w-full  mx-auto">
      {/* Tab Buttons */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:space-x-2 border-gray-300">
        {["Overview", "Assets", "Claims", "Geo Trends"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium cursor-pointer ${
              activeTab === tab
                ? "text-blue-600 bg-[#0C272F] rounded-2xl"
                : "text-white text-base font-sans border-transparent hover:text-blue-600 hover:bg-[#0C272F] rounded-2xl"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-8">
        {activeTab === "Overview" && (
          <div>
            <OverView platform={platform} period={period} />
          </div>
        )}
        {activeTab === "Assets" && (
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
            <div className="xl:col-span-4 w-full">
              <TopAssetsDetails platform={platform} period={period} />
            </div>
          </div>
        )}
        {activeTab === "Claims" && (
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
            <div className="xl:col-span-4 w-full">
              <TopClaimsDetails platform={platform} period={period} />
            </div>
          </div>
        )}
        {activeTab === "Geo Trends" && (
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
            <div className="xl:col-span-4 w-full">
              <GeoTrendsDetails platform={platform} period={period} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
