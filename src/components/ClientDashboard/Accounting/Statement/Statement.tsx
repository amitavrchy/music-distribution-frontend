import ComponentError from "@/components/Reuseable/ComponentError";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";
import MiniComponent from "./MiniComponent";
import StatementHeader from "./StatementHeader";
import { useGetAccountingStatementQuery } from "@/redux/features/accounting/accountingApi";

const Statement = () => {
  const { data, isLoading, isError, refetch } = useGetAccountingStatementQuery({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (isError) {
    return (
      <ComponentError
        message="Failed to load accounting statements."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-9">
      <StatementHeader />
      <MiniComponent statements={data?.data || []} />
    </div>
  );
};

export default Statement;
