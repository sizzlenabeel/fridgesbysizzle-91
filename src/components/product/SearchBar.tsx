
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Product } from "@/types";
import SearchSuggestions from "./SearchSuggestions";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suggestions?: Product[];
  isLoading?: boolean;
  onSelectProduct?: (product: Product) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search products...",
  suggestions = [],
  isLoading = false,
  onSelectProduct
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleInputFocus = () => {
    if (value.trim().length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleClearSearch = () => {
    onChange("");
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (product: Product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      // Default behavior
      onChange(product.name);
    }
    setShowSuggestions(false);
  };

  // Handle clicks outside of the search container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show suggestions when typing
  useEffect(() => {
    if (value.trim().length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [value]);

  return (
    <div className="relative mb-2" ref={searchContainerRef}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-10 pr-10 h-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleInputFocus}
      />
      {value && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </button>
      )}
      
      <SearchSuggestions
        suggestions={suggestions}
        isVisible={showSuggestions}
        isLoading={isLoading}
        onSelectSuggestion={handleSelectSuggestion}
      />
    </div>
  );
};

export default SearchBar;
