
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

type PaymentMethod = "card" | "swish" | "invoice";

interface PaymentOptionsProps {
  selectedMethod: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ selectedMethod, onChange }) => {
  const { user } = useAuth();
  
  const hasInvoiceOption = user?.monthlyInvoiceEnabled;
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Payment Method</h3>
      
      <RadioGroup 
        value={selectedMethod} 
        onValueChange={(value) => onChange(value as PaymentMethod)}
        className="grid gap-3"
      >
        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex-1 flex items-center gap-2 cursor-pointer">
            <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
              S
            </span>
            <div>
              <div className="font-medium">Card Payment</div>
              <div className="text-xs text-gray-500">Pay with credit or debit card via Stripe</div>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="swish" id="swish" />
          <Label htmlFor="swish" className="flex-1 flex items-center gap-2 cursor-pointer">
            <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
              S
            </span>
            <div>
              <div className="font-medium">Swish</div>
              <div className="text-xs text-gray-500">Pay with Swish mobile payment</div>
            </div>
          </Label>
        </div>
        
        {hasInvoiceOption && (
          <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="invoice" id="invoice" />
            <Label htmlFor="invoice" className="flex-1 flex items-center gap-2 cursor-pointer">
              <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
                I
              </span>
              <div>
                <div className="font-medium">Monthly Invoice</div>
                <div className="text-xs text-gray-500">Add to your monthly invoice</div>
              </div>
            </Label>
          </div>
        )}
      </RadioGroup>
    </div>
  );
};

export default PaymentOptions;
