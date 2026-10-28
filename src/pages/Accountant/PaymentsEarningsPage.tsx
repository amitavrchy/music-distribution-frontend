import { PaymentHistory } from "@/components/Accountant/PaymentsEarnings/PaymentHistory";
import PaymentsEarnings from "@/components/Accountant/PaymentsEarnings/PaymentsEarnings";
import { PendingPayments } from "@/components/Accountant/PaymentsEarnings/PendingPayments";
import MiniTitle from "@/components/ClientDashboard/Shared/MiniTitle";

const PaymentsEarningsPage = () => {
  return (
    <div className="space-y-9">
      <MiniTitle
        title="Client Management"
        subTitle="View and manage client profiles and their financial details."
      />
      <PaymentsEarnings />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-2 w-full">
          <PendingPayments />
        </div>
        <div className="w-full xl:col-span-2">
          <PaymentHistory />
        </div>
      </div>
    </div>
  );
};

export default PaymentsEarningsPage;
