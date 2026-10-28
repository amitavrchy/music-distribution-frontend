import Team from "@/components/AdminDashboard/Team/Team";
import TeamTable from "@/components/AdminDashboard/Team/TeamTable";

const AdminTeamPage = () => {
  return (
    <div className=" space-y-8">
      <Team />

      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-4 w-full">
          <TeamTable />
        </div>
      </div>
    </div>
  );
};

export default AdminTeamPage;
