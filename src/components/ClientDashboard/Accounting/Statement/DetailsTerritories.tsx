import { TerriotoriesDetailsTable } from "./Shared/TerriotoriesDetailsTable";
import {
  TerritoryDetail,
  StatementDetail,
} from "@/redux/features/accounting/accounting.type";
import TerriotoriesTable from "./Shared/TerriotoriesTable";
import TerritorieStatementCard from "./Shared/TerritorieStatementCard";

const DetailsTerritories = ({
  data,
  statement,
}: {
  data: TerritoryDetail[];
  statement: StatementDetail;
}) => {
  return (
    <div>
      <div className=" space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-5">
          <div className="xl:col-span-3 w-full">
            <TerriotoriesTable data={data} />
          </div>
          <div className="w-full xl:col-span-1 space-y-6">
            <TerritorieStatementCard statement={statement} />
          </div>
        </div>
      </div>

      <div>
        <TerriotoriesDetailsTable />
      </div>
    </div>
  );
};

export default DetailsTerritories;
