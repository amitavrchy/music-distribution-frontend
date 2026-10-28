import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductGallerySkeletonProps {
  count?: number;
  className?: string;
}

const ProductGallerySkeleton = ({
  count = 9,
  className,
}: ProductGallerySkeletonProps) => {
  return (
    <div className={cn("px-4 md:px-8 py-3", className)}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="relative">
            {/* Image skeleton — matches aspect-square of real cards */}
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-900 relative">
              <Skeleton className="w-full h-full bg-gray-800 rounded-lg" />
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            </div>

            {/* Title + Price row — matches the real card's flex row */}
            <div className="flex justify-between mt-2 px-1 gap-2">
              <Skeleton className="h-4 w-3/5 bg-gray-800 rounded" />
              <Skeleton className="h-4 w-1/5 bg-gray-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallerySkeleton;
