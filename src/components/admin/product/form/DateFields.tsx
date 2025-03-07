
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DateFieldsProps {
  bestBeforeDate: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateFields: React.FC<DateFieldsProps> = ({
  bestBeforeDate,
  onInputChange
}) => {
  return (
    <div className="space-y-2 mt-4">
      <Label htmlFor="bestBeforeDate">Best Before Date</Label>
      <Input
        id="bestBeforeDate"
        name="bestBeforeDate"
        type="date"
        value={bestBeforeDate}
        onChange={onInputChange}
        required
      />
    </div>
  );
};

export default DateFields;
