import DetailsTab from "@/components/ClientDashboard/Accounting/Statement/DetailsTab";
import StatementDetails from "@/components/ClientDashboard/Accounting/Statement/StatementDetails";
import { useGetAccountingStatementFullDetailsQuery } from "@/redux/features/accounting/accountingApi";
import { useParams } from "react-router-dom";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";
import ComponentError from "@/components/Reuseable/ComponentError";

const StatementDetailsPage = () => {
  const { id } = useParams();
  const {
    data: statementData,
    isLoading,
    isError,
    refetch,
  } = useGetAccountingStatementFullDetailsQuery({ id: id! });
  if (isLoading) {
    return <ComponentLoader />;
  }

  if (isError || !statementData?.data) {
    return (
      <ComponentError
        message="Failed to load accounting statements."
        onRetry={refetch}
      />
    );
  }
  return (
    <div className="space-y-9">
      <div className="mb-2">
        <StatementDetails />
      </div>
      <DetailsTab data={statementData.data} />
    </div>
  );
};

export default StatementDetailsPage;
