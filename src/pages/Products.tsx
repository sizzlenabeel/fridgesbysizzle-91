
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

// This function simulates an API call to search for products
// It will be replaced with a real API call in the future
const searchProducts = (query: string, products: Product[]): Promise<Product[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
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
    }, 300); // Simulate network delay
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
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);
  
  // Handle search suggestions
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
  
  // Filter products when category or search changes
  useEffect(() => {
    let results = products.filter(p => p.active !== false);
    
    // Apply category filter if selected
    if (selectedCategory !== null) {
      results = results.filter(product => 
        product.categories.some(category => category.id === selectedCategory)
      );
    }
    
    // Apply search filter if query exists
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(results);
  }, [selectedCategory, searchQuery, products]);
  
  const handleAddToCart = (product: Product) => {
    // Add to cart functionality
    setCartItems(prev => [...prev, product]);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleBuyNow = (product: Product) => {
    // Add to cart first
    setCartItems(prev => [...prev, product]);
    
    toast({
      title: "Quick buy",
      description: `Proceeding to checkout with ${product.name}.`,
      duration: 3000,
    });
    
    // Navigate to cart (simulating immediate checkout)
    navigate("/cart");
  };
  
  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };
  
  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    // Prevent body scrolling when overlay is open
    document.body.style.overflow = 'hidden';
  };
  
  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
    // Re-enable body scrolling when overlay is closed
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
      {/* Fixed header with navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white z-10 border-b">
        <Header 
          cartItemsCount={cartItems.length}
          onLogout={handleLogout}
        />
        
        {/* Search bar */}
        <div className="container mx-auto px-4 py-2 border-t">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search products..."
            suggestions={searchSuggestions}
            isLoading={isSearching}
            onSelectProduct={handleSelectProductFromSearch}
          />
        </div>
        
        {/* Category filter */}
        <div className="container mx-auto px-4 py-2 border-t">
          <CategoryFilter 
            categories={mockCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </div>
      </header>
      
      {/* Content with top padding for the fixed header */}
      <main className="container mx-auto px-4 pt-40 pb-6">
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewDetails={handleViewProductDetails}
        />
      </main>
      
      {/* Product Detail Overlay */}
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
