import { ReactNode } from "react";

interface CommonWrapperProps {
  children: ReactNode;
  className?: string;
}

const WrapperDashboard: React.FC<CommonWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`w-full max-w-[1200px] mx-auto px-4 md:px-10 ${className}`}>
      {children}
    </div>
  );
};

export default WrapperDashboard;
