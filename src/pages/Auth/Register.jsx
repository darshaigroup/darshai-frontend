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

export default function Register() {
  const [submitted, setSubmitted] = useState(false);

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

           
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-[#F7F7F7] p-10 md:p-14 relative rounded-r-[40px]">

          {/* CLOSE ICON */}
          <X className="absolute top-6 right-6 text-[#A8C2B3] cursor-pointer" />

          {!submitted ? (
            <>
              {/* TITLE */}
              <h2 className="text-3xl font-serif text-[#1E7A3A] mb-2">
                Join the Elite
              </h2>

              <p className="text-sm text-[#7FA497] mb-8">
                Register to join our exclusive waitlist
              </p>

              {/* FORM */}
              <div className="space-y-5">

                <Input label="FULL NAME" icon={<User size={16} />} placeholder=" Full Name" />

                <Input label="PHONE NUMBER" icon={<Phone size={16} />} placeholder="999-999-9999" />

                <Input label="CURRENT OCCUPATION" icon={<Briefcase size={16} />} placeholder="For Eg: Entrepreneur" />

                <Input label="LOCATION" icon={<MapPin size={16} />} placeholder="City, State" />

                <Input label="EMAIL ADDRESS" icon={<Mail size={16} />} placeholder="wellness@darshai.com" />

                {/* BUTTON */}
                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full bg-[#1E7A3A] text-white py-4 rounded-full tracking-[4px] text-sm mt-4 hover:opacity-90 transition"
                >
                  JOIN WAITLIST →
                </button>


                 <Link to="/login">
                <p className="text-center text-sm text-[#9BB5A9] mt-4">
                  Already a member?{" "}
                  <span className="text-[#1E7A3A] cursor-pointer">
                    Sign in
                  </span>
                </p>
                </Link>

              </div>
            </>
          ) : (
            /* ✅ SUCCESS STATE */
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
                RETURN TO SANCTUARY
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


/* 🔥 INPUT COMPONENT (MATCHES UI EXACTLY) */
const Input = ({ label, icon, placeholder }) => (
  <div>
    <p className="text-[10px] tracking-[3px] text-[#9BB5A9] mb-2">
      {label}
    </p>

    <div className="flex items-center bg-[#E9EDED] px-4 py-4 rounded-2xl">
      <span className="text-[#C6A75E] mr-3">{icon}</span>
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent outline-none w-full text-sm text-[#5F756B]"
      />
    </div>
  </div>
);