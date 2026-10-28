import { TopAssets } from "@/components/ClientDashboard/Analytics/Youtube/TopAssets";
import { TopClaims } from "@/components/ClientDashboard/Analytics/Youtube/TopClaims";
import { TopCountries } from "@/components/ClientDashboard/Analytics/Youtube/TopCountries";
import { TopUsRegions } from "@/components/ClientDashboard/Analytics/Youtube/TopUsRegions";
import AppleMusicSection from "./AppleMusicSection";

const AppleMusiceOverView = () => {
  return (
    <div className=" space-y-6">
      <AppleMusicSection />
      {/* 2nd part */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-2 w-full">
          <TopCountries data={[]} />
        </div>
        <div className="w-full xl:col-span-2">
          <TopUsRegions data={[]} />
        </div>
      </div>
      {/* 3rd part */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-2 w-full">
          <TopAssets data={[]} />
        </div>
        <div className="w-full xl:col-span-2">
          <TopClaims data={[]} />
        </div>
      </div>
    </div>
  );
};

export default AppleMusiceOverView;
