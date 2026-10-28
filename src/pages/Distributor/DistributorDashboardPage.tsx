// import { DashboardActivity } from "@/components/DistributorDashboard/Dashboard/DashboardActivity";
import DistributorDashboardCard from "@/components/DistributorDashboard/DistributorDashboardCard";
import { DistributorRecentActivity } from "@/components/DistributorDashboard/DistributorRecentActivity";
import { useGetDashboardQuery } from "@/redux/features/distribution/distributionApi";
import { Card } from "@/components/ui/card";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";

const DistributorDashboardPage = () => {
  const { data, isLoading, isError, error, refetch } = useGetDashboardQuery();

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (isError) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-0">
        <Card className="bg-[#0D2223] border border-[#304240] p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-4">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-400 mb-6">
            {error &&
            "data" in error &&
            typeof error.data === "object" &&
            error.data &&
            "message" in error.data
              ? String(error.data.message)
              : "Failed to load dashboard data"}
          </p>
          <button
            onClick={() => refetch()}
            className="bg-[#3a5cff] hover:bg-[#2649fc] text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <DistributorDashboardCard data={data?.data} />
      <DistributorRecentActivity data={data?.data} />
      {/* <DashboardActivity /> */}
    </div>
  );
};

export default DistributorDashboardPage;
