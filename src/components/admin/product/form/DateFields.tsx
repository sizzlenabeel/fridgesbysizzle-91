
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DateFieldsProps {
  bestBeforeDate: string;
  dueDate: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateFields: React.FC<DateFieldsProps> = ({
  bestBeforeDate,
  dueDate,
  onInputChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div className="space-y-2">
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
      
      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          name="dueDate"
          type="date"
          value={dueDate}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default DateFields;
