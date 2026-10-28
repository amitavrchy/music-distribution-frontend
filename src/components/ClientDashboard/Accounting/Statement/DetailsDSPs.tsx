import { DSPsDetailsTable } from "./Shared/DSPsDetailsTable";
import {
  PlatformDetail,
  StatementDetail,
} from "@/redux/features/accounting/accounting.type";
import DSPsStatementCard from "./Shared/DSPsStatementCard";
import DSPsTable from "./Shared/DSPsTable";

const DetailsDSPs = ({
  data,
  statement,
}: {
  data: PlatformDetail[];
  statement: StatementDetail;
}) => {
  return (
    <div>
      <div className=" space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-5">
          <div className="xl:col-span-3 w-full">
            <DSPsTable data={data} />
          </div>
          <div className="w-full xl:col-span-1 space-y-6">
            <DSPsStatementCard statement={statement} />
          </div>
        </div>
      </div>

      <div>
        <DSPsDetailsTable />
      </div>
    </div>
  );
};

export default DetailsDSPs;
