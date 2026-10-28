import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

import { RevenueData } from "@/redux/features/admin/admin.type";

interface RevenueOverviewProps {
  data?: RevenueData[];
}

const RevenueOverview = ({ data }: RevenueOverviewProps) => {
  const [selectedFilter, setSelectedFilter] = useState("yearly");

  // Transform API data for chart or use default 0s
  const apiChartData = {
    data: data?.map((item) => item.value) || [],
    categories: data?.map((item) => item.month) || [],
  };

  // Fallback if empty array
  if (apiChartData.data.length === 0) {
    apiChartData.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    apiChartData.categories = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  }
  const DummyWeeklyData = {
    data: [0, 0, 0, 0, 0, 0, 0],
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };
  const dummyMonthlyData = {
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };
  // Revenue dataset
  const chartData: Record<string, { data: number[]; categories: string[] }> = {
    last_7_days: DummyWeeklyData,
    last_30_days: dummyMonthlyData,
    last_6_months: apiChartData,
    yearly: apiChartData,
    this_year: apiChartData,
  };

  const currentData = chartData[selectedFilter];

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: currentData.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#969696",
        },
      },
    },
    yaxis: {
      min: 0,
      max: Math.max(...currentData.data) + 50,
      tickAmount: 6,
      labels: {
        style: {
          colors: "#969696",
        },
        formatter: (val) => `${Math.round(val)}`,
      },
    },
    tooltip: { enabled: true },
    legend: { show: false },
    grid: {
      borderColor: "#202727",
      row: {
        colors: ["#0C211F", "transparent"],
        opacity: 0.5,
      },
    },
    colors: ["#02D44A"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100],
        colorStops: [
          { offset: 0, color: "#02D44A", opacity: 0.4 },
          { offset: 50, color: "#02D44A", opacity: 0.1 },
          { offset: 100, color: "#02D44A", opacity: 0 },
        ],
      },
    },
  };

  return (
    <div className="w-full max-w-[748px] h-full max-h-[555px] bg-[#0C1D21] p-6 rounded-xl shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8 lg:gap-12 mb-8 w-full">
        <div className="w-full md:flex-1">
          <h1 className="text-[24px] leading-[130%] font-medium text-white mb-4">
            Revenue Overview
          </h1>
        </div>

        <div className="w-full sm:w-[250px] md:w-[221px]">
          <Select
            onValueChange={(value) => setSelectedFilter(value)}
            defaultValue="yearly"
          >
            <SelectTrigger className="w-full sm:w-[200px] md:w-[240px] h-10 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base text-white">
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
                  value="yearly"
                  className="hover:bg-[#131320] p-2 cursor-pointer border-b border-[#2C2C3A]"
                >
                  Yearly
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

      <ReactApexChart
        options={options}
        series={[{ name: "Revenue", data: currentData.data }]}
        type="area"
        height={350}
      />
    </div>
  );
};

export default RevenueOverview;
