import {createContext,useContext,useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import SessionExpiredModal from "@/components/common/SessionExpiredModal";
const SessionContext=createContext(null);

export function SessionProvider({children}){
  const navigate=useNavigate();
  const [sessionError,setSessionError]=useState(null);

  useEffect(()=>{
    const handleSessionExpired=e=>setSessionError(e.detail?.message||"Your session has expired. Please login again.");
    window.addEventListener("session-expired",handleSessionExpired);
    return()=>window.removeEventListener("session-expired",handleSessionExpired);
  },[]);

  const handleSessionClose=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    sessionStorage.clear();
    setSessionError(null);
    navigate("/login",{replace:true});
  };

  return(
    <SessionContext.Provider value={{sessionError,setSessionError}}>
      {children}
      {sessionError&&<SessionExpiredModal message={sessionError} onConfirm={handleSessionClose}/>}
    </SessionContext.Provider>
  );
}

export const useSession=()=>useContext(SessionContext);