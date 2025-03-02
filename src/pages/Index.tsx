
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/Logo";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPWAPrompt, setShowPWAPrompt] = useState(false);
  const { login, loading } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // PWA installation prompt
  useEffect(() => {
    // Show PWA prompt after a delay
    const timer = setTimeout(() => {
      // Check if app is already installed
      // This is a simplified check - in reality you would use more robust detection
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (!isStandalone) {
        setShowPWAPrompt(true);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleInstallClick = () => {
    // In a real app, this would trigger the PWA installation
    // For now we just hide the prompt
    setShowPWAPrompt(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-md animate-slide-down">
        <div className="flex flex-col items-center mb-8">
          <Logo size="lg" className="mb-2" />
          <p className="text-muted-foreground">Welcome to the self-service fridge app</p>
        </div>
        
        <AuthCard 
          title="Sign in to your account" 
          description="Enter your email and password to access your account"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/reset-password" className="text-sm text-sizzle-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 
                    <EyeOff className="h-5 w-5 text-muted-foreground" /> : 
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  }
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-sizzle-600 hover:bg-sizzle-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-sizzle-600 hover:underline font-medium">
                Create one
              </Link>
            </div>
          </form>
        </AuthCard>
      </div>
      
      {/* PWA Installation Prompt */}
      {showPWAPrompt && (
        <div className="pwa-install-prompt animate-slide-up">
          <div className="flex justify-between items-center">
            <div className="font-medium">Install sizzle! app</div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => setShowPWAPrompt(false)}
            >
              ✕
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Install our app for a better experience and offline access
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowPWAPrompt(false)}
            >
              Later
            </Button>
            <Button 
              className="flex-1 bg-sizzle-600 hover:bg-sizzle-700 text-white"
              onClick={handleInstallClick}
            >
              Install
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
