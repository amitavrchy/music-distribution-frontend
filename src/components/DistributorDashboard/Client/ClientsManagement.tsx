import { useState } from "react";
import ClientManageHeader from "./ClientManageHeader";
import ClientsManagementTable from "./ClientsManagementTable";

const ClientsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  return (
    <div className=" space-y-10">
      <ClientManageHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-4 w-full">
          <ClientsManagementTable
            searchQuery={searchQuery}
            roleFilter={roleFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientsManagement;
