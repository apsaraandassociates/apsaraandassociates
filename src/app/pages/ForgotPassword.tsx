import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, CheckCircle, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import caLogo from "../../imports/CA_LOGO.svg";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "success">("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        if (error.message.includes("rate limit")) {
          setError("Too many requests. Please try again in a few minutes.");
        } else if (error.message.includes("not found")) {
          // Don't reveal if email exists for security
          setStep("success");
        } else {
          setError(error.message);
        }
        throw error;
      }

      setStep("success");
      toast.success("Password reset link sent to your email");
    } catch (error: any) {
      console.error("Reset password error:", error);
      // If it's not a critical error, still show success for security
      if (!error.message.includes("rate limit")) {
        setStep("success");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setStep("email");
    setError(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#0A70A1] to-[#085a85] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <img src={caLogo} alt="CA Logo" className="h-16" />
          </div>
          <CardTitle className="text-2xl">
            {step === "email" && "Reset Password"}
            {step === "success" && "Check Your Email"}
          </CardTitle>
          <CardDescription>
            {step === "email" && "Enter your email to receive a password reset link"}
            {step === "success" && "We've sent you a password reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {step === "email" && (
            <form onSubmit={handleSendResetLink} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="your.email@example.com"
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Enter the email associated with your account
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#0A70A1] hover:bg-[#085a85] text-white"
                size="lg"
                disabled={loading}
              >
                {loading ? "Sending Link..." : "Send Reset Link"}
              </Button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm text-[#0A70A1] hover:text-[#085a85] inline-flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}

          {step === "success" && (
            <div className="text-center py-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Email Sent Successfully
              </h3>
              <p className="text-gray-600 mb-2">
                We've sent a password reset link to:
              </p>
              <p className="font-semibold text-[#0A70A1] mb-6">
                {email}
              </p>
              
              <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm mb-6 text-left">
                <p className="font-medium mb-2">Next Steps:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the reset link in the email</li>
                  <li>Set your new password</li>
                  <li>Log in with your new password</li>
                </ol>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleResend}
                  variant="outline"
                  className="w-full"
                >
                  Send Another Link
                </Button>
                <Button 
                  onClick={() => navigate("/login")}
                  className="w-full bg-[#0A70A1] hover:bg-[#085a85]"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}