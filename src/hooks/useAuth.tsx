
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  LoginCredentials,
  RegisterCredentials,
  Location
} from "@/types";
import { fakeLogin, fakeRegister, mockLocations } from "@/lib/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  locations: Location[];
  isGuest: boolean;
  guestLocationId: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  continueAsGuest: (locationId: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [guestLocationId, setGuestLocationId] = useState<string | null>(null);
  const navigate = useNavigate();
  const locations = mockLocations;

  useEffect(() => {
    // Check for user or guest in local storage on initial load
    const storedUser = localStorage.getItem("user");
    const storedGuestLocationId = localStorage.getItem("guestLocationId");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsGuest(false);
    } else if (storedGuestLocationId) {
      setIsGuest(true);
      setGuestLocationId(storedGuestLocationId);
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      // Clear any guest session
      localStorage.removeItem("guestLocationId");
      setIsGuest(false);
      setGuestLocationId(null);
      
      const user = await fakeLogin(credentials);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      
      // After successful login, redirect to products page or admin page
      if (user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setLoading(true);
    try {
      // Clear any guest session
      localStorage.removeItem("guestLocationId");
      setIsGuest(false);
      setGuestLocationId(null);
      
      const user = await fakeRegister(credentials);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      
      // After successful registration, redirect to products page
      navigate("/products");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const continueAsGuest = async (locationId: string) => {
    setLoading(true);
    try {
      // Clear any user session
      localStorage.removeItem("user");
      setUser(null);
      
      // Set guest session
      localStorage.setItem("guestLocationId", locationId);
      setGuestLocationId(locationId);
      setIsGuest(true);
      
      // Redirect to products page
      navigate("/products");
    } catch (error) {
      console.error("Guest login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setIsGuest(false);
    setGuestLocationId(null);
    localStorage.removeItem("user");
    localStorage.removeItem("guestLocationId");
    navigate("/");
  };

  const value: AuthContextType = {
    user,
    loading,
    locations,
    isGuest,
    guestLocationId,
    login,
    register,
    logout,
    continueAsGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
