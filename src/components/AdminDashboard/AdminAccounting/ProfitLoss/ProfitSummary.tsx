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

interface ProfitSummaryProps {
  monthlyData: MonthlyProfitLossData[];
}

// Format Y-axis to show values in k
const formatYAxis = (tick: number) => `${tick / 1000}k`;

const ProfitSummary = ({ monthlyData }: ProfitSummaryProps) => {
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
    { name: "Mon", profit: 0 },
    { name: "Tue", profit: 0 },
    { name: "Wed", profit: 0 },
    { name: "Thu", profit: 0 },
    { name: "Fri", profit: 0 },
    { name: "Sat", profit: 0 },
    { name: "Sun", profit: 0 },
  ];

  const dummy30DaysData = [
    { name: "1", profit: 0 },
    { name: "2", profit: 0 },
    { name: "3", profit: 0 },
    { name: "4", profit: 0 },
    { name: "5", profit: 0 },
    { name: "6", profit: 0 },
    { name: "7", profit: 0 },
    { name: "8", profit: 0 },
    { name: "9", profit: 0 },
    { name: "10", profit: 0 },
    { name: "11", profit: 0 },
    { name: "12", profit: 0 },
    { name: "13", profit: 0 },
    { name: "14", profit: 0 },
    { name: "15", profit: 0 },
    { name: "16", profit: 0 },
    { name: "17", profit: 0 },
    { name: "18", profit: 0 },
    { name: "19", profit: 0 },
    { name: "20", profit: 0 },
    { name: "21", profit: 0 },
    { name: "22", profit: 0 },
    { name: "23", profit: 0 },
    { name: "24", profit: 0 },
    { name: "25", profit: 0 },
    { name: "26", profit: 0 },
    { name: "27", profit: 0 },
    { name: "28", profit: 0 },
    { name: "29", profit: 0 },
    { name: "30", profit: 0 },
  ];

  const dummy6MonthsData = [
    { name: "Jan", profit: 0 },
    { name: "Feb", profit: 0 },
    { name: "Mar", profit: 0 },
    { name: "Apr", profit: 0 },
    { name: "May", profit: 0 },
    { name: "Jun", profit: 0 },
  ];

  const dummyYearlyData = [
    { name: "2020", profit: 0 },
    { name: "2021", profit: 0 },
    { name: "2022", profit: 0 },
    { name: "2023", profit: 0 },
    { name: "2024", profit: 0 },
  ];

  const transformedMonthlyData =
    monthlyData.length > 0
      ? monthlyData.map((item) => ({
          name: item.month.substring(0, 3),
          profit: item.income - item.expense,
        }))
      : [
          { name: "Jan", profit: 0 },
          { name: "Feb", profit: 0 },
          { name: "Mar", profit: 0 },
          { name: "Apr", profit: 0 },
          { name: "May", profit: 0 },
          { name: "Jun", profit: 0 },
          { name: "Jul", profit: 0 },
          { name: "Aug", profit: 0 },
          { name: "Sep", profit: 0 },
          { name: "Oct", profit: 0 },
          { name: "Nov", profit: 0 },
          { name: "Dec", profit: 0 },
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
        <h1 className="text-[24px] leading-[130%] text-white">
          Profit Summary
        </h1>
      </div>

      {/* Profit Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={currentData} barGap={20}>
          <Bar
            dataKey="profit"
            barSize={30}
            fill={hovered ? "#5AFD7A" : "#1FCD5A"}
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

export default ProfitSummary;
