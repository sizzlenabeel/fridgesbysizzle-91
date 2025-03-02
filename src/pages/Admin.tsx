
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  BarChart3,
  Building2,
  Package,
  Tags,
  Users,
  PanelRight
} from "lucide-react";
import ProductManagement from "@/components/admin/ProductManagement";
import LocationManagement from "@/components/admin/LocationManagement";
import UserManagement from "@/components/admin/UserManagement";
import DiscountRules from "@/components/admin/DiscountRules";
import SalesReports from "@/components/admin/SalesReports";
import { useToast } from "@/components/ui/use-toast";

type AdminTab = "products" | "locations" | "users" | "discounts" | "reports";

const Admin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<AdminTab>("products");

  // Check if user is logged in and is an admin
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/");
      } else if (!user.isAdmin) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin area.",
          variant: "destructive"
        });
        navigate("/products");
      }
    }
  }, [user, loading, navigate, toast]);

  // Show loading state
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If user is not an admin, redirect (this is a fallback)
  if (!user?.isAdmin) {
    return <Navigate to="/products" replace />;
  }

  // Define sidebar items
  const sidebarItems = [
    {
      id: "products" as AdminTab,
      title: "Products",
      icon: Package,
    },
    {
      id: "locations" as AdminTab,
      title: "Locations",
      icon: Building2,
    },
    {
      id: "users" as AdminTab,
      title: "Admins",
      icon: Users,
    },
    {
      id: "discounts" as AdminTab,
      title: "Discount Rules",
      icon: Tags,
    },
    {
      id: "reports" as AdminTab,
      title: "Sales Reports",
      icon: BarChart3,
    },
  ];

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductManagement />;
      case "locations":
        return <LocationManagement />;
      case "users":
        return <UserManagement />;
      case "discounts":
        return <DiscountRules />;
      case "reports":
        return <SalesReports />;
      default:
        return <ProductManagement />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Admin Sidebar */}
        <Sidebar className="border-r">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab(item.id)}
                        className={activeTab === item.id ? "bg-sizzle-50 text-sizzle-600" : ""}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex-1 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {sidebarItems.find(item => item.id === activeTab)?.title}
            </h1>
            <SidebarTrigger>
              <PanelRight className="h-5 w-5" />
            </SidebarTrigger>
          </div>
          
          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
