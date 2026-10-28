import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useNavigate } from "react-router-dom";
import { useGetPaymentsEarningsQuery } from "@/redux/features/accountant/accountantApi";

export function PendingPayments() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetPaymentsEarningsQuery();

  const handleProceed = (id: string) => {
    navigate(`/proceed-payment/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-white text-lg">Loading pending payments...</div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-red-400 text-lg">
          Error loading pending payments
        </div>
      </div>
    );
  }

  const pendingPayments = data.data.pendingPayments || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-medium text-white">
          Pending Payments
        </h1>
      </div>
      <div className="bg-[#0C2322] border border-[#313E41] rounded-2xl shadow-sm p-4 md:p-6 ">
        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[400px] md:min-w-full">
            <TableHeader>
              <TableRow className="text-[#BDBDBD]">
                <TableHead className="px-2 md:px-4 py-2">Source</TableHead>
                <TableHead className="text-right px-2 md:px-4 py-2">
                  Amount
                </TableHead>
                <TableHead className="text-right px-2 md:px-4 py-2">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-white">
              {pendingPayments.length > 0 ? (
                pendingPayments.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-[#1E3A38] transition-colors"
                  >
                    <TableCell className="flex items-center gap-2 pr-4 md:pr-8 py-4">
                      {item.source}
                    </TableCell>
                    <TableCell className="text-right pr-4 md:pr-8 py-4 text-[#D31301]">
                      {item.amount}
                    </TableCell>
                    <TableCell className="text-right pr-4 md:pr-8 py-4">
                      <button
                        onClick={() => handleProceed(item.id)}
                        className=" text-[#2E4AD9] text-sm  hover:text-[#2E4AD9] transition cursor-pointer"
                      >
                        Proceed Payment
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-12 text-gray-400"
                  >
                    No pending payments
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
