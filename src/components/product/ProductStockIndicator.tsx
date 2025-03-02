
import React from "react";
import { cn } from "@/lib/utils";

interface ProductStockIndicatorProps {
  stockLevel: number;
  size?: "sm" | "md";
}

const ProductStockIndicator: React.FC<ProductStockIndicatorProps> = ({ 
  stockLevel,
  size = "md" 
}) => {
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  
  return (
    <span className={cn(
      `${textSize} font-medium`,
      stockLevel > 10 ? "text-green-600" : 
      stockLevel > 0 ? "text-amber-600" : "text-red-600"
    )}>
      {stockLevel > 0 ? `${stockLevel} in stock` : "Out of stock"}
    </span>
  );
};

export default ProductStockIndicator;
