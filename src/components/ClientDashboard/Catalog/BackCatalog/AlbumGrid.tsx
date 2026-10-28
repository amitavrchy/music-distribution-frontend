import { useState, useMemo } from "react";
// import { Link } from "react-router-dom";
import AlbumCard from "./AlbumCard";
import AlbumCardSkeleton from "./AlbumCardSkeleton";

// import { IoSearch } from "react-icons/io5";
// import { IoMdAdd } from "react-icons/io";
// import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllBackCatalogueQuery } from "@/redux/features/newRelease/newReleaseApi";
import Pagination from "@/components/Reuseable/Pagination";
import { BackCatalogueData } from "../Submit/data";

// Placeholder image for fetched items if they don't have one
import placeholderImg from "@/assets/photo/image1.png";
// import { useAppSelector } from "@/redux/hooks/redux-hook";
// Unused mock data removed

const AlbumGrid = () => {
  const [search, ] = useState("");
  const [filterLabel, setFilterLabel] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [page, setPage] = useState(1);
  // const role = useAppSelector((state) => state.auth.user?.role);
  const limit = 9;

  const { data: backCatalogueResponse, isLoading } =
    useGetAllBackCatalogueQuery({
      page,
      limit,
    });

  const backCatalogueItems = useMemo(() => {
    return backCatalogueResponse?.data || [];
  }, [backCatalogueResponse]);

  const totalPages = useMemo(() => {
    return backCatalogueResponse?.meta?.totalPage || 1;
  }, [backCatalogueResponse]);

  const filteredItems = useMemo(() => {
    return backCatalogueItems.filter((item: BackCatalogueData) => {
      const matchesSearch =
        item.releaseTitle?.toLowerCase().includes(search.toLowerCase()) ||
        item.releaseArtist?.toLowerCase().includes(search.toLowerCase());

      const matchesLabel =
        filterLabel === "all" ? true : item.status === filterLabel;

      const albumYear = item.releaseDate
        ? new Date(item.releaseDate).getFullYear()
        : null;
      const currentYear = new Date().getFullYear();
      let matchesYear = true;

      switch (filterYear) {
        case "all":
          matchesYear = true;
          break;
        case "last_7_days":
          matchesYear = !!(
            item.releaseDate &&
            new Date(item.releaseDate) >=
              new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          );
          break;
        case "last_30_days":
          matchesYear = !!(
            item.releaseDate &&
            new Date(item.releaseDate) >=
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          );
          break;
        case "last_6_months":
          matchesYear = !!(
            item.releaseDate &&
            new Date(item.releaseDate) >=
              new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)
          );
          break;
        case "last_1_year":
          matchesYear = !!(
            item.releaseDate &&
            new Date(item.releaseDate) >=
              new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
          );
          break;
        case "this_year":
          matchesYear = albumYear === currentYear;
          break;
        default:
          matchesYear = true;
      }

      return matchesSearch && matchesLabel && matchesYear;
    });
  }, [backCatalogueItems, search, filterLabel, filterYear]);

  return (
    <div className="space-y-8">
      {/* Header: Titles + Search + Filters + Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 w-full">
        {/* Titles */}
        <div className="flex flex-col space-y-1 md:space-y-2 w-full md:w-auto">
          <h1 className="text-sm md:text-base font-sans text-gray-400">
            Catalog 
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-sans font-semibold text-white">
            Back Catalog 
          </h2>
        </div>

        {/* Search + Filters + Add */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full md:w-auto flex-wrap">


          {/* <div className="w-full sm:w-64 md:w-80 lg:w-96 relative">
            <Input
              className="w-full h-[44px] md:h-[48px] border bg-[#17171A] border-[#696B6F] rounded-[15px] px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm md:text-base"
              placeholder="Search"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
              <IoSearch className="w-4 h-4 md:w-5 md:h-5" />
            </span>
          </div> */}

          {/* Label Filter */}
          <Select onValueChange={setFilterLabel}>
            <SelectTrigger className="w-full sm:w-[200px] md:w-[240px] h-12 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] text-white text-sm md:text-base cursor-pointer">
              <SelectValue placeholder="Filter By Label" />
            </SelectTrigger>
            <SelectContent className="bg-[#17171A] text-white rounded-lg border-none ">
              <SelectGroup>
                <SelectItem className="cursor-pointer" value="all">
                  All Assets
                </SelectItem>
                <SelectItem className="cursor-pointer" value="PAID">
                  Paid Assets
                </SelectItem>
                <SelectItem className="cursor-pointer" value="PENDING">
                  Pending Assets
                </SelectItem>
                <SelectItem className="cursor-pointer" value="PROCESSING">
                  Processing Assets
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Year Filter */}
          <Select onValueChange={setFilterYear}>
            <SelectTrigger className="w-full sm:w-[200px] md:w-[240px] h-12 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] text-white text-sm md:text-base cursor-pointer">
              <SelectValue placeholder="Release Year" />
            </SelectTrigger>
            <SelectContent className="bg-[#17171A] text-white rounded-lg border-none ">
              <SelectGroup>
                <SelectItem className="cursor-pointer" value="all">
                  All
                </SelectItem>
                <SelectItem className="cursor-pointer" value="last_7_days">
                  Last 7 Days
                </SelectItem>
                <SelectItem className="cursor-pointer" value="last_30_days">
                  Last 30 Days
                </SelectItem>
                <SelectItem className="cursor-pointer" value="last_6_months">
                  Last 6 Months
                </SelectItem>
                <SelectItem className="cursor-pointer" value="last_1_year">
                  Last 1 Year
                </SelectItem>
                <SelectItem className="cursor-pointer" value="this_year">
                  This Year
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Add Button */}
          {/* <Link
            to={
              role === "ADMIN"
                ? "/admin/catalog/back-catalog/add"
                : "/client-dashboard/catalog/back-catalog/add"
            }
            className="w-full sm:w-auto"
          >
            <button className="w-full flex justify-center items-center gap-2 px-4 py-2 rounded-[15px] bg-[#3A5CFF] hover:bg-[#002afa] text-white font-medium text-base md:text-lg transition cursor-pointer">
              <span>Add</span>
              <IoMdAdd className="text-lg md:text-xl" />
            </button>
          </Link> */}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <AlbumCardSkeleton key={idx} />
          ))
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item: BackCatalogueData, idx: number) => (
            <AlbumCard
              key={item.id || idx}
              catalogueId={item.catalogueId}
              title={item.releaseTitle}
              artist={item.releaseArtist}
              label={item.labelName}
              upc={item.upc}
              releaseDate={item.releaseDate}
              type={item.releaseType}
              imageUrl={item.imageUrl || placeholderImg}
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No items found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPage={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default AlbumGrid;
