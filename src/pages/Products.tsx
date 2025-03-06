
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { mockProducts, mockCategories } from "@/lib/mockData";
import { Product } from "@/types";
import Header from "@/components/layout/Header";
import { Logo } from "@/components/Logo";
import { useToast } from "@/components/ui/use-toast";
import ProductSearchHeader from "@/components/product/ProductSearchHeader";
import ProductFilterSection from "@/components/product/ProductFilterSection";
import ProductsContainer from "@/components/product/ProductsContainer";
import useProductFiltering from "@/hooks/useProductFiltering";
import useProductSearch from "@/hooks/useProductSearch";

const ProductsPage = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [products] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [veganOnly, setVeganOnly] = useState<boolean>(false);
  
  // Custom hooks for product filtering and search
  const { filteredProducts } = useProductFiltering({
    products,
    selectedCategory,
    searchQuery,
    veganOnly
  });
  
  const { searchSuggestions, isSearching } = useProductSearch(products, searchQuery);
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);
  
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleBuyNow = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    
    toast({
      title: "Quick buy",
      description: `Proceeding to checkout with ${product.name}.`,
      duration: 3000,
    });
    
    navigate("/cart");
  };
  
  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };
  
  const handleSelectProductFromSearch = (product: Product) => {
    setSearchQuery(product.name);
    // Products container will handle viewing details
  };
  
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  
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
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 bg-white z-10 border-b">
        <Header 
          cartItemsCount={cartItems.length}
          onLogout={handleLogout}
        />
        
        <ProductSearchHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          veganOnly={veganOnly}
          setVeganOnly={setVeganOnly}
          searchSuggestions={searchSuggestions}
          isSearching={isSearching}
          onSelectProduct={handleSelectProductFromSearch}
        />
        
        <ProductFilterSection
          categories={mockCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </header>
      
      <ProductsContainer
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
};

export default ProductsPage;
