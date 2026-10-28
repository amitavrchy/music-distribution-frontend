import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AccountTransaction } from "@/redux/features/accounting/accounting.type";

interface IncomeProps {
  data: AccountTransaction[];
}

export function Income({ data }: IncomeProps) {
  return (
    <div className="bg-[#0C2322] border border-[#313E41] rounded-2xl shadow-sm p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-medium text-white">Income</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[400px] md:min-w-full">
          <TableHeader>
            <TableRow className="text-[#BDBDBD] border-b border-[#313E41]">
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
            {data && data.length > 0 ? (
              data.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-[#1E3A38] transition-colors border-b border-[#313E41]"
                >
                  <TableCell className="px-2 md:px-4 py-3">
                    {item.source}
                  </TableCell>
                  <TableCell className="text-right px-2 md:px-4 py-3 text-[#01D449]">
                    {item.amount}
                  </TableCell>
                  <TableCell className="text-right px-2 md:px-4 py-3">
                    {item.date}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-10 text-gray-500"
                >
                  No income transactions found for this year.
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
  );
}
