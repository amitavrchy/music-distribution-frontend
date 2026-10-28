import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useGetOrderDetailsQuery, OrderItem } from "@/redux/features/commerce/commerceApi";
import { exportToPDF } from "@/utils/exportUtils";
import { useState } from "react";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
  Truck,
  Download,
  Calendar,
  Tag,
  Hash,
} from "lucide-react";

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId as string, {
    skip: !orderId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-2xl animate-spin mb-6"></div>
        <p className="text-gray-400 text-lg font-medium animate-pulse">Retrieving Order Chronicles...</p>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4">
        <div className="bg-[#111] p-10 rounded-[2.5rem] border border-gray-800 shadow-2xl text-center max-w-md">
          <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <XCircle className="w-10 h-10 text-rose-500" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">Order Missing</h2>
          <p className="text-gray-400 mb-8 font-medium">
            We couldn't track down the details for this order identification. It might have been archived or moved.
          </p>
          <button
            onClick={() => navigate("/orders")}
            className="w-full py-4 bg-white text-black font-bold rounded-2xl transition-all duration-300 hover:bg-gray-200 active:scale-95 cursor-pointer shadow-xl shadow-white/5"
          >
            Return to My Orders
          </button>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    const s = status?.toUpperCase();
    switch (s) {
      case "COMPLETED":
      case "DELIVERED":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
          label: "Delivered"
        };
      case "CANCELLED":
      case "FAILED":
        return {
          icon: <XCircle className="w-5 h-5" />,
          color: "text-rose-400 bg-rose-400/10 border-rose-400/20",
          label: "Cancelled"
        };
      case "PROCESSING":
        return {
          icon: <Clock className="w-5 h-5" />,
          color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
          label: "Processing"
        };
      default:
        return {
          icon: <Clock className="w-5 h-5" />,
          color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
          label: status || "Pending"
        };
    }
  };

  const statusConfig = getStatusConfig(order.status);
  const subtotal = order.subtotalAmount || 0;
  const discount = order.discountAmount || 0;
  const totalAmount = order.totalAmount || 0;
  const shipping = totalAmount - subtotal + discount; // Inferring shipping if not explicitly provided

  const handleDownloadInvoice = async () => {
    console.log("Download button clicked for order:", order.id);
    setIsDownloading(true);
    try {
      await exportToPDF("order-invoice", `Invoice-${order.id.toUpperCase()}.pdf`);
    } catch (error) {
      console.error("PDF generation failed in component:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] py-12 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Navigation / Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-12">
          <div className="space-y-4">
            <button
              onClick={() => navigate("/orders")}
              className="inline-flex items-center text-gray-500 hover:text-white transition-all duration-300 font-bold tracking-widest text-[10px] uppercase group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Collections
            </button>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl sm:text-3xl font-semibold text-white tracking-tighter">
                  Order <span className="text-blue-500">Receipt</span>
                </h1>
                <div className={`hidden sm:flex items-center px-4 py-1.5 rounded-full text-xs font-black border uppercase tracking-widest ${statusConfig.color}`}>
                  {statusConfig.icon}
                  <span className="ml-2">{statusConfig.label}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gray-700" />
                  <span className="text-gray-300">ID: {order.id.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-700" />
                  <span>Placed on {order.createdAt ? format(new Date(order.createdAt), "MMMM dd, yyyy") : "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:hidden">
            <div className={`flex items-center px-4 py-2 rounded-full text-xs font-black border uppercase tracking-widest ${statusConfig.color}`}>
              {statusConfig.icon}
              <span className="ml-2">{statusConfig.label}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Items Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Products List */}
            <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-xl relative">
              <div className="p-8 border-b border-gray-800/50 bg-gradient-to-r from-blue-600/5 to-transparent">
                <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
                  <Package className="w-6 h-6 text-blue-500" />
                  Order Manifest
                </h2>
              </div>
              <div className="divide-y divide-gray-800/50">
                {order.items?.map((item: OrderItem) => (
                  <div
                    key={item.id}
                    className="p-8 flex flex-col sm:flex-row gap-8 hover:bg-[#151515] transition-colors duration-500 group"
                  >
                    <div className="shrink-0 w-32 h-32 bg-gray-900 rounded-xl overflow-hidden border border-gray-800/50 shadow-inner p-1 group-hover:border-blue-500/30 transition-colors">
                      <img
                        src={item.product?.imageUrl || ""}
                        alt={item.product?.name || "Product"}
                        className="w-full h-full object-cover rounded-xl opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-500 transition-colors">
                            {item.product?.name || "Unknown Product"}
                          </h3>
                          <span className="text-sm font-black text-gray-700">x{item.quantity}</span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2 font-medium">
                          {item.product?.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-end mt-6">
                        <div className="bg-gray-900/50 px-3 py-1.5 rounded-xl border border-gray-800">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Unit Price: </span>
                          <span className="text-sm font-black text-blue-500">${(item.price || item.product?.price || 0).toFixed(2)}</span>
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter">
                          ${((item.price || item.product?.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#111] border border-gray-800 rounded-xl p-8 shadow-xl hover:border-gray-700 transition-colors group">
                <h2 className="text-sm font-black text-gray-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  <Truck className="w-4 h-4 text-blue-500" />
                  Logistics
                </h2>
                <div className="space-y-6">
                  <div className="group-hover:translate-x-1 transition-transform">
                    <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1">Shipping Methodology</h3>
                    <p className="text-gray-200 text-sm font-bold">Premium Standard Delivery</p>
                  </div>
                  <div className="group-hover:translate-x-1 transition-transform delay-75">
                    <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1">Tracking Coordinates</h3>
                    <p className="text-blue-500 text-sm font-black hover:text-blue-400 cursor-pointer flex items-center gap-2">
                      {order.trackingNumber || "TBA - Finalizing Prep"}
                      <ArrowLeft className="w-3 h-3 rotate-180" />
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-gray-800 rounded-xl p-8 shadow-xl hover:border-gray-700 transition-colors group">
                <h2 className="text-sm font-black text-gray-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  <Tag className="w-4 h-4 text-rose-500" />
                  Destination
                </h2>
                <div className="space-y-4">
                  <div className="group-hover:translate-x-1 transition-transform">
                    <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1">Recipient</h3>
                    <p className="text-gray-200 text-sm font-bold">{order.fullName || order.user?.name || "Valued Customer"}</p>
                  </div>
                  <div className="group-hover:translate-x-1 transition-transform delay-75">
                    <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1">Address</h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-medium">
                      {order.addressLine && `${order.addressLine}, `}
                      {order.city && `${order.city}, `}
                      {order.postalCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary Column */}
          <div className="space-y-8">
            <div className="bg-[#111] border border-gray-800 rounded-xl p-8 shadow-2xl sticky top-24 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700" />
              <h2 className="text-sm font-black text-gray-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-emerald-500" />
                Financial Summary
              </h2>

              <div className="space-y-5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Net Value</span>
                  <span className="text-white font-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Logistics Fee</span>
                  <span className="text-white font-black">${shipping.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-rose-500/80 font-bold uppercase tracking-widest text-[10px]">Loyalty Rebate</span>
                    <span className="text-rose-500 font-black">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-6"></div>

                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Final Investment</span>
                    <div className="text-3xl font-black text-white tracking-tighter">
                      ${totalAmount.toFixed(2)}
                    </div>
                  </div>
                  <div className="pb-1">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                      SECURED
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <button
                  className={`w-full py-4 bg-[#1A1A1A] border border-gray-800 hover:border-gray-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-white/5 active:scale-95 ${isDownloading ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
                  onClick={handleDownloadInvoice}
                  disabled={isDownloading}
                >
                  <Download className={`w-4 h-4 ${isDownloading ? "animate-bounce" : ""}`} />
                  {isDownloading ? "Generating PDF..." : "Obtain Invoice"}
                </button>
              </div>
            </div>

            {/* <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 flex items-center gap-4 group cursor-pointer hover:border-blue-500/30 transition-all duration-300">
                <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                    <Package className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                    <h3 className="text-xs font-black text-white uppercase tracking-widest">Need Support?</h3>
                    <p className="text-[10px] text-gray-500 font-bold">Our curators are here to help.</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-blue-500 transition-colors" />
            </div> */}
          </div>
        </div>

        {/* Hidden Invoice Template for PDF Export */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0 }}>
          <div id="order-invoice" className="p-16 bg-white font-sans" style={{ color: '#000000', width: '800px', backgroundColor: '#ffffff' }}>
            {/* Header */}
            <div className="flex justify-between items-start mb-12 pb-8" style={{ borderBottom: '2px solid #f3f4f6' }}>
              <div>
                <h1 className="text-4xl font-black tracking-tighter mb-2" style={{ color: '#000000' }}>Marlow</h1>
                <p className="text-xs font-bold uppercase tracking-widest leading-relaxed" style={{ color: '#9ca3af' }}>
                  Premium Digital Audio & <br />
                  Curated Collection Receipt
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-sm font-black uppercase tracking-widest mb-1" style={{ color: '#111827' }}>Receipt Information</h2>
                <div className="text-xs font-medium" style={{ color: '#6b7280' }}>
                  <p>Order ID: {order.id.toUpperCase()}</p>
                  <p>Date: {order.createdAt ? format(new Date(order.createdAt), "MMMM dd, yyyy") : "N/A"}</p>
                  {/* <p>Status: {order.status?.toUpperCase()}</p> */}
                </div>
              </div>
            </div>

            {/* Customer & Shipping */}
            <div className="grid grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: '#9ca3af' }}>Billed To</h3>
                <p className="text-sm font-bold" style={{ color: '#111827' }}>{order.fullName || order.user?.name || "Valued Customer"}</p>
                <div className="text-xs mt-1 leading-relaxed" style={{ color: '#6b7280' }}>
                  {order.addressLine && <p>{order.addressLine}</p>}
                  {order.city && <p>{order.city}, {order.postalCode}</p>}
                  {order.user?.email && <p>{order.user.email}</p>}
                </div>
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: '#9ca3af' }}>Shipping Method</h3>
                <p className="text-sm font-bold" style={{ color: '#111827' }}>Premium Standard Delivery</p>
                <p className="text-xs mt-1" style={{ color: '#6b7280' }}>Tracking: {order.trackingNumber || "TBA"}</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-12">
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest" style={{ color: '#9ca3af' }}>Description</th>
                  <th className="py-4 text-center text-[10px] font-black uppercase tracking-widest" style={{ color: '#9ca3af' }}>Qty</th>
                  <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest" style={{ color: '#9ca3af' }}>Price</th>
                  <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest" style={{ color: '#9ca3af' }}>Total</th>
                </tr>
              </thead>
              <tbody style={{ borderCollapse: 'collapse' }}>
                {order.items?.map((item: OrderItem) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                    <td className="py-6">
                      <p className="text-sm font-bold" style={{ color: '#111827' }}>{item.product?.name || "Product"}</p>
                      <p className="text-[10px] font-medium mt-0.5" style={{ color: '#9ca3af' }}>{item.product?.description?.substring(0, 60)}...</p>
                    </td>
                    <td className="py-6 text-center text-sm font-bold" style={{ color: '#4b5563' }}>{item.quantity}</td>
                    <td className="py-6 text-right text-sm font-bold" style={{ color: '#4b5563' }}>${(item.price || item.product?.price || 0).toFixed(2)}</td>
                    <td className="py-6 text-right text-sm font-black" style={{ color: '#111827' }}>${((item.price || item.product?.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summary */}
            <div className="w-64 ml-auto space-y-3">
              <div className="flex justify-between text-xs">
                <span className="font-bold uppercase tracking-widest" style={{ color: '#9ca3af' }}>Subtotal</span>
                <span className="font-bold" style={{ color: '#111827' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-bold uppercase tracking-widest" style={{ color: '#9ca3af' }}>Shipping</span>
                <span className="font-bold" style={{ color: '#111827' }}>${shipping.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="font-bold uppercase tracking-widest" style={{ color: '#e11d48' }}>Discount</span>
                  <span className="font-bold" style={{ color: '#e11d48' }}>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-4 flex justify-between items-baseline" style={{ borderTop: '1px solid #e5e7eb' }}>
                <span className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: '#111827' }}>Total</span>
                <span className="text-2xl font-black tracking-tighter" style={{ color: '#2563eb' }}>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-8 text-center" style={{ borderTop: '1px solid #f3f4f6' }}>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: '#9ca3af' }}>Thank you for your investment</p>
              <p className="text-[8px] font-bold uppercase tracking-widest" style={{ color: '#d1d5db' }}>
                This is a computer-generated document and no signature is required. <br />
                &copy; 2024 Marlow. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
