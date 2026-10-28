import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PlatformOverviewData } from "@/redux/features/analytics/analytics.type";
import YoutubeSection from "./YoutubeSection";

const Dashboard = ({ youtubeData }: { youtubeData?: PlatformOverviewData }) => {
  return (
    <div className=" space-y-9">
      <div className="flex justify-end items-center">
        <Select>
          <SelectTrigger className="w-full sm:w-[200px] md:w-[240px] h-12 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
            <SelectValue placeholder="Last 1 Year" className="text-gray-300" />
          </SelectTrigger>

          <SelectContent className="border-none bg-[#17171A] text-white font-sans shadow-lg rounded-lg">
            <SelectGroup>
              <SelectItem
                value="last_7_days"
                className="hover:bg-[#131320] p-3 cursor-pointer  border-b border-[#2C2C3A]"
              >
                Last 7 Days
              </SelectItem>
              <SelectItem
                value="last_30_days"
                className="hover:bg-[#131320] p-3 cursor-pointer   border-b border-[#2C2C3A]"
              >
                Last 30 Days
              </SelectItem>
              <SelectItem
                value="last_6_months"
                className="hover:bg-[#131320] p-3 cursor-pointer  border-b border-[#2C2C3A]"
              >
                Last 6 Months
              </SelectItem>
              <SelectItem
                value="last_1_year"
                className="hover:bg-[#131320] p-3 cursor-pointer  border-b border-[#2C2C3A]"
              >
                Last 1 Year
              </SelectItem>
              <SelectItem
                value="this_year"
                className="hover:bg-[#131320] p-3  cursor-pointer"
              >
                This Year
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <YoutubeSection data={youtubeData} platform="YouTube" />
      </div>
    </div>
  );
};

export default Dashboard;
