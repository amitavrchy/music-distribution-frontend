import DistributorBackCatalogCard from "./DistributorBackCatalogCard";

interface BackCatalogEntry {
  catalogueId: string;
  releaseTitle: string;
  releaseArtist: string;
  releaseType: string;
  distributor: string;
  labelName: string;
  releaseDate: string;
}

interface DistributorBackCatalogGridProps {
  data: BackCatalogEntry[];
  isLoading: boolean;
  isError: boolean;
}

const DistributorBackCatalogGrid: React.FC<DistributorBackCatalogGridProps> = ({
  data,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load back catalog. Please try again.
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No back catalog entries found.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((item) => (
          <DistributorBackCatalogCard
            key={item.catalogueId}
            id={item.catalogueId}
            name={item.releaseTitle}
            genre="N/A"
            totalRelease={1}
            releaseType={item.releaseType}
            distributor={item.distributor}
            label={item.labelName}
            totalTracks={0}
            dateRange={
              item.releaseDate
                ? new Date(item.releaseDate).toLocaleDateString()
                : "N/A"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default DistributorBackCatalogGrid;
