import {AlertTriangle,LogIn} from "lucide-react";

export default function SessionExpiredModal({message,onConfirm}){
  return(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-md">
      <div className="relative w-full max-w-sm animate-[modalIn_.35s_ease-out] overflow-hidden rounded-[28px] border border-white/70 bg-white p-7 text-center shadow-[0_25px_80px_rgba(0,0,0,0.25)] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-400 via-orange-400 to-rose-500"/>
        
        <div className="mx-auto flex h-16 w-16 animate-[iconPulse_2s_ease-in-out_infinite] items-center justify-center rounded-2xl bg-rose-50 ring-8 ring-rose-50/50">
          <AlertTriangle className="h-8 w-8 text-rose-500"/>
        </div>

        <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">Session Expired</h2>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
          {message || "Your session has expired. Please login again to continue."}
        </p>

        <button
          onClick={onConfirm}
          className="group mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#06152A] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0B2442] hover:shadow-xl active:translate-y-0"
        >
          <LogIn className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"/>
          Please Login Again
        </button>

        <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Your security is our priority
        </p>
      </div>

      <style>{`
        @keyframes modalIn{
          from{opacity:0;transform:translateY(20px) scale(.96)}
          to{opacity:1;transform:translateY(0) scale(1)}
        }
        @keyframes iconPulse{
          0%,100%{transform:scale(1)}
          50%{transform:scale(1.06)}
        }
      `}</style>
    </div>
  );
}