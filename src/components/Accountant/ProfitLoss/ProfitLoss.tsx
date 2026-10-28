import IcomeExpenssMonth from "@/components/AdminDashboard/AdminAccounting/ProfitLoss/IcomeExpenssMonth";
import { IncomeProfitLossTable } from "@/components/AdminDashboard/AdminAccounting/ProfitLoss/IncomeProfitLossTable";
import LossSummary from "@/components/AdminDashboard/AdminAccounting/ProfitLoss/LossSummary";
import ProfitSummary from "@/components/AdminDashboard/AdminAccounting/ProfitLoss/ProfitSummary";
import ComponentError from "@/components/Reuseable/ComponentError";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";
import { useGetProfitLossQuery } from "@/redux/features/accountant/accountantApi";

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
    <div className=" space-y-8">
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
