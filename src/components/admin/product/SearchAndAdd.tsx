
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import SearchBar from "@/components/product/SearchBar";
import { Product } from "@/types";

interface SearchAndAddProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
  searchSuggestions?: Product[];
  isSearching?: boolean;
  onSelectProduct?: (product: Product) => void;
}

const SearchAndAdd: React.FC<SearchAndAddProps> = ({
  searchTerm,
  onSearchChange,
  onAddClick,
  searchSuggestions,
  isSearching,
  onSelectProduct
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
      <div className="relative w-full sm:w-96">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search products..."
          suggestions={searchSuggestions}
          isLoading={isSearching}
          onSelectProduct={onSelectProduct}
          className="w-full"
        />
      </div>
      
      <DialogTrigger asChild>
        <Button onClick={onAddClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
    </div>
  );
};

export default SearchAndAdd;
