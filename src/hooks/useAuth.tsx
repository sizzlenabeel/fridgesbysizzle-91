
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
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const locations = mockLocations;

  useEffect(() => {
    // Check for user in local storage on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
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

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const value: AuthContextType = {
    user,
    loading,
    locations,
    login,
    register,
    logout,
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
