import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Heart, ThumbsUp, ThumbsDown, UserRound } from "lucide-react";
import { Order, Product, ProductRating } from "@/types";
import { useToast } from "@/hooks/use-toast";

// Mock order history data
const mockOrders: Order[] = [
  {
    id: "order1",
    userId: "user-123",
    locationId: "1",
    items: [
      {
        product: {
          id: "1",
          name: "Chicken Salad",
          description: "Fresh salad with grilled chicken",
          price: 89,
          discountedPrice: 79,
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          categories: [{ id: "1", name: "Meals" }],
          isVegan: false,
          ingredients: ["Chicken", "Lettuce", "Tomato", "Cucumber", "Olive oil"],
          allergens: ["Nuts"],
          bestBeforeDate: "2023-12-30",
          ratings: {
            heart: 25,
            thumbsUp: 15,
            thumbsDown: 2
          },
          locationInventory: {
            "1": 15
          }
        },
        quantity: 2
      }
    ],
    totalAmount: 158,
    status: "completed",
    createdAt: "2023-12-15T10:30:00Z"
  },
  {
    id: "order2",
    userId: "user-123",
    locationId: "1",
    items: [
      {
        product: {
          id: "2",
          name: "Vegan Wrap",
          description: "Delicious vegan wrap with fresh vegetables",
          price: 69,
          image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          categories: [{ id: "2", name: "Snacks" }],
          isVegan: true,
          ingredients: ["Tortilla", "Hummus", "Lettuce", "Tomato", "Bell pepper"],
          allergens: ["Gluten"],
          bestBeforeDate: "2023-12-28",
          ratings: {
            heart: 18,
            thumbsUp: 12,
            thumbsDown: 1
          },
          locationInventory: {
            "1": 8
          }
        },
        quantity: 1
      },
      {
        product: {
          id: "3",
          name: "Fresh Orange Juice",
          description: "Freshly squeezed orange juice",
          price: 39,
          image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          categories: [{ id: "3", name: "Drinks" }],
          isVegan: true,
          ingredients: ["Orange"],
          allergens: [],
          bestBeforeDate: "2023-12-20",
          ratings: {
            heart: 30,
            thumbsUp: 10,
            thumbsDown: 0
          },
          locationInventory: {
            "1": 20
          }
        },
        quantity: 1
      }
    ],
    totalAmount: 108,
    status: "completed",
    createdAt: "2023-12-10T14:45:00Z"
  }
];

const Profile = () => {
  const { user, logout, locations } = useAuth();
  const { toast } = useToast();
  const [orders] = useState<Order[]>(mockOrders);
  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    user?.primaryLocationId || ""
  );
  
  const handleLocationChange = (value: string) => {
    setSelectedLocationId(value);
    toast({
      title: "Location updated",
      description: "Your primary location has been updated successfully.",
    });
    // In a real implementation, this would update the user's primary location
  };
  
  const handleLogout = async () => {
    await logout();
    // Redirect handled by AuthProvider
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-SE', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const rateProduct = (productId: string, rating: ProductRating) => {
    toast({
      title: "Thanks for your rating!",
      description: "Your feedback helps us improve our products.",
    });
    // In a real implementation, this would submit the rating to the backend
  };
  
  const getRatingIcon = (rating: ProductRating) => {
    switch (rating) {
      case "heart":
        return <Heart className="h-5 w-5 text-red-500" />;
      case "thumbsUp":
        return <ThumbsUp className="h-5 w-5 text-blue-500" />;
      case "thumbsDown":
        return <ThumbsDown className="h-5 w-5 text-gray-500" />;
    }
  };

  if (!user) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center py-16">
          <UserRound className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">You're not logged in</h1>
          <p className="text-gray-500 mb-6">Please login or register to view your profile.</p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/">Login</Link>
            </Button>
            <Button asChild className="bg-sizzle-600 hover:bg-sizzle-700">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <Link to="/products" className="text-sizzle-600 hover:text-sizzle-700">
          <div className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to products</span>
          </div>
        </Link>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="text-sm"
        >
          Logout
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Account Information</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} readOnly className="bg-gray-50" />
            </div>
            
            <div>
              <Label htmlFor="location">Primary Location</Label>
              <Select value={selectedLocationId} onValueChange={handleLocationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name} ({location.city})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                Your primary location determines which products are available to you.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Order History</h2>
          
          {orders.length === 0 ? (
            <p className="text-gray-500 py-4 text-center">You haven't placed any orders yet.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">Order #</span>
                      <span className="font-medium ml-1">{order.id}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Date:</span>
                      <span className="font-medium ml-1">{formatDate(order.createdAt)}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Total:</span>
                      <span className="font-medium ml-1">{order.totalAmount} kr</span>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="divide-y">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="p-4 flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-20 h-20 rounded-md overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <h3 className="font-medium">{item.product.name}</h3>
                            <div className="text-right sm:ml-4">
                              <span className="font-medium">{item.quantity} × {item.product.price} kr</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-500 mt-1 mb-3">
                            {item.product.description.substring(0, 80)}
                            {item.product.description.length > 80 ? '...' : ''}
                          </p>
                          
                          <div className="mt-auto">
                            <p className="text-sm font-medium mb-2">Rate this product:</p>
                            <div className="flex gap-2">
                              {(['heart', 'thumbsUp', 'thumbsDown'] as ProductRating[]).map((rating) => (
                                <button 
                                  key={rating}
                                  onClick={() => rateProduct(item.product.id, rating)}
                                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                  aria-label={`Rate as ${rating}`}
                                >
                                  {getRatingIcon(rating)}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
