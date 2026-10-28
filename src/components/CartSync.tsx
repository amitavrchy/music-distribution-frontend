import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { setCart } from "@/redux/features/cart/cartSlice";
import {
  useGetCartQuery,
  APICartItem,
} from "@/redux/features/commerce/commerceApi";
import { useCurrentUser } from "@/hooks/useCurrentUse";
import { CartItem } from "@/redux/features/cart/cart.type";

const CartSync: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useCurrentUser();
  const { data: response, isSuccess } = useGetCartQuery(user?.id ?? "", {
    skip: !user?.id,
  });
console.log(response)
  useEffect(() => {
    console.log("[CartSync] isSuccess:", isSuccess, "response:", response);
    if (isSuccess) {
      const items = response?.items || [];
      console.log("[CartSync] Parsed items:", items);
      const mappedItems: CartItem[] = items.map((item: APICartItem) => ({
        id: item.productId,
        cartItemId: item.id,
        title: item.product?.name || "Unknown Product",
        image: item.product?.imageUrl || "",
        price: item.product?.price || 0,
        quantity: item.quantity,
        totalPrice: (item.product?.price || 0) * item.quantity,
      }));
      console.log("[CartSync] Dispatching mapped items:", mappedItems);
      dispatch(setCart(mappedItems));
    }
  }, [isSuccess, response, dispatch]);

  return null;
};

export default CartSync;
