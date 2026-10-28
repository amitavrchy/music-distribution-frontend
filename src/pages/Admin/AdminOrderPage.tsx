import React from "react";
import OrderManagement from "@/components/AdminDashboard/Shop/OrderManagement";

const AdminOrderPage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <OrderManagement />
    </div>
  );
};

export default AdminOrderPage;
