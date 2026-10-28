import {
  TrackDetail,
  StatementDetail,
} from "@/redux/features/accounting/accounting.type";
import { TrackDetailsTable } from "./Shared/TrackDetailsTable";
import TrackStatementCard from "./Shared/TrackStatementCard";
import TrackTable from "./Shared/TrackTable";

const DetailsTracks = ({
  data,
  statement,
}: {
  data: TrackDetail[];
  statement: StatementDetail;
}) => {
  return (
    <div>
      <div className=" space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-5">
          <div className="xl:col-span-3 w-full">
            <TrackTable data={data} />
          </div>
          <div className="w-full xl:col-span-1 space-y-6">
            <TrackStatementCard statement={statement} />
          </div>
        </div>
      </div>

      <div>
        <TrackDetailsTable />
      </div>
    </div>
  );
};

export default DetailsTracks;
