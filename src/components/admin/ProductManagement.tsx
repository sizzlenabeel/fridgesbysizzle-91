
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  ToggleLeft, 
  ToggleRight, 
  Check,
  X
} from "lucide-react";
import { mockProducts, mockCategories } from "@/lib/mockData";
import { Product, Category } from "@/types";

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    isVegan: false,
    ingredients: "",
    allergens: ""
  });

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form switch change
  const handleSwitchChange = (checked: boolean) => {
    setForm({ ...form, isVegan: checked });
  };

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

  // Handle category selection
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      isVegan: false,
      ingredients: "",
      allergens: ""
    });
    setSelectedCategories([]);
    setEditingProduct(null);
  };

  // Open edit dialog
  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      isVegan: product.isVegan,
      ingredients: product.ingredients.join(", "),
      allergens: product.allergens.join(", ")
    });
    setSelectedCategories(product.categories.map(cat => cat.id));
    setIsAddDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we'd make an API call here
    // For now, we'll just update the local state
    
    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: form.name,
                description: form.description,
                price: parseFloat(form.price),
                image: form.image,
                isVegan: form.isVegan,
                ingredients: form.ingredients.split(",").map(i => i.trim()),
                allergens: form.allergens.split(",").map(a => a.trim()),
                categories: mockCategories.filter(cat => selectedCategories.includes(cat.id))
              }
            : product
        )
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: `prod${products.length + 1}`,
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        image: form.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&h=500",
        isVegan: form.isVegan,
        ingredients: form.ingredients.split(",").map(i => i.trim()),
        allergens: form.allergens.split(",").map(a => a.trim()),
        categories: mockCategories.filter(cat => selectedCategories.includes(cat.id)),
        bestBeforeDate: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
        ratings: { heart: 0, thumbsUp: 0, alright: 0, thumbsDown: 0 },
        locationInventory: { location1: 10, location2: 10, location3: 10 },
        active: true
      };
      
      setProducts([...products, newProduct]);
    }
    
    resetForm();
    setIsAddDialogOpen(false);
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
            
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
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
                  <Label htmlFor="allergens">Allergens (comma separated)</Label>
                  <Input
                    id="allergens"
                    name="allergens"
                    value={form.allergens}
                    onChange={handleInputChange}
                    placeholder="Allergen 1, Allergen 2"
                  />
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
                  {mockCategories.map((category) => (
                    <Button
                      key={category.id}
                      type="button"
                      variant={selectedCategories.includes(category.id) ? "default" : "outline"}
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
                  onClick={() => {
                    resetForm();
                    setIsAddDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? "Update Product" : "Add Product"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Products Table */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableCaption>List of all products in the system</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Categories</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    {product.discountedPrice ? (
                      <div>
                        <span className="line-through text-gray-400">{product.price} kr</span>
                        <span className="ml-2 font-medium text-sizzle-600">
                          {product.discountedPrice} kr
                        </span>
                      </div>
                    ) : (
                      <span>{product.price} kr</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {product.categories.slice(0, 2).map((category) => (
                        <span
                          key={category.id}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {category.name}
                        </span>
                      ))}
                      {product.categories.length > 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{product.categories.length - 2}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.active === false
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {product.active === false ? "Inactive" : "Active"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleProductActive(product.id)}
                        title={product.active === false ? "Activate" : "Deactivate"}
                      >
                        {product.active === false ? (
                          <ToggleLeft className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ToggleRight className="h-5 w-5 text-green-500" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductManagement;
