
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 no-scrollbar">
      <div className="flex space-x-2 min-w-max">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          className={cn(
            "rounded-full",
            selectedCategory === null ? "bg-sizzle-600 text-white hover:bg-sizzle-700" : ""
          )}
          onClick={() => onSelectCategory(null)}
        >
          All
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-full whitespace-nowrap",
              selectedCategory === category.id ? "bg-sizzle-600 text-white hover:bg-sizzle-700" : ""
            )}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
