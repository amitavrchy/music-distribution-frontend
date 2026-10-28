import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useGetClientFinancialsQuery } from "@/redux/features/accountant/accountantApi";
import TableSkeleton, {
  ColumnConfig,
} from "@/components/Reuseable/TableSkeleton";

const ClientManagement = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  // const navigate = useNavigate();

  const { data, isLoading, error } = useGetClientFinancialsQuery({
    page,
    limit,
  });

  // const goToDetails = (id: string) => {
  //   navigate(id); // Navigate to client details page
  // };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const columnConfig: ColumnConfig[] = [
    { header: "Client Name", type: "text" },
    { header: "Email", type: "text" },
    { header: "Total Earning", type: "text" },
    { header: "Pending Payment", type: "text" },
    { header: "Last Payment Date", type: "text" },
  ];

  if (isLoading) {
    return <TableSkeleton columns={columnConfig} />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-xl">
          Error loading client data. Please try again.
        </div>
      </div>
    );
  }

  const clients = data?.data || [];
  const metadata = data?.metadata;

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[1000px] text-white">
          <TableHeader>
            <TableRow className="text-gray-400 text-sm md:text-base">
              <TableHead className="px-4 py-4 text-left">Client Name</TableHead>
              <TableHead className="px-4 py-4 text-left">Email</TableHead>
              <TableHead className="px-4 py-4 text-left">
                Total Earning
              </TableHead>
              <TableHead className="px-4 py-4 text-left">
                Pending Payment
              </TableHead>
              <TableHead className="px-4 py-4 text-left">
                Last Payment Date
              </TableHead>
              {/* <TableHead className="px-4 py-4 text-right">Action</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <TableRow
                  key={client.clientFinId}
                  className="border-b border-gray-800"
                >
                  <TableCell className="px-4 py-6">
                    {client.clientName}
                  </TableCell>
                  <TableCell className="px-4 py-6 text-gray-400">
                    {client.email}
                  </TableCell>
                  <TableCell className="px-4 py-6">
                    {client.totalEarning}
                  </TableCell>
                  <TableCell className="px-4 py-6">
                    {client.pendingPayment}
                  </TableCell>
                  <TableCell className="px-4 py-6">
                    {formatDate(client.lastPaymentDate)}
                  </TableCell>
                  {/* <TableCell
                    className="text-right px-4 py-6 text-sm md:text-base flex items-center justify-end gap-2 cursor-pointer text-blue-600 hover:text-blue-800"
                    onClick={() => goToDetails(client.clientFinId)}
                  >
                    User Profile
                    <FaChevronRight className="w-4 h-4" />
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-400"
                >
                  No clients found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {metadata && metadata.totalPage > 1 && (
        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-gray-400 text-sm">
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, metadata.total)} of {metadata.total} clients
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                page === 1
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <FaChevronLeft className="w-3 h-3" />
              Previous
            </button>
            <div className="text-white text-sm">
              Page {page} of {metadata.totalPage}
            </div>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === metadata.totalPage}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                page === metadata.totalPage
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
              <FaChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
