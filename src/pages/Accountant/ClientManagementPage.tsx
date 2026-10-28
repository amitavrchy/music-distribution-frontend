import ClientManagement from "@/components/Accountant/ClientManagement/ClientManagement";
import MiniTitle from "@/components/ClientDashboard/Shared/MiniTitle";

const ClientManagementPage = () => {
  return (
    <div className="space-y-9">
      <MiniTitle
        title="Client Management"
        subTitle="View and manage client profiles and their financial details."
      />
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-4 w-full">
          <ClientManagement />
        </div>
      </div>
    </div>
  );
};

export default ClientManagementPage;
