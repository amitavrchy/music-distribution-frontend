import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClientProfitLossData } from "@/redux/features/accountant/accountant.type";

interface IncomeProfitLossTableProps {
  clientData: ClientProfitLossData[];
}

export function IncomeProfitLossTable({
  clientData,
}: IncomeProfitLossTableProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-3 w-full">
          <div className="overflow-x-auto">
            <Table className="w-full min-w-[500px]">
              <TableHeader>
                <TableRow className="text-[#BDBDBD] text-sm md:text-base">
                  <TableHead className="w-[200px] px-2 md:px-4 py-2">
                    Client
                  </TableHead>
                  <TableHead className="text-center px-2 md:px-4 py-2">
                    Income
                  </TableHead>
                  <TableHead className="text-center px-2 md:px-4 py-2">
                    Expenses
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-white">
                {clientData.length > 0 ? (
                  clientData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-2 md:px-4 py-3">
                        {row.clientName}
                      </TableCell>
                      <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base text-[#01D449]">
                        {row.income}
                      </TableCell>
                      <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base text-[#FF4C61]">
                        {row.expenses}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center py-8 text-gray-400"
                    >
                      No client data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
