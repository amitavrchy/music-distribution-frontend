import { Card } from "@/components/ui/card";
import { DashboardData } from "@/redux/features/distribution/distribution.type";

interface DistributorRecentActivityProps {
  data?: DashboardData;
}

export function DistributorRecentActivity({
  data,
}: DistributorRecentActivityProps) {
  // Calculate distribution status percentages
  const totalDistributions =
    (data?.distributionStatus.completed || 0) +
    (data?.distributionStatus.inProgress || 0) +
    (data?.distributionStatus.failed || 0);

  const distributionStatusItems = [
    {
      label: "Completed",
      percentage:
        totalDistributions > 0
          ? Math.round(
              ((data?.distributionStatus.completed || 0) / totalDistributions) *
                100,
            )
          : 0,
      color: "bg-green-500",
    },
    {
      label: "In progress",
      percentage:
        totalDistributions > 0
          ? Math.round(
              ((data?.distributionStatus.inProgress || 0) /
                totalDistributions) *
                100,
            )
          : 0,
      color: "bg-blue-500",
    },
    {
      label: "Failed",
      percentage:
        totalDistributions > 0
          ? Math.round(
              ((data?.distributionStatus.failed || 0) / totalDistributions) *
                100,
            )
          : 0,
      color: "bg-red-500",
    },
  ];

  // Enhance platform performance data with icons
  const platformPerformanceData = data?.platformPerformance || [];
  return (
    <div className="">
      {/* Recent Activity + Distribution Status */}
      <div className="mt-[40px] w-full flex flex-col lg:flex-row gap-8">
        {/* Recent Activity Section */}
        <Card className="flex-1 border border-[#c6c6c630] bg-[#0D2223]">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {data?.recentActivity && data.recentActivity.length > 0 ? (
                data.recentActivity.map((activity, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm leading-relaxed">
                        {activity.title}
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">
                        {activity.subtitle}
                      </p>
                    </div>
                    <div className="text-slate-400 text-xs sm:text-sm ml-4 flex-shrink-0">
                      {activity.timestamp}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Distribution Status Section */}
        <Card className="w-full lg:w-[370px] border border-[#c6c6c630] bg-[#0D2223]">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Distribution Status
            </h2>
            <div className="space-y-6">
              {distributionStatusItems.map((status, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${status.color}`}
                      ></div>
                      <span className="text-white text-sm font-medium">
                        {status.label}
                      </span>
                    </div>
                    <span className="text-slate-400 text-sm">
                      {status.percentage}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${status.color}`}
                        style={{ width: `${status.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Platform Performance Section */}
      <div className="mt-[40px] bg-[#0D2223]">
        <Card className="border border-[#c6c6c630]">
          <div className="p-6 space-y-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              Platform Performance
            </h2>
            <div className="h-px w-full bg-[#304240]" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 ">
              {platformPerformanceData && platformPerformanceData.length > 0 ? (
                platformPerformanceData.map((platform, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-[#173033] text-white font-semibold">
                      {platform.name.slice(0, 1)}
                    </div>
                    <h3 className="text-white font-medium text-sm mb-1">
                      {platform.name}
                    </h3>
                    <p className="text-slate-400 text-xs">{platform.streams}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-slate-400 text-sm">
                    No platform performance data available
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
