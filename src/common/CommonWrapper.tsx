import React, { ReactNode } from "react";

// Define the props interface
interface CommonWrapperProps {
  children: ReactNode; // Type for children (can be any valid React node)
  className?: string; // Optional className prop
}

// Define the component
const CommonWrapper: React.FC<CommonWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`w-full min-w-0 ${className}`}
    >
      {children}
    </div>
  );
};

export default CommonWrapper;
