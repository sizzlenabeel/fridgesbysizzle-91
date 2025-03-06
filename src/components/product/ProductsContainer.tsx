
import React, { useState } from "react";
import { Product } from "@/types";
import ProductGrid from "@/components/product/ProductGrid";
import ProductDetailOverlay from "@/components/product/ProductDetailOverlay";

interface ProductsContainerProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

const ProductsContainer: React.FC<ProductsContainerProps> = ({
  products,
  onAddToCart,
  onBuyNow,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "";
  };

  return (
    <>
      <main className="container mx-auto px-4 mt-40 pb-6">
        <ProductGrid
          products={products}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          onViewDetails={handleViewProductDetails}
        />
      </main>

      {selectedProduct && (
        <ProductDetailOverlay
          product={selectedProduct}
          onClose={handleCloseProductDetails}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      )}
    </>
  );
};

export default ProductsContainer;
