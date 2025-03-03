
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Plus } from "lucide-react";
import { mockProducts, mockCategories } from "@/lib/mockData";
import { Product } from "@/types";
import { mockLocations } from "@/lib/auth";
import ProductForm, { ProductFormData } from "./product/ProductForm";
import InventoryForm from "./product/InventoryForm";
import ProductTable from "./product/ProductTable";

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isInventoryDialogOpen, setIsInventoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [inventoryProduct, setInventoryProduct] = useState<Product | null>(null);
  const [locationInventory, setLocationInventory] = useState<Record<string, number>>({});

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

  // Sort products by active status
  useEffect(() => {
    // Make a copy to avoid modifying the original reference
    const sortedProducts = [...products].sort((a, b) => {
      // Sort active products first
      if (a.active === false && b.active !== false) return 1;
      if (a.active !== false && b.active === false) return -1;
      return 0;
    });
    
    if (JSON.stringify(sortedProducts) !== JSON.stringify(products)) {
      setProducts(sortedProducts);
    }
  }, [products]);

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle product active status
  const toggleProductActive = (productId: string) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, active: product.active === false ? true : false }
          : product
      )
    );
  };

  // Reset form and close dialog
  const resetForm = () => {
    setEditingProduct(null);
    setIsAddDialogOpen(false);
  };

  // Open edit dialog
  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsAddDialogOpen(true);
  };

  // Open inventory dialog
  const openInventoryDialog = (product: Product) => {
    setInventoryProduct(product);
    setLocationInventory(product.locationInventory || {});
    setIsInventoryDialogOpen(true);
  };

  // Handle inventory change
  const handleInventoryChange = (locationId: string, value: string) => {
    setLocationInventory({
      ...locationInventory,
      [locationId]: parseInt(value) || 0
    });
  };

  // Save inventory changes
  const saveInventory = () => {
    if (!inventoryProduct) return;
    
    setProducts(
      products.map((product) =>
        product.id === inventoryProduct.id
          ? { ...product, locationInventory }
          : product
      )
    );
    
    setIsInventoryDialogOpen(false);
    setInventoryProduct(null);
  };

  // Handle form submission
  const handleSubmit = (formData: ProductFormData) => {
    // In a real app, we'd make an API call here
    // For now, we'll just update the local state
    
    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                image: formData.image,
                isVegan: formData.isVegan,
                ingredients: formData.ingredients.split(",").map(i => i.trim()),
                allergens: formData.selectedAllergens,
                bestBeforeDate: formData.bestBeforeDate || new Date().toISOString(),
                dueDate: formData.dueDate || undefined,
                categories: mockCategories.filter(cat => formData.selectedCategories.includes(cat.id))
              }
            : product
        )
      );
      
      resetForm();
    } else {
      // Add new product
      const newProduct: Product = {
        id: `prod${products.length + 1}`,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&h=500",
        isVegan: formData.isVegan,
        ingredients: formData.ingredients.split(",").map(i => i.trim()),
        allergens: formData.selectedAllergens,
        categories: mockCategories.filter(cat => formData.selectedCategories.includes(cat.id)),
        bestBeforeDate: formData.bestBeforeDate || new Date(Date.now() + 86400000 * 7).toISOString(), // Default to 7 days from now
        dueDate: formData.dueDate || undefined,
        ratings: { heart: 0, thumbsUp: 0, alright: 0, thumbsDown: 0 },
        locationInventory: { }, // Empty initially
        active: true
      };
      
      const newProducts = [...products, newProduct];
      setProducts(newProducts);
      
      // Automatically open inventory dialog for the new product
      setInventoryProduct(newProduct);
      setLocationInventory({});
      setIsAddDialogOpen(false);
      setIsInventoryDialogOpen(true);
    }
  };

  return (
    <div className="p-4">
      {/* Search and Add Product Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                resetForm();
                setIsAddDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          
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
      </div>
      
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
