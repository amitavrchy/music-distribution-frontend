/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useNavigate } from "react-router-dom";
import download from "@/assets/icons/photo.png";
import {
  useGetClientsQuery,
  useDeactivateClientMutation,
  useActivateClientMutation,
} from "@/redux/features/distribution/distributionApi";
import TableSkeleton, {
  ColumnConfig,
} from "@/components/Reuseable/TableSkeleton";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ClientsManagementTableProps {
  searchQuery: string;
  roleFilter: string;
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        isActive
          ? "bg-green-500/10 text-green-400 border-green-500/20"
          : "bg-red-500/10 text-red-400 border-red-500/20"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </div>
  );
}

const clientTableColumns: ColumnConfig[] = [
  { header: "Title", type: "avatar-text", width: "250px" },
  { header: "Contact", type: "text" },
  { header: "Role", type: "text" },
  { header: "Status", type: "badge" },
  { header: "Release", type: "text", align: "center" },
  { header: "Action", type: "action", align: "center" },
];

const ClientsManagementTable = ({
  searchQuery,
  roleFilter,
}: ClientsManagementTableProps) => {
  // const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<{
    id: string;
    name: string;
    isActive: boolean;
  } | null>(null);

  const { data, isLoading, isError } = useGetClientsQuery({ page, limit });
  const [deactivateClient, { isLoading: isDeactivating }] =
    useDeactivateClientMutation();
  const [activateClient, { isLoading: isActivating }] =
    useActivateClientMutation();

  const filteredData = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((client: any) => {
      const matchesSearch =
        client.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "all" || client.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [data?.data, searchQuery, roleFilter]);

  // const goToDetails = (id: string) => {
  //   navigate(`/distributor-dashboard/clients/${id}`);
  // };

  const handleToggleActiveClick = (
    clientId: string,
    clientName: string,
    isActive: boolean,
  ) => {
    setSelectedClient({ id: clientId, name: clientName, isActive });
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedClient) return;

    try {
      if (selectedClient.isActive) {
        await deactivateClient(selectedClient.id).unwrap();
        toast.success(`Client ${selectedClient.name} deactivated successfully`);
      } else {
        await activateClient(selectedClient.id).unwrap();
        toast.success(`Client ${selectedClient.name} activated successfully`);
      }
      setIsConfirmDialogOpen(false);
      setSelectedClient(null);
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          `Failed to ${selectedClient.isActive ? "deactivate" : "activate"} client`,
      );
    }
  };

  if (isLoading) {
    return <TableSkeleton columns={clientTableColumns} />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-400 text-lg">Error loading clients</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[1000px]">
          {/* Table Header */}
          <TableHeader>
            <TableRow className="text-[#BDBDBD] text-sm md:text-base border-b border-gray-800">
              <TableHead className="w-[250px] px-4 py-2">Title</TableHead>
              <TableHead className="px-4 py-2">Contact</TableHead>
              <TableHead className="px-4 py-2">Role</TableHead>
              <TableHead className="px-4 py-2">Status</TableHead>
              <TableHead className="px-4 py-2 text-center">Release</TableHead>
              <TableHead className="text-center px-4 py-2">Action</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="text-white">
            {filteredData.length > 0 ? (
              filteredData.map((client: any) => (
                <TableRow
                  key={client.clientId}
                  className="border-b border-gray-800 hover:bg-[#0E141B]"
                >
                  {/* Title & Image */}
                  <TableCell className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={download}
                      alt={client.user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm md:text-base font-medium">
                        {client.user.name}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500">
                        {client.role}
                      </span>
                    </div>
                  </TableCell>

                  {/* Contact Info */}
                  <TableCell className="px-4 py-3 text-sm md:text-base text-gray-400">
                    <div className="flex flex-col">
                      <span className="font-medium">{client.user.email}</span>
                      <span className="text-gray-500">
                        {client.phoneNumber || client.user.phone || "N/A"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell className="px-4 py-3 text-sm md:text-base text-gray-400">
                    {client.role}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3">
                    <StatusBadge isActive={client.isActive} />
                  </TableCell>

                  {/* Release */}
                  <TableCell className="px-4 py-3 text-center text-sm md:text-base text-gray-400">
                    {client.totalReleases}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {/* Edit Button */}
                      {/* <button
                          className="px-3 py-1 text-[#3A5CFF] text-sm md:text-base hover:text-[#2f4de0] transition"
                          onClick={() => goToDetails(client.clientId)}
                        >
                          Edit
                        </button> */}

                      {/* Toggle Active Button */}
                      <button
                        className={`px-3 py-1 text-sm md:text-base transition ${
                          client.isActive
                            ? "text-red-500 hover:text-red-400 cursor-pointer"
                            : "text-green-500 hover:text-green-400"
                        }`}
                        onClick={() =>
                          handleToggleActiveClick(
                            client.clientId,
                            client.user.name,
                            client.isActive,
                          )
                        }
                      >
                        {client.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-12 text-gray-400"
                >
                  No clients found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {data?.metadata && (
        <div className="p-6 flex items-center justify-between border-t border-[#3a4553]">
          <div className="text-gray-400 text-sm">
            Page {data.metadata.page} of {data.metadata.totalPage} (
            {data.metadata.total} total clients)
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="bg-[#17171A] border border-[#696B6F] text-white hover:bg-[#2a3441] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft /> Previous
            </Button>
            <Button
              onClick={() =>
                setPage((p) => Math.min(data.metadata.totalPage, p + 1))
              }
              disabled={page === data.metadata.totalPage}
              className="bg-[#17171A] border border-[#696B6F] text-white hover:bg-[#2a3441] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <FaChevronRight />
            </Button>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="bg-[#0B1D21] border border-[#2F3B40] text-white">
          <DialogHeader>
            <DialogTitle>
              {selectedClient?.isActive ? "Deactivate" : "Activate"} Client
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to{" "}
              {selectedClient?.isActive ? "deactivate" : "activate"}{" "}
              <span className="font-semibold text-white">
                {selectedClient?.name}
              </span>
              ? This action can be reversed later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsConfirmDialogOpen(false);
                setSelectedClient(null);
              }}
              className="border-[#696B6F] text-white hover:bg-[#2a3441]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAction}
              disabled={isDeactivating || isActivating}
              className={`${
                selectedClient?.isActive
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isDeactivating || isActivating
                ? "Processing..."
                : selectedClient?.isActive
                  ? "Deactivate Client"
                  : "Activate Client"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsManagementTable;
