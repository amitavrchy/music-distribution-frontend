import DashboardCard from "./DashboardCard";
import { EarningsBreakdownTable } from "./EarningsBreakdownTable";

const AccountantDashboard = () => {
  return (
    <div className="space-y-8">
      <DashboardCard />
      <EarningsBreakdownTable />
    </div>
  );
};

export default AccountantDashboard;
