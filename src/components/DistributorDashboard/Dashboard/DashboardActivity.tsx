import DistributionStatus from "./DistributionStatus";
import PlatformPerformance from "./PlatformPerformance";
import RecentActivity from "./RecentActivity";

export function DashboardActivity() {
  return (
    <div className="">
      {/* Recent Activity + Distribution Status */}
      <div className="mt-[40px] w-full flex flex-col lg:flex-row gap-8">
        {/* Recent Activity Section */}
        <RecentActivity />

        {/* Distribution Status Section */}
        <DistributionStatus />
      </div>

      {/* Platform Performance Section */}
      <PlatformPerformance />
    </div>
  );
}
