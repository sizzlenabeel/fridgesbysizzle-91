
import React, { useState, useEffect } from "react";
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
import { Product } from "@/types";

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

// This function simulates an API call to search for products in the admin panel
// It will be replaced with a real API call in the future
const searchAdminProducts = (query: string, products: Product[]): Promise<Product[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      if (!query.trim()) {
        resolve([]);
        return;
      }
      
      const lowercaseQuery = query.toLowerCase();
      const filtered = products.filter(
        product => 
          product.name.toLowerCase().includes(lowercaseQuery) || 
          product.description.toLowerCase().includes(lowercaseQuery)
      );
      resolve(filtered);
    }, 300); // Simulate network delay
  });
};

const ProductManagement = () => {
  const {
    products,
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

  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Handle search suggestions for admin
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length > 0) {
        setIsSearching(true);
        const suggestions = await searchAdminProducts(searchTerm, products);
        setSearchSuggestions(suggestions);
        setIsSearching(false);
      } else {
        setSearchSuggestions([]);
      }
    };
    
    const debounceTimer = setTimeout(fetchSuggestions, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, products]);

  const handleSelectProductFromSearch = (product: Product) => {
    setSearchTerm(product.name);
    openEditDialog(product);
  };

  return (
    <div className="p-4">
      {/* Search and Add Product Row */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <SearchAndAdd
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={() => {
            resetForm();
            setIsAddDialogOpen(true);
          }}
          searchSuggestions={searchSuggestions}
          isSearching={isSearching}
          onSelectProduct={handleSelectProductFromSearch}
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
