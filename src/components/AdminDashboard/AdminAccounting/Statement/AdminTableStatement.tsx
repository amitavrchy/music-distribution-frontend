import { useState } from "react";
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
import { useGetAccountingStatementQuery } from "@/redux/features/accounting/accountingApi";
import { useAppSelector } from "@/redux/hooks/redux-hook";
import Pagination from "@/components/Reuseable/Pagination";

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
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const AdminTableStatement = () => {
  const navigate = useNavigate();
  const role = useAppSelector((state) => state.auth.user?.role);
  const [limit] = useState(10);
  const [page, setPage] = useState(1);

  const { data: getAccountingStatementData } = useGetAccountingStatementQuery({
    limit: limit,
    page: page,
  });

  const goToDetails = (id: string) => {
    if (role === "SUPER_ADMIN") {
      navigate(`/super-admin-dashboard/statement/${id}`);
    } else {
      navigate(`/statement/${id}`);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <Table className="w-full min-w-[700px] divide-y divide-gray-200">
        <TableHeader>
          <TableRow className="bg-[#0C2322] text-[#979797] text-sm md:text-base">
            <TableHead className="px-4 py-3 text-left">Statement</TableHead>
            <TableHead className="px-4 py-3 text-center">Status</TableHead>
            <TableHead className="px-4 py-3 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {getAccountingStatementData?.data &&
          getAccountingStatementData.data.length > 0 ? (
            getAccountingStatementData.data.map((product, index) => (
              <TableRow
                key={product.statementId}
                className={`${
                  index % 2 === 0 ? "bg-[#0C2322]" : "bg-[#0C2322]"
                } transition-colors duration-200`}
              >
                {/* Statement Info */}
                <TableCell className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={download}
                    alt=""
                    className="h-6 w-6 md:h-7 md:w-7"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-medium text-white">
                      {product.title}
                    </span>
                    <span className="text-xs md:text-sm text-[#CACACA]">
                      {product.subtitle}
                    </span>
                  </div>
                </TableCell>

                {/* Status Pill */}
                <TableCell className="text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusClasses(
                      product.status,
                    )}`}
                  >
                    {product.status}
                  </span>
                </TableCell>

                {/* Action */}
                <TableCell className="text-right px-0 py-3">
                  <button
                    onClick={() => goToDetails(product.statementId)}
                    className="flex items-center justify-end gap-2 text-sm md:text-base text-blue-600 hover:text-blue-800 font-medium w-full pr-4"
                  >
                    View Statement
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-10 text-white text-lg"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {getAccountingStatementData?.metadata && (
        <Pagination
          currentPage={page}
          totalPage={getAccountingStatementData.metadata.totalPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AdminTableStatement;
