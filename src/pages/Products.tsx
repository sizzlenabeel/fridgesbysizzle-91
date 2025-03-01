
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";

const ProductsPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <Logo size="lg" className="mb-4" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-4">
      <header className="flex justify-between items-center mb-6 pt-2">
        <Logo size="md" />
        <p className="text-sm text-muted-foreground">Welcome, {user?.email}</p>
      </header>
      
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-sizzle-600 mb-2">Products Page</h1>
        <p>This page will display products from your selected location.</p>
        <p className="text-sm text-muted-foreground mt-4">
          We'll implement the full product listing in the next step!
        </p>
      </div>
    </div>
  );
};

export default ProductsPage;
