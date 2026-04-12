import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const OwnerSignup = () => {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();
  const [name, setName] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      await signup(email, password, name, "owner", { propertyName });
      toast.success("Account created successfully!");
      navigate("/owner/dashboard");
    } catch (error: any) {
      const code = error?.code;
      if (code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Try logging in instead.");
      } else if (code === "auth/weak-password") {
        toast.error("Password is too weak. Use at least 6 characters.");
      } else if (code === "auth/invalid-email") {
        toast.error("Please enter a valid email address.");
      } else {
        toast.error("Signup failed. Please try again.");
      }
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle("owner");
      toast.success("Account created successfully!");
      navigate("/owner/dashboard");
    } catch (error: any) {
      if (error?.code !== "auth/popup-closed-by-user") {
        toast.error("Google sign-up failed. Please try again.");
      }
      console.error("Google signup error:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-background p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="absolute top-4 left-4">
          <Button variant="ghost" size="sm">
            <svg className="h-4 w-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
          </Button>
        </Link>
        
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">EduStay</span>
        </Link>

        <Card className="shadow-hover">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Owner Signup</CardTitle>
            <CardDescription>
              Create your account to list your properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Owner Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyName">Property Name</Label>
                <Input
                  id="propertyName"
                  type="text"
                  placeholder="ABC Residency"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••  (min. 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Google Sign Up */}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignup}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              )}
              Sign up with Google
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link to="/owner/login" className="text-primary hover:underline font-medium">
                Login here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OwnerSignup;
