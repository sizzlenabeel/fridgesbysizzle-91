
import React from "react";

interface ProductPriceProps {
  price: number;
  discountedPrice?: number;
  size?: "sm" | "md" | "lg";
}

const ProductPrice: React.FC<ProductPriceProps> = ({ 
  price, 
  discountedPrice,
  size = "md"
}) => {
  const priceSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";
  const discountSize = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";
  
  return (
    <div className="flex items-baseline gap-2">
      <span className={`font-semibold ${priceSize} text-sizzle-600`}>
        {discountedPrice 
          ? `${discountedPrice} kr` 
          : `${price} kr`}
      </span>
      {discountedPrice && (
        <span className={`${discountSize} text-muted-foreground line-through`}>
          {price} kr
        </span>
      )}
    </div>
  );
};

export default ProductPrice;
