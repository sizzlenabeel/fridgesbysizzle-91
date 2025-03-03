
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface FormActionsProps {
  onCancel: () => void;
  isEditing: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel, isEditing }) => {
  return (
    <DialogFooter>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button type="submit">
        {isEditing ? "Update Product" : "Add Product"}
      </Button>
    </DialogFooter>
  );
};

export default FormActions;
