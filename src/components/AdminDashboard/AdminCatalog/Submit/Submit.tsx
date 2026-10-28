import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface SubmitProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  statusFilter: "All" | "PendingReview" | "Approved" | "Declined";
  setStatusFilter: Dispatch<
    SetStateAction<"All" | "PendingReview" | "Approved" | "Declined">
  >;
}

const Submit = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: SubmitProps) => {
  return (
    <div className="space-y-9">
      {/* Top container */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        {/* Left: Heading */}
        <div className="space-y-1">
          <h1 className="text-2xl font-sans">Client Submissions</h1>
          <p className="text-base">
            See all the submissions from the clients and their status
          </p>
        </div>

        {/* Right: Controls (shows below on md/sm, side on lg+) */}
        <div className="flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="w-full sm:w-72 md:w-96 relative">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border h-12 bg-[#171719] border-[#696B6F] rounded-[15px] px-3 py-2 pr-10 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="Search"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
              <IoSearch className="w-4 h-4 md:w-5 md:h-5" />
            </span>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 w-full lg:w-auto">
            <Select
              value={statusFilter}
              onValueChange={(
                value: "All" | "PendingReview" | "Approved" | "Declined",
              ) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-full sm:w-[200px] md:w-[240px] h-12 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
                <SelectValue
                  placeholder="Filter By Status"
                  className="text-gray-300"
                />
              </SelectTrigger>
              <SelectContent className="border-none bg-[#17171A] text-white font-sans shadow-lg rounded-lg">
                <SelectGroup>
                  <SelectItem
                    value="All"
                    className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                  >
                    All Status
                  </SelectItem>
                  <SelectItem
                    value="PendingReview"
                    className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                  >
                    Pending Review
                  </SelectItem>
                  <SelectItem
                    value="Approved"
                    className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                  >
                    Approved
                  </SelectItem>
                  <SelectItem
                    value="Declined"
                    className="hover:bg-[#131320] p-3 cursor-pointer"
                  >
                    Declined
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full sm:w-[200px] md:w-[240px] h-12 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
                <SelectValue
                  placeholder="Release Type"
                  className="text-gray-300"
                />
              </SelectTrigger>
              <SelectContent className="border-none bg-[#17171A] text-white font-sans shadow-lg rounded-lg">
                <SelectGroup>
                  <SelectItem
                    value="single"
                    className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                  >
                    Single
                  </SelectItem>
                  <SelectItem
                    value="album"
                    className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                  >
                    Album
                  </SelectItem>
                  <SelectItem
                    value="ep"
                    className="hover:bg-[#131320] p-3 cursor-pointer"
                  >
                    EP
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;
