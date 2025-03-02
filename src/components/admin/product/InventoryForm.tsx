
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Building2 } from "lucide-react";
import { Location } from "@/types";

interface InventoryFormProps {
  locations: Location[];
  locationInventory: Record<string, number>;
  onInventoryChange: (locationId: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  productName?: string;
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  locations,
  locationInventory,
  onInventoryChange,
  onSave,
  onCancel,
  productName
}) => {
  return (
    <div className="py-4">
      <div className="space-y-4">
        {locations.map((location) => (
          <div key={location.id} className="flex items-center space-x-4">
            <Building2 className="h-4 w-4 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm font-medium">{location.name}</p>
              <p className="text-xs text-gray-500">{location.address}</p>
            </div>
            <Input
              type="number"
              min="0"
              className="w-20"
              value={locationInventory[location.id] || ""}
              onChange={(e) => onInventoryChange(location.id, e.target.value)}
            />
          </div>
        ))}
      </div>
      
      <DialogFooter className="mt-6">
        <Button 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button onClick={onSave}>
          Save Inventory
        </Button>
      </DialogFooter>
    </div>
  );
};

export default InventoryForm;
