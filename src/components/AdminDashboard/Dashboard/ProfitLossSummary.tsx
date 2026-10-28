import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

import incomicon from "@/assets/icons/income1.svg";
import expressicon from "@/assets/icons/express1.svg";

import { ProfitLossData } from "@/redux/features/admin/admin.type";

const formatYAxis = (tick: number) => `${tick / 1000}k`;

interface ProfitLossSummaryProps {
  data?: ProfitLossData[];
}

const ProfitLossSummary = ({ data }: ProfitLossSummaryProps) => {
  type FilterType =
    | "last_7_days"
    | "last_30_days"
    | "last_6_months"
    | "yearly"
    | "this_year";
  const [selectedFilter, setSelectedFilter] =
    useState<FilterType>("last_6_months");
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Transform or use empty default
  const chartData =
    data && data.length > 0
      ? data.map((item) => ({
          name: item.month,
          profit: item.profit,
          loss: item.loss,
        }))
      : [
          { name: "Jan", profit: 0, loss: 0 },
          { name: "Feb", profit: 0, loss: 0 },
          { name: "Mar", profit: 0, loss: 0 },
          { name: "Apr", profit: 0, loss: 0 },
          { name: "May", profit: 0, loss: 0 },
          { name: "Jun", profit: 0, loss: 0 },
          { name: "Jul", profit: 0, loss: 0 },
        ];
  const dummy7DaysData = [
    { name: "Mon", profit: 0, loss: 0 },
    { name: "Tue", profit: 0, loss: 0 },
    { name: "Wed", profit: 0, loss: 0 },
    { name: "Thu", profit: 0, loss: 0 },
    { name: "Fri", profit: 0, loss: 0 },
    { name: "Sat", profit: 0, loss: 0 },
    { name: "Sun", profit: 0, loss: 0 },
  ];
  const barData: Record<FilterType, typeof chartData> = {
    last_7_days: dummy7DaysData,
    last_30_days: chartData,
    last_6_months: chartData,
    yearly: chartData,
    this_year: chartData,
  };
  const currentData = barData[selectedFilter];

  return (
    <div className="w-full h-full p-6 bg-[#0C1D21] rounded-xl shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-[24px] leading-[130%] text-white">
          Profit & Loss Summary
        </h1>

        <div className="flex gap-6 text-white text-base">
          <div className="flex items-center gap-2">
            <img src={incomicon} className="w-6 h-6" alt="Profit" />
            <p className="text-[#3A5CFF] font-medium">Profit</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={expressicon} className="w-6 h-6" alt="Loss" />
            <p className="text-[#D31301] font-medium">Loss</p>
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="w-full sm:w-[250px] md:w-[221px]">
          <Select
            onValueChange={(value) => setSelectedFilter(value as FilterType)}
            defaultValue="last_6_months"
          >
            <SelectTrigger className="w-full h-10 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base text-white">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="border-none bg-[#17171A] text-white font-sans shadow-lg rounded-lg">
              <SelectGroup>
                <SelectItem
                  value="last_7_days"
                  className="hover:bg-[#131320] p-2 cursor-pointer border-b border-[#2C2C3A]"
                >
                  Last 7 Days
                </SelectItem>
                <SelectItem
                  value="last_30_days"
                  className="hover:bg-[#131320] p-2 cursor-pointer border-b border-[#2C2C3A]"
                >
                  Last 30 Days
                </SelectItem>
                <SelectItem
                  value="last_6_months"
                  className="hover:bg-[#131320] p-2 cursor-pointer border-b border-[#2C2C3A]"
                >
                  Last 6 Months
                </SelectItem>
                <SelectItem
                  value="this_year"
                  className="hover:bg-[#131320] p-2 cursor-pointer"
                >
                  This Year
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={currentData} barGap={20}>
          <Bar
            dataKey="profit"
            barSize={30}
            fill={hoveredBar === "profit" ? "#5A8CFF" : "#3A5CFF"}
            onMouseEnter={() => setHoveredBar("profit")}
            onMouseLeave={() => setHoveredBar(null)}
          />
          <Bar
            dataKey="loss"
            barSize={30}
            fill={hoveredBar === "loss" ? "#FF4D4D" : "#D31301"}
            onMouseEnter={() => setHoveredBar("loss")}
            onMouseLeave={() => setHoveredBar(null)}
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
          {/* Legend with only icons, no text */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitLossSummary;
