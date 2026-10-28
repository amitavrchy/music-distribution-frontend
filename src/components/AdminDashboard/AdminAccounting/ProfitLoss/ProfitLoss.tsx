import { useGetProfitLossQuery } from "@/redux/features/accountant/accountantApi";
import IcomeExpenssMonth from "./IcomeExpenssMonth";
import { IncomeProfitLossTable } from "./IncomeProfitLossTable";
import LossSummary from "./LossSummary";

import ProfitLossHead from "./ProfitLossHead";
import ProfitSummary from "./ProfitSummary";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";
import ComponentError from "@/components/Reuseable/ComponentError";

const ProfitLoss = () => {
  const { data, isLoading, error } = useGetProfitLossQuery();

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (error) {
    return <ComponentError />;
  }

  const monthlyData = data?.data.monthlyData || [];
  const clientData = data?.data.clientData || [];
  return (
    <div className="space-y-6">
      <ProfitLossHead />

      <div className="flex flex-col lg:flex-row w-full gap-5">
        <div className="w-full lg:w-1/2">
          <ProfitSummary monthlyData={monthlyData} />
        </div>
        <div className="w-full lg:w-1/2">
          <LossSummary monthlyData={monthlyData} />
        </div>
      </div>
      <div>
        <IcomeExpenssMonth monthlyData={monthlyData} />
      </div>
      <div>
        <IncomeProfitLossTable clientData={clientData} />
      </div>
    </div>
  );
};

export default ProfitLoss;
