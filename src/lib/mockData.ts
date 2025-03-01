
import { Product, Category, Location } from "@/types";

export const mockCategories: Category[] = [
  { id: "cat1", name: "Meals" },
  { id: "cat2", name: "Snacks" },
  { id: "cat3", name: "Drinks" },
  { id: "cat4", name: "Breakfast" },
  { id: "cat5", name: "Vegan" },
  { id: "cat6", name: "Desserts" },
];

export const mockLocations: Location[] = [
  { id: "location1", name: "Kista Galleria", address: "Kista Galleria 1", city: "Stockholm" },
  { id: "location2", name: "Solna Business Park", address: "Svetsarvägen 15", city: "Solna" },
  { id: "location3", name: "Nacka Forum", address: "Nacka Forum 12", city: "Nacka" },
];

export const mockProducts: Product[] = [
  {
    id: "prod1",
    name: "Chicken Salad",
    description: "Fresh chicken salad with mixed greens and our special dressing",
    price: 89,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&h=500",
    categories: [mockCategories[0], mockCategories[3]], // Meals, Breakfast
    isVegan: false,
    ingredients: ["Chicken", "Lettuce", "Tomato", "Cucumber", "Dressing"],
    allergens: ["Egg", "Mustard"],
    bestBeforeDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    ratings: {
      heart: 24,
      thumbsUp: 45,
      alright: 12,
      thumbsDown: 3
    },
    locationInventory: {
      location1: 15,
      location2: 8,
      location3: 0
    }
  },
  {
    id: "prod2",
    name: "Vegan Avocado Wrap",
    description: "Delicious avocado wrap with hummus and fresh vegetables",
    price: 79,
    discountedPrice: 65,
    image: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?auto=format&fit=crop&w=500&h=500",
    categories: [mockCategories[0], mockCategories[4]], // Meals, Vegan
    isVegan: true,
    ingredients: ["Avocado", "Hummus", "Lettuce", "Tomato", "Tortilla"],
    allergens: ["Wheat"],
    bestBeforeDate: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
    ratings: {
      heart: 35,
      thumbsUp: 28,
      alright: 9,
      thumbsDown: 2
    },
    locationInventory: {
      location1: 5,
      location2: 12,
      location3: 7
    }
  },
  {
    id: "prod3",
    name: "Sparkling Water",
    description: "Refreshing sparkling water with hint of lemon",
    price: 25,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=500&h=500",
    categories: [mockCategories[2]], // Drinks
    isVegan: true,
    ingredients: ["Carbonated Water", "Natural Flavors"],
    allergens: [],
    bestBeforeDate: new Date(Date.now() + 86400000 * 30).toISOString(), // 30 days from now
    ratings: {
      heart: 18,
      thumbsUp: 42,
      alright: 23,
      thumbsDown: 5
    },
    locationInventory: {
      location1: 25,
      location2: 30,
      location3: 28
    }
  },
  {
    id: "prod4",
    name: "Protein Bar",
    description: "High protein bar with chocolate and nuts",
    price: 35,
    image: "https://images.unsplash.com/photo-1622484212385-1e36fb5f4a35?auto=format&fit=crop&w=500&h=500",
    categories: [mockCategories[1]], // Snacks
    isVegan: false,
    ingredients: ["Protein Blend", "Chocolate", "Nuts", "Sweetener"],
    allergens: ["Nuts", "Milk"],
    bestBeforeDate: new Date(Date.now() + 86400000 * 60).toISOString(), // 60 days from now
    ratings: {
      heart: 32,
      thumbsUp: 56,
      alright: 14,
      thumbsDown: 3
    },
    locationInventory: {
      location1: 18,
      location2: 0,
      location3: 12
    }
  },
  {
    id: "prod5",
    name: "Greek Yogurt",
    description: "Creamy Greek yogurt with berries and honey",
    price: 45,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=500&h=500",
    categories: [mockCategories[3], mockCategories[1]], // Breakfast, Snacks
    isVegan: false,
    ingredients: ["Greek Yogurt", "Berries", "Honey", "Granola"],
    allergens: ["Milk", "Nuts"],
    bestBeforeDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
    ratings: {
      heart: 45,
      thumbsUp: 38,
      alright: 7,
      thumbsDown: 2
    },
    locationInventory: {
      location1: 8,
      location2: 15,
      location3: 10
    }
  },
  {
    id: "prod6",
    name: "Vegan Chocolate Cake",
    description: "Delicious vegan chocolate cake, perfect with coffee",
    price: 55,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&h=500",
    categories: [mockCategories[5], mockCategories[4]], // Desserts, Vegan
    isVegan: true,
    ingredients: ["Flour", "Sugar", "Cocoa", "Plant Milk", "Vegetable Oil"],
    allergens: ["Wheat"],
    bestBeforeDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    ratings: {
      heart: 58,
      thumbsUp: 32,
      alright: 5,
      thumbsDown: 1
    },
    locationInventory: {
      location1: 3,
      location2: 6,
      location3: 0
    }
  },
  {
    id: "prod7",
    name: "Tuna Sandwich",
    description: "Classic tuna sandwich with mayo and lettuce",
    price: 65,
    discountedPrice: 55,
    image: "https://images.unsplash.com/photo-1592415499556-74fcb9f18667?auto=format&fit=crop&w=500&h=500",
    categories: [mockCategories[0], mockCategories[1]], // Meals, Snacks
    isVegan: false,
    ingredients: ["Tuna", "Mayo", "Lettuce", "Bread"],
    allergens: ["Fish", "Egg", "Wheat"],
    bestBeforeDate: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
    ratings: {
      heart: 29,
      thumbsUp: 43,
      alright: 15,
      thumbsDown: 7
    },
    locationInventory: {
      location1: 2,
      location2: 0,
      location3: 5
    }
  },
  {
    id: "prod8",
    name: "Iced Coffee",
    description: "Cold brewed coffee with optional milk",
    price: 35,
    image: "https://images.unsplash.com/photo-1527156231393-7023794f363c?auto=format&fit=crop&w=500&h=500",
    categories: [mockCategories[2]], // Drinks
    isVegan: true,
    ingredients: ["Coffee", "Ice"],
    allergens: [],
    bestBeforeDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    ratings: {
      heart: 65,
      thumbsUp: 42,
      alright: 8,
      thumbsDown: 2
    },
    locationInventory: {
      location1: 20,
      location2: 18,
      location3: 15
    }
  }
];
