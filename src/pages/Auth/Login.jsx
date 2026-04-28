import { useState } from "react";
 import {Link} from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import hero from "@/assets/images/DoctorHomepage.jpg";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4efe6] flex items-center justify-center px-6">
      {/* MAIN CARD */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-[40px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.15)]">
        {/* 🔥 LEFT PANEL */}
        <div className="relative hidden md:block">
          <img
            src={hero}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* GREEN OVERLAY */}
          <div className="absolute inset-0 bg-[#1E7A3A]/85" />

          <div className="relative z-10 p-12 h-full flex flex-col justify-between text-white">
            <div>
              <p className="text-xs tracking-[4px] text-[#C6A75E] mb-4">
                DARSHAI LONGEVITY
              </p>

              <h2 className="text-4xl font-serif leading-tight">
                Reclaim Your <br />
                <span className="italic text-[#C6A75E]">
                  Biological Sovereignty.
                </span>
              </h2>

              <p className="mt-6 text-sm text-white/80 max-w-sm">
                Access the pinnacle of human optimization. Our waitlist is open
                for the 2026 Sovereign Pilot.
              </p>
            </div>
          </div>
        </div>

        {/* 🔥 RIGHT PANEL */}
        <div className="bg-white p-10 md:p-14 relative">
          {/* CLOSE BUTTON */}
          <button
            onClick={() => window.history.back()}
            className="absolute top-6 right-6 text-gray-400 hover:text-black"
          >
            ✕
          </button>

          <h2 className="text-2xl font-serif text-[#1E7A3A] mb-2">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-400 mb-8">
            Sign in to access your dashboard
          </p>

          {/* FORM */}
          <div className="space-y-6">
            {/* EMAIL */}
            <div>
              <label className="text-xs tracking-[3px] text-[#C6A75E] block mb-2">
                EMAIL ADDRESS
              </label>

              <div className="flex items-center bg-[#f3f3f3] px-4 py-3 rounded-full">
                <Mail size={16} className="text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="wellness@darshai.com"
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
            </div>
            {/* PASSWORD */}
            <div>
              <label className="text-xs tracking-[3px] text-[#C6A75E] block mb-2">
                SECURE PASSWORD
              </label>

              <div className="flex items-center bg-[#f3f3f3] px-4 py-3 rounded-full">
                {/* LOCK ICON */}
                <Lock size={16} className="text-gray-400 mr-2" />

                {/* INPUT */}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-transparent outline-none w-full text-sm"
                />

                {/* TOGGLE ICON */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-400 hover:text-[#1E7A3A] transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {/* BUTTON */}
            <button className="w-full bg-[#1E7A3A] text-white py-4 rounded-full tracking-[3px] text-sm hover:bg-[#14532d] transition shadow-md">
              Sign In →
            </button>
            {/* FOOTER */}
           
            <p className="text-xs text-center text-gray-400 mt-6">
              No account?{" "}
              <Link to="/register" className="text-[#1E7A3A] hover:underline">
                Register for waitlist
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
