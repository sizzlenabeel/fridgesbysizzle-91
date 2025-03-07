
import React, { useState } from "react";
import { Product, Category } from "@/types";
import BasicInfoFields from "./form/BasicInfoFields";
import DateFields from "./form/DateFields";
import IngredientsField from "./form/IngredientsField";
import AllergensSelector from "./form/AllergensSelector";
import CategoriesSelector from "./form/CategoriesSelector";
import FormActions from "./form/FormActions";

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
      <BasicInfoFields
        name={form.name}
        description={form.description}
        price={form.price}
        image={form.image}
        isVegan={form.isVegan}
        onInputChange={handleInputChange}
        onSwitchChange={handleSwitchChange}
      />
      
      <DateFields
        bestBeforeDate={form.bestBeforeDate}
        onInputChange={handleInputChange}
      />
      
      <IngredientsField
        ingredients={form.ingredients}
        onInputChange={handleInputChange}
      />
      
      <AllergensSelector
        allergens={allergens}
        selectedAllergens={form.selectedAllergens}
        toggleAllergen={toggleAllergen}
      />
      
      <CategoriesSelector
        categories={categories}
        selectedCategories={form.selectedCategories}
        toggleCategory={toggleCategory}
      />
      
      <FormActions
        onCancel={onCancel}
        isEditing={!!product}
      />
    </form>
  );
};

export default ProductForm;
