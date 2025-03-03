
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import ProductPrice from "@/components/product/ProductPrice";
import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeItem: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="border-b pb-4">
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
  );
};

export default CartItem;
