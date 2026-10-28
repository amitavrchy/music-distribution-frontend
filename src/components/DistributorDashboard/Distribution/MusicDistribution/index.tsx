import { useState, useRef, useMemo } from "react";
import { useGetReleasesQuery } from "@/redux/features/releaseAdminDistributor/releaseAdminDistributorApi";
import MusicDistributionError from "./Error";
import MusicDistributionLoadingSkeleton from "./Loading";
import PendingItem from "./Item/PendingItem";
import DistributedItem from "./Item/DistributedItem";
import FailedItem from "./Item/FailedItem";
import useControlData from "@/contexts/control/hooks/useControlData";
import useSearchFilterData from "@/contexts/searchFilter/hooks/useSearchFilterData";
import DetailModal from "./DetailModal";
import type { JSX } from "react";
import type {
  Release,
  ReleasesMetadata,
} from "@/redux/features/releaseAdminDistributor/releaseAdminDistributor.type";

export default function MusicDistribution(): JSX.Element {
  const { isOpen: isConfirmDistributionModalOpen } = useControlData();
  const { searchText, releaseRange, status } = useSearchFilterData();
  const containerRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useGetReleasesQuery({
    page,
    limit: 10,
  });

  const filteredData = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((item: Release) => {
      // 1. Search text filter
      const matchesSearch = searchText
        ? item.releaseTitle?.toLowerCase().includes(searchText.toLowerCase()) ||
          item.artistName?.toLowerCase().includes(searchText.toLowerCase())
        : true;

      // 2. Status filter
      let matchesStatus = true;
      if (status && status !== "all") {
        if (status === "active") {
          matchesStatus =
            item.status === "Approved" ||
            item.status === "Distributed" ||
            item.status === "InProgress";
        } else if (status === "inactive") {
          matchesStatus =
            item.status === "Draft" ||
            item.status === "Pending" ||
            item.status === "Declined" ||
            !item.status;
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
  }, [data?.data, searchText, status, releaseRange]);

  const metaData: ReleasesMetadata | undefined = data?.metadata;
  const handleLoadMore = () => {
    if (!metaData) return;
    if (metaData?.page < metaData?.totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  if (isError) return <MusicDistributionError />;

  return (
    <div>
      <div ref={containerRef} className="text-white space-y-6">
        {filteredData.length > 0 ? (
          filteredData.map((item: Release) => {
            switch (item.status) {
              case "Distributed":
              case "InProgress":
                return <DistributedItem key={item.releaseId} data={item} />;

              case "Declined":
              case "Failed":
                return <FailedItem key={item.releaseId} data={item} />;

              default:
                return <PendingItem key={item.releaseId} data={item} />;
            }
          })
        ) : !isLoading && !isFetching ? (
          <div className="text-center py-10 text-gray-400">
            No releases found matching your criteria.
          </div>
        ) : null}
        {(isLoading || isFetching) && <MusicDistributionLoadingSkeleton />}
        {isError && <MusicDistributionError />}
        {metaData && metaData.page < metaData.totalPage && (
          <div className="mx-auto w-fit">
            <button
              onClick={handleLoadMore}
              className=" text-blue-500 hover:underline cursor-pointer text-center font-medium"
            >
              Load More →
            </button>
          </div>
        )}
      </div>

      {/* ConfirmDistribution modal */}
      {isConfirmDistributionModalOpen && <DetailModal />}
    </div>
  );
}
