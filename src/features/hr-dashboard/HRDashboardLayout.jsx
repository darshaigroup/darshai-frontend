import {useState} from "react";
import {Outlet} from "react-router-dom";
import {AnimatePresence,motion} from "framer-motion";
import HRSidebar from "./components/navgation/HRSidebar";
import HRHeader from "./components/navgation/HRHeader";

const HRDashboardLayout=()=>{
  const [sidebarOpen,setSidebarOpen]=useState(false);

  return(
    <div className="min-h-screen bg-[#F6F8F6] text-[#1C2A21]">
      <div className="hidden lg:block">
        <HRSidebar/>
      </div>

      <AnimatePresence>
        {sidebarOpen&&(
          <>
            <motion.button type="button" aria-label="Close navigation" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.2}} onClick={()=>setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"/>
            <motion.aside initial={{x:"-100%"}} animate={{x:0}} exit={{x:"-100%"}} transition={{type:"tween",duration:.25,ease:"easeOut"}} className="fixed inset-y-0 left-0 z-50 w-[min(86vw,320px)] lg:hidden">
              <HRSidebar mobile onNavigate={()=>setSidebarOpen(false)}/>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="min-h-screen lg:pl-[280px]">
        <HRHeader onMenuClick={()=>setSidebarOpen(true)}/>

        <main className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8 xl:px-10">
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.3,ease:"easeOut"}}>
            <Outlet/>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default HRDashboardLayout;