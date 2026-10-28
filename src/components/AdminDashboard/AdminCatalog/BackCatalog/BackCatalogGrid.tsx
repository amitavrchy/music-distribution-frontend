import BackCatalogCard from "./BackCatalogCard";
import { BackCatalogEntry } from "./BackCatalog";

interface BackCatalogGridProps {
  data: BackCatalogEntry[];
  isLoading: boolean;
  isError: boolean;
}

const BackCatalogGrid: React.FC<BackCatalogGridProps> = ({
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <BackCatalogCard
          key={item._id || item.id || index}
          id={item.id || item._id || ""}
          name={item.releaseTitle}
          genre={item.genre || "N/A"}
          totalRelease={1} // Each card represents one release in back catalog usually
          releaseType={item.typeOfRelease}
          distributor={item.distributorName || "N/A"}
          label={item.labelName || "N/A"}
          totalTracks={item.trackCount || 0}
          dateRange={
            item.releaseDate
              ? new Date(item.releaseDate).toLocaleDateString()
              : "N/A"
          }
          imageUrl={item.image}
        />
      ))}
    </div>
  );
};

export default BackCatalogGrid;
