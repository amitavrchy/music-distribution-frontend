const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={`bg-gradient-to-r from-[#1a2c32] via-[#22363d] to-[#1a2c32] 
        animate-pulse rounded-md ${className}`}
    />
  );
};

export default function DistributionDetailsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Back Button */}
      <Skeleton className="h-4 w-40" />

      {/* Header Section */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-4">
          <Skeleton className="w-[86px] h-[65px] rounded-lg" />
          <div className="space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      {/* Release Distribution Details */}
      <div className="p-8 rounded-2xl bg-[#0B1D21] border border-[#2F3B40] space-y-6">
        <Skeleton className="h-6 w-60" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              {[...Array(4)].map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Split Sheet Section */}
      <div className="p-8 rounded-2xl bg-[#0B1D21] border border-[#2F3B40] space-y-6">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>

        <div className="bg-[#0D1A25] p-4 rounded-2xl space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Track Section */}
      <div className="bg-[#0B1D21] rounded-xl p-6 space-y-6">
        <Skeleton className="h-6 w-56" />

        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-5 w-64" />
            <div className="grid md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Platform Grid */}
      <div className="p-6 bg-[#0D2223] rounded-xl space-y-6">
        <Skeleton className="h-6 w-48" />
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-[#0F2529] rounded-xl p-6 space-y-6">
        <Skeleton className="h-6 w-52" />
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <div className="flex justify-end">
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-4">
        <Skeleton className="h-10 w-28 rounded-lg" />
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>
    </div>
  );
}
