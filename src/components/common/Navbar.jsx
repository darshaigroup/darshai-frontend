import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },

  // ✅ Added Doctor Dashboard
  { name: "Dashboard", path: "/doctor-dashboard" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white border-b border-gray-200 shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="max-w-9xl mx-auto flex items-center justify-between px-5 md:px-8 py-4">

        {/* 🔹 Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Darshai Logo" className="h-20 md:h-20" />
        </div>

        {/* 🔹 Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-full text-sm font-normal border transition duration-300
                  ${
                    isActive
                      ? "bg-primary text-white border-primary"
                      : "border-primary text-primary hover:bg-primary hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* 🔹 Login Button */}
        <button className="hidden md:block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-primaryLight transition">
          Login
        </button>

        {/* 🔹 Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-[2px] bg-primary"></span>
          <span className="w-6 h-[2px] bg-primary"></span>
          <span className="w-6 h-[2px] bg-primary"></span>
        </button>
      </div>

      {/* 🔹 Mobile Dropdown */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-80 py-4" : "max-h-0"
        } bg-white/80 backdrop-blur-xl`}
      >
        <div className="flex flex-col items-center gap-5">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 rounded-full text-gray-700 hover:bg-white/30 hover:text-primary transition"
            >
              {item.name}
            </NavLink>
          ))}

          <button className="bg-primary text-white px-6 py-2 rounded-full">
            Login
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;