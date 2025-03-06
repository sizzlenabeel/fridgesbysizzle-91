
import React from "react";
import CategoryFilter from "@/components/CategoryFilter";
import { Category } from "@/types";

interface ProductFilterSectionProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const ProductFilterSection: React.FC<ProductFilterSectionProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="container mx-auto px-4 py-2 border-t">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
    </div>
  );
};

export default ProductFilterSection;
