/* eslint-disable @typescript-eslint/no-explicit-any */
import MiniTitle from "@/components/ClientDashboard/Shared/MiniTitle";
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
import { RiDownloadLine } from "react-icons/ri";
// import { TbBrandDatabricks } from "react-icons/tb";
import useSearchFilterData from "@/contexts/searchFilter/hooks/useSearchFilterData";
import useSearchFilterDispatch from "@/contexts/searchFilter/hooks/useSearchFilterDispatch";
import { useLazyGetReleasesQuery } from "@/redux/features/releaseAdminDistributor/releaseAdminDistributorApi";
import { exportToExcel } from "@/utils/exportUtils";
import { toast } from "sonner";
import { Release } from "@/redux/features/releaseAdminDistributor/releaseAdminDistributor.type";
// import { useNavigate } from "react-router-dom";

const DistributionHeader = () => {
  // const navigate = useNavigate();

  // const handleBulkDistribution = () => {
  //   navigate("/distributor-dashboard/distribution/confirm-distribution");
  //   window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
  // };

  const { searchText, releaseRange, status } = useSearchFilterData();

  const { setSearchText, setReleaseRange, setStatus } =
    useSearchFilterDispatch();

  const [triggerGetReleases, { isFetching: isExporting }] =
    useLazyGetReleasesQuery();

  const handleExport = async () => {
    try {
      // Fetch data for export (using a high limit to get all relevant records if possible)
      const response = await triggerGetReleases({
        page: 1,
        limit: 1000,
      }).unwrap();

      if (!response?.data || response.data.length === 0) {
        toast.error("No data available to export");
        return;
      }

      // Filter data based on current UI filters
      const filteredData = response.data.filter((item: Release) => {
        // 1. Search text filter
        const matchesSearch = searchText
          ? item.releaseTitle
              ?.toLowerCase()
              .includes(searchText.toLowerCase()) ||
            item.artistName?.toLowerCase().includes(searchText.toLowerCase())
          : true;

        // 2. Status filter
        let matchesStatus = true;
        if (status && status !== "all") {
          if (status === "active") {
            matchesStatus = item.status === "Approved";
          } else if (status === "inactive") {
            matchesStatus =
              item.status === "Draft" || item.status === "Declined";
          }
        }

        // 3. Date range filter
        let matchesDate = true;
        if (releaseRange) {
          const itemDate = new Date(item.createdAt);
          const now = new Date();
          const diffInMs = now.getTime() - itemDate.getTime();
          const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

          switch (releaseRange) {
            case "last_7_days":
              matchesDate = diffInDays <= 7;
              break;
            case "last_30_days":
              matchesDate = diffInDays <= 30;
              break;
            case "last_6_months":
              matchesDate = diffInDays <= 180;
              break;
            case "last_1_year":
              matchesDate = diffInDays <= 365;
              break;
            case "this_year":
              matchesDate = itemDate.getFullYear() === now.getFullYear();
              break;
            default:
              matchesDate = true;
          }
        }

        return matchesSearch && matchesStatus && matchesDate;
      });

      if (filteredData.length === 0) {
        toast.error("No data matches the current filters");
        return;
      }

      // Map data for export
      const dataToExport = filteredData.map((item: Release) => ({
        "Release Title": item.releaseTitle,
        "Artist Name": item.artistName || "N/A",
        Type: item.typeOfRelease,
        "Release Date": item.releaseDate
          ? new Date(item.releaseDate).toLocaleDateString()
          : "N/A",
        Status: item.status,
        UPC: item.upc || "N/A",
        "Created At": new Date(item.createdAt).toLocaleDateString(),
      }));

      exportToExcel(
        dataToExport as any,
        `Distribution_List_${new Date().toISOString().split("T")[0]}.xlsx`,
      );

      toast.success("Excel file generated successfully");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export data. Please try again.");
    }
  };

  return (
    <div className="space-y-8 md:space-y-10 ">
      {/* Title */}
      <MiniTitle
        title="Distribution Management"
        subTitle="Effective distribution management ensures that products reach their intended markets efficiently and on time."
      />

      {/* copy */}

      <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-6 w-full">
        {/* Left: Search & Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-[200px] md:w-[250px] lg:w-[400px]">
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-12 px-4 pr-12 rounded-[15px] border border-[#696B6F] bg-[#171719] 
                       text-sm md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="Search"
            />
            <span className="absolute inset-y-0 right-4 flex items-center text-gray-400 cursor-pointer">
              <IoSearch className="w-5 h-5 md:w-6 md:h-6" />
            </span>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Release Type */}
            <Select
              value={releaseRange ?? "all"}
              onValueChange={(value) =>
                setReleaseRange(value === "all" ? null : (value as any))
              }
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
                    All Time
                  </SelectItem>
                  <SelectItem
                    value="last_7_days"
                    className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                  >
                    Last 7 Days
                  </SelectItem>
                  <SelectItem
                    value="last_30_days"
                    className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                  >
                    Last 30 Days
                  </SelectItem>
                  <SelectItem
                    value="last_6_months"
                    className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                  >
                    Last 6 Months
                  </SelectItem>
                  <SelectItem
                    value="last_1_year"
                    className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                  >
                    Last 1 Year
                  </SelectItem>
                  <SelectItem
                    value="this_year"
                    className="hover:bg-[#131320] p-3 cursor-pointer"
                  >
                    This Year
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Status */}
            <Select
              value={status}
              onValueChange={(value: "all" | "active" | "inactive") =>
                setStatus(value)
              }
            >
              <SelectTrigger className="w-full sm:w-48 md:w-56 lg:w-52 h-12 rounded-[15px] border border-[rgba(226,232,240,0.3)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
                <SelectValue
                  placeholder="All Status"
                  className="text-gray-300"
                />
              </SelectTrigger>
              <SelectContent className="border-none bg-[#17171A] text-white rounded-lg shadow-lg">
                <SelectGroup>
                  <SelectItem
                    value="all"
                    className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
                  >
                    All Status
                  </SelectItem>
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

        {/* Right: Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center xl:items-end gap-4 w-full lg:w-auto">
          {/* Distribution Button */}
          {/* <button
            // onClick={() =>
            //   navigate(
            //     "/distributor-dashboard/distribution/confirm-distribution"
            //   )
            // }
            // onClick={handleBulkDistribution}
            className="bg-[#3A5CFF] flex w-full sm:w-auto h-12 px-4 justify-center items-center rounded-[15px] border border-slate-200/30 gap-2 hover:bg-[#2E4AE0] transition cursor-pointer"
          >
            <TbBrandDatabricks className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-sm md:text-base font-sans font-medium">
              Bulk Distribution
            </span>
          </button> */}

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex w-full sm:w-[150px] h-12 px-3 items-center gap-2 rounded-[15px] border border-[rgba(226,232,240,0.3)] bg-[rgba(255,255,255,0.1)] justify-center cursor-pointer hover:bg-[rgba(255,255,255,0.2)] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-sm md:text-base font-sans font-medium">
              {isExporting ? "Exporting..." : "Export Data"}
            </span>
            <RiDownloadLine
              className={`h-5 md:h-6 ${isExporting ? "animate-bounce" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DistributionHeader;

// import MiniTitle from "@/components/ClientDashboard/Shared/MiniTitle";
// import { Input } from "@/components/ui/input";
// import { IoSearch } from "react-icons/io5";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { RiDownloadLine } from "react-icons/ri";
// import { TbBrandDatabricks } from "react-icons/tb";

// const DistributionHeader = () => {
//   return (
//     <div className="space-y-10">
//       <MiniTitle
//         title="Distribution Management"
//         subTitle="Effective distribution management ensures that products reach their intended markets efficiently and on time."
//       />
//       {/* Right: Controls */}
//       <div className="flex justify-between items-center">
//         <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 w-full">
//           {/* Search Input */}
//           <div className="relative w-[200px] md:w-[250px] lg:w-[400px]">
//             <Input
//               className="w-full h-12 px-4 pr-12 rounded-[15px] border border-[#696B6F] bg-[#171719]
//                text-sm md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
//               placeholder="Search"
//             />
//             <span className="absolute inset-y-0 right-4 flex items-center text-gray-400 cursor-pointer">
//               <IoSearch className="w-5 h-5 md:w-6 md:h-6" />
//             </span>
//           </div>

//           {/* Filters */}
//           <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//             {/* Release Type */}
//             <Select>
//               <SelectTrigger className="w-full sm:w-48 md:w-56 lg:w-52 h-12 rounded-[15px] border border-[rgba(226,232,240,0.3)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
//                 <SelectValue
//                   placeholder="Release Type"
//                   className="text-gray-300"
//                 />
//               </SelectTrigger>
//               <SelectContent className="border-none bg-[#17171A] text-white rounded-lg shadow-lg">
//                 <SelectGroup>
//                   <SelectItem
//                     value="last_7_days"
//                     className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
//                   >
//                     Last 7 Days
//                   </SelectItem>
//                   <SelectItem
//                     value="last_30_days"
//                     className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
//                   >
//                     Last 30 Days
//                   </SelectItem>
//                   <SelectItem
//                     value="last_6_months"
//                     className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
//                   >
//                     Last 6 Months
//                   </SelectItem>
//                   <SelectItem
//                     value="last_1_year"
//                     className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
//                   >
//                     Last 1 Year
//                   </SelectItem>
//                   <SelectItem
//                     value="this_year"
//                     className="hover:bg-[#131320] p-3 cursor-pointer"
//                   >
//                     This Year
//                   </SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>

//             {/* Status */}
//             <Select>
//               <SelectTrigger className="w-full sm:w-48 md:w-56 lg:w-52 h-12 rounded-[15px] border border-[rgba(226,232,240,0.3)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
//                 <SelectValue
//                   placeholder="All Status"
//                   className="text-gray-300"
//                 />
//               </SelectTrigger>
//               <SelectContent className="border-none bg-[#17171A] text-white rounded-lg shadow-lg">
//                 <SelectGroup>
//                   <SelectItem
//                     value="active"
//                     className="hover:bg-[#131320] p-3 border-b border-[#2C2C3A] cursor-pointer"
//                   >
//                     Active
//                   </SelectItem>
//                   <SelectItem
//                     value="inactive"
//                     className="hover:bg-[#131320] p-3 cursor-pointer"
//                   >
//                     Inactive
//                   </SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>

//           </div>
//         </div>
//         <div className="flex justify-between items-center gap-6">
//           {/* Distribution Button */}
//           <button className="bg-[#3A5CFF] flex h-12 px-4 justify-center items-center rounded-[15px] border border-slate-200/30 gap-2 hover:bg-[#2E4AE0] transition cursor-pointer">
//             <TbBrandDatabricks className="w-5 h-5 md:w-6 md:h-6" />
//             <span className="text-sm md:text-base font-sans font-medium">
//               Distribution
//             </span>
//           </button>

//           {/* Export Button */}
//           <button className="flex w-[150px] h-12 px-3 items-center gap-2 rounded-[15px] border border-[rgba(226,232,240,0.3)] bg-[rgba(255,255,255,0.1)] justify-center cursor-pointer hover:bg-[rgba(255,255,255,0.2)] transition">
//             <span className=" md:text-base font-sans font-medium">
//               Export Data
//             </span>
//             <RiDownloadLine className=" h-5 " />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DistributionHeader;
