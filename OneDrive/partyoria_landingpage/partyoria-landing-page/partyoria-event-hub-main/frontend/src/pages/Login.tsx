import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import partyBackground from "@/assets/party-background.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username or email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate role detection (in real app, this would come from API)
      const userRole = formData.username.includes('vendor') ? 'vendor' : 
                      formData.username.includes('organizer') ? 'organizer' : 'customer';
      
      // Login user
      login({
        name: formData.username,
        email: formData.username,
        role: userRole
      });
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in to your Partyoria account.",
      });
      
      // Check if user was in booking flow
      const selectedVenue = sessionStorage.getItem('selectedVenue');
      const preferences = sessionStorage.getItem('bookingPreferences');
      
      if (selectedVenue) {
        sessionStorage.removeItem('selectedVenue');
        navigate('/booking-details', { state: { venue: JSON.parse(selectedVenue) } });
        return;
      } else if (preferences) {
        sessionStorage.removeItem('bookingPreferences');
        navigate('/booking-details', { state: { preferences: JSON.parse(preferences) } });
        return;
      }
      
      navigate(`/dashboard/${userRole}`);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${partyBackground})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/30" />
      
      <Card className="w-full max-w-md glass animate-fade-in relative z-10">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to your Partyoria account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username or Email</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username or email"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="glass-input"
              />
              {errors.username && <p className="text-destructive text-sm">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="glass-input"
              />
              {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
              Sign In
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Create your account
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;