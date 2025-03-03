
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockProducts, mockCategories } from "@/lib/mockData";
import { mockLocations } from "@/lib/auth";
import ProductForm from "./product/ProductForm";
import InventoryForm from "./product/InventoryForm";
import ProductTable from "./product/ProductTable";
import SearchAndAdd from "./product/SearchAndAdd";
import { useProductManagement } from "./product/hooks/useProductManagement";

// Mock allergens data (this would come from the backend)
const mockAllergens = [
  { id: "allergen1", name: "Gluten" },
  { id: "allergen2", name: "Dairy" },
  { id: "allergen3", name: "Nuts" },
  { id: "allergen4", name: "Eggs" },
  { id: "allergen5", name: "Soy" },
  { id: "allergen6", name: "Fish" },
  { id: "allergen7", name: "Shellfish" },
  { id: "allergen8", name: "Wheat" }
];

const ProductManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isInventoryDialogOpen,
    setIsInventoryDialogOpen,
    editingProduct,
    inventoryProduct,
    locationInventory,
    filteredProducts,
    toggleProductActive,
    resetForm,
    openEditDialog,
    openInventoryDialog,
    handleInventoryChange,
    saveInventory,
    handleSubmit
  } = useProductManagement(mockProducts);

  return (
    <div className="p-4">
      {/* Search and Add Product Row */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <SearchAndAdd
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onAddClick={() => {
            resetForm();
            setIsAddDialogOpen(true);
          }}
        />
        
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          
          <ProductForm
            product={editingProduct}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            categories={mockCategories}
            allergens={mockAllergens}
          />
        </DialogContent>
      </Dialog>

      {/* Inventory Dialog */}
      <Dialog open={isInventoryDialogOpen} onOpenChange={setIsInventoryDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Manage Inventory for {inventoryProduct?.name}
            </DialogTitle>
          </DialogHeader>
          
          <InventoryForm
            locations={mockLocations}
            locationInventory={locationInventory}
            onInventoryChange={handleInventoryChange}
            onSave={saveInventory}
            onCancel={() => setIsInventoryDialogOpen(false)}
            productName={inventoryProduct?.name}
          />
        </DialogContent>
      </Dialog>
      
      {/* Products Table */}
      <ProductTable
        products={filteredProducts}
        onEditProduct={openEditDialog}
        onToggleActive={toggleProductActive}
        onManageInventory={openInventoryDialog}
      />
    </div>
  );
};

export default ProductManagement;
