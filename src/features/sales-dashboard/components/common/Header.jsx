import { useState,useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
Menu,
Search,
Bell,
CalendarDays,
ChevronDown,
LogOut,
UserCircle2
} from "lucide-react";

export default function Header({openSidebar, }){
  const navigate=useNavigate();
  const [showMenu,setShowMenu]=useState(false);

  const today=useMemo(()=>{
    return new Date().toLocaleDateString("en-IN",{
      weekday:"long",
      day:"numeric",
      month:"long",
      year:"numeric"
    });
  },[]);

  const user=JSON.parse(localStorage.getItem("user")||"{}");

  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login",{replace:true});
  };

  return(
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#F4EFE6]/80 border-b border-slate-200">

      <div className="px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-5">

        <div className="flex items-center gap-4">

          <button
            onClick={openSidebar}
            className="lg:hidden w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center"
          >
            <Menu size={22}/>
          </button>

          <div>

            <h1 className="text-2xl lg:text-3xl font-serif text-[#173C68]">
              Welcome{user?.name?`, ${user.name}`:""}
            </h1>

            <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
              <CalendarDays size={15}/>
              {today}
            </div>

          </div>

        </div>

        {/* <div className="hidden md:flex flex-1 max-w-xl">

          <div className="relative w-full">

            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              
              placeholder="Search patient, email, phone..."
              className="w-full pl-12 pr-5 h-12 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:border-[#1E7A3A] transition"
            />

          </div>

        </div> */}

        <div className="flex items-center gap-3">

          <motion.button
            whileTap={{scale:.95}}
            whileHover={{scale:1.05}}
            className="relative w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center"
          >
            <Bell size={20}/>

            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"/>
          </motion.button>

          <div className="relative">

            <button
              onClick={()=>setShowMenu(!showMenu)}
              className="flex items-center gap-3 bg-white rounded-2xl px-3 py-2 shadow"
            >

              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#173C68] to-[#1E7A3A] text-white flex items-center justify-center">

                <UserCircle2 size={26}/>

              </div>

              <div className="hidden sm:block text-left">

                <p className="font-semibold text-[#173C68]">
                  {user?.name||"Sales Team"}
                </p>

                <p className="text-xs text-slate-500">
                  Sales Executive
                </p>

              </div>

              <ChevronDown size={17}/>

            </button>

            {showMenu && (

  <motion.div
    initial={{ opacity: 0, y: 10, scale: .98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    className="absolute right-0 mt-3 w-72 rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
  >

    <div className="bg-gradient-to-r from-[#173C68] to-[#1E7A3A] px-6 py-6">

      <div className="flex items-center gap-4">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#173C68] shadow">

          <UserCircle2 size={42} />

        </div>

        <div>

          <h3 className="text-lg font-semibold text-white">
            {user?.name || "Sales Team"}
          </h3>

          <p className="text-sm text-white/80">
            {user?.email || "sales@darshai.com"}
          </p>

        </div>

      </div>

    </div>

    <div className="p-4">

      <button
        onClick={logout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 py-3 font-medium text-red-600 transition hover:bg-red-100"
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>

  </motion.div>

)}

          </div>

        </div>

      </div>

    </header>
  );
}