import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import search from "../../assets/icons/search.png";
import calender from "../../assets/icons/calender.png";
import light from "../../assets/icons/Frame 1321317601 2.png";
import people from "../../assets/icons/people.png";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DashboardData } from "@/redux/features/distribution/distribution.type";

interface DistributorDashboardCardProps {
  data?: DashboardData;
}

const DistributorDashboardCard = ({ data }: DistributorDashboardCardProps) => {
  const metrics = [
    {
      icon: search,
      label: "Submissions to Review",
      value: data?.submissionsToReview?.toString() || "0",
    },
    {
      icon: light,
      label: "Releases to Distribute",
      value: data?.releasesToDistribute?.toString() || "0",
    },
    {
      icon: people,
      label: "New Clients (Last 30 Days)",
      value: data?.newClients?.toString() || "0",
    },
    {
      icon: calender,
      label: "Live Releases",
      value: data?.liveReleases?.toString() || "0",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-0 text-white ">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white mb-1">
              Distribution Dashboard
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Overview of all distribution activities
            </p>
          </div>
          <Link
            to="/distributor-dashboard/client/create"
            className="w-full sm:w-auto"
          >
            <Button className="bg-[#3a5cff] hover:bg-[#2649fc] text-base font-sans h-12 text-white px-4 py-2 rounded-[15px] flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer">
              Add New Client <FaPlus />
            </Button>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-[#0D2223] border border-[#304240] p-4 sm:p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0">
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

export default DistributorDashboardCard;
