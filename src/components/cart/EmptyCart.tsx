
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyCartProps {
  className?: string;
  isPage?: boolean;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ className = "", isPage = false }) => {
  const containerClasses = isPage 
    ? "flex-1 flex flex-col items-center justify-center text-center min-h-[50vh]" 
    : "flex flex-col items-center justify-center text-center py-8";
  
  return (
    <div className={`${containerClasses} ${className}`}>
      <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
      <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
      <Button asChild className="bg-sizzle-600 hover:bg-sizzle-700">
        <Link to="/products">Browse products</Link>
      </Button>
    </div>
  );
};

export default EmptyCart;
