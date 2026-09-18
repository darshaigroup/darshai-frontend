import {useEffect,useState} from "react";
import {useNavigate,useSearchParams} from "react-router-dom";
import {apiClient} from "../../lib/apiClient";

export default function CreatePassword(){
  const navigate=useNavigate();
  const [searchParams]=useSearchParams();
  const token=searchParams.get("token");

  const [loading,setLoading]=useState(true);
  const [valid,setValid]=useState(false);
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");

  useEffect(()=>{
    const validateToken=async()=>{
      if(!token){
        setError("Invalid password setup link");
        setLoading(false);
        return;
      }
      try{
        await apiClient(`/api/password/setup/validate?token=${encodeURIComponent(token)}`);
        setValid(true);
      }catch(err){
        setError(err.message||"This password setup link is invalid or expired.");
      }finally{
        setLoading(false);
      }
    };
    validateToken();
  },[token]);

  const handleSubmit=async e=>{
    e.preventDefault();
    setError("");

    if(password.length<8){
      setError("Password must be at least 8 characters");
      return;
    }
    if(password!==confirmPassword){
      setError("Passwords do not match");
      return;
    }

    try{
      setLoading(true);
      const result=await apiClient("/api/password/setup",{
        method:"POST",
        body:JSON.stringify({token,password}),
      });
      setSuccess(result.message||"Password created successfully.");
      setTimeout(()=>navigate("/login"),1500);
    }catch(err){
      setError(err.message||"Unable to create password");
    }finally{
      setLoading(false);
    }
  };

  if(loading){
    return(
      <div className="min-h-screen bg-[#f6f3ef] flex items-center justify-center px-5">
        <div className="text-center">
          <div className="mx-auto mb-5 h-10 w-10 rounded-full border-2 border-[#1E7A3A]/20 border-t-[#1E7A3A] animate-spin"/>
          <p className="text-sm tracking-wide text-[#1E7A3A]/70">Checking password setup link...</p>
        </div>
      </div>
    );
  }

  if(!valid){
    return(
      <div className="min-h-screen bg-[#f6f3ef] flex items-center justify-center px-5 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#1E7A3A]/10 blur-3xl"/>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#174EA6]/10 blur-3xl"/>

        <div className="relative w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-xl border border-[#1E7A3A]/10 rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 text-center shadow-[0_30px_100px_rgba(18,60,42,.12)]">
            <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
              <span className="text-2xl text-red-500">!</span>
            </div>

            <p className="text-[9px] sm:text-[10px] tracking-[.3em] uppercase text-[#C9A75B] mb-3">PASSWORD SETUP</p>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#123C2A]">Link Unavailable</h1>
            <p className="mt-4 text-sm sm:text-base text-[#6B706A] leading-6">{error}</p>

            <button
              type="button"
              onClick={()=>navigate("/login")}
              className="group mt-7 w-full relative overflow-hidden rounded-full bg-[#1E7A3A] px-6 py-4 text-white text-[10px] sm:text-[11px] tracking-[.25em] uppercase font-semibold shadow-[0_15px_40px_rgba(30,122,58,.22)] hover:bg-[#174EA6] transition-all duration-500"
            >
              <span className="relative z-10">Go to Login</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700"/>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div className="min-h-screen bg-[#f6f3ef] flex items-center justify-center px-5 sm:px-6 py-10 relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-[#1E7A3A]/10 blur-[120px]"/>
      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-[#174EA6]/10 blur-[130px]"/>

      {/* CARD */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl border border-[#1E7A3A]/10 rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 shadow-[0_30px_100px_rgba(18,60,42,.12)]">

          {/* BRAND MARK */}
          <div className="flex justify-center mb-7">
            <div className="w-14 h-14 rounded-full bg-[#1E7A3A] flex items-center justify-center shadow-[0_12px_35px_rgba(30,122,58,.25)]">
              <span className="text-xl text-[#C9A75B]">✦</span>
            </div>
          </div>

          {/* HEADER */}
          <div className="text-center mb-8">
            <p className="text-[9px] sm:text-[10px] tracking-[.3em] uppercase text-[#C9A75B] mb-3">DARSHAI GEO-WELLNESS</p>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#123C2A]">Create Your Password</h1>
            <p className="mt-3 text-sm text-[#6B706A] leading-6">Create a password to access your Darshai account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-[10px] tracking-[.15em] uppercase font-semibold text-[#123C2A]">Password</label>
              <input
                type="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="new-password"
                required
                className="w-full rounded-2xl border border-[#1E7A3A]/15 bg-[#f6f3ef]/60 px-4 py-3.5 text-sm text-[#123C2A] placeholder:text-[#6B706A]/50 outline-none focus:border-[#1E7A3A] focus:ring-4 focus:ring-[#1E7A3A]/10 transition-all"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="mb-2 block text-[10px] tracking-[.15em] uppercase font-semibold text-[#123C2A]">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e=>setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                autoComplete="new-password"
                required
                className="w-full rounded-2xl border border-[#1E7A3A]/15 bg-[#f6f3ef]/60 px-4 py-3.5 text-sm text-[#123C2A] placeholder:text-[#6B706A]/50 outline-none focus:border-[#1E7A3A] focus:ring-4 focus:ring-[#1E7A3A]/10 transition-all"
              />
            </div>

            {/* ERROR */}
            {error&&(
              <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-semibold">!</span>
                <span>{error}</span>
              </div>
            )}

            {/* SUCCESS */}
            {success&&(
              <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-[#1E7A3A]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-semibold">✓</span>
                <span>{success}</span>
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-full bg-[#1E7A3A] px-6 py-4 text-[10px] sm:text-[11px] tracking-[.25em] uppercase font-semibold text-white shadow-[0_15px_40px_rgba(30,122,58,.22)] hover:bg-[#174EA6] hover:shadow-[0_18px_45px_rgba(23,78,166,.2)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700"/>
              <span className="relative z-10">{loading?"Creating Password...":"Create Password"}</span>
            </button>
          </form>

          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C9A75B]/30"/>
            <span className="text-[8px] tracking-[.2em] uppercase text-[#6B706A]/60">Secure Account Setup</span>
            <span className="h-px w-8 bg-[#C9A75B]/30"/>
          </div>
        </div>
      </div>
    </div>
  );
}