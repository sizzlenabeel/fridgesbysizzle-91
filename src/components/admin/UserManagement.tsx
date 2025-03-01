
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Trash,
  Shield
} from "lucide-react";
import { User } from "@/types";

// Mock admin users for the demo
const mockAdmins: User[] = [
  {
    id: "admin1",
    email: "admin@sizzle.com",
    primaryLocationId: "location1",
    createdAt: new Date().toISOString(),
    isAdmin: true,
  },
  {
    id: "admin2",
    email: "manager@sizzle.com",
    primaryLocationId: "location2",
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    isAdmin: true,
  },
];

const UserManagement = () => {
  const [admins, setAdmins] = useState<User[]>(mockAdmins);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    primaryLocationId: "location1",
  });

  // Filter admins based on search term
  const filteredAdmins = admins.filter(
    (admin) => admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Delete admin
  const deleteAdmin = (adminId: string) => {
    // In a real app, we'd make an API call here
    setAdmins(admins.filter(admin => admin.id !== adminId));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we'd make an API call here
    // For now, we'll just update the local state
    
    // Add new admin
    const newAdmin: User = {
      id: `admin${admins.length + 1}`,
      email: form.email,
      primaryLocationId: form.primaryLocationId,
      createdAt: new Date().toISOString(),
      isAdmin: true,
    };
    
    setAdmins([...admins, newAdmin]);
    
    // Reset form
    setForm({
      email: "",
      password: "",
      primaryLocationId: "location1",
    });
    
    setIsAddDialogOpen(false);
  };

  return (
    <div className="p-4">
      {/* Search and Add Admin Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search admins..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primaryLocationId">Primary Location</Label>
                <select
                  id="primaryLocationId"
                  name="primaryLocationId"
                  value={form.primaryLocationId}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="location1">Kista Galleria</option>
                  <option value="location2">Solna Business Park</option>
                  <option value="location3">Nacka Forum</option>
                </select>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Add Admin
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Admins Table */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableCaption>List of all admins in the system</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Created At</TableHead>
              <TableHead className="hidden md:table-cell">Primary Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  No admins found
                </TableCell>
              </TableRow>
            ) : (
              filteredAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-sizzle-600" />
                    {admin.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {admin.primaryLocationId === "location1" ? "Kista Galleria" : 
                     admin.primaryLocationId === "location2" ? "Solna Business Park" : 
                     admin.primaryLocationId === "location3" ? "Nacka Forum" : 
                     admin.primaryLocationId}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteAdmin(admin.id)}
                      disabled={admin.id === "admin1"} // Prevent deleting the primary admin
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
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

export default UserManagement;
