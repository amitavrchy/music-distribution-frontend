import { useGetAdminDashboardQuery } from "@/redux/features/admin/adminApi";
import DashboardCard from "./DashboardCard";
import ProfitLossSummary from "./ProfitLossSummary";
import RecentActivity from "./RecentActivity";
import RevenueOverview from "./RevenueOverview";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";

const AdminDashboard = () => {
  const { data: response, isLoading, isError } = useGetAdminDashboardQuery();

  if (isLoading) {
    return <ComponentLoader />;
  }

  // Fallback if data is missing or error
  if (isError || !response?.success || !response.data) {
    return (
      <div className="text-white p-4 text-center">
        Error loading dashboard data.
      </div>
    );
  }

  const { stats, revenueData, profitLossData, recentActivity } = response.data;

  return (
    <div className="space-y-6">
      <DashboardCard stats={stats} />
      <div className="flex flex-col lg:flex-row w-full gap-5">
        <div className="w-full lg:w-1/2">
          <RevenueOverview data={revenueData} />
        </div>
        <div className="w-full lg:w-1/2">
          <ProfitLossSummary data={profitLossData} />
        </div>
      </div>
      <div>
        <RecentActivity data={recentActivity} />
      </div>
    </div>
  );
};

export default AdminDashboard;
