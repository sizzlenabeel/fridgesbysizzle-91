
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

  // For demo purpose, we'll accept any email/password and return a mock user
  // In a real app, you would validate credentials against a backend
  if (credentials.email.includes("admin")) {
    return {
      id: "admin1",
      email: credentials.email,
      primaryLocationId: "location1",
      createdAt: new Date().toISOString(),
      isAdmin: true,
    };
  }
  
  return {
    id: "user1",
    email: credentials.email,
    primaryLocationId: "location1",
    createdAt: new Date().toISOString(),
    isAdmin: false,
  };
};

export const fakeRegister = async (credentials: RegisterCredentials): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // For demo purpose, we'll accept any registration and return a mock user
  // In a real app, you would send this to your backend
  if (credentials.email.includes("admin")) {
    return {
      id: "admin_" + Math.random().toString(36).substring(7),
      email: credentials.email,
      primaryLocationId: credentials.primaryLocationId,
      createdAt: new Date().toISOString(),
      isAdmin: true,
    };
  }
  
  return {
    id: "user_" + Math.random().toString(36).substring(7),
    email: credentials.email,
    primaryLocationId: credentials.primaryLocationId,
    createdAt: new Date().toISOString(),
    isAdmin: false,
  };
};
