import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
import { MonthlyProfitLossData } from "@/redux/features/accountant/accountant.type";

type RevenueData = {
  month: string;
  income: number;
  expenses: number;
};

interface IcomeExpenssMonthProps {
  monthlyData: MonthlyProfitLossData[];
}

const IcomeExpenssMonth: React.FC<IcomeExpenssMonthProps> = ({
  monthlyData,
}) => {
  const [timeRange, setTimeRange] = useState<"Jan-Jun" | "Jul-Dec" | "Year">(
    "Year",
  );
  const [filteredData, setFilteredData] = useState<RevenueData[]>([]);

  // Convert API data to chart format
  useEffect(() => {
    const yearlyData: RevenueData[] = monthlyData.map((item) => ({
      month: item.month,
      income: item.income,
      expenses: item.expense,
    }));

    // Set initial data based on current timeRange
    switch (timeRange) {
      case "Jan-Jun":
        setFilteredData(yearlyData.slice(0, 6));
        break;
      case "Jul-Dec":
        setFilteredData(yearlyData.slice(6, 12));
        break;
      default:
        setFilteredData(yearlyData);
        break;
    }
  }, [monthlyData, timeRange]);

  // Handle time range change
  const handleTimeChange = (value: string) => {
    setTimeRange(value as "Jan-Jun" | "Jul-Dec" | "Year");
  };

  const formatTooltip = (value: number, name: string) => {
    return [
      `$${value.toLocaleString()}`,
      name.charAt(0).toUpperCase() + name.slice(1),
    ];
  };

  return (
    <div className="bg-[#0C2322] rounded-xl shadow-md p-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-medium text-white">
          Income vs Expenses By Month
        </h1>

        {/* Legend */}
        <div className="flex gap-6 text-white text-base">
          <div className="flex items-center gap-2">
            <img src={incomicon} className="w-6 h-6" alt="Income" />
            <span className="text-[#01D449] font-medium">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={expressicon} className="w-6 h-6" alt="Expenses" />
            <span className="text-[#D31301] font-medium">Expenses</span>
          </div>
        </div>

        {/* Time Range Dropdown */}
        <Select value={timeRange} onValueChange={handleTimeChange}>
          <SelectTrigger className="w-full sm:w-[200px] md:w-[240px] h-12 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
            <SelectValue placeholder="Select Range" className="text-gray-300" />
          </SelectTrigger>
          <SelectContent className="border-none bg-[#17171A] text-white font-sans shadow-lg rounded-lg">
            <SelectGroup>
              <SelectItem
                value="Jan-Jun"
                className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
              >
                Jan - Jun
              </SelectItem>
              <SelectItem
                value="Jul-Dec"
                className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
              >
                Jul - Dec
              </SelectItem>
              <SelectItem
                value="Year"
                className="hover:bg-[#131320] p-3 cursor-pointer"
              >
                Full Year
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <div className="h-80">
        {filteredData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#01D449" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#01D449" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D31301" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#D31301" stopOpacity={0} />
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
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  border: "none",
                }}
                formatter={formatTooltip}
                labelFormatter={(label) => `Month: ${label}`}
              />

              <Area
                type="monotone"
                dataKey="income"
                stroke="#01D449"
                fill="url(#colorIncome)"
                strokeWidth={2}
                name="Income"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#D31301"
                fill="url(#colorExpenses)"
                strokeWidth={2}
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default IcomeExpenssMonth;
