import { Card } from "@/components/ui/card";

import earning from "@/assets/icons/earning.svg";
import comission from "@/assets/icons/comission.svg";
import NetEarnings from "@/assets/icons/NetEarnings.svg";
import { useGetAccountantDashboardQuery } from "@/redux/features/accountant/accountantApi";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";
import ComponentError from "@/components/Reuseable/ComponentError";

const DashboardCard = () => {
  const { data, isLoading, isError } = useGetAccountantDashboardQuery();

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (isError || !data?.data) {
    return <ComponentError />;
  }

  const metrics = [
    {
      icon: earning,
      label: "Total Earnings",
      value: data.data.totalEarnings,
    },
    {
      icon: comission,
      label: "Platform Commission (20%) ",
      value: data.data.platformCommission,
    },
    {
      icon: NetEarnings,
      label: "Net Earnings",
      value: data.data.netEarnings,
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-0 text-white">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white mb-1">
              Accounting Dashboard
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              High-level overview of platform earnings, payments, and client
              statements.
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-[#0C201F] border border-[#304240] p-4 sm:p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 ">
                <div className="p-2">
                  <img
                    src={metric.icon}
                    alt={metric.label}
                    className="w-9 h-9"
                  />
                </div>
                <span className="text-gray-300 text-base font-sans">
                  {metric.label}
                </span>
              </div>
              <div className="text-5xl font-sans  font-bold text-white">
                {metric.value}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
