
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CartSheet from "@/components/cart/CartSheet";

const Cart = () => {
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
      
      <CartSheet isFullPage={true} />
    </div>
  );
};

export default Cart;
