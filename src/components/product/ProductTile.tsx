
import React from "react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import ProductRatings from "./ProductRatings";
import ProductPrice from "./ProductPrice";
import ProductStockIndicator from "./ProductStockIndicator";

interface ProductTileProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductTile: React.FC<ProductTileProps> = ({ 
  product, 
  onAddToCart, 
  onBuyNow,
  onViewDetails
}) => {
  // Calculate stock for current user's location (this would be replaced with actual location ID)
  const currentLocationId = "location1"; // Placeholder - would come from user context
  const stockLevel = product.locationInventory[currentLocationId] || 0;

  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden flex flex-col h-full">
      <div 
        className="relative cursor-pointer" 
        onClick={() => onViewDetails(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full aspect-square object-cover"
        />
        {product.isVegan && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
            Vegan
          </span>
        )}
      </div>
      
      <div className="p-3 flex-1 flex flex-col">
        <h3 
          className="font-semibold text-base line-clamp-1 cursor-pointer" 
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs line-clamp-2 mt-1 mb-2">
          {product.description}
        </p>
        
        <ProductRatings ratings={product.ratings} size="sm" />
        
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between mb-2">
            <ProductPrice 
              price={product.price} 
              discountedPrice={product.discountedPrice} 
              size="sm" 
            />
            <ProductStockIndicator stockLevel={stockLevel} size="sm" />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              disabled={stockLevel === 0}
            >
              Add
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1 text-xs bg-sizzle-600 hover:bg-sizzle-700"
              onClick={(e) => {
                e.stopPropagation();
                onBuyNow(product);
              }}
              disabled={stockLevel === 0}
            >
              Buy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTile;
