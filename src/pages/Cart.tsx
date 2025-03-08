
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CartSheet from "@/components/cart/CartSheet";
import { useAuth } from "@/hooks/useAuth";

const Cart = () => {
  const { user, isGuest, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in and not a guest
  useEffect(() => {
    if (!loading && !user && !isGuest) {
      navigate("/");
    }
  }, [user, loading, isGuest, navigate]);
  
  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <p>Loading...</p>
      </div>
    );
  }
  
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
