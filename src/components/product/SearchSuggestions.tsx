
import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

interface SearchSuggestionsProps {
  suggestions: Product[];
  isVisible: boolean;
  isLoading?: boolean;
  onSelectSuggestion: (product: Product) => void;
  className?: string;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  isVisible,
  isLoading = false,
  onSelectSuggestion,
  className
}) => {
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <div className={cn(
      "absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-50 max-h-80 overflow-y-auto",
      className
    )}>
      {isLoading ? (
        <div className="p-4 text-center">
          <div className="animate-pulse">Loading suggestions...</div>
        </div>
      ) : suggestions.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          No products found
        </div>
      ) : (
        <ul className="py-2">
          {suggestions.map(product => (
            <li 
              key={product.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => onSelectSuggestion(product)}
            >
              <div className="h-10 w-10 mr-3 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
              <div className="flex-1 truncate">
                <div className="font-medium flex items-center gap-1">
                  {product.name}
                  {product.isVegan && (
                    <Leaf className="h-3 w-3 text-green-600" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  {product.description.substring(0, 60)}
                  {product.description.length > 60 ? '...' : ''}
                </div>
              </div>
              <div className="text-sizzle-600 font-semibold">
                {product.discountedPrice ? (
                  <>
                    <span className="line-through text-gray-400 mr-1 text-sm">
                      {product.price} kr
                    </span>
                    {product.discountedPrice} kr
                  </>
                ) : (
                  `${product.price} kr`
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSuggestions;
