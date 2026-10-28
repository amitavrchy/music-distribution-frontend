import { useState } from "react";
import BackCatalog from "@/components/DistributorDashboard/DistributorDashboardBackCatalog/BackCatalog";
import DistributorBackCatalogGrid from "@/components/DistributorDashboard/DistributorDashboardBackCatalog/DistributorBackCatalogGrid";
import { useGetAdminBackCatalogueQuery } from "@/redux/features/admin/adminApi";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";

const DistributorBackCatalog = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page] = useState(1);
  const [limit] = useState(10);

  const {
    data: response,
    isLoading,
    isError,
  } = useGetAdminBackCatalogueQuery({
    limit,
    page,
  });

  const backCatalogData = response?.data || [];

  const filteredData = backCatalogData.filter((item) => {
    const matchesSearch =
      item.releaseTitle?.toLowerCase().includes(search.toLowerCase()) ||
      item.releaseArtist?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter && filter !== "all" ? item.releaseType === filter : true;
    return matchesSearch && matchesFilter;
  });
  if (isLoading) {
    return <ComponentLoader />;
  }
  return (
    <div className="space-y-10">
      <BackCatalog
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        totalItems={response?.metadata?.total || 0}
      />
      <DistributorBackCatalogGrid
        data={filteredData}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default DistributorBackCatalog;
