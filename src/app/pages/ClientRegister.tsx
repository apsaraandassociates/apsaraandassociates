import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { UserPlus, Mail, Phone, Lock, Check, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import caLogo from "../../imports/CA_LOGO.svg";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

export function ClientRegister() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("invite");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inviteData, setInviteData] = useState<{ client_name: string } | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (inviteToken) {
      verifyInviteToken();
    }
  }, [inviteToken]);

  const verifyInviteToken = async () => {
    try {
      const { data, error } = await supabase
        .from("client_registration_links")
        .select("*")
        .eq("registration_token", inviteToken)
        .eq("is_used", false)
        .single();

      if (error || !data) {
        toast.error("Invalid or expired invitation link");
        return;
      }

      // Pre-fill name if available
      if (data.client_name) {
        setInviteData(data);
        setFormData(prev => ({ ...prev, fullName: data.client_name }));
      }
    } catch (error) {
      console.error("Error verifying invite:", error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    
    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Update profile
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            full_name: formData.fullName,
            phone: formData.phone,
          })
          .eq("id", authData.user.id);

        if (profileError) console.error("Profile update error:", profileError);

        // Mark invite as used
        if (inviteToken) {
          await supabase
            .from("client_registration_links")
            .update({
              is_used: true,
              used_at: new Date().toISOString(),
              used_by: authData.user.id,
            })
            .eq("registration_token", inviteToken);
        }

        setSuccess(true);
        toast.success("Account created successfully!");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  if (!inviteToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-red-600">Invalid Invitation</CardTitle>
            <CardDescription>
              This registration link is invalid or has expired. Please contact your CA for a new invitation link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/")} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Registration Successful!</CardTitle>
            <CardDescription className="space-y-2 text-left mt-4">
              <p className="font-medium text-center">📧 Please verify your email to continue</p>
              <p className="text-sm">We've sent a verification link to <strong>{formData.email}</strong></p>
              <p className="text-sm">Click the link in the email to verify your account before logging in.</p>
              <p className="text-xs text-gray-500 mt-3">
                💡 Tip: Check your spam folder if you don't see the email within a few minutes.
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/login")} className="w-full bg-[#0A70A1] hover:bg-[#085a85]">
              Continue to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <img src={caLogo} alt="CA Logo" className="h-16" />
          </div>
          <CardTitle className="text-2xl">Complete Your Registration</CardTitle>
          <CardDescription>
            {inviteData?.client_name 
              ? `Welcome ${inviteData.client_name}! Fill in your details below.`
              : "Enter your details to create your account"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter password"
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm password"
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#0A70A1] hover:bg-[#085a85]"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#0A70A1] hover:underline font-medium"
              >
                Login here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}