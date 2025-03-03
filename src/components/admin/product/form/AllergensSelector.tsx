
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface AllergensSelectorProps {
  allergens: { id: string; name: string }[];
  selectedAllergens: string[];
  toggleAllergen: (allergenId: string) => void;
}

const AllergensSelector: React.FC<AllergensSelectorProps> = ({
  allergens,
  selectedAllergens,
  toggleAllergen
}) => {
  return (
    <div className="space-y-2 mt-4">
      <Label>Allergens</Label>
      <div className="flex flex-wrap gap-2 mt-2">
        {allergens.map((allergen) => (
          <Button
            key={allergen.id}
            type="button"
            variant={selectedAllergens.includes(allergen.id) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleAllergen(allergen.id)}
          >
            {allergen.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AllergensSelector;
