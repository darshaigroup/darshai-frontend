import React,{useEffect,useState} from "react";
import {motion,AnimatePresence} from "motion/react";
import {Menu,X,ArrowRight} from "lucide-react";
import {Link} from "react-router-dom";
import logo from "../../assets/images/logo.png";

const navItems=[
   {label:"About",id:"about"},
   {label:"Open Positions",id:"position"},
   {label:"Selection Process",id:"recruitment"},
   {label:"Why DARSHAI",id:"why-join"},
   {label:"FAQ",id:"faq"},
 
];

const Navbar=()=>{
  const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false),[active,setActive]=useState("about");

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 80);

    const middle = window.scrollY + window.innerHeight / 2;

    let current = navItems[0].id;

    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);

      if (!section) return;

      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (middle >= top && middle < bottom) {
        current = id;
      }
    });

    setActive(current);
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

 const scrollTo = (id) => {
  setOpen(false);

  const section = document.getElementById(id);

  if (!section) return;

  window.scrollTo({
    top: section.offsetTop - 80,
    behavior: "smooth",
  });
};

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,.96)" : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
          boxShadow: scrolled
            ? "0 10px 40px rgba(0,0,0,.08)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto flex h-16 sm:h-18 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="DarshAI Logo"
              className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-16 w-auto object-contain"
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 backdrop-blur-xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                  active === item.id
                    ? scrolled
                      ? "bg-[#E8F4EC] text-[#1E7A3A]"
                      : "bg-white/15 text-white"
                    : scrolled
                      ? "text-[#4B5563] hover:bg-[#F5F7F5]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Apply */}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("application")}
            className="hidden lg:flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1E7A3A] to-[#299247] px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-green-900/20"
          >
            Apply Now <ArrowRight size={17} />
          </motion.button>

          {/* Mobile */}

          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden flex h-11 w-11 items-center justify-center rounded-xl transition ${
              scrolled
                ? "bg-[#F5F7F5] text-[#1E2B22]"
                : "bg-white/10 text-white backdrop-blur-xl"
            }`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-[#1E7A3A]/10 bg-white p-5 shadow-2xl lg:hidden"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
                    active === item.id
                      ? "bg-[#EAF6EE] text-[#1E7A3A]"
                      : "hover:bg-[#F7F7F7]"
                  }`}
                >
                  {item.label}
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollTo("application")}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1E7A3A] to-[#2A9147] py-3 font-semibold text-white"
            >
              Apply Now <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;