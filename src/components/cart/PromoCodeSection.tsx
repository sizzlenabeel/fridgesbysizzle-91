
import React, { useState } from "react";
import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface PromoCodeSectionProps {
  appliedPromo: { code: string; discount: number } | null;
  setAppliedPromo: (promo: { code: string; discount: number } | null) => void;
}

const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({ 
  appliedPromo, 
  setAppliedPromo 
}) => {
  const [promoCode, setPromoCode] = useState<string>("");

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a promo code",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    // Mock promo code validation (in real app, this would be checked against a backend)
    if (promoCode.toUpperCase() === "WELCOME10") {
      setAppliedPromo({ code: promoCode, discount: 0.1 }); // 10% discount
      toast({
        title: "Promo applied",
        description: "10% discount applied to your order!",
        duration: 2000,
      });
    } else if (promoCode.toUpperCase() === "SUMMER20") {
      setAppliedPromo({ code: promoCode, discount: 0.2 }); // 20% discount
      toast({
        title: "Promo applied",
        description: "20% discount applied to your order!",
        duration: 2000,
      });
    } else {
      toast({
        title: "Invalid code",
        description: "This promo code is invalid or expired",
        variant: "destructive",
        duration: 2000,
      });
    }

    // Clear input after attempting to apply
    setPromoCode("");
  };

  return (
    <div className="mb-4">
      <div className="flex gap-2 items-center mb-1">
        <Tag className="h-4 w-4 text-sizzle-600" />
        <span className="text-sm font-medium">Promo Code</span>
      </div>
      <div className="flex gap-2">
        <Input 
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter code"
          className="h-9 text-sm"
        />
        <Button 
          onClick={handleApplyPromo}
          variant="outline"
          className="h-9 text-sm whitespace-nowrap"
        >
          Apply
        </Button>
      </div>
      {appliedPromo && (
        <div className="text-xs text-green-600 mt-1">
          Code "{appliedPromo.code}" applied: {appliedPromo.discount * 100}% off
        </div>
      )}
    </div>
  );
};

export default PromoCodeSection;
