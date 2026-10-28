import { baseApi } from "@/redux/hooks/baseApi";

export interface ProductFeature {
  name: string;
}

export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  features: string[] | ProductFeature[];
  isActive: boolean;
}

export interface Coupon {
  id: string | number;
  code: string;
  type: "PERCENT" | "FIXED";
  value: number;
  isActive: boolean;
  expiresAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export interface PaginatedResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
  meta: PaginationMeta;
}

export interface CommerceResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface APICartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product?: Product;
  createdAt: string;
}

export interface APICart {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  items: APICartItem[];
  totalAmount: number;
}

export interface AddItemToCartRequest {
  userId: string;
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  price: number;
  quantity: number;
  product: Product;
}

export interface Payment {
  id: string;
  orderId: string;
  stripePaymentIntentId: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  status: string;
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
  items: OrderItem[];
  payment?: Payment;
  trackingNumber?: string | null;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
  };
}

const commerceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Product Endpoints
    getProducts: builder.query<
      PaginatedResponse<Product[]>,
      {
        page?: number;
        limit?: number;
        search?: string;
        isActive?: boolean;
      } | void
    >({
      query: (params) => {
        const query = new URLSearchParams();
        if (params?.page) query.append("page", params.page.toString());
        if (params?.limit) query.append("limit", params.limit.toString());
        if (params?.search) query.append("search", params.search);
        if (params?.isActive !== undefined)
          query.append("isActive", params.isActive.toString());

        return {
          url: `/commerce/products?${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
    getProductById: builder.query<Product, string | number>({
      query: (id) => ({
        url: `/commerce/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation<
      CommerceResponse<Product>,
      FormData
    >({
      query: (data) => ({
        url: "/commerce/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<
      CommerceResponse<Product>,
      { id: string | number; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/commerce/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<CommerceResponse<void>, string | number>({
      query: (id) => ({
        url: `/commerce/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // Coupon Endpoints
    getCoupons: builder.query<Coupon[], void>({
      query: () => ({
        url: "/commerce/coupons",
        method: "GET",
      }),
      providesTags: ["Coupons"],
    }),
    getCouponById: builder.query<Coupon, string | number>({
      query: (id) => ({
        url: `/commerce/coupons/${id}`,
        method: "GET",
      }),
      providesTags: ["Coupons"],
    }),
    createCoupon: builder.mutation<Coupon, Partial<Coupon>>({
      query: (data) => ({
        url: "/commerce/coupons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupons"],
    }),
    updateCoupon: builder.mutation<
      Coupon,
      { id: string | number; data: Partial<Coupon> }
    >({
      query: ({ id, data }) => ({
        url: `/commerce/coupons/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coupons"],
    }),
    deleteCoupon: builder.mutation<CommerceResponse<void>, string | number>({
      query: (id) => ({
        url: `/commerce/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"],
    }),
    validateCoupon: builder.mutation<any, { code: string; userId: string }>({
      query: (data) => ({
        url: "/commerce/coupons/validate",
        method: "POST",
        body: data,
      }),
    }),

    // Cart Endpoints
    addItemToCart: builder.mutation<APICartItem, AddItemToCartRequest>({
      query: (data) => ({
        url: "/commerce/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    getCart: builder.query<APICart, string>({
      query: (userId) => ({
        url: `/commerce/cart/${userId}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation<
      APICartItem,
      { cartItemId: string; data: UpdateCartItemRequest }
    >({
      query: ({ cartItemId, data }) => ({
        url: `/commerce/cart/item/${cartItemId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItem: builder.mutation<void, string>({
      query: (cartItemId) => ({
        url: `/commerce/cart/item/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/commerce/cart/${userId}/clear`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Payment Endpoints
    createPaymentIntent: builder.mutation<
      {
        mode?: "demo" | "stripe";
        clientSecret: string | null;
        orderId?: string;
        totalAmount?: number;
      },
      {
        userId: string;
        couponCode?: string;
        fullName: string;
        phone: string;
        addressLine: string;
        city: string;
        postalCode: string;
      }
    >({
      query: (data) => ({
        url: "/commerce/payment/create-intent",
        method: "POST",
        body: data,
      }),
    }),
    confirmPayment: builder.mutation<
      { message: string; orderId: string; status: string },
      string
    >({
      query: (orderId) => ({
        url: `/commerce/payment/${orderId}/confirm`,
        method: "POST",
      }),
      invalidatesTags: ["Orders", "Cart"],
    }),
    getPaymentStatus: builder.query<{ status: string }, string>({
      query: (orderId) => ({
        url: `/commerce/payment/${orderId}`,
        method: "GET",
      }),
    }),

    // Order Endpoints
    getOrders: builder.query<Order[], string>({
      query: (userId) => ({
        url: `/orders/my-orders/${userId}`,
        method: "GET",
      }),
      transformResponse: (response: CommerceResponse<Order[]>) => response.data,
      providesTags: ["Orders"],
    }),
    getOrderDetails: builder.query<Order, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
      transformResponse: (response: CommerceResponse<Order>) => response.data,
      providesTags: ["Orders"],
    }),
    getAdminOrders: builder.query<
      PaginatedResponse<Order[]>,
      { page?: number; limit?: number; search?: string; status?: string }
    >({
      query: (params) => {
        const query = new URLSearchParams();
        if (params.page) query.append("page", params.page.toString());
        if (params.limit) query.append("limit", params.limit.toString());
        if (params.search) query.append("search", params.search);
        if (params.status) query.append("status", params.status);

        return {
          url: `/orders/admin?${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useValidateCouponMutation,
  useAddItemToCartMutation,
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
  useGetPaymentStatusQuery,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useGetAdminOrdersQuery,
} = commerceApi;

export default commerceApi;
