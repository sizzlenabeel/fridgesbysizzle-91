
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real implementation, this would call an API endpoint to send a password reset email
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setSubmitted(true);
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for instructions to reset your password.",
      });
    } catch (error) {
      console.error("Failed to send reset email:", error);
      toast({
        title: "Failed to send reset email",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-md animate-slide-down">
        <div className="flex flex-col items-center mb-8">
          <Logo size="lg" className="mb-2" />
          <p className="text-muted-foreground">Password recovery</p>
        </div>
        
        <AuthCard 
          title={submitted ? "Check your email" : "Forgot your password?"} 
          description={submitted 
            ? "We've sent you an email with instructions to reset your password." 
            : "Enter your email address and we'll send you a link to reset your password."}
        >
          {submitted ? (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              
              <p className="text-muted-foreground">
                If you don't see the email in your inbox, check your spam folder.
              </p>
              
              <div className="space-y-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setSubmitted(false)} 
                  className="w-full h-12"
                >
                  Try another email
                </Button>
                
                <Button asChild className="w-full h-12">
                  <Link to="/">Return to sign in</Link>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  className="h-12" 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-sizzle-600 hover:bg-sizzle-700 text-white" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending email...
                  </>
                ) : "Send reset link"}
              </Button>
              
              <div className="text-center">
                <Link to="/" className="text-sizzle-600 hover:underline inline-flex items-center gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back to sign in
                </Link>
              </div>
            </form>
          )}
        </AuthCard>
      </div>
    </div>
  );
};

export default ForgotPassword;
