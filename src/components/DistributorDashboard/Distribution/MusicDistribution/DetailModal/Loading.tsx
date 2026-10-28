// import React from "react";
// import { RxCross2 } from "react-icons/rx";

const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`bg-gray-700/40 animate-pulse rounded ${className}`} />
);

const ConfirmDistributionSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="w-full text-white mx-auto">
        <SkeletonBox className="w-1/3 h-8 mb-6" />
        <div className="flex items-center gap-4 mb-6">
          <SkeletonBox className="w-[86px] h-[65px] rounded-lg" />
          <div className="space-y-3 flex-1">
            <SkeletonBox className="w-2/3 h-6" />
            <SkeletonBox className="w-1/3 h-4" />
          </div>
        </div>
      </div>

      {/* Part 1: General Release Info */}
      <div className="gap-8 p-6 rounded-2xl bg-[#0B1D21] border border-[#2F3B40] space-y-4">
        <SkeletonBox className="w-1/4 h-6 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              {Array.from({ length: 4 }).map((__, i) => (
                <SkeletonBox key={i} className="w-full h-4" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Track Details */}
      <div className="gap-8 p-6 rounded-2xl bg-[#0B1D21] border border-[#2F3B40] space-y-4">
        <SkeletonBox className="w-1/4 h-6 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              {Array.from({ length: 5 }).map((__, i) => (
                <SkeletonBox key={i} className="w-full h-4" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Part 3: Artist Metadata */}
      <div className="gap-8 p-6 rounded-2xl bg-[#0B1D21] border border-[#2F3B40] space-y-4">
        <SkeletonBox className="w-1/4 h-6 mb-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              {Array.from({ length: 3 }).map((__, i) => (
                <SkeletonBox key={i} className="w-full h-4" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Part 4: Platforms */}
      <div className="mt-6 bg-[#0D2223] p-4 rounded-2xl border border-[#c6c6c630]">
        <SkeletonBox className="w-1/3 h-6 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="text-center space-y-2">
              <SkeletonBox className="w-12 h-12 rounded-full mx-auto" />
              <SkeletonBox className="w-10 h-3 mx-auto" />
              <SkeletonBox className="w-8 h-2 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Info Alert */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-3 p-5 rounded-2xl shadow-2xl bg-[#0F2435]">
        <SkeletonBox className="w-6 h-6 rounded-full" />
        <SkeletonBox className="w-full h-4 sm:h-5 flex-1" />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <SkeletonBox className="w-full sm:w-32 h-10 rounded-lg" />
        <SkeletonBox className="w-full sm:w-40 h-10 rounded-lg" />
      </div>
    </div>
  );
};

export default ConfirmDistributionSkeleton;
