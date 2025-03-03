
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface BasicInfoFieldsProps {
  name: string;
  description: string;
  price: string;
  image: string;
  isVegan: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchChange: (checked: boolean) => void;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  name,
  description,
  price,
  image,
  isVegan,
  onInputChange,
  onSwitchChange
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={onInputChange}
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
            value={price}
            onChange={onInputChange}
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            value={description}
            onChange={onInputChange}
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            value={image}
            onChange={onInputChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div className="space-y-2 pt-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="isVegan"
              checked={isVegan}
              onCheckedChange={onSwitchChange}
            />
            <Label htmlFor="isVegan">Vegan Product</Label>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInfoFields;
