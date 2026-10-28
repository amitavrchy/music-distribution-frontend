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

interface BackCatalogProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  totalItems: number;
}

const BackCatalog = ({
  search,
  setSearch,
  filter,
  setFilter,
  totalItems,
}: BackCatalogProps) => {
  return (
    <div className="space-y-9">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-sans">Client Back Catalog Overview</h1>
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2C2C2C] border border-[#585858] text-white text-lg font-bold">
              {totalItems}
            </span>
          </div>
          <p className="text-base">
            View the historical music releases of all artists before they joined
            the platform.
          </p>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 w-full">
        {/* Search Input */}
        <div className="w-full lg:flex-1 relative">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full min-w-[200px] h-12 px-4 pr-12 rounded-[15px] border border-[#696B6F] bg-[#171719] text-sm md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            placeholder="Search"
          />
          <span className="absolute inset-y-0 right-4 flex items-center text-gray-400 cursor-pointer">
            <IoSearch className="w-5 h-5 md:w-6 md:h-6" />
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Release Type */}
          <Select
            onValueChange={(value) => setFilter(value)}
            value={filter || "all"}
          >
            <SelectTrigger className="w-full sm:w-48 md:w-56 lg:w-52 h-12 rounded-[15px] border border-[rgba(226,232,240,0.3)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
              <SelectValue
                placeholder="Release Type"
                className="text-gray-300"
              />
            </SelectTrigger>
            <SelectContent className="border-none bg-[#17171A] text-white rounded-lg shadow-lg">
              <SelectGroup>
                <SelectItem
                  value="all"
                  className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                >
                  All Types
                </SelectItem>
                <SelectItem
                  value="Album"
                  className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                >
                  Album
                </SelectItem>
                <SelectItem
                  value="Single"
                  className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                >
                  Single
                </SelectItem>
                <SelectItem
                  value="EP"
                  className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                >
                  EP
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Status (Optional, keeping placeholders if desired but API doesn't seem to have status filtering for admin back catalog yet) */}
          <Select>
            <SelectTrigger className="w-full sm:w-48 md:w-56 lg:w-52 h-12 rounded-[15px] border border-[rgba(226,232,240,0.3)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
              <SelectValue placeholder="All Status" className="text-gray-300" />
            </SelectTrigger>
            <SelectContent className="border-none bg-[#17171A] text-white rounded-lg shadow-lg">
              <SelectGroup>
                <SelectItem
                  value="active"
                  className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                >
                  Active
                </SelectItem>
                <SelectItem
                  value="inactive"
                  className="hover:bg-[#131320] p-3 cursor-pointer"
                >
                  Inactive
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BackCatalog;
