import { useGetAccountProfitAndLossQuery } from "@/redux/features/accounting/accountingApi";
import { Express } from "./Express";
import { Income } from "./Income";
import IncomeExpensesChart from "./IncomeExpensesChart";
import ProfitCard from "./ProfitCard";
import { useState } from "react";
import ComponentError from "@/components/Reuseable/ComponentError";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";

const ProfitLoss = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const { data, isLoading, isError, refetch } = useGetAccountProfitAndLossQuery(
    {
      year: year.toString(),
    },
  );

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (isError || !data?.data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <ComponentError
          message="Failed to load profit and loss data. Please try again later."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className=" space-y-9">
      <ProfitCard data={data?.data} year={year} setYear={setYear} />
      <IncomeExpensesChart data={data?.data?.monthlyData} />
      {/* Income Express aprt */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-2 w-full">
          <Income data={data?.data?.incomeTransactions || []} />
        </div>
        <div className="w-full xl:col-span-2">
          <Express data={data?.data?.expenseTransactions || []} />
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;
