
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DialogFooter } from "@/components/ui/dialog";
import { Product, Category } from "@/types";

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (formData: ProductFormData) => void;
  onCancel: () => void;
  categories: Category[];
  allergens: { id: string; name: string }[];
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  image: string;
  isVegan: boolean;
  ingredients: string;
  bestBeforeDate: string;
  dueDate: string;
  selectedCategories: string[];
  selectedAllergens: string[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  categories,
  allergens
}) => {
  const [form, setForm] = useState<ProductFormData>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price.toString() || "",
    image: product?.image || "",
    isVegan: product?.isVegan || false,
    ingredients: product?.ingredients.join(", ") || "",
    bestBeforeDate: product?.bestBeforeDate 
      ? new Date(product.bestBeforeDate).toISOString().split('T')[0] 
      : "",
    dueDate: product?.dueDate 
      ? new Date(product.dueDate).toISOString().split('T')[0] 
      : "",
    selectedCategories: product?.categories.map(cat => cat.id) || [],
    selectedAllergens: product?.allergens || []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSwitchChange = (checked: boolean) => {
    setForm({ ...form, isVegan: checked });
  };

  const toggleCategory = (categoryId: string) => {
    if (form.selectedCategories.includes(categoryId)) {
      setForm({
        ...form,
        selectedCategories: form.selectedCategories.filter(id => id !== categoryId)
      });
    } else {
      setForm({
        ...form,
        selectedCategories: [...form.selectedCategories, categoryId]
      });
    }
  };

  const toggleAllergen = (allergenId: string) => {
    if (form.selectedAllergens.includes(allergenId)) {
      setForm({
        ...form,
        selectedAllergens: form.selectedAllergens.filter(id => id !== allergenId)
      });
    } else {
      setForm({
        ...form,
        selectedAllergens: [...form.selectedAllergens, allergenId]
      });
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmitForm} className="space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Price (kr)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            value={form.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bestBeforeDate">Best Before Date</Label>
          <Input
            id="bestBeforeDate"
            name="bestBeforeDate"
            type="date"
            value={form.bestBeforeDate}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="ingredients">Ingredients (comma separated)</Label>
          <Input
            id="ingredients"
            name="ingredients"
            value={form.ingredients}
            onChange={handleInputChange}
            placeholder="Ingredient 1, Ingredient 2, Ingredient 3"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label>Allergens</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {allergens.map((allergen) => (
              <Button
                key={allergen.id}
                type="button"
                variant={form.selectedAllergens.includes(allergen.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleAllergen(allergen.id)}
              >
                {allergen.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2 pt-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="isVegan"
              checked={form.isVegan}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="isVegan">Vegan Product</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Categories</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              type="button"
              variant={form.selectedCategories.includes(category.id) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      <DialogFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ProductForm;
