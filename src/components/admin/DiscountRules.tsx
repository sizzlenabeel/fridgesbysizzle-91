
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
  Trash,
  ToggleLeft, 
  ToggleRight,
  Calendar,
  PercentIcon,
  Tag
} from "lucide-react";
import { DiscountRule } from "@/types";
import { mockCategories } from "@/lib/mockData";

// Mock discount rules for the demo
const mockDiscountRules: DiscountRule[] = [
  {
    id: "disc1",
    name: "Near Expiry",
    description: "Products nearing expiry date get 20% off",
    type: "percentage",
    value: 20,
    conditions: {
      daysBeforeExpiry: 2,
    },
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "disc2",
    name: "Vegan Special",
    description: "10kr off all vegan products",
    type: "fixed",
    value: 10,
    conditions: {
      categoryIds: ["cat5"], // Vegan category
    },
    active: true,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: "disc3",
    name: "Breakfast Combo",
    description: "15% off breakfast items",
    type: "percentage",
    value: 15,
    conditions: {
      categoryIds: ["cat4"], // Breakfast category
    },
    active: false,
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
];

const DiscountRules = () => {
  const [discountRules, setDiscountRules] = useState<DiscountRule[]>(mockDiscountRules);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<DiscountRule | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "percentage",
    value: "",
    daysBeforeExpiry: "",
    active: true,
  });

  // Filter rules based on search term
  const filteredRules = discountRules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form switch change
  const handleSwitchChange = (checked: boolean) => {
    setForm({ ...form, active: checked });
  };

  // Toggle rule active status
  const toggleRuleActive = (ruleId: string) => {
    setDiscountRules(
      discountRules.map((rule) =>
        rule.id === ruleId
          ? { ...rule, active: !rule.active }
          : rule
      )
    );
  };

  // Delete rule
  const deleteRule = (ruleId: string) => {
    // In a real app, we'd make an API call here
    setDiscountRules(discountRules.filter(rule => rule.id !== ruleId));
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
      type: "percentage",
      value: "",
      daysBeforeExpiry: "",
      active: true,
    });
    setSelectedCategories([]);
    setEditingRule(null);
  };

  // Open edit dialog
  const openEditDialog = (rule: DiscountRule) => {
    setEditingRule(rule);
    setForm({
      name: rule.name,
      description: rule.description,
      type: rule.type,
      value: rule.value.toString(),
      daysBeforeExpiry: rule.conditions.daysBeforeExpiry?.toString() || "",
      active: rule.active,
    });
    setSelectedCategories(rule.conditions.categoryIds || []);
    setIsAddDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we'd make an API call here
    // For now, we'll just update the local state
    
    const conditions: DiscountRule["conditions"] = {};
    
    if (form.daysBeforeExpiry && form.daysBeforeExpiry !== "0") {
      conditions.daysBeforeExpiry = parseInt(form.daysBeforeExpiry);
    }
    
    if (selectedCategories.length > 0) {
      conditions.categoryIds = selectedCategories;
    }
    
    if (editingRule) {
      // Update existing rule
      setDiscountRules(
        discountRules.map((rule) =>
          rule.id === editingRule.id
            ? {
                ...rule,
                name: form.name,
                description: form.description,
                type: form.type as "percentage" | "fixed",
                value: parseFloat(form.value),
                conditions,
                active: form.active,
              }
            : rule
        )
      );
    } else {
      // Add new rule
      const newRule: DiscountRule = {
        id: `disc${discountRules.length + 1}`,
        name: form.name,
        description: form.description,
        type: form.type as "percentage" | "fixed",
        value: parseFloat(form.value),
        conditions,
        active: form.active,
        createdAt: new Date().toISOString(),
      };
      
      setDiscountRules([...discountRules, newRule]);
    }
    
    resetForm();
    setIsAddDialogOpen(false);
  };

  return (
    <div className="p-4">
      {/* Search and Add Rule Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search discount rules..."
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
              Add Discount Rule
            </Button>
          </DialogTrigger>
          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingRule ? "Edit Discount Rule" : "Add New Discount Rule"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Rule Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Discount Type</Label>
                  <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (kr)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="value">
                    {form.type === "percentage" ? "Percentage" : "Amount (kr)"}
                  </Label>
                  <Input
                    id="value"
                    name="value"
                    type="number"
                    min="0"
                    step={form.type === "percentage" ? "1" : "0.01"}
                    max={form.type === "percentage" ? "100" : undefined}
                    value={form.value}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="daysBeforeExpiry">Days Before Expiry (optional)</Label>
                <Input
                  id="daysBeforeExpiry"
                  name="daysBeforeExpiry"
                  type="number"
                  min="0"
                  value={form.daysBeforeExpiry}
                  onChange={handleInputChange}
                  placeholder="Leave empty if not applicable"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Apply to Categories (optional)</Label>
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
              
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={form.active}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="active">Active</Label>
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
                  {editingRule ? "Update Rule" : "Add Rule"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Discount Rules Table */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableCaption>List of all discount rules in the system</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead className="hidden md:table-cell">Conditions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No discount rules found
                </TableCell>
              </TableRow>
            ) : (
              filteredRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {rule.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {rule.type === "percentage" ? (
                        <PercentIcon className="h-4 w-4 mr-1 text-sizzle-600" />
                      ) : (
                        <Tag className="h-4 w-4 mr-1 text-sizzle-600" />
                      )}
                      {rule.value} {rule.type === "percentage" ? "%" : "kr"}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col gap-1">
                      {rule.conditions.daysBeforeExpiry && (
                        <span className="inline-flex items-center text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {rule.conditions.daysBeforeExpiry} days before expiry
                        </span>
                      )}
                      {rule.conditions.categoryIds?.map((catId) => {
                        const category = mockCategories.find(c => c.id === catId);
                        return category ? (
                          <span key={catId} className="inline-flex items-center text-xs">
                            For {category.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        rule.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {rule.active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleRuleActive(rule.id)}
                        title={rule.active ? "Deactivate" : "Activate"}
                      >
                        {rule.active ? (
                          <ToggleRight className="h-5 w-5 text-green-500" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-gray-500" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(rule)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteRule(rule.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
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

export default DiscountRules;
