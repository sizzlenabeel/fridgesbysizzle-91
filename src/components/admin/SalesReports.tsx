
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { mockLocations, mockCategories } from "@/lib/mockData";
import { SalesReportItem, SalesReportFilter } from "@/types";
import { Calendar, Bookmark, Download } from "lucide-react";

// Generate mock sales data for the chart
const generateMockSalesData = (): SalesReportItem[] => {
  const data: SalesReportItem[] = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      totalSales: Math.floor(Math.random() * 5000) + 1000,
      totalItems: Math.floor(Math.random() * 100) + 10,
    });
  }
  
  return data.reverse();
};

const SalesReports = () => {
  const [filter, setFilter] = useState<SalesReportFilter>({
    startDate: new Date(Date.now() - 86400000 * 13), // 14 days ago
    endDate: new Date(),
    locationId: undefined,
    categoryId: undefined,
  });
  
  const [salesData, setSalesData] = useState<SalesReportItem[]>(
    generateMockSalesData()
  );
  
  const totalSales = salesData.reduce((sum, item) => sum + item.totalSales, 0);
  const totalItems = salesData.reduce((sum, item) => sum + item.totalItems, 0);
  const averageSalePerDay = totalSales / salesData.length;
  
  // Handle date input change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: new Date(value) });
  };
  
  // Handle location selection
  const handleLocationChange = (value: string) => {
    setFilter({ ...filter, locationId: value === "all" ? undefined : value });
  };
  
  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setFilter({ ...filter, categoryId: value === "all" ? undefined : value });
  };
  
  // Apply filters and update chart
  const applyFilters = () => {
    // In a real app, we'd make an API call here
    // For now, we'll just generate new random data
    setSalesData(generateMockSalesData());
  };
  
  // Export data as CSV
  const exportData = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Total Sales (kr),Total Items\n";
    
    salesData.forEach(item => {
      csvContent += `${item.date},${item.totalSales},${item.totalItems}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      {/* Filter Controls */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-4">Filter Reports</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Start Date
            </Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={filter.startDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              End Date
            </Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={filter.endDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center">
              <Bookmark className="h-4 w-4 mr-2" />
              Location
            </Label>
            <Select 
              onValueChange={handleLocationChange}
              defaultValue="all"
            >
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {mockLocations.map(location => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center">
              <Bookmark className="h-4 w-4 mr-2" />
              Category
            </Label>
            <Select 
              onValueChange={handleCategoryChange}
              defaultValue="all"
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {mockCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
          <p className="text-2xl font-bold text-sizzle-600">{totalSales.toLocaleString()} kr</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Items Sold</h3>
          <p className="text-2xl font-bold text-sizzle-600">{totalItems.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Average Daily Sales</h3>
          <p className="text-2xl font-bold text-sizzle-600">{Math.round(averageSalePerDay).toLocaleString()} kr</p>
        </div>
      </div>
      
      {/* Sales Chart */}
      <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
        <h3 className="text-lg font-medium mb-4">Sales Trend</h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  return name === 'totalSales' ? `${value} kr` : value;
                }}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString();
                }}
              />
              <Legend />
              <Bar 
                name="Sales (kr)" 
                dataKey="totalSales" 
                fill="#f47721" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                name="Items Sold" 
                dataKey="totalItems" 
                fill="#60a5fa" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Sales Table */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium mb-4">Sales Details</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Sales
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items Sold
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Per Item
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.totalSales.toLocaleString()} kr
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.totalItems}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {Math.round(item.totalSales / item.totalItems).toLocaleString()} kr
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReports;
