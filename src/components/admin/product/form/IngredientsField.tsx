
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface IngredientsFieldProps {
  ingredients: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const IngredientsField: React.FC<IngredientsFieldProps> = ({
  ingredients,
  onInputChange
}) => {
  return (
    <div className="space-y-2 mt-4">
      <Label htmlFor="ingredients">Ingredients (comma separated)</Label>
      <Input
        id="ingredients"
        name="ingredients"
        value={ingredients}
        onChange={onInputChange}
        placeholder="Ingredient 1, Ingredient 2, Ingredient 3"
      />
    </div>
  );
};

export default IngredientsField;
