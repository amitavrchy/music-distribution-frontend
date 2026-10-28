import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MonthlyProfitLossData } from "@/redux/features/accountant/accountant.type";
import { useSearchParams } from "react-router-dom";

interface LossSummaryProps {
  monthlyData: MonthlyProfitLossData[];
}

// Format Y-axis to display in k
const formatYAxis = (tick: number) => `${tick / 1000}k`;

const LossSummary = ({ monthlyData }: LossSummaryProps) => {
  const [hovered, setHovered] = useState(false);
  const [searchParams] = useSearchParams();

  type PeriodType =
    | "last_7_days"
    | "last_30_days"
    | "last_6_months"
    | "yearly"
    | "this_year";
  const selectedFilter =
    (searchParams.get("period") as PeriodType) || "last_6_months";

  const dummy7DaysData = [
    { name: "Mon", loss: 0 },
    { name: "Tue", loss: 0 },
    { name: "Wed", loss: 0 },
    { name: "Thu", loss: 0 },
    { name: "Fri", loss: 0 },
    { name: "Sat", loss: 0 },
    { name: "Sun", loss: 0 },
  ];

  const dummy30DaysData = Array.from({ length: 30 }, (_, i) => ({
    name: (i + 1).toString(),
    loss: 0,
  }));

  const dummy6MonthsData = [
    { name: "Jan", loss: 0 },
    { name: "Feb", loss: 0 },
    { name: "Mar", loss: 0 },
    { name: "Apr", loss: 0 },
    { name: "May", loss: 0 },
    { name: "Jun", loss: 0 },
  ];

  const dummyYearlyData = [
    { name: "2020", loss: 0 },
    { name: "2021", loss: 0 },
    { name: "2022", loss: 0 },
    { name: "2023", loss: 0 },
    { name: "2024", loss: 0 },
  ];

  const transformedMonthlyData =
    monthlyData.length > 0
      ? monthlyData.map((item) => ({
          name: item.month.substring(0, 3),
          loss: item.expense > item.income ? item.expense - item.income : 0,
        }))
      : [
          { name: "Jan", loss: 0 },
          { name: "Feb", loss: 0 },
          { name: "Mar", loss: 0 },
          { name: "Apr", loss: 0 },
          { name: "May", loss: 0 },
          { name: "Jun", loss: 0 },
          { name: "Jul", loss: 0 },
          { name: "Aug", loss: 0 },
          { name: "Sep", loss: 0 },
          { name: "Oct", loss: 0 },
          { name: "Nov", loss: 0 },
          { name: "Dec", loss: 0 },
        ];

  const barData = {
    last_7_days: dummy7DaysData,
    last_30_days: dummy30DaysData,
    last_6_months: dummy6MonthsData,
    yearly: dummyYearlyData,
    this_year: transformedMonthlyData,
  };

  const currentData = barData[selectedFilter];

  return (
    <div className="w-full h-full p-6 bg-[#0C1D21] rounded-xl shadow-md space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] leading-[130%] text-white">Loss Summary</h1>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={currentData} barGap={20}>
          <Bar
            dataKey="loss"
            barSize={30}
            fill={hovered ? "#FF7B7B" : "#D31301"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />

          <CartesianGrid stroke="#2C3E50" strokeDasharray="5 5" />
          <XAxis dataKey="name" stroke="#969696" />
          <YAxis tickFormatter={formatYAxis} stroke="#969696" />
          <Tooltip
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            contentStyle={{
              backgroundColor: "#1E293B",
              borderRadius: "8px",
              border: "none",
            }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LossSummary;
