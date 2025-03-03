
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Minus, Plus, ShoppingCart, Trash2, Tag } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import ProductPrice from "@/components/product/ProductPrice";
import { CartItem } from "@/types";
import { mockProducts } from "@/lib/mockData";

// Mock cart data for frontend development
const mockCartItems: CartItem[] = [
  {
    product: mockProducts[0], // Chicken Salad
    quantity: 2
  },
  {
    product: mockProducts[1], // Vegan Wrap
    quantity: 1
  }
];

interface CartSheetProps {
  trigger?: React.ReactNode;
  isFullPage?: boolean;
}

const CartSheet: React.FC<CartSheetProps> = ({ trigger, isFullPage = false }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number} | null>(null);
  const { user } = useAuth();
  
  // Cart content and functionality
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const removeItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discountedPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateTotalDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.product.discountedPrice) {
        const discount = (item.product.price - item.product.discountedPrice) * item.quantity;
        return total + discount;
      }
      return total;
    }, 0);
  };

  const calculatePromoDiscount = () => {
    return appliedPromo ? (calculateSubtotal() * appliedPromo.discount) : 0;
  };

  const calculateFinalTotal = () => {
    return calculateSubtotal() - calculatePromoDiscount();
  };
  
  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a promo code",
        variant: "destructive",
      });
      return;
    }

    // Mock promo code validation (in real app, this would be checked against a backend)
    if (promoCode.toUpperCase() === "WELCOME10") {
      setAppliedPromo({ code: promoCode, discount: 0.1 }); // 10% discount
      toast({
        title: "Promo applied",
        description: "10% discount applied to your order!",
      });
    } else if (promoCode.toUpperCase() === "SUMMER20") {
      setAppliedPromo({ code: promoCode, discount: 0.2 }); // 20% discount
      toast({
        title: "Promo applied",
        description: "20% discount applied to your order!",
      });
    } else {
      toast({
        title: "Invalid code",
        description: "This promo code is invalid or expired",
        variant: "destructive",
      });
    }

    // Clear input after attempting to apply
    setPromoCode("");
  };
  
  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "This would redirect to Stripe Checkout in the full implementation",
    });
    // This would redirect to Stripe Checkout in the real implementation
  };

  const customTrigger = trigger || (
    <Button variant="ghost" className="relative p-1 h-auto">
      <ShoppingCart className="h-6 w-6" />
      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-sizzle-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {cartItems.length}
        </span>
      )}
    </Button>
  );

  // Common cart content for both full page and overlay modes
  const renderCartContent = () => {
    if (cartItems.length === 0) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button asChild className="bg-sizzle-600 hover:bg-sizzle-700">
            <Link to="/products">Browse products</Link>
          </Button>
        </div>
      );
    }

    return (
      <>
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.product.id} className="border-b pb-4">
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-end justify-between mt-2">
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 py-0.5 text-center w-8 text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <ProductPrice 
                        price={item.product.price * item.quantity} 
                        discountedPrice={item.product.discountedPrice ? item.product.discountedPrice * item.quantity : undefined}
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t">
          {/* Promo Code Section */}
          <div className="mb-4">
            <div className="flex gap-2 items-center mb-1">
              <Tag className="h-4 w-4 text-sizzle-600" />
              <span className="text-sm font-medium">Promo Code</span>
            </div>
            <div className="flex gap-2">
              <Input 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="h-9 text-sm"
              />
              <Button 
                onClick={handleApplyPromo}
                variant="outline"
                className="h-9 text-sm whitespace-nowrap"
              >
                Apply
              </Button>
            </div>
            {appliedPromo && (
              <div className="text-xs text-green-600 mt-1">
                Code "{appliedPromo.code}" applied: {appliedPromo.discount * 100}% off
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{calculateSubtotal()} kr</span>
            </div>
            
            {calculateTotalDiscount() > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Product discounts</span>
                <span className="font-medium text-green-600">-{calculateTotalDiscount()} kr</span>
              </div>
            )}
            
            {appliedPromo && (
              <div className="flex justify-between">
                <span className="text-gray-600">Promo discount ({appliedPromo.discount * 100}%)</span>
                <span className="font-medium text-green-600">-{calculatePromoDiscount().toFixed(0)} kr</span>
              </div>
            )}
            
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold">{calculateFinalTotal().toFixed(0)} kr</span>
            </div>
          </div>
          
          <Button 
            onClick={handleCheckout}
            className="w-full bg-sizzle-600 hover:bg-sizzle-700 text-white"
          >
            Proceed to Checkout
          </Button>
          
          <div className="mt-3 text-center text-xs text-gray-500">
            {user ? (
              <p>Ordering as {user.email}</p>
            ) : (
              <p>
                <Link to="/" className="text-sizzle-600 hover:underline">Login</Link> or 
                <Link to="/register" className="text-sizzle-600 hover:underline ml-1">Register</Link> to continue
              </p>
            )}
          </div>
        </div>
      </>
    );
  };

  // Full page version
  if (isFullPage) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Your Cart ({cartItems.length})</h1>
        </div>
        <div className="flex flex-col h-full">
          {renderCartContent()}
        </div>
      </div>
    );
  }

  // Overlay version
  return (
    <Sheet>
      <SheetTrigger asChild>
        {customTrigger}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 pr-1">
        <div className="p-6 h-full overflow-y-auto">
          <SheetHeader className="border-b pb-4 mb-4">
            <SheetTitle>Your Cart ({cartItems.length})</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            {renderCartContent()}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
