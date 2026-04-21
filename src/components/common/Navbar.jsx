import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isProgramOpen, setIsProgramOpen] = useState(false);

  // ✅ FIXED scroll detection (reliable)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Story", path: "/story" },
  ];

  const programLinks = [
    { name: "Protocols", path: "/program/protocols" },
    { name: "Geo-Wellness Center", path: "/program/center" },
    { name: "Treatment", path: "/program/treatment" },
  ];

  const exploreLinks = [
    { name: "Journal", path: "/explore/journal" },
    { name: "Media", path: "/explore/media" },
    { name: "Magazine", path: "/explore/magazine" },
    { name: "Video", path: "/explore/video" },
    { name: "Image", path: "/explore/image" },
    { name: "Brochure", path: "/explore/brochure" },
    { name: "Blog", path: "/explore/blog" },
  ];

  return (
    <motion.nav
      initial={false}
      animate={{
        // ✅ FIX: never fully transparent
        backgroundColor: isScrolled
          ? "rgba(245, 241, 232, 0.95)"
          : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(12px)",
        borderBottomColor: isScrolled
          ? "rgba(21, 128, 61, 0.08)"
          : "rgba(21, 128, 61, 0.03)",
        paddingTop: isScrolled ? "1rem" : "1.5rem",
        paddingBottom: isScrolled ? "1rem" : "1.5rem",
      }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-20 border-b transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src="https://www.darshai.in/logoSm.jpg"
            alt="Darshai"
            className={`transition-all duration-500 object-contain ${
              isScrolled ? "h-10 md:h-12" : "h-14 md:h-16"
            }`}
          />
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-10">

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-yellow-600"
                  : "text-gray-800"
              } hover:text-yellow-600`}
            >
              {link.name}

              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-yellow-600"
                />
              )}
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
                className={`w-4 h-4 transition-transform ${
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
                      className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-600"
                      onClick={() => setIsProgramOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* EXPLORE DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setIsExploreOpen(true)}
            onMouseLeave={() => setIsExploreOpen(false)}
          >
            <button className="flex items-center gap-1 text-gray-800 hover:text-yellow-600">
              Explore
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isExploreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isExploreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border py-2"
                >
                  {exploreLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-600"
                      onClick={() => setIsExploreOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CONTACT */}
          <Link
            to="/contact"
            className="text-gray-800 hover:text-yellow-600"
          >
            Contact Us
          </Link>
        </div>

        {/* CTA BUTTON */}
        <button
          className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
            isScrolled
              ? "bg-green-800 text-white hover:bg-green-700"
              : "bg-black/80 text-white hover:bg-black"
          }`}
        >
          Join us
        </button>
      </div>
    </motion.nav>
  );
}