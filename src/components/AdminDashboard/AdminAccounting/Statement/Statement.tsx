import AdminTableStatement from "./AdminTableStatement";
import { ContractAccountTable } from "./ContractAccountTable";
import OverallStatement from "./OverallStatement";
import StatementCard from "./StatementCard";

const Statement = () => {
  return (
    <div className="space-y-6">
      <OverallStatement />
      <StatementCard />
      <AdminTableStatement />
      <ContractAccountTable />
    </div>
  );
};

export default Statement;
