import { useState } from "react";
import { Mail, User, Phone, MapPin, Briefcase } from "lucide-react";
import hero from "@/assets/images/MainImg.png";
import { useNavigate, Link } from "react-router-dom";
import { sendOtp, verifyOtp, registerUser } from "@/services/authService";

export default function Register() {
  const [step, setStep] = useState("form");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* FORM STATE */
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    occupation: "",
    location: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  /* VALIDATION */
  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (!/^[a-zA-Z\s]{3,50}$/.test(form.fullName)) {
      newErrors.fullName = "Only letters, min 3 characters";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter valid 10-digit number";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.location.trim()) {
      newErrors.location = "Location is required";
    } else if (form.location.length < 3) {
      newErrors.location = "Enter valid location";
    }

    if (!form.occupation.trim()) {
      newErrors.occupation = "Occupation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
                Access the pinnacle of human optimization.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-[#F7F7F7] p-10 md:p-14 relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-6 right-6 text-gray-400 hover:text-black"
          >
            ✕
          </button>
          {/* FORM */}
          {step === "form" && (
            <>
              <h2 className="text-3xl font-serif text-[#1E7A3A] mb-2">
                Join the Elite
              </h2>

              <p className="text-sm text-[#7FA497] mb-8">
                Register to join our exclusive waitlist
              </p>

              <div className="space-y-5">
                {/* NAME */}
                <Input
                  label="FULL NAME"
                  icon={<User size={16} />}
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                />
                {errors.fullName && <Error text={errors.fullName} />}

                {/* PHONE */}
                <Input
                  label="PHONE NUMBER"
                  icon={<Phone size={16} />}
                  value={form.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setForm({ ...form, phone: val });
                  }}
                />
                {errors.phone && <Error text={errors.phone} />}

                {/* OCCUPATION */}
                <Input
                  label="CURRENT OCCUPATION"
                  icon={<Briefcase size={16} />}
                  value={form.occupation}
                  onChange={(e) =>
                    setForm({ ...form, occupation: e.target.value })
                  }
                />
                {errors.occupation && <Error text={errors.occupation} />}

                {/* LOCATION */}
                <Input
                  label="LOCATION"
                  icon={<MapPin size={16} />}
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
                {errors.location && <Error text={errors.location} />}

                {/* EMAIL */}
                <Input
                  label="EMAIL ADDRESS"
                  icon={<Mail size={16} />}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  rightButton={
                    <button
                      disabled={verified}
                      onClick={async () => {
                        if (!validate()) return;

                        setLoading(true);

                        const res = await sendOtp(form.email);

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
                      {verified ? "VERIFIED✓" : loading ? "..." : "VERIFY"}
                    </button>
                  }
                />

                {verified && (
                  <p className="text-xs text-green-800 mt-1">
                    ✓ Email verified
                  </p>
                )}
                {errors.email && <Error text={errors.email} />}

                {/* JOIN */}
                <button
                  disabled={!verified || loading}
                  onClick={async () => {
                    if (!validate()) return;
                    if (!verified) {
                      setError("Please verify your email first");
                      return;
                    }

                    setLoading(true);

                    try {
                      const res = await registerUser(form);

                      console.log("REGISTER RESPONSE:", res);

                      if (res?.success) {
                        setStep("success");
                        setError("");
                      } else {
                        setError(res?.message || "Registration failed");
                      }
                    } catch (err) {
                      setError("Something went wrong");
                    }

                    setLoading(false);
                  }}
                  className={`w-full py-4 rounded-full tracking-[4px] text-sm mt-4
                  ${
                    verified
                      ? "bg-[#1E7A3A] text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {loading ? "PROCESSING..." : "JOIN WAITLIST →"}
                </button>
              </div>
            </>
          )}

          {/* OTP */}
          {step === "otp" && (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-2xl font-serif text-[#1E7A3A] mb-6">
                Verify OTP
              </h2>

              <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (!value) return;

                      const newOtp = [...otp];
                      newOtp[index] = value;
                      setOtp(newOtp);

                      // 👉 move forward
                      const next = document.getElementById(`otp-${index + 1}`);
                      if (next) next.focus();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        if (otp[index]) {
                          const newOtp = [...otp];
                          newOtp[index] = "";
                          setOtp(newOtp);
                        } else {
                          const prev = document.getElementById(
                            `otp-${index - 1}`,
                          );
                          if (prev) prev.focus();
                        }
                      }
                    }}
                    className="
        w-10 h-12
        sm:w-12 sm:h-14
        md:w-14 md:h-16
        text-center
        text-base sm:text-lg md:text-xl
        font-semibold
        bg-[#E9EDED]
        rounded-xl
        outline-none
        transition
        focus:ring-2 focus:ring-[#1E7A3A]
      "
                  />
                ))}
              </div>

              <button
                onClick={async () => {
                  const code = otp.join("");

                  const res = await verifyOtp(form.email, code);

                  if (res.success) {
                    setVerified(true);
                    setStep("form");
                  } else {
                    setError(res.message);
                  }
                }}
                className="bg-[#1E7A3A] text-white px-10 py-3 rounded-full"
              >
                VERIFY
              </button>

              {error && <Error text={error} />}
            </div>
          )}

          {/* SUCCESS */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center text-center h-full">
              <div className="w-24 h-24 rounded-full border border-[#E6D3A3] flex items-center justify-center mb-6">
                ✨
              </div>

              <h2 className="text-3xl font-serif text-[#1E7A3A] mb-4">
                Success
              </h2>

              <p className="text-[#7FA497] text-sm max-w-md leading-relaxed mb-8">
                Thank you for joining our exclusive circle. Your journey to peak
                performance begins with this step. Our specialized team will
                review your profile and connect with you shortly to discuss your
                place in the 2026 Sovereign Pilot.
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

/* INPUT */
const Input = ({ label, icon, value, onChange, rightButton }) => (
  <div>
    <p className="text-[10px] tracking-[3px] text-[#9BB5A9] mb-2">{label}</p>

    <div className="flex items-center bg-[#E9EDED] px-4 py-4 rounded-2xl">
      <span className="text-[#C6A75E] mr-3">{icon}</span>
      <input
        value={value}
        onChange={onChange}
        className="bg-transparent outline-none w-full text-sm"
      />
      {rightButton}
    </div>
  </div>
);

/* ERROR */
const Error = ({ text }) => <p className="text-xs text-red-500 mt-1">{text}</p>;
