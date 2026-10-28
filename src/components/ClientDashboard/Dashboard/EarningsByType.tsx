import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { AiFillDollarCircle } from "react-icons/ai";
import { IoEye } from "react-icons/io5";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  new: {
    label: "New Customer",
    color: "#4F46E5",
  },
  returning: {
    label: "Returning Customer",
    color: "#F97316",
  },
} satisfies ChartConfig;

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomizedLabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const percentText = `${(percent * 100).toFixed(0)}%`;

  return (
    <g>
      <circle cx={x} cy={y} r={16} fill="#262E40" opacity={0.9} />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}
        fontWeight="bold"
        fill="#FFFFFF"
      >
        {percentText}
      </text>
    </g>
  );
};

interface EarningsByTypeProps {
  data?: {
    free: { earnings: string; views: string; percentage: number };
    premium: { earnings: string; views: string; percentage: number };
  };
}

export default function EarningsByType({ data }: EarningsByTypeProps) {
  const chartData = data
    ? Object.entries(data).map(([key, value], index) => ({
        customer: key,
        visitors: value.percentage || 0,
        fill: index === 0 ? "#01C142" : "#F97316",
      }))
    : [];
  console.log("chartData", data);

  return (
    <div className="w-full mx-auto  bg-[#0C2322] border-[#1B2E2E]  rounded-2xl">
      <Card className="border-0 shadow-sm h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-white">
            Earnings By Type
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <div className="relative w-58 h-58">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-[#0B2120] rounded-full"></div>
              </div>

              <ChartContainer
                config={chartConfig}
                className="relative z-10 w-full h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      innerRadius={45}
                      dataKey="visitors"
                      strokeWidth={0}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="w-full mx-auto p-4">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                {data &&
                  Object.entries(data).map(([key, value], index) => (
                    <div
                      key={key}
                      className="bg-[#17171A] flex flex-col gap-4 p-6 rounded-xl w-full md:w-1/2 border border-gray-700 hover:scale-105 transform transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-4 h-4 rounded-full ${
                              index === 0 ? "bg-green-500" : "bg-orange-500"
                            }`}
                          ></span>
                          <span className="text-white font-medium text-lg capitalize">
                            {key}
                          </span>
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <span className="flex items-center gap-1 text-green-500 font-semibold text-md">
                          <AiFillDollarCircle className="h-5 w-5" />
                          {value.earnings || "$0.00"}
                        </span>

                        <span className="flex items-center gap-1 text-blue-500 font-semibold text-md">
                          <IoEye className="h-5 w-5" />
                          {value.views || "0"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* <button className="mt-6 w-full md:w-full bg-[#233635] text-white rounded-lg py-3 hover:bg-gray-600 transition-all font-medium text-lg cursor-pointer">
                View Full Details
              </button> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
