
import { useState, useEffect } from "react";
import { Product } from "@/types";

type ProductFilterProps = {
  products: Product[];
  selectedCategory: string | null;
  searchQuery: string;
  veganOnly: boolean;
};

export const useProductFiltering = ({
  products,
  selectedCategory,
  searchQuery,
  veganOnly,
}: ProductFilterProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    products.filter((p) => p.active !== false)
  );

  useEffect(() => {
    let results = products.filter((p) => p.active !== false);

    if (veganOnly) {
      results = results.filter((product) => product.isVegan === true);
    }

    if (selectedCategory !== null) {
      results = results.filter((product) =>
        product.categories.some((category) => category.id === selectedCategory)
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(results);
  }, [selectedCategory, searchQuery, products, veganOnly]);

  return { filteredProducts };
};

export default useProductFiltering;
