
export type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
};

export type User = {
  id: string;
  email: string;
  primaryLocationId: string;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
};

export type ProductRating = "heart" | "thumbsUp" | "alright" | "thumbsDown";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
  categories: Category[];
  isVegan: boolean;
  ingredients: string[];
  allergens: string[];
  bestBeforeDate: string;
  ratings: Record<ProductRating, number>;
  locationInventory: Record<string, number>;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  locationId: string;
  items: CartItem[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & {
  primaryLocationId: string;
};
