import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/Logo";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Eye, EyeOff } from "lucide-react";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [primaryLocationId, setPrimaryLocationId] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const {
    register,
    loading,
    locations
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      email,
      password,
      primaryLocationId,
      marketingConsent
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-md animate-slide-down">
        <div className="flex flex-col items-center mb-8">
          <Logo size="lg" className="mb-2" />
          <p className="text-muted-foreground">Create your sizzle! account</p>
        </div>
        
        <AuthCard title="Create an account" description="Enter your details to create your account">
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
              <p className="text-xs text-muted-foreground">
                Password must be at least 6 characters long
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Primary Location</Label>
              <Select value={primaryLocationId} onValueChange={setPrimaryLocationId} required>
                <SelectTrigger id="location" className="h-12">
                  <SelectValue placeholder="Select your primary location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => <SelectItem key={location.id} value={location.id}>
                      {location.name}, {location.city}
                    </SelectItem>)}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This is where you'll usually buy your products
              </p>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="marketing" checked={marketingConsent} onCheckedChange={checked => setMarketingConsent(checked as boolean)} className="mt-1" />
              <div className="space-y-1">
                <Label htmlFor="marketing" className="font-normal">Update me on new products and promotions</Label>
                <p className="text-xs text-muted-foreground">We respect your privacy. Your information will never be shared with third parties or used for any purpose other than to process your orders. </p>
              </div>
            </div>
            
            <Button type="submit" className="w-full h-12 bg-sizzle-600 hover:bg-sizzle-700 text-white" disabled={loading || !primaryLocationId}>
              {loading ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </> : "Create account"}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/" className="text-sizzle-600 hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </AuthCard>
      </div>
    </div>;
};
export default RegisterPage;