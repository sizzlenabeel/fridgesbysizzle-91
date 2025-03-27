
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { CartItem as CartItemType } from "@/types";
import { mockProducts } from "@/lib/mockData";

// Import the components
import CartItem from "./CartItem";
import PromoCodeSection from "./PromoCodeSection";
import OrderSummary from "./OrderSummary";
import EmptyCart from "./EmptyCart";
import PaymentOptions from "./PaymentOptions";

// Mock cart data for frontend development
const mockCartItems: CartItemType[] = [
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
  const [cartItems, setCartItems] = useState<CartItemType[]>(mockCartItems);
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number} | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "swish" | "invoice">("card");
  const { user, isGuest } = useAuth();
  
  // Cart functionality
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
      duration: 2000,
    });
  };
  
  const handleCheckout = () => {
    if (!user && !isGuest) {
      toast({
        title: "Sign in required",
        description: "Please sign in or continue as guest to checkout",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    
    // Display a different message based on payment method
    const paymentMessages = {
      card: "Proceeding to Stripe checkout...",
      swish: "Redirecting to Swish payment...",
      invoice: "Adding to your monthly invoice..."
    };
    
    toast({
      title: "Proceeding to checkout",
      description: paymentMessages[paymentMethod],
      duration: 2000,
    });
    // This would redirect to the appropriate payment handler in a real implementation
  };

  // Custom trigger for cart icon
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
      return <EmptyCart />;
    }

    return (
      <>
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem 
                key={item.product.id} 
                item={item} 
                updateQuantity={updateQuantity} 
                removeItem={removeItem} 
              />
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t">
          {/* Promo Code Section */}
          <PromoCodeSection 
            appliedPromo={appliedPromo} 
            setAppliedPromo={setAppliedPromo} 
          />

          {/* Order Summary */}
          <OrderSummary cartItems={cartItems} appliedPromo={appliedPromo} />
          
          {/* Payment Options */}
          <div className="mb-4">
            <PaymentOptions 
              selectedMethod={paymentMethod}
              onChange={setPaymentMethod}
            />
          </div>
          
          <Button 
            onClick={handleCheckout}
            className="w-full bg-sizzle-600 hover:bg-sizzle-700 text-white"
          >
            {paymentMethod === "card" ? "Proceed to Stripe Checkout" : 
             paymentMethod === "swish" ? "Pay with Swish" : 
             "Confirm Monthly Invoice"}
          </Button>
          
          <div className="mt-3 text-center text-xs text-gray-500">
            {user ? (
              <p>Ordering as {user.email}</p>
            ) : isGuest ? (
              <p>
                Ordering as guest. <Link to="/register" className="text-sizzle-600 hover:underline">Create an account</Link> to save your orders.
              </p>
            ) : (
              <p>
                <Link to="/" className="text-sizzle-600 hover:underline">Login</Link> or 
                <Link to="/register" className="text-sizzle-600 hover:underline ml-1">Register</Link> to checkout
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
