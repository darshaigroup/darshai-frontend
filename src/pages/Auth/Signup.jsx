import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginBg from "../../assets/images/Login.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const API_URL = import.meta.env.VITE_API_URL;

    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: formData.firstname,
        lastName: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      }),
    });

    const data = await res.json();
    console.log("API RESPONSE:", data);

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    alert("Signup successful!");
    navigate("/patient-dashboard");

  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-indigo-900">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${LoginBg})` }}
      />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-400/25 to-teal-400/25 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-teal-400/25 to-cyan-400/25 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/25 to-purple-400/25 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-40 left-10 w-60 h-60 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg p-8 sm:p-12 bg-white/3 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl shadow-emerald-500/20 animate-float">
          <div className="text-center mb-10">
            
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-emerald-50 to-teal-50 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
              Join Darshai
            </h1>
            <p className="text-teal-100/95 text-xl font-medium drop-shadow-lg max-w-md mx-auto leading-relaxed">
              Create your account and start your digital wellness journey
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/40 text-red-100 p-5 rounded-2xl mb-8 backdrop-blur-sm shadow-lg shadow-red-500/20 animate-pulse">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5 text-red-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/10 hover:bg-white/20 border border-white/25 rounded-2xl backdrop-blur-sm text-white placeholder-teal-200/80 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/30 transition-all duration-500 text-lg shadow-inner hover:shadow-emerald-500/20"
                required
              />
            </div>
             <div>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/10 hover:bg-white/20 border border-white/25 rounded-2xl backdrop-blur-sm text-white placeholder-teal-200/80 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/30 transition-all duration-500 text-lg shadow-inner hover:shadow-emerald-500/20"
                required
              />
            </div>
            
             <div >
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/10 hover:bg-white/20 border border-white/25 rounded-2xl backdrop-blur-sm text-white placeholder-teal-200/80 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/30 transition-all duration-500 text-lg shadow-inner hover:shadow-emerald-500/20"
              />
        
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/10 hover:bg-white/20 border border-white/25 rounded-2xl backdrop-blur-sm text-white placeholder-teal-200/80 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/30 transition-all duration-500 text-lg shadow-inner hover:shadow-emerald-500/20"
                required
              />
            </div>

           

            <div className="group relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password (min 8 chars)"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-4 pr-12 bg-white/10 hover:bg-white/20 border border-white/25 rounded-2xl backdrop-blur-sm text-white placeholder-teal-200/80 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/30 transition-all duration-500 text-lg shadow-inner hover:shadow-emerald-500/20"
                minLength="8"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-teal-200 hover:text-white hover:bg-white/10 rounded-xl transition-all hover:scale-110"
              >
                 {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <div className="group relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-5 py-4 pr-12 bg-white/10 hover:bg-white/20 border border-white/25 rounded-2xl backdrop-blur-sm text-white placeholder-teal-200/80 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/30 transition-all duration-500 text-lg shadow-inner hover:shadow-emerald-500/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-teal-200 hover:text-white hover:bg-white/10 rounded-xl transition-all hover:scale-110"
              >
                 {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full py-5 rounded-3xl font-bold text-xl overflow-hidden transition-all duration-500 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 hover:shadow-2xl hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-teal-500/50 shadow-xl shadow-emerald-500/30 text-white ${
                loading ? 'cursor-not-allowed bg-emerald-600/70' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-7 h-7 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </span>
              ) : (
                <>
                  <span>Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 text-center border-t border-white/10 space-y-4">
            <p className="text-teal-200/90 text-sm">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-white hover:text-emerald-300 transition-all hover:underline inline-flex items-center gap-2 group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Sign In
              </button>
            </p>
            <div className="text-xs text-teal-300/70">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;