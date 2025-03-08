import { useState, useEffect } from "react";
import { Product } from "@/types";
import { ProductFormData } from "../ProductForm";
import { mockCategories } from "@/lib/mockData";

export const useProductManagement = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isInventoryDialogOpen, setIsInventoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [inventoryProduct, setInventoryProduct] = useState<Product | null>(null);
  const [locationInventory, setLocationInventory] = useState<Record<string, number>>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);

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
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

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
        ratings: { heart: 0, thumbsUp: 0, thumbsDown: 0 },
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

  return {
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
  };
};
