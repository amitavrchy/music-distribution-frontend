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
import { useState, useMemo } from "react";
import { useGetAllBackCatalogueQuery } from "@/redux/features/newRelease/newReleaseApi";
import { useGetAdminBackCatalogueQuery } from "@/redux/features/admin/adminApi";
import { useAppSelector } from "@/redux/hooks/redux-hook";
import { AdminBackCatalogueEntry } from "@/redux/features/admin/admin.type";
import BackCatalogGrid from "./BackCatalogGrid";
import Pagination from "@/components/Reuseable/Pagination";

export interface BackCatalogEntry {
  _id?: string;
  id?: string;
  releaseTitle: string;
  albumLevelArtistName: string;
  typeOfRelease: string;
  genre?: string;
  distributorName?: string;
  labelName?: string;
  trackCount?: number;
  releaseDate?: string;
  image?: string;
}

const BackCatalog = () => {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const role = useAppSelector((state) => state.auth.user?.role);
  const isAdmin =
    role === "ADMIN" || role === "SUPER_ADMIN" || role === "DISTRIBUTOR";

  const {
    data: clientResponse,
    isLoading: isLoadingClient,
    isError: isErrorClient,
  } = useGetAllBackCatalogueQuery(
    {
      limit,
      page,
    },
    { skip: isAdmin },
  );

  const {
    data: adminResponse,
    isLoading: isLoadingAdmin,
    isError: isErrorAdmin,
  } = useGetAdminBackCatalogueQuery(
    {
      limit,
      page,
    },
    { skip: !isAdmin },
  );

  const response = isAdmin ? adminResponse : clientResponse;
  const isLoading = isAdmin ? isLoadingAdmin : isLoadingClient;
  const isError = isAdmin ? isErrorAdmin : isErrorClient;

  const backCatalogData: BackCatalogEntry[] = useMemo(() => {
    if (!response?.data) return [];

    if (isAdmin) {
      // Map AdminBackCatalogueEntry to BackCatalogEntry
      return (response.data as AdminBackCatalogueEntry[]).map((apiItem) => ({
        id: apiItem.catalogueId,
        releaseTitle: apiItem.releaseTitle,
        albumLevelArtistName: apiItem.releaseArtist,
        typeOfRelease: apiItem.releaseType,
        genre: "N/A", // Genre not in admin summary
        distributorName: apiItem.distributor,
        labelName: apiItem.labelName,
        trackCount: 0, // TrackCount not in admin summary
        releaseDate: apiItem.releaseDate,
        image: undefined, // Image not in admin summary
      }));
    }

    return response.data;
  }, [response, isAdmin]);

  const totalItems = response?.metadata?.total || 0;
  const totalPages = response?.metadata?.totalPage || 1;

  // Local filtering for search and type
  const filteredData = backCatalogData.filter((item: BackCatalogEntry) => {
    const matchesSearch =
      item.releaseTitle?.toLowerCase().includes(search.toLowerCase()) ||
      item.albumLevelArtistName?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? item.typeOfRelease === filter : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-9">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-sans">Back Catalog</h1>
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2C2C2C] border border-[#585858] text-white text-lg font-bold">
              {totalItems}
            </span>
          </div>
          <p className="text-base">
            See all the back catalog from the clients and their status
          </p>
        </div>
        {/* Right: Controls */}
        <div className="flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="w-full sm:w-72 md:w-96 relative">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border h-12 bg-[#171719] border-[#696B6F] rounded-[15px] px-3 py-2 pr-10 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="Search "
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
              <IoSearch className="w-4 h-4 md:w-5 md:h-5" />
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
            {/* Filter Dropdown */}
            <Select>
              <SelectTrigger className="w-full sm:w-full md:w-[240px] h-12 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
                <SelectValue
                  placeholder="Filter By Artist"
                  className="text-gray-300"
                />
              </SelectTrigger>
              <SelectContent className="border-none bg-[#17171A] text-white font-sans shadow-lg rounded-lg">
                <SelectGroup>
                  <SelectItem
                    value="all"
                    className="hover:bg-[#131320] p-3 cursor-pointer"
                  >
                    All Artists
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Release Type Select */}
            <Select
              onValueChange={(value) => setFilter(value === "all" ? "" : value)}
            >
              <SelectTrigger className="w-full sm:w-full md:w-[240px] h-12 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
                <SelectValue
                  placeholder="Release Type"
                  className="text-gray-300"
                />
              </SelectTrigger>
              <SelectContent className="border-none bg-[#17171A] text-white font-sans shadow-lg rounded-lg">
                <SelectGroup>
                  <SelectItem
                    value="all"
                    className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                  >
                    All Types
                  </SelectItem>
                  <SelectItem
                    value="Album"
                    className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                  >
                    Album
                  </SelectItem>
                  <SelectItem
                    value="Single"
                    className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
                  >
                    Single
                  </SelectItem>
                  <SelectItem
                    value="EP"
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

      <BackCatalogGrid
        data={filteredData}
        isLoading={isLoading}
        isError={isError}
      />

      <Pagination
        currentPage={page}
        totalPage={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
};

export default BackCatalog;
