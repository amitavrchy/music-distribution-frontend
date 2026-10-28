import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useCurrentUser } from "@/hooks/useCurrentUse";
import { useGetOrdersQuery, Order } from "@/redux/features/commerce/commerceApi";
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, ChevronRight, ShoppingBag } from "lucide-react";

const OrdersPage: React.FC = () => {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);
  const ITEMS_PER_PAGE = 5;

  const {
    data: orders,
    isLoading,
    isError,
  } = useGetOrdersQuery(user?.id ?? "", {
    skip: !user?.id,
  });

  if (!user?.id) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4">
        <div className="bg-[#111] p-8 rounded-3xl border border-gray-800 shadow-2xl text-center max-w-md">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Your Collection Awaits</h2>
          <p className="text-gray-400 mb-8">Please log in to your account to view your order history and track your latest purchases.</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer"
          >
            Sign In Now
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
          icon: <CheckCircle className="w-4 h-4" />,
          color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
          label: "Delivered"
        };
      case "CANCELLED":
      case "FAILED":
        return {
          icon: <XCircle className="w-4 h-4" />,
          color: "text-rose-400 bg-rose-400/10 border-rose-400/20",
          label: "Cancelled"
        };
      case "PROCESSING":
        return {
          icon: <Clock className="w-4 h-4" />,
          color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
          label: "Processing"
        };
      case "PENDING":
      default:
        return {
          icon: <Clock className="w-4 h-4" />,
          color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
          label: status || "Pending"
        };
    }
  };

  const OrderSkeleton = () => (
    <div className="bg-[#111] border border-gray-800 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 animate-pulse">
      <div className="w-full sm:w-40 h-40 bg-gray-900 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-4 py-2">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-900 rounded" />
            <div className="h-6 w-32 bg-gray-800 rounded" />
          </div>
          <div className="h-8 w-24 bg-gray-900 rounded-full" />
        </div>
        <div className="space-y-3 pt-2">
          <div className="h-4 w-full bg-gray-900/50 rounded" />
          <div className="h-4 w-2/3 bg-gray-900/50 rounded" />
        </div>
        <div className="flex justify-between items-center pt-4">
          <div className="h-8 w-16 bg-gray-800 rounded" />
          <div className="h-10 w-32 bg-gray-800 rounded-xl" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] py-12 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/shop")}
              className="p-3 bg-[#111] border border-gray-800 rounded-2xl hover:bg-gray-800 transition-all duration-300 text-gray-400 hover:text-white shadow-xl group cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                Order <span className="text-blue-500">History</span>
              </h1>
              <p className="text-gray-500 mt-1 font-medium">Manage and track your premium selections</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#111] border border-gray-800 rounded-2xl text-sm font-medium text-gray-400">
            <ShoppingBag className="w-4 h-4" />
            <span>{(orders?.length || 0)} Orders Total</span>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {isLoading ? (
            <>
              <OrderSkeleton />
              <OrderSkeleton />
              <OrderSkeleton />
            </>
          ) : isError ? (
            <div className="text-center py-20 bg-rose-500/5 rounded-xl border border-rose-500/10 backdrop-blur-sm">
              <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Failed to load orders</h3>
              <p className="text-gray-400 mb-8 max-w-xs mx-auto">There was a technical glitch while retrieving your order details. Please try again.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-2xl font-semibold transition-all cursor-pointer"
              >
                Reconnect
              </button>
            </div>
          ) : !orders || orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-[#0A0A0A] rounded-xl border border-gray-900 border-dashed relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center mb-8 relative z-10">
                <Package className="w-10 h-10 text-gray-700" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 relative z-10">
                Your wardrobe is empty
              </h2>
              <p className="text-gray-500 mb-10 text-center max-w-xs relative z-10 font-medium">
                You haven't added any premium items yet. Our latest collection is waiting for you.
              </p>
              <Link to="/shop" className="relative z-10">
                <button className="px-10 py-4 bg-white text-black hover:bg-gray-200 rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-white/10 active:scale-95 flex items-center gap-2 cursor-pointer">
                  Start Exploring
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          ) : (
            <>
              {(() => {
                const totalPages = Math.ceil((orders?.length || 0) / ITEMS_PER_PAGE);
                const paginatedOrders = (orders || []).slice(
                  (currentPage - 1) * ITEMS_PER_PAGE,
                  currentPage * ITEMS_PER_PAGE
                );

                return (
                  <div className="space-y-6">
                    {paginatedOrders.map((order: Order) => {
                      const firstItem = order.items?.[0];
                      const statusConfig = getStatusConfig(order.status);

                      return (
                        <div
                          key={order.id}
                          className="group bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 shadow-2xl flex flex-col sm:flex-row hover:shadow-blue-500/5 relative active:scale-[0.99]"
                        >
                          {/* Product Preview */}
                          <div className="w-full sm:w-48 h-48 sm:h-auto bg-[#1A1A1A] shrink-0 relative overflow-hidden">
                            {firstItem?.product?.imageUrl ? (
                              <img
                                src={firstItem.product.imageUrl}
                                alt={firstItem.product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-800">
                                <Package className="w-12 h-12" />
                              </div>
                            )}

                            {order.items && order.items.length > 1 && (
                              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xl text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
                                +{order.items.length - 1} More Items
                              </div>
                            )}
                          </div>

                          {/* Order Info */}
                          <div className="p-7 flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-6">
                              <div className="space-y-1">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Order Identification</span>
                                <h3 className="text-sm font-bold text-gray-200 bg-gray-900/50 border border-gray-800 px-3 py-1.5 rounded-xl inline-block">
                                  #{order.id.slice(0, 10).toUpperCase()}
                                </h3>
                              </div>
                              <div
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border ${statusConfig.color}`}
                              >
                                {statusConfig.icon}
                                <span className="uppercase tracking-wider">{statusConfig.label}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-gray-800/50">
                              <div>
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Purchase Date</span>
                                <span className="text-sm font-semibold text-gray-300">
                                  {order.createdAt ? format(new Date(order.createdAt), "MMM dd, yyyy") : "---"}
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Total Pieces</span>
                                <span className="text-sm font-semibold text-gray-300">
                                  {order.items?.length || 0} Products
                                </span>
                              </div>
                              <div className="col-span-2 sm:col-span-1">
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Total Investment</span>
                                <span className="text-xl font-black text-white">
                                  ${(order.totalAmount || 0).toFixed(2)}
                                </span>
                              </div>
                            </div>

                            <div className="mt-7 flex flex-col sm:flex-row items-center gap-4">
                              <button
                                onClick={() => navigate(`/orders/${order.id}`)}
                                className="w-full sm:w-auto px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl text-sm font-bold transition-all duration-300 border border-gray-800 hover:border-gray-700 cursor-pointer shadow-lg active:scale-95"
                              >
                                View Order Details
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-3 pt-8 pb-4">
                        <button
                          onClick={() => {
                            setCurrentPage((prev) => Math.max(1, prev - 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          disabled={currentPage === 1}
                          className="px-6 py-3 bg-[#111] border border-gray-800 rounded-2xl text-sm font-bold text-gray-400 hover:text-white hover:bg-gray-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          Previous
                        </button>

                        <div className="flex items-center gap-2">
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                              key={i + 1}
                              onClick={() => {
                                setCurrentPage(i + 1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={`w-10 h-10 rounded-xl text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${
                                currentPage === i + 1
                                  ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20"
                                  : "bg-[#111] border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800"
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          disabled={currentPage === totalPages}
                          className="px-6 py-3 bg-[#111] border border-gray-800 rounded-2xl text-sm font-bold text-gray-400 hover:text-white hover:bg-gray-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-sm font-medium">Need assistance with your orders? <span className="text-blue-500 hover:underline cursor-pointer">Visit Support Center</span></p>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
