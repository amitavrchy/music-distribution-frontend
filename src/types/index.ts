// Define a type for your user (example)
export interface User {
  id: string;
  name: string;
  email: string;
}

// Define a type for your app's theme (example)
export type Theme = "light" | "dark";

// Define a type for your app's routes (example)
export type Route = {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
};

// ✅ Track Order History Data Type Definitions
export type OrderDetailsType = {
  orderId: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  status: string;
  pickupDate: string;
  deliveryDate: string;
  items: string;
  notes: string;
};

export type OrderHistoryItem = {
  orderId: string;
  name: string;
  deliveryPrice: string;
  status: string;
  orderDetails: OrderDetailsType;
};
