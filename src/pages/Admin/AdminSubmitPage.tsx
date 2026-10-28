import Submit from "@/components/AdminDashboard/AdminCatalog/Submit/Submit";
import SubmitGrid from "@/components/AdminDashboard/AdminCatalog/Submit/SubmitGrid";
import { useState } from "react";

const AdminSubmitPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "PendingReview" | "Approved" | "Declined"
  >("All");

  return (
    <div className="space-y-8">
      <Submit
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-4 w-full">
          <SubmitGrid search={search} statusFilter={statusFilter} />
        </div>
      </div>
    </div>
  );
};

export default AdminSubmitPage;
