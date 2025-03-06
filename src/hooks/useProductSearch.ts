
import { useState, useEffect } from "react";
import { Product } from "@/types";

// Helper function to search products
const searchProducts = (
  query: string,
  products: Product[]
): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query.trim()) {
        resolve([]);
        return;
      }

      const lowercaseQuery = query.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.active !== false &&
          (product.name.toLowerCase().includes(lowercaseQuery) ||
            product.description.toLowerCase().includes(lowercaseQuery) ||
            product.categories.some((cat) =>
              cat.name.toLowerCase().includes(lowercaseQuery)
            ))
      );
      resolve(filtered);
    }, 300);
  });
};

export const useProductSearch = (products: Product[], searchQuery: string) => {
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        const suggestions = await searchProducts(searchQuery, products);
        setSearchSuggestions(suggestions);
        setIsSearching(false);
      } else {
        setSearchSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, products]);

  return { searchSuggestions, isSearching };
};

export default useProductSearch;
