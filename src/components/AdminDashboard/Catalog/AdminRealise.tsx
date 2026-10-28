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
import { useGetAllReleasesQuery } from "@/redux/features/newRelease/newReleaseApi";
import { useGetAdminReleasesQuery } from "@/redux/features/admin/adminApi";
import { useAppSelector } from "@/redux/hooks/redux-hook";
import { AdminRelease } from "@/redux/features/admin/admin.type";
import AdminRealiseTable from "./AdminRealiseTable";
import ReuseCatalog from "./ReuseCatalog";
import Pagination from "@/components/Reuseable/Pagination";

interface Release {
  _id?: string;
  id?: string;
  releaseTitle: string;
  albumLevelArtistName: string;
  upc?: string;
  typeOfRelease: string;
  releaseDate: string;
  status: string;
  image?: string;
}

const AdminRealise = () => {
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
  } = useGetAllReleasesQuery(
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
  } = useGetAdminReleasesQuery(
    {
      limit,
      page,
    },
    { skip: !isAdmin },
  );

  const response = isAdmin ? adminResponse : clientResponse;
  const isLoading = isAdmin ? isLoadingAdmin : isLoadingClient;
  const isError = isAdmin ? isErrorAdmin : isErrorClient;

  const releases: Release[] = useMemo(() => {
    if (!response?.data) return [];

    if (isAdmin) {
      // Map AdminRelease to Release interface if necessary
      return (response.data as AdminRelease[]).map((apiItem) => ({
        id: apiItem.releaseId,
        releaseTitle: apiItem.releaseTitle,
        albumLevelArtistName: apiItem.artistName || "N/A",
        upc: apiItem.upc,
        typeOfRelease: apiItem.typeOfRelease,
        releaseDate: apiItem.releaseDate,
        status: apiItem.status,
        image: undefined, // Image not in admin release summary
      }));
    }

    return response.data;
  }, [response, isAdmin]);

  const totalItems = response?.metadata?.total || 0;
  const totalPages = response?.metadata?.totalPage || 1;

  // Filter local releases based on search and type
  const filteredReleases = releases.filter((release: Release) => {
    const matchesSearch =
      release.releaseTitle.toLowerCase().includes(search.toLowerCase()) ||
      release.albumLevelArtistName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? release.typeOfRelease === filter : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-9">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* ... existing header ... */}
        <div className="flex items-center gap-3">
          <ReuseCatalog platform="Releases" icon="" />
          <span className="w-10 h-10 mt-8 flex items-center justify-center rounded-full bg-[#2C2C2C] border border-[#585858] text-white text-lg font-bold">
            {totalItems}
          </span>
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
            {/* Filter Dropdown (kept separate as placeholder for artist filter) */}
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

            {/* Release Type Select - Local filtering */}
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

      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-4 w-full">
          <AdminRealiseTable
            data={filteredReleases}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPage={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
};

export default AdminRealise;
