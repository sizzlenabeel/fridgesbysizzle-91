
import { LoginCredentials, RegisterCredentials, User } from "@/types";

// Mock locations - will be replaced with actual API call to Supabase
export const mockLocations = [
  {
    id: "1",
    name: "Tech Innovations Inc",
    address: "123 Innovation Lane",
    city: "Stockholm"
  },
  {
    id: "2",
    name: "Creative Solutions AB",
    address: "456 Design Boulevard",
    city: "Gothenburg"
  },
  {
    id: "3",
    name: "Global Enterprises",
    address: "789 Business Park",
    city: "Malmö"
  }
];

// Mock login function - will be replaced with actual Supabase auth
export const fakeLogin = async (credentials: LoginCredentials): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For demo purposes, just create a user object
  return {
    id: "user-123",
    email: credentials.email,
    primaryLocationId: "1", // Default location
    createdAt: new Date().toISOString()
  };
};

// Mock register function - will be replaced with actual Supabase auth
export const fakeRegister = async (credentials: RegisterCredentials): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For demo purposes, just create a user object with the selected location
  return {
    id: "user-" + Math.floor(Math.random() * 1000),
    email: credentials.email,
    primaryLocationId: credentials.primaryLocationId,
    createdAt: new Date().toISOString()
  };
};
