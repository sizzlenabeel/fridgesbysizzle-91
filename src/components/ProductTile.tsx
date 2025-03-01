
import React from "react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, ThumbsUp, Check, ThumbsDown } from "lucide-react";

interface ProductTileProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

const ProductTile: React.FC<ProductTileProps> = ({ 
  product, 
  onAddToCart, 
  onBuyNow 
}) => {
  // Function to render rating icons with counts
  const renderRatings = () => {
    return (
      <div className="flex items-center gap-2 text-xs flex-wrap mt-1">
        <div className="flex items-center gap-1">
          <Heart className="h-3.5 w-3.5 text-red-500" />
          <span>{product.ratings.heart}</span>
        </div>
        <div className="flex items-center gap-1">
          <ThumbsUp className="h-3.5 w-3.5 text-blue-500" />
          <span>{product.ratings.thumbsUp}</span>
        </div>
        <div className="flex items-center gap-1">
          <Check className="h-3.5 w-3.5 text-green-500" />
          <span>{product.ratings.alright}</span>
        </div>
        <div className="flex items-center gap-1">
          <ThumbsDown className="h-3.5 w-3.5 text-gray-500" />
          <span>{product.ratings.thumbsDown}</span>
        </div>
      </div>
    );
  };

  // Calculate stock for current user's location (this would be replaced with actual location ID)
  const currentLocationId = "location1"; // Placeholder - would come from user context
  const stockLevel = product.locationInventory[currentLocationId] || 0;

  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden flex flex-col h-full">
      <div className="relative">
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
        <h3 className="font-semibold text-base line-clamp-1">{product.name}</h3>
        <p className="text-muted-foreground text-xs line-clamp-2 mt-1 mb-2">
          {product.description}
        </p>
        
        {renderRatings()}
        
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-baseline gap-1">
              <span className="font-semibold text-base text-sizzle-600">
                {product.discountedPrice 
                  ? `${product.discountedPrice} kr` 
                  : `${product.price} kr`}
              </span>
              {product.discountedPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {product.price} kr
                </span>
              )}
            </div>
            <span className={cn(
              "text-xs font-medium",
              stockLevel > 10 ? "text-green-600" : 
              stockLevel > 0 ? "text-amber-600" : "text-red-600"
            )}>
              {stockLevel > 0 ? `${stockLevel} in stock` : "Out of stock"}
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs"
              onClick={() => onAddToCart(product)}
              disabled={stockLevel === 0}
            >
              Add to cart
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1 text-xs bg-sizzle-600 hover:bg-sizzle-700"
              onClick={() => onBuyNow(product)}
              disabled={stockLevel === 0}
            >
              Buy now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTile;
