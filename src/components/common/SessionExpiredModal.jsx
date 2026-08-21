import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

export default function SessionExpiredModal(){
  const navigate=useNavigate();
  const [open,setOpen]=useState(false);
  const [message,setMessage]=useState("");

  useEffect(()=>{
    const handleSessionExpired=e=>{
      setMessage(e.detail?.message||"Your session has expired. Please login again.");
      setOpen(true);
    };

    window.addEventListener("session-expired",handleSessionExpired);
    return()=>window.removeEventListener("session-expired",handleSessionExpired);
  },[]);

  const handleOkay=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setOpen(false);
    navigate("/login",{replace:true});
  };

  if(!open) return null;

  return(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
        <h2 className="font-serif text-2xl font-semibold text-gray-800">
          Session Expired
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {message}
        </p>

        <button
          type="button"
          onClick={handleOkay}
          className="mt-7 w-full rounded-full bg-[#1E7A3A] py-3.5 text-sm font-medium tracking-[2px] text-white transition hover:bg-[#14532d]"
        >
          OKAY
        </button>
      </div>
    </div>
  );
}