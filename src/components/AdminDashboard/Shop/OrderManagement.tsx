import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  useGetAdminOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/admin/adminOrder";

// Admin Order component UI

import TableSkeleton, { ColumnConfig } from "@/components/Reuseable/TableSkeleton";

const OrderManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("ALL");

  const {
    data: ordersResponse,
    isLoading,
    error,
  } = useGetAdminOrdersQuery({
    page,
    limit,
    search: search || undefined,
    status: status === "ALL" ? undefined : status,
  });

  const navigate = useNavigate();

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  const orders = ordersResponse?.data || [];

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "PROCESSING":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "SHIPPED":
        return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
      case "DELIVERED":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "CANCELLED":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
    }
  };

  const columns: ColumnConfig[] = [
    { header: "Order Identification", type: "text" },
    { header: "Customer Profile", type: "text" },
    { header: "Net Revenue", type: "text", align: "center" },
    { header: "Current Phase", type: "badge", align: "center" },
    { header: "Command", type: "action", align: "right" },
  ];

  if (error) {
    return (
      <div className="text-center py-20 bg-rose-500/5 rounded-3xl border border-rose-500/10">
        <p className="text-rose-500 font-black uppercase tracking-widest text-[10px] mb-2">System Interruption</p>
        <p className="text-zinc-400 text-sm mb-6">Failed to retrieve the latest order data.</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="rounded-xl border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 font-bold text-xs">
          Rejuvenate
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-white">
            Order <span className="text-blue-500">Management</span>
          </h1>
          <p className="text-zinc-500 text-sm font-semibold">
            Managing Customer Acquisitions & Fulfilment
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
          {/* Status Filter */}
          <div className="w-full sm:w-48">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-zinc-950/50 border-white/5 h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-blue-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">Status:</span>
                  <SelectValue placeholder="All States" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-[1.5rem] p-2">
                <SelectItem value="ALL" className="rounded-xl text-[10px] font-bold uppercase py-2 cursor-pointer">All Orders</SelectItem>
                <SelectItem value="PENDING" className="rounded-xl text-[10px] font-bold uppercase py-2 cursor-pointer">Pending</SelectItem>
                <SelectItem value="PROCESSING" className="rounded-xl text-[10px] font-bold uppercase py-2 cursor-pointer">Processing</SelectItem>
                <SelectItem value="SHIPPED" className="rounded-xl text-[10px] font-bold uppercase py-2 cursor-pointer">Shipped</SelectItem>
                <SelectItem value="DELIVERED" className="rounded-xl text-[10px] font-bold uppercase py-2 cursor-pointer">Delivered</SelectItem>
                <SelectItem value="CANCELLED" className="rounded-xl text-[10px] font-bold uppercase py-2 cursor-pointer">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              size={16}
            />
            <Input
              placeholder="Search by ID or Customer..."
              className="bg-zinc-950/50 border-white/5 pl-11 h-12 rounded-2xl focus:ring-blue-500/20 focus:border-blue-500/50 text-[11px] font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table Section (Desktop) */}
      <div className="hidden xl:block bg-[#0e2223] border border-white/5 rounded-xl overflow-hidden  relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="overflow-x-auto">
          {isLoading ? (
            <TableSkeleton columns={columns} rowCount={8} className="border-none" />
          ) : (
            <Table className="w-full text-white">
              <TableHeader className="bg-zinc-950/20">
                <TableRow className="border-white/5 hover:bg-transparent text-zinc-500 text-white font-bold">
                  <TableHead className="px-8 py-6">Order Identification</TableHead>
                  <TableHead className="px-8 py-6">Customer Profile</TableHead>
                  <TableHead className="px-8 py-6 text-center">Net Revenue</TableHead>
                  <TableHead className="px-8 py-6 text-center">Current Phase</TableHead>
                  <TableHead className="px-8 py-6 text-right">Command</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="border-white/5 hover:bg-white/5 transition-all duration-500 group"
                    >
                      <TableCell className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <span className="font-black text-blue-500 text-xs tracking-tighter">
                            #{order.id.slice(0, 10).toUpperCase()}
                          </span>
                          <div className="flex items-center gap-2 text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
                            <Clock size={10} />
                            {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-zinc-200 text-xs">
                            {order.user?.name || "Anonymous Requester"}
                          </span>
                          <span className="text-[10px] text-zinc-600 font-medium">
                            {order.user?.email || "No digital signature"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-center">
                        <span className="font-black text-white text-base tracking-tighter">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-center">
                        <Select
                          value={order.status}
                          onValueChange={(val) =>
                            handleStatusChange(order.id, val)
                          }
                        >
                          <SelectTrigger
                            className={`w-36 mx-auto h-9 text-[9px] font-black rounded-[0.75rem] border uppercase tracking-widest shadow-lg transition-all active:scale-95 ${getStatusColor(order.status)}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-950 border-white/10 text-white rounded-[1.25rem] p-2 shadow-2xl">
                            <SelectItem value="PENDING" className="rounded-xl text-[9px] font-black uppercase py-2 cursor-pointer">Pending</SelectItem>
                            <SelectItem value="PROCESSING" className="rounded-xl text-[9px] font-black uppercase py-2 cursor-pointer">Processing</SelectItem>
                            <SelectItem value="SHIPPED" className="rounded-xl text-[9px] font-black uppercase py-2 cursor-pointer">Shipped</SelectItem>
                            <SelectItem value="DELIVERED" className="rounded-xl text-[9px] font-black uppercase py-2 cursor-pointer">Delivered</SelectItem>
                            <SelectItem value="CANCELLED" className="rounded-xl text-[9px] font-black uppercase py-2 cursor-pointer text-rose-500">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3">
                          <Button
                            variant="default"
                            onClick={() =>
                              navigate(
                                `/super-admin-dashboard/orders/${order.id}`,
                              )
                            }
                            className="rounded-lg bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all shadow-lg active:scale-90"
                          >
                            <Eye size={16} /> view
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-48 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <MoreHorizontal className="w-8 h-8 text-zinc-800" />
                        <span className="text-zinc-600 font-black text-[10px] uppercase tracking-[0.3em]">No Intelligence Found</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Mobile Card List (Mobile & Tablet) */}
      <div className="xl:hidden space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 space-y-4 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-zinc-800 rounded-lg" />
                  <div className="h-3 w-20 bg-zinc-900 rounded-lg" />
                </div>
                <div className="h-8 w-24 bg-zinc-800 rounded-full" />
              </div>
              <div className="h-[1px] bg-white/5" />
              <div className="flex justify-between items-center pt-2">
                <div className="h-6 w-16 bg-zinc-800 rounded-lg" />
                <div className="h-10 w-24 bg-zinc-800 rounded-xl" />
              </div>
            </div>
          ))
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 space-y-5 relative group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-blue-500 font-black text-xs tracking-tighter block">#{order.id.slice(0, 10).toUpperCase()}</span>
                  <div className="flex items-center gap-2 text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
                    <Clock size={10} />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <Select
                  value={order.status}
                  onValueChange={(val) => handleStatusChange(order.id, val)}
                >
                  <SelectTrigger
                    className={`w-32 h-8 text-[9px] font-black rounded-[0.7rem] border uppercase tracking-widest ${getStatusColor(order.status)}`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border-white/10 text-white rounded-[1rem] p-2">
                    <SelectItem value="PENDING" className="rounded-lg text-[9px] font-black uppercase py-2">Pending</SelectItem>
                    <SelectItem value="PROCESSING" className="rounded-lg text-[9px] font-black uppercase py-2">Processing</SelectItem>
                    <SelectItem value="SHIPPED" className="rounded-lg text-[9px] font-black uppercase py-2">Shipped</SelectItem>
                    <SelectItem value="DELIVERED" className="rounded-lg text-[9px] font-black uppercase py-2">Delivered</SelectItem>
                    <SelectItem value="CANCELLED" className="rounded-lg text-[9px] font-black uppercase py-2 text-rose-500">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4 bg-zinc-950/40 p-3 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-black text-xs">
                  {order.user?.name?.charAt(0) || "A"}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-200">{order.user?.name || "Anonymous Requester"}</span>
                  <span className="text-[9px] text-zinc-600 font-medium lowercase tracking-tight">{order.user?.email || "No digital signature"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-col">
                  <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-0.5 whitespace-nowrap">Net Revenue</span>
                  <span className="text-lg font-black text-white tracking-tighter">${order.totalAmount.toFixed(2)}</span>
                </div>
                <Button
                  onClick={() => navigate(`/super-admin-dashboard/orders/${order.id}`)}
                  className="rounded-xl h-10 px-5 bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-white/80 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                >
                  <Eye size={14} /> view
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center gap-3">
            <MoreHorizontal className="w-8 h-8 text-zinc-800" />
            <span className="text-zinc-600 font-black text-[10px] uppercase tracking-[0.3em]">No Intelligence Found</span>
          </div>
        )}
      </div>

      {/* Pagination Dashboard */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-zinc-950/20 p-6 rounded-[2rem] border border-white/5">
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
          Displaying{" "}
          <span className="text-zinc-200">
            {ordersResponse?.meta?.total ? (page - 1) * limit + 1 : 0}
          </span>{" "}
          —{" "}
          <span className="text-zinc-200">
            {Math.min(page * limit, ordersResponse?.meta?.total || 0)}
          </span>{" "}
          of{" "}
          <span className="text-zinc-200 tracking-tighter">
            {ordersResponse?.meta?.total || 0}
          </span>{" "}
          Entities
        </p>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="h-11 px-6 rounded-2xl border border-white/5 bg-zinc-900 text-zinc-500 disabled:opacity-20 flex gap-3 items-center text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 hover:text-zinc-200 transition-all active:scale-95 shadow-xl"
          >
            <ChevronLeft size={16} /> Previous
          </Button>
          <Button
            variant="ghost"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= (ordersResponse?.meta?.totalPage || 1)}
            className="h-11 px-6 rounded-2xl border border-white/5 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 flex gap-3 items-center text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl disabled:opacity-20"
          >
            Next <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
