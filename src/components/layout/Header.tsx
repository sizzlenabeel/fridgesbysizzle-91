
import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

interface HeaderProps {
  cartItemsCount: number;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onLogout }) => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Logo size="md" />
      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Cart"
          className="relative"
          onClick={() => navigate("/cart")}
        >
          <div>
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-sizzle-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </div>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Profile"
          onClick={() => navigate("/profile")}
        >
          <User className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Logout"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
