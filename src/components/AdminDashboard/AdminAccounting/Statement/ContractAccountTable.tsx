import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const accountData = [
  {
    id: "1",
    account: "Sco Brazy",
    openingBalance: "$1,200.00",
    earnings: "$450.00",
    expenses: "$200.00",
    payment: "$300.00",
    closingBalance: "$1,150.00",
  },
  {
    id: "4",
    account: "Celia Dawn",
    openingBalance: "$1,250.00",
    earnings: "$400.00",
    expenses: "$150.00",
    payment: "$300.00",
    closingBalance: "$1,200.00",
  },
];

export function ContractAccountTable() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-base sm:text-lg md:text-2xl font-medium text-white">
          Account Balances
        </h1>
      </div>

      {/* Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
        <div className="xl:col-span-4 w-full">
          <div className="overflow-x-auto">
            <Table className="w-full min-w-[800px]">
              <TableHeader>
                <TableRow className="text-[#BDBDBD] text-sm md:text-base">
                  <TableHead className="w-[180px] px-2 md:px-4 py-2">
                    Account
                  </TableHead>
                  <TableHead className="text-center px-2 md:px-4 py-2">
                    Opening Balance
                  </TableHead>
                  <TableHead className="text-center px-2 md:px-4 py-2">
                    Earnings
                  </TableHead>
                  <TableHead className="text-center px-2 md:px-4 py-2">
                    Expenses
                  </TableHead>
                  <TableHead className="text-center px-2 md:px-4 py-2">
                    Payment
                  </TableHead>
                  <TableHead className="text-right pr-4 md:pr-8 py-2">
                    Closing Balance
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-white">
                {accountData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="px-2 md:px-4 py-3">
                      {row.account}
                    </TableCell>
                    <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base">
                      {row.openingBalance}
                    </TableCell>
                    <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base">
                      {row.earnings}
                    </TableCell>
                    <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base">
                      {row.expenses}
                    </TableCell>
                    <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base">
                      {row.payment}
                    </TableCell>
                    <TableCell className="text-right pr-4 md:pr-8 py-3 text-sm md:text-base">
                      {row.closingBalance}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
