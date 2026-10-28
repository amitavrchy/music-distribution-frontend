import { Card } from "@/components/ui/card";

interface StatusItem {
  label: string;
  percentage: number;
  color: string;
}

const distributionStatus: StatusItem[] = [
  {
    label: "Completed",
    percentage: 78,
    color: "bg-green-500",
  },
  {
    label: "In progress",
    percentage: 15,
    color: "bg-blue-500",
  },
  {
    label: "Failed",
    percentage: 7,
    color: "bg-red-500",
  },
];

const DistributionStatus = () => {
  return (
    <div>
      {/* Distribution Status Section */}
      <Card className="w-full lg:w-[370px] border border-[#c6c6c630] bg-[#0D2223]">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Distribution Status
          </h2>
          <div className="space-y-6">
            {distributionStatus.map((status, index) => (
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
  );
};

export default DistributionStatus;
