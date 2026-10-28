import React, { ReactNode } from "react";

// Props interface
interface CommonWrapperProps {
  children: ReactNode;
  className?: string;
}

// Component
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
