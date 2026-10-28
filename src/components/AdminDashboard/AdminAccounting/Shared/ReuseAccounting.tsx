import { ReactNode } from "react";

type PlatformHeaderProps = {
  title?: string;
  platform: string;
  icon: ReactNode;
};

const ReuseAccounting = ({
  title = "Accounting ",
  platform,
  icon,
}: PlatformHeaderProps) => {
  return (
    <div className="space-y-2">
      <h1 className="text-base font-sans">{title}</h1>
      <div className="flex items-center gap-2">
        {icon}
        <h1 className="text-2xl font-sans">{platform}</h1>
      </div>
    </div>
  );
};

export default ReuseAccounting;
