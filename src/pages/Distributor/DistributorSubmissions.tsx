import DistributorSubmisionCard from "@/components/DistributorDashboard/DistributorSubmision/DistributorSubmisionCard";
import { DistributorSubmissionTable } from "@/components/DistributorDashboard/DistributorSubmision/DistributorSubmissionTable";

const DistributorSubmissions = () => {
  return (
    <div>
      <DistributorSubmisionCard />
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-4 w-full">
          <DistributorSubmissionTable />
        </div>
      </div>
    </div>
  );
};

export default DistributorSubmissions;
