
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence,motion } from "framer-motion";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import MobileMenu from "../components/common/MobileMenu";

export default function SalesDashboardLayout(){
  const [sidebarOpen,setSidebarOpen]=useState(false);

  return(
    <div className="min-h-screen bg-[#F4EFE6]">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[290px] z-40">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen&&(
          <>
            <motion.div
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              onClick={()=>setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{x:-320}}
              animate={{x:0}}
              exit={{x:-320}}
              transition={{duration:.3}}
              className="fixed left-0 top-0 h-screen w-[290px] z-50 lg:hidden"
            >
              <MobileMenu close={()=>setSidebarOpen(false)}>
                <Sidebar mobile />
              </MobileMenu>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-[290px] flex min-h-screen flex-col">

        <Header
          openSidebar={()=>setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          <motion.div
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{duration:.35}}
            className="mx-auto max-w-[1700px]"
          >
            <Outlet />
          </motion.div>

        </main>

      </div>

    </div>
  );
}