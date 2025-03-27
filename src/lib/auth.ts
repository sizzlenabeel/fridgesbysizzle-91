
import { LoginCredentials, RegisterCredentials, User, Location } from "@/types";

// Mock locations for demo
export const mockLocations: Location[] = [
  { id: "location1", name: "Kista Galleria", address: "Kista Galleria 1", city: "Stockholm" },
  { id: "location2", name: "Solna Business Park", address: "Svetsarvägen 15", city: "Solna" },
  { id: "location3", name: "Nacka Forum", address: "Nacka Forum 12", city: "Nacka" },
];

// Mock user authentication functions
export const fakeLogin = async (credentials: LoginCredentials): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Check for admin email - making this more explicit
  if (credentials.email.toLowerCase().includes("admin")) {
    return {
      id: "admin1",
      email: credentials.email,
      primaryLocationId: "location1",
      createdAt: new Date().toISOString(),
      isAdmin: true,
      monthlyInvoiceEnabled: false,
    };
  }
  
  return {
    id: "user1",
    email: credentials.email,
    primaryLocationId: "location1",
    createdAt: new Date().toISOString(),
    isAdmin: false,
    monthlyInvoiceEnabled: false,
  };
};

export const fakeRegister = async (credentials: RegisterCredentials): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Check for admin email - making this more explicit
  if (credentials.email.toLowerCase().includes("admin")) {
    return {
      id: "admin_" + Math.random().toString(36).substring(7),
      email: credentials.email,
      primaryLocationId: credentials.primaryLocationId,
      createdAt: new Date().toISOString(),
      isAdmin: true,
      marketingConsent: credentials.marketingConsent || false,
      monthlyInvoiceEnabled: false,
    };
  }
  
  return {
    id: "user_" + Math.random().toString(36).substring(7),
    email: credentials.email,
    primaryLocationId: credentials.primaryLocationId,
    createdAt: new Date().toISOString(),
    isAdmin: false,
    marketingConsent: credentials.marketingConsent || false,
    monthlyInvoiceEnabled: false,
  };
};
