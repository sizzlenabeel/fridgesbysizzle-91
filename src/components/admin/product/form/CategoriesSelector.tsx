
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Category } from "@/types";

interface CategoriesSelectorProps {
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (categoryId: string) => void;
}

const CategoriesSelector: React.FC<CategoriesSelectorProps> = ({
  categories,
  selectedCategories,
  toggleCategory
}) => {
  return (
    <div className="space-y-2 mt-4">
      <Label>Categories</Label>
      <div className="flex flex-wrap gap-2 mt-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            type="button"
            variant={selectedCategories.includes(category.id) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSelector;
