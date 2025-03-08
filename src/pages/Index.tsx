import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/Logo";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const IndexPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [guestLocationId, setGuestLocationId] = useState("");
  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const {
    login,
    loading,
    continueAsGuest,
    locations
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({
        email,
        password
      });
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error
    }
  };

  const handleGuestContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestLocationId) {
      // Show error or focus location select
      return;
    }
    try {
      await continueAsGuest(guestLocationId);
    } catch (error) {
      console.error("Guest continue failed:", error);
      // Handle error
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-md animate-slide-down">
        <div className="flex flex-col items-center mb-8">
          <Logo size="lg" className="mb-2" />
          <p className="text-muted-foreground">Welcome to sizzle!</p>
        </div>
        
        <AuthCard title="Welcome back" description="Enter your credentials to sign in">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required className="h-12" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="h-12 pr-10" />
                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                </Button>
              </div>
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-sizzle-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <Button type="submit" className="w-full h-12 bg-sizzle-600 hover:bg-sizzle-700 text-white" disabled={loading}>
              {loading ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </> : "Sign in"}
            </Button>
            
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">or</span>
              </div>
            </div>
            
            {!showGuestOptions ? <Button type="button" variant="outline" onClick={() => setShowGuestOptions(true)} className="w-full font-normal bg-yellow-400 hover:bg-yellow-300">
                Continue as Guest
              </Button> : <div className="space-y-3 border p-3 rounded-lg">
                <p className="text-sm font-medium">Select your location to continue as guest:</p>
                <Select value={guestLocationId} onValueChange={setGuestLocationId}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => <SelectItem key={location.id} value={location.id}>
                        {location.name}, {location.city}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowGuestOptions(false)}>
                    Cancel
                  </Button>
                  <Button type="button" className="flex-1 bg-sizzle-600 hover:bg-sizzle-700 text-white" disabled={!guestLocationId} onClick={handleGuestContinue}>
                    Continue
                  </Button>
                </div>
              </div>}
            
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-sizzle-600 hover:underline font-medium">
                Create an account
              </Link>
            </div>
          </form>
        </AuthCard>
      </div>
    </div>;
};

export default IndexPage;
