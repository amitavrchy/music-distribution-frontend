import { ReactNode } from "react";

type CommonPartProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

const ReuserableCommonPart = ({ title, icon, children }: CommonPartProps) => {
  return (
    <div className="space-y-9">
      <div className="p-6 border border-[#1C275C] rounded-2xl shadow-2xl bg-[#0B1C21]">
        <div className="space-y-6">
          <div className="flex justify-start items-center gap-3">
            {icon}
            <h1 className="text-2xl font-sans">{title}</h1>
          </div>

          {/* Content Area */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReuserableCommonPart;
