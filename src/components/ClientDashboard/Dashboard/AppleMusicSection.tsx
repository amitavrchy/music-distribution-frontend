import EarningsByType from "./EarningsByType";
import EstimatedEarning from "./EstimatedEarning";
import ReuserableCommonPart from "./Shared/ReuserableCommonPart";
import iconapple from "@/assets/icons/AppleMusic.svg";
import { PlatformOverviewData } from "@/redux/features/analytics/analytics.type";

const AppleMusicSection = ({ data }: { data?: PlatformOverviewData }) => {
  const safeData = data || {
    platform: "Apple Music",
    totalViews: "0",
    totalEarnings: "0",
    earningsByType: {
      free: { earnings: "0", views: "0", percentage: 0 },
      premium: { earnings: "0", views: "0", percentage: 0 },
    },
    estimatedEarnings: [],
    topCountries: [],
    topUSRegions: [],
    topAssets: [],
    topClaims: [],
  };

  return (
    <ReuserableCommonPart
      title="Apple Music"
      icon={<img src={iconapple} className="text-[#FF0000] w-10 h-6" alt="" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-3 gap-5">
        <div className="w-full space-y-6">
          <EarningsByType data={safeData.earningsByType} />
        </div>
        <div className="lg:col-span-2 w-full">
          <EstimatedEarning
            data={safeData.estimatedEarnings}
            totalViews={safeData.totalViews}
            totalEarnings={safeData.totalEarnings}
          />
        </div>
      </div>
    </ReuserableCommonPart>
  );
};

export default AppleMusicSection;
