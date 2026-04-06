import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginBg from "../../assets/images/Login.jpg";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Replace with actual forgot password API endpoint
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset link");
      }

      setMessage("Password reset link sent to your email! Check your inbox (and spam folder).");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${LoginBg})` }}
      />
      
      {/* Animated Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {/* Glassmorphism Card */}
        <div className="w-full max-w-md p-8 sm:p-10 bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl animate-float shadow-glow">
          <div className="text-center mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 rounded-2xl mx-auto mb-6 shadow-2xl flex items-center justify-center animate-spin-slow">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5 12 14.5 5 7.5m11 0v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-11m11 0h2m-2 0h-2m2 0V7.5" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-indigo-100 to-white/70 bg-clip-text text-transparent mb-3 drop-shadow-lg">
              Forgot Password?
            </h1>
            <p className="text-indigo-100/90 text-lg sm:text-xl font-medium drop-shadow-md">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/50 text-red-100 p-4 rounded-2xl mb-6 backdrop-blur-sm shadow-glow animate-pulse">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-500/20 border border-green-400/50 text-green-100 p-4 rounded-2xl mb-6 backdrop-blur-sm shadow-glow">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-5 py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/30 transition-all duration-500 text-lg shadow-inner group-hover:shadow-glow"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`group w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 overflow-hidden relative ${
                loading
                  ? "bg-slate-600/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-2xl hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-[0.98]"
              } text-white border-0 focus:outline-none focus:ring-4 focus:ring-indigo-500/40 shadow-xl shadow-indigo-500/20`}
            >
              {loading ? (
                <>
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending Reset Link...
                  </span>
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 text-center border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-indigo-300 hover:text-white font-medium transition-all hover:underline inline-flex items-center gap-2 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .shadow-glow {
          box-shadow: 0 25px 50px -12px rgba(159, 168, 218, 0.25);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default ForgotPassword;

