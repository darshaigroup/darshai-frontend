import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import forgotPasswordService from "@/services/forgotPasswordService";

const RESEND_COOLDOWN = 60;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((value) => (value <= 1 ? 0 : value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    clearMessages();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const data = await forgotPasswordService.sendOtp(normalizedEmail);

      setEmail(normalizedEmail);
      setStep("otp");
      setOtp("");
      setResendCooldown(60);
      setSuccess(data.message || "OTP sent successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to send OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const data = await forgotPasswordService.verifyOtp(email, otp);

      if (!data.resetToken) {
        setError("Reset token was not received. Please try again.");
        return;
      }

      setResetToken(data.resetToken);
      setOtp("");
      setStep("password");
      setSuccess("");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || loading) return;

    clearMessages();

    try {
      setLoading(true);

      const data = await forgotPasswordService.sendOtp(email);

      setOtp("");
      setResendCooldown(60);
      setSuccess(data.message || "A new OTP has been sent.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to resend OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!resetToken) {
      setError("Your reset session has expired. Please start again.");
      setStep("email");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const data = await forgotPasswordService.resetPassword(
        resetToken,
        password,
      );

      setResetToken("");
      setPassword("");
      setConfirmPassword("");
      setSuccess(data.message || "Password reset successfully.");
      setStep("success");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to reset password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = () => {
    clearMessages();
    setOtp("");
    setResendCooldown(0);
    setStep("email");
  };

  return (
    <div className="min-h-screen bg-[#F7F9F5] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Brand */}

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-11 h-11 rounded-2xl bg-[#1E7A3A] flex items-center justify-center shadow-sm">
              <ShieldCheck size={24} className="text-white" />
            </div>

            <span className="text-2xl font-semibold text-[#173C68]">
              DarshAI
            </span>
          </Link>

          <p className="mt-3 text-sm text-gray-500">
            Secure access to your wellness journey
          </p>
        </div>

        {/* Card */}

        <div className="bg-white rounded-[28px] shadow-[0_15px_50px_rgba(23,60,104,0.08)] border border-gray-100 p-7 sm:p-9">
          {/* EMAIL */}

          {step === "email" && (
            <>
              <div className="mb-7">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5EC] flex items-center justify-center mb-5">
                  <Mail size={24} className="text-[#1E7A3A]" />
                </div>

                <h1 className="font-['Playfair_Display'] text-3xl font-semibold text-[#173C68]">
                  Forgot your password?
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Enter the email address associated with your DarshAI account
                  and we'll send you a verification code.
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#173C68] mb-2">
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={loading}
                      className="w-full h-12 rounded-xl border border-gray-200 bg-[#FAFCF9] pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-[#1E7A3A] focus:ring-2 focus:ring-[#1E7A3A]/10 disabled:opacity-60"
                    />
                  </div>
                </div>

                {error && <Message type="error">{error}</Message>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-[#1E7A3A] text-white font-medium text-sm flex items-center justify-center gap-2 transition hover:bg-[#17632F] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    "Sending OTP..."
                  ) : (
                    <>
                      Send verification code
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>

              <BackToLogin />
            </>
          )}

          {/* OTP */}

          {step === "otp" && (
            <>
              <div className="mb-7">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5EC] flex items-center justify-center mb-5">
                  <KeyRound size={24} className="text-[#1E7A3A]" />
                </div>

                <h1 className="font-['Playfair_Display'] text-3xl font-semibold text-[#173C68]">
                  Verify your email
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Enter the 6-digit verification code sent to
                  <span className="font-medium text-[#173C68]">
                    {" " + email}
                  </span>
                  .
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#173C68] mb-2">
                    Verification code
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      setOtp(value);
                    }}
                    placeholder="000000"
                    autoComplete="one-time-code"
                    disabled={loading}
                    className="w-full h-14 rounded-xl border border-gray-200 bg-[#FAFCF9] text-center tracking-[0.5em] text-xl font-semibold text-[#173C68] outline-none transition focus:border-[#1E7A3A] focus:ring-2 focus:ring-[#1E7A3A]/10 disabled:opacity-60"
                  />
                </div>

                {error && <Message type="error">{error}</Message>}

                {success && <Message type="success">{success}</Message>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-[#1E7A3A] text-white font-medium text-sm flex items-center justify-center gap-2 transition hover:bg-[#17632F] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    "Verifying..."
                  ) : (
                    <>
                      Verify code
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Didn't receive the code?
                </p>

                {resendCooldown > 0 ? (
                  <p className="text-sm text-gray-400">
                    Resend available in{" "}
                    <span className="font-semibold text-[#1E7A3A]">
                      {resendCooldown}s
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#1E7A3A] hover:underline disabled:opacity-50"
                  >
                    <RefreshCw size={15} />
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleChangeEmail}
                className="w-full mt-5 text-sm text-gray-500 hover:text-[#173C68] flex items-center justify-center gap-2"
              >
                <ArrowLeft size={15} />
                Change email address
              </button>
            </>
          )}

          {/* PASSWORD */}

          {step === "password" && (
            <>
              <div className="mb-7">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5EC] flex items-center justify-center mb-5">
                  <LockKeyhole size={24} className="text-[#1E7A3A]" />
                </div>

                <h1 className="font-['Playfair_Display'] text-3xl font-semibold text-[#173C68]">
                  Create new password
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Choose a new password to secure your DarshAI account.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-5">
                <PasswordInput
                  label="New password"
                  value={password}
                  onChange={setPassword}
                  visible={showPassword}
                  onToggle={() => setShowPassword((value) => !value)}
                  disabled={loading}
                />

                <PasswordInput
                  label="Confirm new password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  visible={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword((value) => !value)}
                  disabled={loading}
                />

                <p className="text-xs text-gray-400">
                  Password must contain at least 8 characters.
                </p>

                {error && <Message type="error">{error}</Message>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-[#1E7A3A] text-white font-medium text-sm flex items-center justify-center gap-2 transition hover:bg-[#17632F] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    "Updating password..."
                  ) : (
                    <>
                      Reset password
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* SUCCESS */}

          {step === "success" && (
            <div className="text-center py-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#EAF5EC] flex items-center justify-center mb-6">
                <CheckCircle2 size={34} className="text-[#1E7A3A]" />
              </div>

              <h1 className="font-['Playfair_Display'] text-3xl font-semibold text-[#173C68]">
                Password updated
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Your password has been successfully changed. You can now sign in
                to your DarshAI account.
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full h-12 mt-7 rounded-xl bg-[#1E7A3A] text-white font-medium text-sm flex items-center justify-center gap-2 transition hover:bg-[#17632F]"
              >
                Continue to login
                <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Your account security and privacy are important to us.
        </p>
      </div>
    </div>
  );
};

const PasswordInput = ({
  label,
  value,
  onChange,
  visible,
  onToggle,
  disabled,
}) => (
  <div>
    <label className="block text-sm font-medium text-[#173C68] mb-2">
      {label}
    </label>

    <div className="relative">
      <LockKeyhole
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={
          label === "New password" ? "new-password" : "new-password"
        }
        disabled={disabled}
        placeholder="••••••••"
        className="w-full h-12 rounded-xl border border-gray-200 bg-[#FAFCF9] pl-11 pr-12 text-sm text-gray-800 outline-none transition focus:border-[#1E7A3A] focus:ring-2 focus:ring-[#1E7A3A]/10 disabled:opacity-60"
      />

      <button
        type="button"
        onClick={onToggle}
        tabIndex={-1}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#173C68]"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);

const Message = ({ type, children }) => (
  <div
    className={`rounded-xl px-4 py-3 text-sm ${
      type === "error"
        ? "bg-red-50 text-red-600 border border-red-100"
        : "bg-[#EAF5EC] text-[#1E7A3A] border border-[#D5EBD9]"
    }`}
  >
    {children}
  </div>
);

const BackToLogin = () => (
  <Link
    to="/login"
    className="mt-6 text-sm text-gray-500 hover:text-[#173C68] flex items-center justify-center gap-2"
  >
    <ArrowLeft size={15} />
    Back to Login
  </Link>
);

export default ForgotPassword;
