import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, CheckCircle, ArrowLeft, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import caLogo from "../../imports/CA_LOGO.svg";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "verify" | "reset" | "success">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // OTP will be sent via Supabase Edge Function
    setTimeout(() => {
      setLoading(false);
      setStep("verify");
    }, 1500);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // OTP verification via Supabase
    setTimeout(() => {
      setLoading(false);
      if (otp.length === 6) {
        setStep("reset");
      }
    }, 1000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    // Password reset via Supabase
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1000);
  };

  const handleResendOTP = () => {
    // Resend OTP via Supabase
    alert("OTP resent to your email");
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
            {step === "verify" && "Verify Email"}
            {step === "reset" && "Create New Password"}
            {step === "success" && "Password Reset Successful"}
          </CardTitle>
          <CardDescription>
            {step === "email" && "Enter your email to receive an OTP"}
            {step === "verify" && `Enter the OTP sent to ${email}`}
            {step === "reset" && "Set a new password for your account"}
            {step === "success" && "Your password has been reset successfully"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {step === "email" && (
            <form onSubmit={handleSendOTP} className="space-y-5">
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
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#0A70A1] hover:bg-[#085a85] text-white"
                size="lg"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
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

          {step === "verify" && (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="text-center text-2xl tracking-widest"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#0A70A1] hover:bg-[#085a85]"
                size="lg"
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResendOTP}
              >
                Resend OTP
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-sm text-[#0A70A1] hover:text-[#085a85] inline-flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Change Email
                </button>
              </div>
            </form>
          )}

          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <Label htmlFor="password">New Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 8 characters
                </p>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#0A70A1] hover:bg-[#085a85]"
                size="lg"
                disabled={loading}
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </Button>
            </form>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Password Reset Complete!
              </h3>
              <p className="text-gray-600 mb-6">
                You can now login with your new password
              </p>
              <Button 
                onClick={() => navigate("/login")}
                className="bg-[#0A70A1] hover:bg-[#085a85]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}