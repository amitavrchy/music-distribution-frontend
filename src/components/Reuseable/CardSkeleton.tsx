import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CardSkeletonProps {
  count?: number;
  className?: string;
  gridClassName?: string;
}

const CardSkeleton = ({
  count = 6,
  className,
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6",
}: CardSkeletonProps) => {
  return (
    <div className={cn(gridClassName, className)}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-[#0C1F21] p-2 rounded-xl overflow-hidden shadow-lg flex flex-col border border-[#2C403E] h-full"
        >
          {/* Image Skeleton */}
          <Skeleton className="w-full h-48 bg-gray-800 rounded-lg" />

          <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Title */}
              <Skeleton className="h-8 w-3/4 bg-gray-800" />
              {/* Artist */}
              <Skeleton className="h-6 w-1/2 bg-gray-800" />
              {/* Label */}
              <Skeleton className="h-5 w-1/3 bg-gray-800" />

              <hr className="border-[#2C2C2C]" />

              <div className="space-y-3 mt-2">
                <div className="flex justify-between items-center">
                  {/* ISRC */}
                  <Skeleton className="h-4 w-24 bg-gray-800" />
                  {/* Type */}
                  <Skeleton className="h-4 w-16 bg-gray-800" />
                </div>
                {/* Release Date */}
                <Skeleton className="h-4 w-40 bg-gray-800" />
              </div>
            </div>

            {/* Button Skeleton */}
            <div className="mt-4">
              <Skeleton className="h-10 w-full rounded-[15px] bg-gray-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
