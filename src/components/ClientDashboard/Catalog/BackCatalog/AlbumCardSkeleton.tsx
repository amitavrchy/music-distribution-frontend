import React from "react";
import { Skeleton } from "../../../ui/skeleton";

const AlbumCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#0C1F21] p-2 rounded-xl overflow-hidden shadow-lg flex flex-col w-full">
      {/* Image Placeholder */}
      <Skeleton className="w-full h-48 rounded-lg" />

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Title Placeholder */}
          <Skeleton className="h-8 w-3/4" />

          {/* Artist Placeholder */}
          <Skeleton className="h-6 w-1/2" />

          {/* Label Placeholder */}
          <Skeleton className="h-4 w-1/3" />

          <hr className="border-[#2C2C2C]" />

          <div className="mt-2 space-y-3">
            <div className="flex justify-between items-center gap-4">
              {/* UPC Placeholder */}
              <Skeleton className="h-4 w-24" />
              {/* Type Placeholder */}
              <Skeleton className="h-4 w-16" />
            </div>
            {/* Release Date Placeholder */}
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          {/* Button Placeholders */}
          <Skeleton className="flex-1 h-12 rounded-xl" />
          <Skeleton className="flex-1 h-12 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default AlbumCardSkeleton;
