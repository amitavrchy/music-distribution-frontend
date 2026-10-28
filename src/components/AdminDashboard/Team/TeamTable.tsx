/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetTeamMembersQuery,
  useUpdateTeamMemberMutation,
  useSuspendTeamMemberMutation,
  useDeleteTeamMemberMutation,
} from "@/redux/features/admin/adminApi";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const roles = ["Distributor", "Accountant", "Manager", "Admin"];

const TeamTable = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Confirmation Dialog State
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState<"suspend" | "delete" | null>(
    null,
  );
  const [selectedMember, setSelectedMember] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data, isLoading, isError } = useGetTeamMembersQuery({ page, limit });
  const [updateTeamMember, { isLoading: isUpdating }] =
    useUpdateTeamMemberMutation();
  const [suspendTeamMember, { isLoading: isSuspending }] =
    useSuspendTeamMemberMutation();
  const [deleteTeamMember, { isLoading: isDeleting }] =
    useDeleteTeamMemberMutation();

  const teamData = data?.data || [];
  const metadata = data?.metadata;

  const handleRoleChange = async (memberId: string, newRole: string) => {
    try {
      await updateTeamMember({ memberId, role: newRole }).unwrap();
      toast.success("Role updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update role");
    }
  };

  // Open Dialog for Suspend
  const confirmSuspend = (memberId: string, name: string) => {
    setSelectedMember({ id: memberId, name });
    setActionType("suspend");
    setConfirmOpen(true);
  };

  // Open Dialog for Delete
  const confirmDelete = (memberId: string, name: string) => {
    setSelectedMember({ id: memberId, name });
    setActionType("delete");
    setConfirmOpen(true);
  };

  // Execute Action
  const handleConfirmAction = async () => {
    if (!selectedMember || !actionType) return;

    try {
      if (actionType === "suspend") {
        await suspendTeamMember(selectedMember.id).unwrap();
        toast.success(`Team member ${selectedMember.name} suspended`);
      } else if (actionType === "delete") {
        await deleteTeamMember(selectedMember.id).unwrap();
        toast.success(`Team member ${selectedMember.name} deleted`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${actionType} member`);
    } finally {
      setConfirmOpen(false);
      setSelectedMember(null);
      setActionType(null);
    }
  };

  const handleNextPage = () => {
    if (metadata && page < metadata.totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (isError) {
    return <div className="text-white">Failed to load team members.</div>;
  }

  const isActionLoading = isUpdating || isSuspending || isDeleting;

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[1000px] text-white">
          <TableHeader>
            <TableRow className="text-gray-400 text-sm md:text-base border-gray-800">
              <TableHead className="px-4 py-2 text-left">Name</TableHead>
              <TableHead className="px-4 py-2 text-left">Role</TableHead>
              <TableHead className="px-4 py-2 text-left">Email</TableHead>
              <TableHead className="px-4 py-2 text-left">Status</TableHead>
              <TableHead className="px-4 py-2 text-left">Join Date</TableHead>
              <TableHead className="px-4 py-2 text-left">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {teamData.length > 0 ? (
              teamData.map((member) => (
                <TableRow
                  key={member.memberId}
                  className="border-b border-gray-800"
                >
                  <TableCell className="px-4 py-3">{member.name}</TableCell>
                  <TableCell className="px-4 py-3">{member.role}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-400">
                    {member.email}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                        member.status === "Active"
                          ? "bg-[#0E261F] text-[#01D449]"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {member.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 flex flex-col gap-1">
                    {/* Role Dropdown Filter */}
                    <div className="flex gap-2 mt-1">
                      <div className="w-40">
                        <Select
                          value={member.role}
                          onValueChange={(value) =>
                            handleRoleChange(member.memberId, value)
                          }
                          disabled={isActionLoading}
                        >
                          <SelectTrigger className="w-full bg-[#262C31] border border-[rgba(226,232,240,0.30)] text-white h-10 rounded-[15px] hover:border-[#1C1D28]">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#17171A] text-white border-gray-700">
                            {roles.map((role) => (
                              <SelectItem
                                key={role}
                                value={role}
                                className="focus:bg-[#131320] focus:text-white cursor-pointer"
                              >
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Suspend & Delete Buttons */}

                      <button
                        onClick={() =>
                          confirmSuspend(member.memberId, member.name)
                        }
                        disabled={isActionLoading}
                        className="bg-yellow-500 px-3 py-1 rounded-[15px] text-sm hover:bg-yellow-400 disabled:opacity-50"
                      >
                        Suspend
                      </button>
                      <button
                        onClick={() =>
                          confirmDelete(member.memberId, member.name)
                        }
                        disabled={isActionLoading}
                        className="bg-red-600 px-3 py-1 rounded-[15px] text-sm hover:bg-red-500 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-4 text-gray-500"
                >
                  No team members found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {metadata && metadata.totalPage > 1 && (
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={page === 1}
            className="bg-[#262C31] text-white border-gray-700 hover:bg-[#1C1D28] hover:text-white"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={page === metadata.totalPage}
            className="bg-[#262C31] text-white border-gray-700 hover:bg-[#1C1D28] hover:text-white"
          >
            Next
          </Button>
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="bg-[#121E21] border border-gray-700 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {actionType === "suspend" ? "Suspend Member" : "Delete Member"}
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-2">
              Are you sure you want to {actionType}{" "}
              <span className="text-white font-semibold">
                {selectedMember?.name}
              </span>
              ?{actionType === "delete" && " This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              className="bg-transparent border-gray-600 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAction}
              className={`${
                actionType === "delete"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-yellow-500 hover:bg-yellow-600 text-black"
              }`}
            >
              {isActionLoading ? "Confirming..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamTable;

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// // import { FaChevronRight } from "react-icons/fa";

// interface TeamMember {
//   id: string;
//   name: string;
//   role: string;
//   email: string;
//   status: "Active" | "Inactive";
//   joinDate: string;
// }

// const teamData: TeamMember[] = [
//   {
//     id: "1",
//     name: "Marvin McKinney",
//     role: "Distributor",
//     email: "kenzi.lawson@example.com",
//     status: "Active",
//     joinDate: "15/08/2023",
//   },
//   {
//     id: "2",
//     name: "Darrell Steward",
//     role: "Accountant",
//     email: "tim.jennings@example.com",
//     status: "Active",
//     joinDate: "22/11/2023",
//   },
//   {
//     id: "3",
//     name: "Albert Flores",
//     role: "Distributor",
//     email: "jackson.graham@example.com",
//     status: "Inactive",
//     joinDate: "05/01/2024",
//   },
//   {
//     id: "4",
//     name: "Floyd Miles",
//     role: "Accountant",
//     email: "deanna.curtis@example.com",
//     status: "Active",
//     joinDate: "30/04/2023",
//   },
// ];

// const TeamTable = () => {
//   const handleChangeRole = (id: string) => {
//     console.log("Change role for:", id);
//   };

//   const handleSuspend = (id: string) => {
//     console.log("Suspend:", id);
//   };

//   const handleDelete = (id: string) => {
//     console.log("Delete:", id);
//   };

//   return (
//     <div className="overflow-x-auto">
//       <Table className="w-full min-w-[1000px] text-white">
//         {/* Table Header */}
//         <TableHeader>
//           <TableRow className="text-gray-400 text-sm md:text-base">
//             <TableHead className="px-4 py-2 text-left">Name</TableHead>
//             <TableHead className="px-4 py-2 text-left">Role</TableHead>
//             <TableHead className="px-4 py-2 text-left">Email</TableHead>
//             <TableHead className="px-4 py-2 text-left">Status</TableHead>
//             <TableHead className="px-4 py-2 text-left">Join Date</TableHead>
//             <TableHead className="px-4 py-2 text-left">Action</TableHead>
//           </TableRow>
//         </TableHeader>

//         {/* Table Body */}
//         <TableBody>
//           {teamData.map((member) => (
//             <TableRow key={member.id} className="border-b border-gray-800">
//               <TableCell className="px-4 py-3">{member.name}</TableCell>
//               <TableCell className="px-4 py-3">{member.role}</TableCell>
//               <TableCell className="px-4 py-3 text-gray-400">
//                 {member.email}
//               </TableCell>
//               <TableCell className="px-4 py-3">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
//                     member.status === "Active"
//                       ? "bg-[#0E261F] text-[#01D449]"
//                       : "bg-gray-700 text-gray-300"
//                   }`}
//                 >
//                   {member.status}
//                 </span>
//               </TableCell>
//               <TableCell className="px-4 py-3">{member.joinDate}</TableCell>
//               <TableCell className="px-4 py-3 flex gap-2">
//                 <button
//                   onClick={() => handleChangeRole(member.id)}
//                   className="bg-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-700"
//                 >
//                   Change Role
//                 </button>
//                 <button
//                   onClick={() => handleSuspend(member.id)}
//                   className="bg-yellow-500 px-3 py-1 rounded text-sm hover:bg-yellow-400"
//                 >
//                   Suspend
//                 </button>
//                 <button
//                   onClick={() => handleDelete(member.id)}
//                   className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-500"
//                 >
//                   Delete
//                 </button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default TeamTable;
