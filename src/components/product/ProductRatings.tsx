
import React from "react";
import { Heart, ThumbsUp, ThumbsDown } from "lucide-react";

interface ProductRatingsProps {
  ratings: {
    heart: number;
    thumbsUp: number;
    alright: number;
    thumbsDown: number;
  };
  size?: "sm" | "md";
}

const ProductRatings: React.FC<ProductRatingsProps> = ({ 
  ratings,
  size = "md" 
}) => {
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  const gap = size === "sm" ? "gap-2" : "gap-3";
  
  return (
    <div className={`flex items-center ${gap} flex-wrap mt-1`}>
      <div className="flex items-center gap-1">
        <Heart className={`${iconSize} text-red-500`} />
        <span className={textSize}>{ratings.heart}</span>
      </div>
      <div className="flex items-center gap-1">
        <ThumbsUp className={`${iconSize} text-blue-500`} />
        <span className={textSize}>{ratings.thumbsUp}</span>
      </div>
      <div className="flex items-center gap-1">
        <ThumbsDown className={`${iconSize} text-gray-500`} />
        <span className={textSize}>{ratings.thumbsDown}</span>
      </div>
    </div>
  );
};

export default ProductRatings;
