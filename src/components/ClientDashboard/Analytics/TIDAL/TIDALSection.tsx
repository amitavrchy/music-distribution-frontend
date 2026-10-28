import ReuserableCommonPart from "../../Dashboard/Shared/ReuserableCommonPart";
import EarningsByType from "../../Dashboard/EarningsByType";
import EstimatedEarning from "../../Dashboard/EstimatedEarning";
import TIDAL from "@/assets/icons/tidal.png";

const TIDALSection = () => {
  return (
    <ReuserableCommonPart
      title="TIDAL"
      icon={<img src={TIDAL} alt="" className=" w-8 h-8" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-3 gap-5">
        <div className="w-full space-y-6">
          <EarningsByType />
        </div>
        <div className="lg:col-span-2 w-full">
          <EstimatedEarning />
        </div>
      </div>
    </ReuserableCommonPart>
  );
};

export default TIDALSection;
