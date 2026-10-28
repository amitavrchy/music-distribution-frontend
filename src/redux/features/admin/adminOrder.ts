import { baseApi } from "@/redux/hooks/baseApi";

export interface AdminOrderUser {
    id: string;
    name: string;
    email: string;
    phone: string | null;
}

export interface AdminOrderPayment {
    id: string;
    amount: number;
    status: string;
    stripePaymentIntentId: string;
    createdAt: string;
}

export interface AdminOrder {
    id: string;
    userId: string;
    status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    fullName: string | null;
    phone: string | null;
    addressLine: string | null;
    city: string | null;
    postalCode: string | null;
    subtotalAmount: number;
    discountAmount: number;
    couponCode: string | null;
    totalAmount: number;
    createdAt: string;
    user: AdminOrderUser;
    payment: AdminOrderPayment;
    _count: {
        items: number;
    };
}

export interface AdminOrderItem {
    id: string;
    orderId: string;
    productId: string;
    price: number;
    quantity: number;
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        stock: number;
        isActive: boolean;
        features: any[];
        createdAt: string;
        updatedAt: string;
    };
}

export interface AdminOrderDetail extends AdminOrder {
    items: AdminOrderItem[];
}

export interface AdminOrderDetailResponse {
    success: boolean;
    message: string;
    data: AdminOrderDetail;
}

export interface AdminOrdersResponse {
    success: boolean;
    message: string;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: AdminOrder[];
}

export type AdminOrdersParams = {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
} | void;

const adminOrderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminOrders: builder.query<AdminOrdersResponse, AdminOrdersParams>({
            query: (params) => ({
                url: `/orders/admin`,
                method: "GET",
                params: params || {},
            }),
            providesTags: ["Orders"],
        }),
        getAdminOrderById: builder.query<AdminOrderDetailResponse, string>({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => [{ type: "Orders", id }],
        }),
        updateOrderStatus: builder.mutation<any, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `/orders/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "Orders", id },
                "Orders",
            ],
        }),
    }),
});

export const {
    useGetAdminOrdersQuery,
    useGetAdminOrderByIdQuery,
    useUpdateOrderStatusMutation,
} = adminOrderApi;
export default adminOrderApi;
