import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

import { EstimatedEarning as APIEstimatedEarning } from "@/redux/features/analytics/analytics.type";

type RevenueData = {
  month: string;
  revenue: number;
  views: number;
};

// Yearly data (by month) - Default fallback
const yearlyData: RevenueData[] = [
  { month: "Jan", revenue: 0, views: 0 },
  { month: "Feb", revenue: 0, views: 0 },
  { month: "Mar", revenue: 0, views: 0 },
  { month: "Apr", revenue: 0, views: 0 },
  { month: "May", revenue: 0, views: 0 },
  { month: "Jun", revenue: 0, views: 0 },
  { month: "Jul", revenue: 0, views: 0 },
  { month: "Aug", revenue: 0, views: 0 },
  { month: "Sep", revenue: 0, views: 0 },
  { month: "Oct", revenue: 0, views: 0 },
  { month: "Nov", revenue: 0, views: 0 },
  { month: "Dec", revenue: 0, views: 0 },
];

interface EstimatedEarningProps {
  data?: APIEstimatedEarning[];
  totalViews?: string;
  totalEarnings?: string;
}

const EstimatedEarning = ({
  data,
  totalViews,
  totalEarnings,
}: EstimatedEarningProps) => {
  // Map API data to chart format if available, otherwise use yearlyData
  const chartData =
    data && data.length > 0
      ? data.map((item) => ({
          month: item.month,
          revenue: item.earnings,
          views: item.views,
        }))
      : yearlyData;

  const formatTooltip = (value: number, name: string) => {
    if (name === "revenue") return [`$${value.toLocaleString()}`, "Earnings"];
    if (name === "views") return [value.toLocaleString(), "Views"];
    return [value, name];
  };

  return (
    <div className="bg-[#0C2322] border-[#1B2E2E]  rounded-2xl shadow-md p-8">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-sans text-white">Estimated Earnings</h1>
        </div>
        <div className="w-[250px] space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-sans">{totalViews || "0"}</h2>
            <h2 className="text-lg font-sans">{totalEarnings || "$0.00"}</h2>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#3A5CFF]"></div>
              <p>Views</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#01D449]"></div>
              <p>Earnings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#1f2937"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#969696" }}
              padding={{ left: 20 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#969696" }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
              formatter={formatTooltip}
              labelFormatter={(label) => `Month: ${label}`}
            />

            {/* Views */}
            <Area
              type="monotone"
              dataKey="views"
              stroke="#3A5CFF"
              fill="url(#colorViews)"
              strokeWidth={2}
              name="Views"
            />
            {/* Revenue */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#01D449"
              fill="url(#colorRevenue)"
              strokeWidth={2}
              name="Earnings"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-6 text-[#d1d1d1] text-base mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4  rounded-full bg-[#3A5CFF]"></div>
          <p>Views</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4  rounded-full bg-[#01D449]"></div>
          <p>Earnings</p>
        </div>
      </div>
    </div>
  );
};

export default EstimatedEarning;

// import {
//   AreaChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Area,
// } from "recharts";

// type RevenueData = {
//   month: string;
//   week?: string;
//   revenue: number;
//   inquiries: number;
//   views: number;
// };

// // Yearly data (by month)
// const yearlyData: RevenueData[] = [
//   { month: "Jan", revenue: 5000, inquiries: 120, views: 450 },
//   { month: "Feb", revenue: 8000, inquiries: 150, views: 600 },
//   { month: "Mar", revenue: 12000, inquiries: 200, views: 800 },
//   { month: "Apr", revenue: 18000, inquiries: 250, views: 950 },
//   { month: "May", revenue: 22000, inquiries: 300, views: 1100 },
//   { month: "June", revenue: 28000, inquiries: 350, views: 1300 },
//   { month: "July", revenue: 32000, inquiries: 400, views: 1500 },
//   { month: "Aug", revenue: 30000, inquiries: 380, views: 1400 },
//   { month: "Sep", revenue: 25000, inquiries: 320, views: 1200 },
//   { month: "Oct", revenue: 20000, inquiries: 280, views: 1000 },
//   { month: "Nov", revenue: 15000, inquiries: 220, views: 800 },
//   { month: "Dec", revenue: 10000, inquiries: 180, views: 600 },
// ];

// const EstimatedEarning = () => {
//   const formatTooltip = (value: number, name: string) => {
//     if (name === "revenue") return [`$${value.toLocaleString()}`, "Revenue"];
//     return [
//       value.toLocaleString(),
//       name.charAt(0).toUpperCase() + name.slice(1),
//     ];
//   };

//   return (
//     <div className="bg-gradient-to-r from-[#052117] via-[#0A1C19] to-[#0F131B] rounded-xl shadow-md p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-medium text-white">Estimated Earnings</h1>
//       </div>

//       {/* Chart */}
//       <div className="h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart
//             data={yearlyData}
//             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//           >
//             <defs>
//               <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
//               </linearGradient>
//               <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
//               </linearGradient>
//               <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
//               </linearGradient>
//             </defs>

//             <CartesianGrid
//               strokeDasharray="3 3"
//               vertical={false}
//               stroke="#f0f0f0"
//             />
//             <XAxis
//               dataKey="month"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#969696" }}
//               padding={{ left: 20 }}
//             />
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#969696" }}
//               tickFormatter={(value) => `$${value / 1000}k`}
//             />
//             <Tooltip
//               contentStyle={{
//                 borderRadius: "8px",
//                 boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//                 border: "none",
//               }}
//               formatter={formatTooltip}
//               labelFormatter={(label) => `Month: ${label}`}
//             />

//             <Area
//               type="monotone"
//               dataKey="views"
//               stroke="#9747FF"
//               fill="url(#colorViews)"
//               strokeWidth={2}
//               name="Product View"
//             />
//             <Area
//               type="monotone"
//               dataKey="inquiries"
//               stroke="#62B2FD"
//               fill="url(#colorInquiries)"
//               strokeWidth={2}
//               name="Inquiries"
//             />
//             <Area
//               type="monotone"
//               dataKey="revenue"
//               stroke="#3B82F6"
//               fill="url(#colorRevenue)"
//               strokeWidth={2}
//               name="Revenue"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Legend moved BELOW chart */}
//       <div className="flex justify-center items-center gap-6 text-[#d1d1d1] text-base mt-6">
//         <div className="flex items-center gap-4">
//           <div className="w-6 h-6 rounded-full bg-[#3A5CFF]"></div>
//           <p>Views</p>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="w-6 h-6 rounded-full bg-[#01D449]"></div>
//           <p>Earnings</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EstimatedEarning;
