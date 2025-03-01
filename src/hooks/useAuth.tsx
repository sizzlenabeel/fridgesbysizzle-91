
import { createContext, useContext, useEffect, useState } from "react";
import { Location, User, LoginCredentials, RegisterCredentials } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Mock data
const MOCK_LOCATIONS: Location[] = [
  {
    id: "loc1",
    name: "Kista Galleria",
    address: "Kista Galleria 123",
    city: "Stockholm",
  },
  {
    id: "loc2",
    name: "Mall of Scandinavia",
    address: "Stjärntorget 2",
    city: "Solna",
  },
  {
    id: "loc3",
    name: "Täby Centrum",
    address: "Täby Centrum 1",
    city: "Täby",
  },
];

// Auth context type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  locations: Location[];
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("sizzle-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("sizzle-user");
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      // This is just a mock login - in reality this would call your Supabase auth
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating network request
      
      // Mock validation
      if (credentials.email.length < 5 || !credentials.email.includes('@')) {
        throw new Error('Invalid email address');
      }
      
      if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Create mock user (in a real app this would come from your auth provider)
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        email: credentials.email,
        primaryLocationId: 'loc1', // Default to first location
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem("sizzle-user", JSON.stringify(mockUser));
      
      toast({
        title: "Success!",
        description: "You've successfully logged in.",
      });
      
      navigate("/products");
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed. Please try again.';
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (credentials: RegisterCredentials) => {
    setLoading(true);
    try {
      // This is just a mock registration - in reality this would call your Supabase auth
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating network request
      
      // Mock validation
      if (credentials.email.length < 5 || !credentials.email.includes('@')) {
        throw new Error('Invalid email address');
      }
      
      if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Create mock user
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        email: credentials.email,
        primaryLocationId: credentials.primaryLocationId,
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem("sizzle-user", JSON.stringify(mockUser));
      
      toast({
        title: "Account created!",
        description: "You've successfully registered and logged in.",
      });
      
      navigate("/products");
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      toast({
        title: "Registration Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("sizzle-user");
    setUser(null);
    navigate("/");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        locations: MOCK_LOCATIONS,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
