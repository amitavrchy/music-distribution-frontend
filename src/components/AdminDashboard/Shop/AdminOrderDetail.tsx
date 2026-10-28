import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
  Truck,
  MapPin,
  Mail,
  User,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import {
  useGetAdminOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/admin/adminOrder";

const AdminOrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const {
    data: orderResponse,
    isLoading,
    error,
  } = useGetAdminOrderByIdQuery(orderId || "");

  const order = orderResponse?.data;

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateOrderStatus({ id: orderId || "", status: newStatus }).unwrap();
      toast.success(
        `Order ${orderId?.slice(0, 8)} status successfully updated to ${newStatus}`,
      );
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update order status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "PROCESSING":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "SHIPPED":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "DELIVERED":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "CANCELLED":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return <Clock size={16} />;
      case "PROCESSING":
        return <Package size={16} />;
      case "SHIPPED":
        return <Truck size={16} />;
      case "DELIVERED":
        return <CheckCircle size={16} />;
      case "CANCELLED":
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-lg flex items-center gap-3">
          <Clock className="animate-spin text-blue-500" />
          Loading order details...
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-red-500 text-lg font-bold">
          Error loading order details
        </div>
        <Button onClick={() => navigate("/super-admin-dashboard/orders")}>
          Back to Orders
        </Button>
      </div>
    );
  }

  const shippingAddress = [
    order.fullName,
    order.addressLine,
    order.city,
    order.postalCode,
  ]
    .filter(Boolean)
    .join(", ") || "No address provided";

  return (
    <div className="space-y-8 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/super-admin-dashboard/orders")}
            className="p-0 h-auto hover:bg-transparent text-gray-400 hover:text-white flex gap-2 items-center text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Orders List
          </Button>
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight">
              Order Details
            </h1>
            <p className="text-gray-400 mt-1 flex items-center gap-2 text-sm md:text-lg">
              <span className="font-mono text-blue-400">
                {orderId}
              </span>
              <span className="text-gray-600">•</span>
              <span>Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Update Order Status
          </span>
          <Select
            defaultValue={order.status}
            onValueChange={(val) => handleStatusChange(val)}
          >
            <SelectTrigger
              className={`w-full md:w-48 h-11 rounded-xl border-none font-bold text-sm flex gap-3 shadow-[0_0_20px_-10px_rgba(0,0,0,0.5)] ${getStatusColor(order.status)}`}
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-xl w-full">
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="PROCESSING">Processing</SelectItem>
              <SelectItem value="SHIPPED">Shipped</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Products */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-950/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-3">
                <Package className="text-blue-500" size={20} />
                Products Ordered
              </h2>
              <span className="text-xs bg-white/5 text-gray-400 px-3 py-1 rounded-full border border-white/5">
                {order.items.length} Items
              </span>
            </div>

            <div className="divide-y divide-white/5">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-white/2 transition-colors group"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 shrink-0 border border-white/5 shadow-lg relative">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight mb-1 group-hover:text-blue-400 transition-colors">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono tracking-wider">
                          SKU: {item.productId}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-white"
                      >
                        <ExternalLink size={14} />
                      </Button>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Unit Price</p>
                        <p className="text-white font-semibold">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="space-y-1 text-center">
                        <p className="text-xs text-gray-500">Qty</p>
                        <p className="text-white font-bold bg-white/5 h-8 w-8 flex items-center justify-center rounded-lg border border-white/5">
                          {item.quantity}
                        </p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="text-blue-400 font-bold text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics Mock Card */}
          <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 backdrop-blur-xl group cursor-default">
            <h2 className="text-lg font-bold text-white flex items-center gap-3 mb-6">
              <Truck className="text-purple-500" size={20} />
              Logistics Information
            </h2>
            <div className="">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/2 border border-white/5 transition-all group-hover:bg-white/5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Shipping Destination
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      {shippingAddress}
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/2 border border-white/5 transition-all group-hover:bg-white/5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Tracking Number
                    </h4>
                    <p className="text-blue-400 text-sm font-mono tracking-tighter">
                      TRK-9823471029347
                    </p>
                    <button className="text-[10px] text-gray-400 hover:text-white underline mt-1 transition-colors">
                      Track on Courier Website
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Sidebar: Customer & Payment */}
        <div className="space-y-6">
          {/* Customer Card */}
          <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-3 mb-6">
              <User className="text-gray-400" size={20} />
              Customer Profile
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-white/5">
                  {order.user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-bold leading-none mb-1">
                    {order.user.name}
                  </h3>
                  <p className="text-xs text-gray-500">ID: {order.userId.slice(0, 8)}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-sm group cursor-pointer">
                  <Mail
                    className="text-gray-500 group-hover:text-blue-400 transition-colors"
                    size={16}
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {order.user.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-gray-300">Verified Customer</span>
                </div>
              </div>

              {/* <Button className="w-full h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/5 font-bold transition-all">
                View User History
              </Button> */}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <CreditCard size={100} />
            </div>

            <h2 className="text-lg font-bold text-white flex items-center gap-3 mb-6 relative z-10">
              <CreditCard className="text-emerald-500" size={20} />
              Payment Summary
            </h2>

            <div className="space-y-4 relative z-10">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-white font-medium">
                  ${order.subtotalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span className="text-white font-medium">
                  -${order.discountAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/5 mt-2">
                <span className="text-gray-400">Grand Total</span>
                <span className="text-blue-400">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="h-px bg-white/5 my-4"></div>

              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Payment Status
                  </span>
                  <p className="text-2xl font-black text-white">
                    {/* {order.payment.status === "succeeded" ? "Paid" : order.payment.status} */}
                    Succeeded
                  </p>
                </div>
                <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-lg border border-emerald-500/20 uppercase tracking-tighter">
                  Paid via Stripe
                </div>
              </div>

              <p className="text-[10px] text-gray-500 text-center mt-6">
                Transaction ID: {order.payment.stripePaymentIntentId}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-14 rounded-2xl border-white/5 bg-zinc-900/50 text-gray-400 hover:text-white transition-all flex gap-3"
          >
            Download Sales Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
