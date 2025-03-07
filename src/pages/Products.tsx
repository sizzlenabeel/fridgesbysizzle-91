
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { mockProducts, mockCategories } from "@/lib/mockData";
import { Product } from "@/types";
import ProductDetailOverlay from "@/components/product/ProductDetailOverlay";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/product/SearchBar";
import ProductGrid from "@/components/product/ProductGrid";
import Header from "@/components/layout/Header";
import { Logo } from "@/components/Logo";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Leaf } from "lucide-react";

const searchProducts = (query: string, products: Product[]): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query.trim()) {
        resolve([]);
        return;
      }
      
      const lowercaseQuery = query.toLowerCase();
      const filtered = products.filter(
        product => 
          product.active !== false && (
            product.name.toLowerCase().includes(lowercaseQuery) || 
            product.description.toLowerCase().includes(lowercaseQuery) ||
            product.categories.some(cat => cat.name.toLowerCase().includes(lowercaseQuery))
          )
      );
      resolve(filtered);
    }, 300);
  });
};

const ProductsPage = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    mockProducts.filter(p => p.active !== false)
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [veganOnly, setVeganOnly] = useState<boolean>(false);
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);
  
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        const suggestions = await searchProducts(searchQuery, products);
        setSearchSuggestions(suggestions);
        setIsSearching(false);
      } else {
        setSearchSuggestions([]);
      }
    };
    
    const debounceTimer = setTimeout(fetchSuggestions, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, products]);
  
  useEffect(() => {
    let results = products.filter(p => p.active !== false);
    
    if (veganOnly) {
      results = results.filter(product => product.isVegan === true);
    }
    
    if (selectedCategory !== null) {
      results = results.filter(product => 
        product.categories.some(category => category.id === selectedCategory)
      );
    }
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(results);
  }, [selectedCategory, searchQuery, products, veganOnly]);
  
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
  
  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };
  
  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
    document.body.style.overflow = '';
  };
  
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSelectProductFromSearch = (product: Product) => {
    setSearchQuery(product.name);
    handleViewProductDetails(product);
  };
  
  const handleVeganToggle = (checked: boolean) => {
    setVeganOnly(checked);
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
  
  // Calculate the header height to determine proper padding for main content
  // This includes the main header, search bar, and category filter
  const headerHeight = 'header-height';
  
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed header with higher z-index and more visible shadow */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b shadow-md">
        <Header 
          cartItemsCount={cartItems.length}
          onLogout={handleLogout}
        />
        
        <div className="container mx-auto px-4 py-2 border-t">
          <div className="flex items-center gap-4">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search products..."
              suggestions={searchSuggestions}
              isLoading={isSearching}
              onSelectProduct={handleSelectProductFromSearch}
              className="flex-1"
            />
            <div className="flex items-center gap-2">
              <Leaf className={`h-5 w-5 transition-colors ${veganOnly ? 'text-green-600' : 'text-gray-400'}`} />
              <Switch 
                checked={veganOnly} 
                onCheckedChange={handleVeganToggle}
                className={`${veganOnly ? 'bg-green-600' : ''} data-[state=checked]:bg-green-600`}
              />
              <span className="text-sm font-medium">Vegan</span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-2 border-t">
          <CategoryFilter 
            categories={mockCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </div>
      </header>
      
      {/* Main content with sufficient top padding to prevent overlap with fixed header */}
      <main className="container mx-auto px-4 pt-48 pb-6">
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewDetails={handleViewProductDetails}
        />
      </main>
      
      {selectedProduct && (
        <ProductDetailOverlay
          product={selectedProduct}
          onClose={handleCloseProductDetails}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}
    </div>
  );
};

export default ProductsPage;
