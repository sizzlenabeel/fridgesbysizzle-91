
import React from "react";
import SearchBar from "@/components/product/SearchBar";
import { Switch } from "@/components/ui/switch";
import { Leaf } from "lucide-react";
import { Product } from "@/types";

interface ProductSearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  veganOnly: boolean;
  setVeganOnly: (checked: boolean) => void;
  searchSuggestions: Product[];
  isSearching: boolean;
  onSelectProduct: (product: Product) => void;
}

const ProductSearchHeader: React.FC<ProductSearchHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  veganOnly,
  setVeganOnly,
  searchSuggestions,
  isSearching,
  onSelectProduct,
}) => {
  const handleVeganToggle = (checked: boolean) => {
    setVeganOnly(checked);
  };

  return (
    <div className="container mx-auto px-4 py-2 border-t">
      <div className="flex items-center gap-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search products..."
          suggestions={searchSuggestions}
          isLoading={isSearching}
          onSelectProduct={onSelectProduct}
          className="flex-1"
        />
        <div className="flex items-center gap-2">
          <Leaf
            className={`h-5 w-5 transition-colors ${
              veganOnly ? "text-green-600" : "text-gray-400"
            }`}
          />
          <Switch
            checked={veganOnly}
            onCheckedChange={handleVeganToggle}
            className={`${
              veganOnly ? "bg-green-600" : ""
            } data-[state=checked]:bg-green-600`}
          />
          <span className="text-sm font-medium">Vegan</span>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchHeader;
