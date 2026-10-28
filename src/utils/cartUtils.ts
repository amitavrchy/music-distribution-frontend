interface Product {
  id: string | number;
  image: string;
  title: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

export const getCartCount = (): number => {
  try {
    const cart = localStorage.getItem("cart");
    if (!cart) return 0;
    const cartItems: CartItem[] = JSON.parse(cart);
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  } catch {
    return 0;
  }
};

export const getCartItems = (): CartItem[] => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

export const addToCart = (product: Product): boolean => {
  try {
    const cartItems = getCartItems();
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
    return true;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};

export const updateCartQuantity = (
  productId: string | number,
  quantity: number,
): void => {
  try {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    const cartItems = getCartItems();
    const updatedItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item,
    );

    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Error updating cart quantity:", error);
  }
};

export const removeFromCart = (productId: string | number): void => {
  try {
    const cartItems = getCartItems();
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
};

export const clearCart = (): void => {
  try {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};

export const getCartTotal = (): number => {
  try {
    const cartItems = getCartItems();
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  } catch {
    return 0;
  }
};
