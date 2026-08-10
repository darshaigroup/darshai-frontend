import {AlertTriangle} from "lucide-react";

export default function SessionExpiredModal({message,onConfirm}){
  return(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50">
          <AlertTriangle className="h-7 w-7 text-rose-500"/>
        </div>
        <h2 className="mt-5 text-xl font-bold text-slate-900">Session Expired</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{message}</p>
        <button onClick={onConfirm} className="mt-6 w-full rounded-2xl bg-[#06152A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B2442]">Okay</button>
      </div>
    </div>
  );
}