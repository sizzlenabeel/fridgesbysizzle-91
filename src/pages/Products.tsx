
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { mockProducts, mockCategories } from "@/lib/mockData";
import { Product } from "@/types";
import ProductTile from "@/components/ProductTile";
import ProductDetailOverlay from "@/components/ProductDetailOverlay";
import CategoryFilter from "@/components/CategoryFilter";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const ProductsPage = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);
  
  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product => 
          product.categories.some(category => category.id === selectedCategory)
        )
      );
    }
  }, [selectedCategory, products]);
  
  const handleAddToCart = (product: Product) => {
    // Add to cart functionality
    setCartItems(prev => [...prev, product]);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
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
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Logo size="md" />
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Cart"
              asChild
              className="relative"
            >
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sizzle-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Profile"
              asChild
            >
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Logout"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Category filter that sticks to the top */}
        <div className="container mx-auto px-4 py-2 border-t">
          <CategoryFilter 
            categories={mockCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </div>
      </header>
      
      {/* Content with top padding for the fixed header */}
      <main className="container mx-auto px-4 pt-32 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductTile 
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onViewDetails={handleViewProductDetails}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No products found in this category.
            </p>
          </div>
        )}
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
