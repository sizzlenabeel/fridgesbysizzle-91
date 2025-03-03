
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";

interface SearchAndAddProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddClick: () => void;
}

const SearchAndAdd: React.FC<SearchAndAddProps> = ({
  searchTerm,
  onSearchChange,
  onAddClick
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search products..."
          className="pl-9"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      
      <DialogTrigger asChild>
        <Button onClick={onAddClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
    </div>
  );
};

export default SearchAndAdd;
