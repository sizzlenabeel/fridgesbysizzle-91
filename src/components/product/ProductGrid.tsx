
import React from "react";
import { Product } from "@/types";
import ProductTile from "./ProductTile";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  onViewDetails
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          No products found. Try a different search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductTile 
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
