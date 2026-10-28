import { useEffect, useRef } from "react";
import type { JSX } from "react";

function Skeleton({ className }: { className?: string }): JSX.Element {
  return (
    <div className={`animate-pulse bg-gray-700/40 rounded ${className}`} />
  );
}

interface Props {
  index: number;
}
function MusicDistributionSkeletonCard({ index }: Props): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (index === 3 && ref.current) {
      ref.current.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  }, [index]);

  return (
    <div
      ref={ref}
      className="bg-[#0C1F21] border border-gray-700 rounded-xl p-6 space-y-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="w-48 h-6" />
        </div>
        <Skeleton className="w-24 h-6 rounded-lg" />
      </div>

      {/* Info */}
      <div className="ml-8 space-y-3">
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-40 h-4" />
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-52 h-5 mt-4" />
      </div>

      {/* Platforms */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="text-center space-y-2">
            <Skeleton className="w-12 h-12 rounded-full mx-auto" />
            <Skeleton className="w-16 h-3 mx-auto" />
            <Skeleton className="w-12 h-3 mx-auto" />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <Skeleton className="w-32 h-10 rounded-lg" />
        <Skeleton className="w-32 h-10 rounded-lg" />
      </div>
    </div>
  );
}

export default function MusicDistributionLoadingSkeleton(): JSX.Element {
  return (
    <div className="space-y-6 mt-4">
      {[...Array(3)].map((_, i) => (
        <MusicDistributionSkeletonCard key={i} index={i} />
      ))}
    </div>
  );
}
