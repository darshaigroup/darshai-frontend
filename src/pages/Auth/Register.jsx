import { useState } from "react";
import {
  Mail,
  User,
  Phone,
  MapPin,
  Briefcase,
  X,
} from "lucide-react";
import hero from "@/assets/images/DoctorHomepage.jpg";
import { Link } from "react-router-dom";
import { sendOtp, verifyOtp } from "@/services/authService";

export default function Register() {
  const [step, setStep] = useState("form"); // form | otp | success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center px-6">

      <div className="w-full max-w-6xl grid md:grid-cols-2 rounded-[40px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.15)]">

        {/* LEFT PANEL */}
        <div className="relative hidden md:block">
          <img
            src={hero}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1E7A3A]/90" />

          <div className="relative z-10 p-14 text-white h-full flex flex-col justify-between">
            <div>
              <p className="text-[10px] tracking-[4px] text-[#C6A75E] mb-6">
                DARSHAI LONGEVITY
              </p>

              <h2 className="text-[44px] leading-[1.1] font-serif">
                Reclaim Your <br />
                <span className="italic text-[#C6A75E]">
                  Biological Sovereignty.
                </span>
              </h2>

              <p className="mt-6 text-sm text-white/80 max-w-sm leading-relaxed">
                Access the pinnacle of human optimization. Our waitlist is currently open for the 2026 Sovereign Pilot.
              </p>
            </div>

            <p className="text-[10px] tracking-[2px] text-white/70">
              JOINED BY 1.2K+ PEAK PERFORMERS
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-[#F7F7F7] p-10 md:p-14 relative rounded-r-[40px]">

          <X className="absolute top-6 right-6 text-[#A8C2B3] cursor-pointer" />

          {/* ================= FORM ================= */}
          {step === "form" && (
            <>
              <h2 className="text-3xl font-serif text-[#1E7A3A] mb-2">
                Join the Elite
              </h2>

              <p className="text-sm text-[#7FA497] mb-8">
                Register to join our exclusive waitlist
              </p>

              <div className="space-y-5">

                <Input label="FULL NAME" icon={<User size={16} />} placeholder="Full Name" />

                <Input label="PHONE NUMBER" icon={<Phone size={16} />} placeholder="999-999-9999" />

                <Input label="CURRENT OCCUPATION" icon={<Briefcase size={16} />} placeholder="For eg: Entrepreneur" />

                <Input label="LOCATION" icon={<MapPin size={16} />} placeholder="City, State" />

                {/* EMAIL WITH VERIFY */}
                <Input
                  label="EMAIL ADDRESS"
                  icon={<Mail size={16} />}
                  placeholder="wellness@darshai.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  rightButton={
                    <button
                      onClick={async () => {
                        if (!email) return setError("Enter email");

                        setLoading(true);
                        const res = await sendOtp(email);

                        if (res.success) {
                          setStep("otp");
                          setError("");
                        } else {
                          setError(res.message);
                        }

                        setLoading(false);
                      }}
                      className="text-[10px] px-3 py-1 rounded-full bg-[#1E7A3A] text-white ml-2"
                    >
                      {loading ? "..." : "VERIFY"}
                    </button>
                  }
                />

                {verified && (
                  <p className="text-xs text-green-600">✔ Email Verified</p>
                )}

                {error && (
                  <p className="text-xs text-red-500">{error}</p>
                )}

                {/* JOIN BUTTON */}
                <button
                  disabled={!verified}
                  onClick={() => setStep("success")}
                  className={`w-full py-4 rounded-full tracking-[4px] text-sm mt-4 transition
                    ${
                      verified
                        ? "bg-[#1E7A3A] text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                  `}
                >
                  JOIN WAITLIST →
                </button>

                <Link to="/login">
                  <p className="text-center text-sm text-[#9BB5A9] mt-4">
                    Already a member?{" "}
                    <span className="text-[#1E7A3A]">Sign in</span>
                  </p>
                </Link>

              </div>
            </>
          )}

          {/* ================= OTP SCREEN ================= */}
          {step === "otp" && (
            <div className="flex flex-col items-center justify-center text-center h-full">

              <h2 className="text-2xl font-serif text-[#1E7A3A] mb-2">
                Verify Your Email
              </h2>

              <p className="text-sm text-[#7FA497] mb-8">
                Enter the 6-digit code sent to your email
              </p>

              <div className="flex gap-3 mb-8">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-12 h-14 text-center text-lg rounded-xl bg-[#E9EDED] outline-none"
                  />
                ))}
              </div>

              <button
                onClick={async () => {
                  const code = otp.join("");

                  const res = await verifyOtp(email, code);

                  if (res.success) {
                    setVerified(true);
                    setStep("form");
                    setError("");
                  } else {
                    setError(res.message);
                  }
                }}
                className="bg-[#1E7A3A] text-white px-10 py-3 rounded-full tracking-[3px]"
              >
                VERIFY
              </button>

              {error && (
                <p className="text-red-500 mt-4 text-sm">{error}</p>
              )}

              <button
                onClick={() => setStep("form")}
                className="text-sm mt-6 text-[#1E7A3A]"
              >
                ← Back
              </button>
            </div>
          )}

          {/* ================= SUCCESS ================= */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center text-center h-full">

              <div className="w-24 h-24 rounded-full border border-[#E6D3A3] flex items-center justify-center mb-6">
                ✨
              </div>

              <h2 className="text-3xl font-serif text-[#1E7A3A] mb-4">
                Success
              </h2>

              <p className="text-[#7FA497] text-sm max-w-md leading-relaxed mb-8">
                Thank you for joining our exclusive circle. Your journey to peak performance begins with this step. Our specialized team will review your profile and connect with you shortly to discuss your place in the 2026 Sovereign Pilot.
              </p>

              <button
                onClick={() => (window.location.href = "/")}
                className="bg-[#1E7A3A] text-white px-10 py-4 rounded-full tracking-[3px] text-sm"
              >
                RETURN TO HOMEPAGE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


/* 🔥 INPUT COMPONENT */
const Input = ({ label, icon, placeholder, value, onChange, rightButton }) => (
  <div>
    <p className="text-[10px] tracking-[3px] text-[#9BB5A9] mb-2">
      {label}
    </p>

    <div className="flex items-center bg-[#E9EDED] px-4 py-4 rounded-2xl">
      <span className="text-[#C6A75E] mr-3">{icon}</span>

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-transparent outline-none w-full text-sm text-[#5F756B]"
      />

      {rightButton}
    </div>
  </div>
);