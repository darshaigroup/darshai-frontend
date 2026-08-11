import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Settings, X, LogOut } from "lucide-react";
import logo from "@/assets/images/logo.png";

const TopNavbar = ({ openModal }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
const [search,setSearch]=useState("");
const [results,setResults]=useState([]);
const [showResults,setShowResults]=useState(false);

const searchData=[
  {name:"Renjith Raj",type:"Patient",url:"/dashboard/patients/1"},
  {name:"Renu Thomas",type:"Patient",url:"/dashboard/patients/2"},
  {name:"Patient Reports",type:"Report",url:"/dashboard/reports"},
  {name:"Questionnaires",type:"Questionnaire",url:"/dashboard/questionnaires"},
  {name:"Analytics",type:"Analytics",url:"/dashboard/analysis"},
  {name:"Geo Wellness",type:"Geo",url:"/dashboard/geowellness"}
];
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  
  const handleSearch=(value)=>{
  setSearch(value);

  if(!value.trim()){
    setResults([]);
    return;
  }

  const filtered=searchData.filter(item=>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  setResults(filtered);
};

useEffect(()=>{
  const close=()=>setShowResults(false);

  window.addEventListener("click",close);

  return ()=>window.removeEventListener("click",close);
},[]);
  return (
    <>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center justify-center"
        >
          <img src={logo} alt="Darshai" className="w-40 h-15 object-contain" />
        </button>

        {/* Search */}
       <div
  className="relative"
  onClick={(e)=>e.stopPropagation()}
>
  <div className="flex items-center bg-white px-6 py-3 rounded-full w-[820px] shadow-sm">
    <Search size={18} className="text-gray-400"/>

    <input
      value={search}
      onChange={(e)=>handleSearch(e.target.value)}
      onFocus={()=>setShowResults(true)}
      placeholder="Search "
      className="ml-3 w-full bg-transparent outline-none text-sm"
    />
  </div>

  {showResults&&(
    <div className="absolute top-[58px] left-0 w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden z-50">

      {results.length>0 ? (
        results.map((item,index)=>(
          <button
            key={index}
            onClick={()=>{
              navigate(item.url);
              setShowResults(false);
              setSearch("");
            }}
            className="w-full px-5 py-3 flex justify-between items-center hover:bg-[#F6F9F8] transition"
          >
            <span className="text-sm font-medium text-[#1E293B]">
              {item.name}
            </span>

            <span className="text-xs text-gray-400">
              {item.type}
            </span>
          </button>
        ))
      ) : search ? (
        <div className="py-6 text-center text-gray-400 text-sm">
          No results found
        </div>
      ) : (
        <div className="py-6 text-center text-gray-400 text-sm">
          Start typing...
        </div>
      )}

    </div>
  )}
</div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* <button
            onClick={openModal}
            className="px-6 py-3 rounded-full bg-[#4f9401] text-white shadow-md hover:bg-[#7CB342] transition"
          >
            + Add Patient
          </button> */}

          <Settings size={18} className="text-gray-500 cursor-pointer" />
          <button
            onClick={handleLogout}
            className="
      flex items-center gap-2
      px-5 py-2.5
      rounded-full
      bg-red-50
      border border-red-200
      text-red-600
      hover:bg-red-100
      transition-all
      duration-200
      shadow-sm
    "
          >
            <LogOut size={16} />
            <span className="text-sm font-medium">Logout</span>
          </button>
          <img
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150"
            alt="Profile"
            onClick={() => setShowProfile(true)}
            className="w-11 h-11 rounded-full object-cover cursor-pointer ring-2 ring-[#4FDAB9]"
          />
        </div>
      </div>

      {/* Profile Card */}
      {showProfile && (
        <div className="fixed inset-0 z-[999] bg-black/20 flex items-center justify-center">
          <div className="relative w-[420px] bg-white rounded-[36px] overflow-hidden shadow-2xl">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-5 right-5 z-20 text-[#1E293B]"
            >
              <X size={18} />
            </button>

            <div className="h-[140px] bg-gradient-to-r from-[#1E2F4F] to-[#5D9D93]" />

            <div className="px-8 -mt-12">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150"
                alt=""
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>

            <div className="px-8 pt-4 pb-8">
              <h2 className="text-[34px] font-bold text-[#1E293B] leading-tight">
                Dr. Renjith N Raj
              </h2>

              <p className="mt-2 text-lg text-[#5D9D93]">
                Senior Practitioner & Wellness Expert
              </p>

              <button
                onClick={handleLogout}
                className="mt-8 w-full py-4 rounded-full bg-gradient-to-r from-[#1E2F4F] to-[#5D9D93] text-white font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavbar;
