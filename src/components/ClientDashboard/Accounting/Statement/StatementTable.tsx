import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import download from "@/assets/icons/download.svg";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { Statement } from "@/redux/features/accounting/accounting.type";

interface StatementTableProps {
  statements: Statement[];
  selectedYear: string;
}

const getStatusClasses = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-[#0B2B1E] text-green-700";
    case "Payment Required":
      return "bg-[#341815] text-red-700";
    case "Payment Not Required":
      return "bg-[#3D4748] text-[#BDBDBD]";
    case "Payment Submitted":
      return "bg-[#333715] text-yellow-700";
    case "Pending":
      return "bg-[#333715] text-yellow-500 opacity-80";
    default:
      return "bg-gray-800 text-gray-400";
  }
};

const StatementTable = ({ statements, selectedYear }: StatementTableProps) => {
  const navigate = useNavigate();

  const goToDetails = (id: string) => {
    navigate(`/client-dashboard/accounting/statement/${id}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
      <div className="xl:col-span-4 w-full">
        {/* res-part */}
        <div className="overflow-x-auto rounded-lg shadow">
          <Table className="w-full min-w-[700px] divide-y divide-gray-200">
            {/* Table Header */}
            <TableHeader>
              <TableRow className="bg-[#0C2322] text-[#979797] text-sm md:text-base">
                <TableHead className="px-4 py-3 text-left">Statement</TableHead>
                <TableHead className="px-4 py-3 text-center">Status</TableHead>
                <TableHead className="px-4 py-3 text-right">
                  Payment Amounts (USD)
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {statements.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-gray-400 py-8 bg-[#0C2322]"
                  >
                    No statements found for {selectedYear}
                  </TableCell>
                </TableRow>
              ) : (
                statements.map((statement) => (
                  <TableRow
                    key={statement.statementId}
                    className="bg-[#0C2322] hover:bg-[#112d2c] transition-colors"
                  >
                    {/* Statement Info */}
                    <TableCell className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={download}
                        alt="Download Icon"
                        className="h-6 w-6 md:h-7 md:w-7"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm md:text-base font-medium text-white">
                          {statement.title}
                        </span>
                        <span className="text-xs md:text-sm text-[#CACACA]">
                          {statement.subtitle}
                        </span>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${getStatusClasses(
                          statement.status,
                        )}`}
                      >
                        {statement.status}
                      </span>
                    </TableCell>

                    {/* Amount */}
                    <TableCell
                      className="text-right px-4 py-3 text-sm md:text-base flex items-center justify-end gap-2 cursor-pointer text-[#3A5CFF] hover:text-blue-400"
                      onClick={() => goToDetails(statement.statementId)}
                    >
                      ${parseFloat(statement.paymentAmount).toLocaleString()}{" "}
                      USD
                      <FaChevronRight className="w-4 h-4" />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default StatementTable;
