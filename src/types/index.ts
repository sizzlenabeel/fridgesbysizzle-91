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
  isAdmin?: boolean;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
};

export type ProductRating = "heart" | "thumbsUp" | "thumbsDown";

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
  dueDate?: string;
  ratings: Record<ProductRating, number>;
  locationInventory: Record<string, number>;
  active?: boolean;
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

export type DiscountRule = {
  id: string;
  name: string;
  description: string;
  type: "percentage" | "fixed";
  value: number;
  conditions: {
    daysBeforeExpiry?: number;
    categoryIds?: string[];
    locationIds?: string[];
  };
  active: boolean;
  createdAt: string;
};

export type SalesReportFilter = {
  startDate: Date;
  endDate: Date;
  locationId?: string;
  categoryId?: string;
};

export type SalesReportItem = {
  date: string;
  totalSales: number;
  totalItems: number;
  locationId?: string;
  categoryId?: string;
};
