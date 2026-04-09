import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loadingGif from "../../../assets/images/logoEffect.gif";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/result");
    }, 3000); // simulate backend delay
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#020617] text-white">
      
      {/* LOGO */}
       <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <img src={loadingGif} alt="loading" className="w-20 h-20" />
       </div>

      <h2 className="text-xl font-semibold mb-2">
        Calculating Ayurvedic Score...
      </h2>

      {/* Loader */}
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>

    </div>
  );
}