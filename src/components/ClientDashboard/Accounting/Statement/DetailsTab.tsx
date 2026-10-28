import { StatementFullDetail } from "@/redux/features/accounting/accounting.type";
import { useState } from "react";
import DetailsAsserts from "./DetailsAsserts";
import DetailsDSPs from "./DetailsDSPs";
import DetailsRealise from "./DetailsRealise";
import DetailsTerritories from "./DetailsTerritories";
import DetailsTracks from "./DetailsTracks";

const DetailsTab = ({ data }: { data: StatementFullDetail }) => {
  const [activeTab, setActiveTab] = useState("Releases");

  return (
    <div className="w-full  mx-auto">
      {/* Tab Buttons */}
      <div className="flex  border-gray-300 space-x-2">
        {["Releases", "Tracks", "Assets", "DSPs", "Territories"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium  cursor-pointer  ${
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
        {activeTab === "Releases" && (
          <div>
            <DetailsRealise data={data.releases} statement={data.statement} />
          </div>
        )}
        {activeTab === "Tracks" && (
          <div>
            <DetailsTracks data={data.tracks} statement={data.statement} />
          </div>
        )}
        {activeTab === "Assets" && (
          <div>
            <DetailsAsserts data={data.assets} statement={data.statement} />
          </div>
        )}
        {activeTab === "DSPs" && (
          <div>
            <DetailsDSPs data={data.platforms} statement={data.statement} />
          </div>
        )}
        {activeTab === "Territories" && (
          <div>
            <DetailsTerritories
              data={data.territories}
              statement={data.statement}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsTab;
