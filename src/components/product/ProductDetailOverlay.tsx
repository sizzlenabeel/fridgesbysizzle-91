
import React, { useRef, useEffect } from "react";
import { Product } from "@/types";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import ProductRatings from "./ProductRatings";
import ProductPrice from "./ProductPrice";
import ProductStockIndicator from "./ProductStockIndicator";

interface ProductDetailOverlayProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

const ProductDetailOverlay: React.FC<ProductDetailOverlayProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Current location ID (would come from user context in real implementation)
  const currentLocationId = "location1";
  const stockLevel = product.locationInventory[currentLocationId] || 0;
  
  // Format best before date for display
  const formattedDate = product.bestBeforeDate 
    ? format(new Date(product.bestBeforeDate), 'dd MMM yyyy')
    : 'Not available';
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && 
          modalRef.current && 
          !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-hidden"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col max-h-[90vh] relative animate-scale-in"
      >
        {/* Product image with repositioned close button */}
        <div className="relative w-full" style={{ maxHeight: '40vh' }}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full object-cover"
            style={{ height: '40vh' }}
          />
          {product.isVegan && (
            <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              Vegan
            </span>
          )}
          
          {/* Repositioned close button to middle right */}
          <button 
            onClick={onClose}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white rounded-full p-1.5 shadow-lg z-10"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-900" />
          </button>
        </div>
        
        {/* Product details */}
        <div className="p-5 overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
          
          <ProductRatings ratings={product.ratings} />
          
          <p className="text-gray-600 mt-3">{product.description}</p>
          
          <div className="flex items-center mt-4">
            <ProductPrice 
              price={product.price} 
              discountedPrice={product.discountedPrice} 
            />
            <div className="ml-auto">
              <ProductStockIndicator stockLevel={stockLevel} />
            </div>
          </div>
          
          <div className="mt-5">
            <h3 className="font-medium text-gray-800">Best Before Date</h3>
            <p className="text-gray-600 text-sm mt-1">{formattedDate}</p>
          </div>
          
          {product.ingredients.length > 0 && (
            <div className="mt-5">
              <h3 className="font-medium text-gray-800">Ingredients</h3>
              <p className="text-gray-600 text-sm mt-1">
                {product.ingredients.join(', ')}
              </p>
            </div>
          )}
          
          {product.allergens.length > 0 && (
            <div className="mt-5">
              <h3 className="font-medium text-gray-800">Allergens</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {product.allergens.map((allergen, index) => (
                  <span 
                    key={index} 
                    className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Fixed buttons at the bottom */}
        <div className="p-4 border-t bg-white sticky bottom-0 left-0 right-0 shadow-md">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onAddToCart(product)}
              disabled={stockLevel === 0}
            >
              Add to Cart
            </Button>
            <Button 
              variant="default" 
              className="flex-1 bg-sizzle-600 hover:bg-sizzle-700"
              onClick={() => onBuyNow(product)}
              disabled={stockLevel === 0}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailOverlay;
