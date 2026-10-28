export interface CartItem {
  id: string | number;
  cartItemId?: string; // ID from backend cart
  title: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice: number;
}
export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  appliedDiscount: number;
  appliedCoupon: string | null;
  shippingCost: number;
}
