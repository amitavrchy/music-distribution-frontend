import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ComponentLoader: React.FC = () => {
  return (
    <div className="space-y-9 w-full animate-pulse">
      {/* Top Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-[#0D1A23] rounded-2xl border border-[#323943] p-6 space-y-4"
          >
            <Skeleton className="h-4 w-24 bg-[#313E41]" />
            <Skeleton className="h-8 w-32 bg-[#313E41]" />
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="h-[400px] bg-[#0E2323] rounded-2xl border border-[#313E41] p-6 flex flex-col justify-end gap-4">
        <div className="flex justify-between items-end h-full gap-2">
          {[...Array(12)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-full bg-[#313E41]"
              style={{ height: `${Math.random() * 60 + 20}%` }}
            />
          ))}
        </div>
      </div>

      {/* Tables Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-64 bg-[#0B1C21] rounded-2xl border border-[#1C275C] p-6 space-y-4"
          >
            <Skeleton className="h-6 w-32 bg-[#313E41]" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((j) => (
                <Skeleton key={j} className="h-10 w-full bg-[#313E41]/50" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentLoader;
