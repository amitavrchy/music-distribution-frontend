import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "./cart.type";
import { AppRootState } from "@/redux/store";
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  appliedDiscount: 0,
  appliedCoupon: null,
  shippingCost: 15,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.appliedDiscount = 0;
      state.appliedCoupon = null;
    },
    setCartItemId(
      state,
      action: PayloadAction<{ id: string | number; cartItemId: string }>,
    ) {
      const { id, cartItemId } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.cartItemId = cartItemId;
      }
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalPrice = action.payload.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
    applyCoupon(
      state,
      action: PayloadAction<{ code: string; discount: number }>,
    ) {
      state.appliedCoupon = action.payload.code;
      state.appliedDiscount = action.payload.discount;
    },
    removeCoupon(state) {
      state.appliedCoupon = null;
      state.appliedDiscount = 0;
    },
  },
});
export const selectCart = (state: AppRootState) => state.cart;
export const { clearCart, setCartItemId, setCart, applyCoupon, removeCoupon } =
  cartSlice.actions;
export default cartSlice.reducer;
