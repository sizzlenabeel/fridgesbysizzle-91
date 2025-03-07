
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  ToggleLeft, 
  ToggleRight, 
  Edit
} from "lucide-react";
import { Product } from "@/types";

interface ProductTableProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onToggleActive: (productId: string) => void;
  onManageInventory: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEditProduct,
  onToggleActive,
  onManageInventory
}) => {
  return (
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
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow 
                key={product.id} 
                className={`${product.active === false ? "bg-gray-50" : ""} cursor-pointer hover:bg-gray-100`}
                onClick={() => onEditProduct(product)}
              >
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
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onManageInventory(product);
                      }}
                      title="Manage Inventory"
                    >
                      <Building2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleActive(product.id);
                      }}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditProduct(product);
                      }}
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
  );
};

export default ProductTable;
