
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { CartItem, Product } from "@/types";
import { ShoppingCart, Minus, Plus, ArrowLeft, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock cart data for frontend development
const mockCartItems: CartItem[] = [
  {
    product: {
      id: "1",
      name: "Chicken Salad",
      description: "Fresh salad with grilled chicken",
      price: 89,
      discountedPrice: 79,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      categories: [{ id: "1", name: "Meals" }],
      isVegan: false,
      ingredients: ["Chicken", "Lettuce", "Tomato", "Cucumber", "Olive oil"],
      allergens: ["Nuts"],
      bestBeforeDate: "2023-12-30",
      ratings: {
        heart: 25,
        thumbsUp: 15,
        alright: 5,
        thumbsDown: 2
      },
      locationInventory: {
        "1": 15
      }
    },
    quantity: 2
  },
  {
    product: {
      id: "2",
      name: "Vegan Wrap",
      description: "Delicious vegan wrap with fresh vegetables",
      price: 69,
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      categories: [{ id: "2", name: "Snacks" }],
      isVegan: true,
      ingredients: ["Tortilla", "Hummus", "Lettuce", "Tomato", "Bell pepper"],
      allergens: ["Gluten"],
      bestBeforeDate: "2023-12-28",
      ratings: {
        heart: 18,
        thumbsUp: 12,
        alright: 8,
        thumbsDown: 1
      },
      locationInventory: {
        "1": 8
      }
    },
    quantity: 1
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const { user } = useAuth();
  const { toast } = useToast();
  
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
  
  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "This would redirect to Stripe Checkout in the full implementation",
    });
    // This would redirect to Stripe Checkout in the real implementation
  };

  if (cartItems.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link to="/products" className="text-sizzle-600 hover:text-sizzle-700">
            <div className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to products</span>
            </div>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 text-center py-16">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button asChild className="bg-sizzle-600 hover:bg-sizzle-700">
            <Link to="/products">Browse products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <Link to="/products" className="text-sizzle-600 hover:text-sizzle-700">
          <div className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to products</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold hidden md:block">Your Cart</h1>
        <div className="w-24 md:block hidden"></div> {/* Spacer for alignment */}
      </div>
      
      <h1 className="text-2xl font-bold mb-4 md:hidden">Your Cart</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">Cart Items ({cartItems.length})</h2>
            </div>
            
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-4 flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-24 h-24 rounded-md overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{item.product.name}</h3>
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <p className="text-gray-500 text-sm line-clamp-2 mb-2">
                      {item.product.description}
                    </p>
                    
                    <div className="flex items-end justify-between">
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 text-center w-10">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-lg text-sizzle-600">
                          {(item.product.discountedPrice || item.product.price) * item.quantity} kr
                        </div>
                        {item.product.discountedPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {item.product.price * item.quantity} kr
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{calculateSubtotal()} kr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">-0 kr</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">{calculateSubtotal()} kr</span>
              </div>
            </div>
            
            <Button 
              onClick={handleCheckout}
              className="w-full bg-sizzle-600 hover:bg-sizzle-700 text-white py-3"
            >
              Proceed to Checkout
            </Button>
            
            <div className="mt-4 text-center text-sm text-gray-500">
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
        </div>
      </div>
    </div>
  );
};

export default Cart;
