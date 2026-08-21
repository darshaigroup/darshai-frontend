import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import hero from "@/assets/images/MainImg.png";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) return;

    switch (role) {
      case "doctor":
        navigate("/dashboard", { replace: true });
        break;

      case "sales":
        navigate("/sales-dashboard", { replace: true });
        break;

      case "client":
      case "patient":
        navigate("/patient-dashboard", { replace: true });
        break;

      case "hr":
        navigate("/hr-dashboard", { replace: true });
        break;

      default:
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate("/login", { replace: true });
    }
  }, [navigate]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      if (!form.email || !form.password) {
        setError("Email and password required");
        return;
      }

      setLoading(true);
      setError("");

      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Login failed");
      }

      const user = data.user;
      const token = data.token;

      if (!token || !user?.role) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      switch (user.role) {
        case "doctor":
          navigate("/dashboard", { replace: true });
          break;

        case "sales":
          navigate("/sales-dashboard", { replace: true });
          break;

        case "client":
        case "patient":
          navigate("/patient-dashboard", { replace: true });
          break;

        case "hr":
          navigate("/hr-dashboard", { replace: true });
          break;

        default:
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          setError("Invalid user role");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4efe6] px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[40px] shadow-[0_40px_120px_rgba(0,0,0,0.15)] md:grid-cols-2">
        <div className="relative hidden md:block">
          <img
            src={hero}
            alt="DarshAI"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#1E7A3A]/85" />

          <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
            <div>
              <p className="mb-4 text-xs tracking-[4px] text-[#C6A75E]">
                DARSHAI LONGEVITY
              </p>

              <h2 className="font-serif text-4xl leading-tight">
                Reclaim Your <br />
                <span className="italic text-[#C6A75E]">
                  Biological Sovereignty.
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-sm text-white/80">
                Access the pinnacle of human optimization. Our waitlist is open
                for the 2026 Sovereign Pilot.
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-white p-10 md:p-14">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute right-6 top-6 text-gray-400 hover:text-black"
          >
            ✕
          </button>

          <h2 className="mb-2 font-serif text-2xl text-[#1E7A3A]">
            Welcome Back
          </h2>

          <p className="mb-6 text-sm text-gray-400">
            Sign in to access your dashboard
          </p>

          {error && (
            <p className="mb-4 text-sm text-red-500">
              {error}
            </p>
          )}

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div>
              <label className="mb-2 block text-xs tracking-[3px] text-[#C6A75E]">
                EMAIL ADDRESS
              </label>

              <div className="flex items-center rounded-full bg-[#f3f3f3] px-4 py-3">
                <Mail size={16} className="mr-2 text-gray-400" />

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="wellness@darshai.com"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs tracking-[3px] text-[#C6A75E]">
                PASSWORD
              </label>

              <div className="flex items-center rounded-full bg-[#f3f3f3] px-4 py-3">
                <Lock size={16} className="mr-2 text-gray-400" />

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="ml-2 text-gray-400 hover:text-[#1E7A3A]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#1E7A3A] py-4 text-sm tracking-[3px] text-white shadow-md transition hover:bg-[#14532d] disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

            <p className="mt-6 text-center text-xs text-gray-400">
              Not registered?{" "}
              <Link
                to="/register"
                className="text-[#1E7A3A] hover:underline"
              >
                Register for waitlist
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}