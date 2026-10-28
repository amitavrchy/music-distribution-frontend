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
import MiniTitle from "@/components/ClientDashboard/Shared/MiniTitle";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ClientManageHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
}

const ClientManageHeader = ({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
}: ClientManageHeaderProps) => {
  return (
    <div className="space-y-6 md:space-y-9">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-col xl:flex-row justify-between items-start lg:items-start gap-6 w-full">
        {/* Left: Title */}
        <MiniTitle
          title="Client Management"
          subTitle="Create and manage client profiles for distribution team use."
        />

        {/* Right: Controls (responsive stack) */}
        <div className="flex flex-col sm:flex-row lg:flex-row items-stretch lg:items-center gap-4 w-full lg:w-auto">
          {/* Search Input */}
          <div className="w-full sm:flex-1 md:w-72 lg:w-80 relative">
            <Input
              className="w-full h-12 border bg-[#17171A] border-[#696B6F] rounded-[15px] px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm md:text-base"
              placeholder="Search clients"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
              <IoSearch className="w-4 h-4 md:w-5 md:h-5" />
            </span>
          </div>

          {/* Filter */}
          <div className="w-full sm:w-48 md:w-56">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full h-12 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
                <SelectValue
                  placeholder="Select Role"
                  className="text-gray-300"
                />
              </SelectTrigger>

              <SelectContent className="border-none bg-[#17171A] text-white font-sans shadow-lg rounded-lg">
                <SelectGroup>
                  <SelectItem
                    value="all"
                    className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                  >
                    All Roles
                  </SelectItem>
                  <SelectItem
                    value="ADMIN"
                    className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                  >
                    Admin
                  </SelectItem>
                  <SelectItem
                    value="DISTRIBUTOR"
                    className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                  >
                    Distributor
                  </SelectItem>
                  <SelectItem
                    value="ACCOUNTANT"
                    className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                  >
                    Accountant
                  </SelectItem>
                  <SelectItem
                    value="Artist"
                    className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                  >
                    Artist
                  </SelectItem>
                  <SelectItem
                    value="CLIENT"
                    className="hover:bg-[#131320] p-3 cursor-pointer"
                  >
                    Client
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Add Button */}
          <Link
            to="/distributor-dashboard/client/create"
            className="w-full sm:w-auto"
          >
            <Button className="bg-[#3a5cff] hover:bg-[#2649fc] text-base font-sans h-12 text-white px-4 py-2 rounded-[15px] flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer">
              Add New Client <FaPlus className="text-sm" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientManageHeader;
