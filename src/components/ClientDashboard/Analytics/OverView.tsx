import { TopAssets } from "@/components/ClientDashboard/Analytics/Youtube/TopAssets";
import { TopClaims } from "@/components/ClientDashboard/Analytics/Youtube/TopClaims";
import { TopCountries } from "@/components/ClientDashboard/Analytics/Youtube/TopCountries";
import { TopUsRegions } from "@/components/ClientDashboard/Analytics/Youtube/TopUsRegions";
import YoutubeSection from "../Dashboard/YoutubeSection";
import { useGetPlatformOverviewQuery } from "@/redux/features/analytics/analyticsApi";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";

const OverView = ({
  platform,
  period,
}: {
  platform: string;
  period: string;
}) => {
  const { data: response, isLoading } = useGetPlatformOverviewQuery({
    platform,
    period,
  });

  if (isLoading)
    return (
      <div className="text-white">
        <ComponentLoader />{" "}
      </div>
    );

  // Use response data if available, otherwise use default empty structure
  const defaultData = {
    platform: platform,
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

  const data = response?.success && response.data ? response.data : defaultData;

  return (
    <div className=" space-y-6">
      <YoutubeSection data={data} platform={platform} />
      {/* 2nd part */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-2 w-full">
          <TopCountries data={data.topCountries} />
        </div>
        {platform === "YouTube" && (
          <div className="w-full xl:col-span-2">
            <TopUsRegions data={data.topUSRegions} />
          </div>
        )}
      </div>
      {/* 3rd part */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-2 w-full">
          <TopAssets data={data.topAssets} />
        </div>
        <div className="w-full xl:col-span-2">
          <TopClaims data={data.topClaims} />
        </div>
      </div>
    </div>
  );
};

export default OverView;
