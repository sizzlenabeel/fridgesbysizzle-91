
import React from "react";
import { CartItem } from "@/types";

interface OrderSummaryProps {
  cartItems: CartItem[];
  appliedPromo: { code: string; discount: number } | null;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, appliedPromo }) => {
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

  return (
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
  );
};

export default OrderSummary;
