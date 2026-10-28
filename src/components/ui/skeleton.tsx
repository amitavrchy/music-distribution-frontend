// src/components/ui/skeleton.tsx
import React from "react";

// Utility function for joining class names
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Skeleton component props
type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse bg-[#1c1c24] rounded-md", className)}
      {...props}
    />
  );
};
