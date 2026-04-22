import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Program links (IMPORTANT FIX)
  const programLinks = [
    { name: "Wellness Programmes", path: "/program" },
    { name: "Geo-Wellness Center", path: "/program/geo-wellness-center" },
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Story", path: "/story" },
  ];

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isScrolled
          ? "rgba(245, 241, 232, 0.95)"
          : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(12px)",
        paddingTop: isScrolled ? "1rem" : "1.5rem",
        paddingBottom: isScrolled ? "1rem" : "1.5rem",
      }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-20 border-b transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link to="/">
          <img
            src="https://storage.googleapis.com/m-infra.appspot.com/public/res/ais/darshai_logo.png"
            className={`transition-all ${
              isScrolled ? "h-10" : "h-14"
            }`}
          />
        </Link>

        {/* NAV */}
        <div className="hidden md:flex items-center gap-10">

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative ${
                location.pathname === link.path
                  ? "text-yellow-600"
                  : "text-gray-800"
              } hover:text-yellow-600`}
            >
              {link.name}
            </Link>
          ))}

          {/* PROGRAM DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setIsProgramOpen(true)}
            onMouseLeave={() => setIsProgramOpen(false)}
          >
            <button className="flex items-center gap-1 text-gray-800 hover:text-yellow-600">
              Our Program
              <ChevronDown
                className={`w-4 h-4 transition ${
                  isProgramOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isProgramOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border py-2"
                >
                  {programLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-5 py-2 text-sm ${
                        location.pathname === link.path ||
                        location.pathname.startsWith(link.path + "/")
                          ? "text-yellow-600 bg-gray-100"
                          : "text-gray-700"
                      } hover:bg-gray-100 hover:text-yellow-600`}
                      onClick={() => setIsProgramOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* EXPLORE */}
          <Link
            to="/explore"
            className="text-gray-800 hover:text-yellow-600"
          >
            Explore
          </Link>

          {/* CONTACT */}
          <Link
            to="/contact"
            className="text-gray-800 hover:text-yellow-600"
          >
            Contact
          </Link>
        </div>

        {/* CTA */}
        <button className="bg-green-800 text-white px-6 py-2 rounded-full">
          Join Waitlist
        </button>
      </div>
    </motion.nav>
  );
}