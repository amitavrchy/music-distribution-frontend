import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetPaymentsEarningsQuery } from "@/redux/features/accountant/accountantApi";

export function PaymentHistory() {
  const { data, isLoading, isError } = useGetPaymentsEarningsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-white text-lg">Loading payment history...</div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-red-400 text-lg">
          Error loading payment history
        </div>
      </div>
    );
  }

  const paymentHistory = data.data.paymentHistory || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-medium text-white">
          Payment History
        </h1>
      </div>
      <div className="bg-[#0C2322] border border-[#313E41] rounded-2xl shadow-sm p-4 md:p-6 ">
        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[500px] md:min-w-full">
            <TableHeader>
              <TableRow className="text-[#BDBDBD]">
                <TableHead className="px-2 md:px-4 py-2">Date</TableHead>
                <TableHead className="px-2 md:px-4 py-2">Client Name</TableHead>
                <TableHead className="text-right px-2 md:px-4 py-2">
                  Amount
                </TableHead>
                <TableHead className="text-right px-2 md:px-4 py-2">
                  Method
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-white">
              {paymentHistory.length > 0 ? (
                paymentHistory.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-[#1E3A38] transition-colors"
                  >
                    {/* Date */}
                    <TableCell className="pr-4 md:pr-8 py-4">
                      {item.date}
                    </TableCell>
                    {/* Client */}
                    <TableCell className="flex items-center gap-2 pr-4 md:pr-8 py-4">
                      {item.clientName}
                    </TableCell>
                    {/* Amount */}
                    <TableCell className="text-right pr-4 md:pr-8 py-4 ">
                      {item.amount}
                    </TableCell>
                    {/* Method */}
                    <TableCell className="text-right pr-4 md:pr-8 py-4">
                      {item.method}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-12 text-gray-400"
                  >
                    No payment history available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
