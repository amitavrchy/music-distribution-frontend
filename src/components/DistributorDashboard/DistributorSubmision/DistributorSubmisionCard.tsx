import { Card } from "@/components/ui/card";

import total from "../../../assets/icons/total.png";
import pending from "../../../assets/icons/pending.png";
import approved from "../../../assets/icons/approved.png";
import decline from "../../../assets/icons/deline.png";

const DistributorSubmisionCard = () => {
  const metrics = [
    {
      icon: total,
      label: "Total Submissions",
      value: "2",
    },
    {
      icon: pending,
      label: "Pending Review",
      value: "0",
    },
    {
      icon: approved,
      label: "Approved",
      value: "2",
    },
    {
      icon: decline,
      label: "Declined",
      value: "0",
    },
  ];

  return (
    <div className="w-full text-white">
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
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="border border-[#c6c6c630] p-4 sm:p-6 rounded-[15px] bg-[#0D2223]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className=" flex-shrink-0">
                  <img
                    src={metric.icon}
                    alt={metric.label}
                    className="w-9 h-9"
                  />
                </div>
                <span className="text-gray-300 text-base font-medium">
                  {metric.label}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white">
                {metric.value}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DistributorSubmisionCard;
