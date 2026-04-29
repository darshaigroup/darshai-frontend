import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  let programTimeout;
  let exploreTimeout;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = scrolled ? "text-[#1E7A3A]" : "text-white";

  const hoverItem =
    "inline-block transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#C9A75B]";

  const dropdownStyle =
    "absolute top-full mt-4 w-56 bg-white rounded-xl shadow-xl py-3 flex flex-col text-[#1E7A3A] text-sm z-50";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-[#F1ECE2] shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* LOGO */}
        <img src={logo} className="w-[120px]" alt="logo" />

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-10 font-medium relative">

          <Link to="/" className={`group ${textColor}`}>
            <span className={hoverItem}>HOME</span>
          </Link>

          <Link to="/story" className={`group ${textColor}`}>
            <span className={hoverItem}>OUR STORY</span>
          </Link>

          {/* PROGRAM DROPDOWN */}
          <div
            className="relative group"
            onMouseEnter={() => {
              clearTimeout(programTimeout);
              setProgramOpen(true);
            }}
            onMouseLeave={() => {
              programTimeout = setTimeout(() => setProgramOpen(false), 200);
            }}
          >
            <div className={`flex items-center gap-2 cursor-pointer ${textColor}`}>
              <span className={hoverItem}>OUR PROGRAM</span>
              <FaChevronDown size={12} />
            </div>

            {programOpen && (
              <div className={dropdownStyle}>
                <Link to="/program" className="px-5 py-2 hover:text-[#C9A75B]">
                  Wellness Programmes
                </Link>

                <Link
                  to="/program/geo-wellness-center"
                  className="px-5 py-2 hover:text-[#C9A75B]"
                >
                  Geo-Wellness Center
                </Link>
              </div>
            )}
          </div>

          {/* EXPLORE DROPDOWN */}
          <div
            className="relative group"
            onMouseEnter={() => {
              clearTimeout(exploreTimeout);
              setExploreOpen(true);
            }}
            onMouseLeave={() => {
              exploreTimeout = setTimeout(() => setExploreOpen(false), 200);
            }}
          >
            <div className={`flex items-center gap-2 cursor-pointer ${textColor}`}>
              <span className={hoverItem}>EXPLORE</span>
              <FaChevronDown size={12} />
            </div>

            {exploreOpen && (
              <div className={dropdownStyle}>
                <Link to="/explore/video" className="px-5 py-2 hover:text-[#C9A75B]">
                  Videos
                </Link>
                <Link to="/explore/image" className="px-5 py-2 hover:text-[#C9A75B]">
                  Images
                </Link>
                <Link to="/explore/brochure" className="px-5 py-2 hover:text-[#C9A75B]">
                  Brochure
                </Link>
                <Link to="/explore/blog" className="px-5 py-2 hover:text-[#C9A75B]">
                  Blog
                </Link>
              </div>
            )}
          </div>

          <Link to="/contact" className={`group ${textColor}`}>
            <span className={hoverItem}>CONTACT US</span>
          </Link>
        </div>

        {/* CTA */}
        <Link
          to="/patient-dashboard"
          className={`hidden md:block px-5 py-2 rounded-full transition ${
            scrolled
              ? "bg-[#1E7A3A] text-white"
              : "border border-white text-white"
          }`}
        >
          JOIN WAITLIST
        </Link>

        {/* MOBILE ICON */}
        <button
          className={`md:hidden ${textColor}`}
          onClick={() => setMenuOpen(true)}
        >
          <FaBars size={22} />
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 w-[85%] max-w-sm h-screen bg-[#F1ECE2] z-50 flex flex-col px-6 py-8 shadow-2xl overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <img src={logo} className="w-[100px]" alt="logo" />
              <FaTimes size={24} onClick={() => setMenuOpen(false)} />
            </div>

            {/* NAVIGATION */}
            <div className="mb-10">
              <p className="text-xs tracking-[4px] text-[#C6A75E] mb-6">
                NAVIGATION
              </p>

              <div className="flex flex-col gap-4 text-2xl font-serif">
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/story" onClick={() => setMenuOpen(false)}>Our Story</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
              </div>
            </div>

            {/* PROGRAMS */}
            <div className="mb-10">
              <p className="text-xs tracking-[4px] text-[#C6A75E] mb-6">
                PROGRAMS
              </p>

              <div className="flex flex-col gap-3 text-base text-[#3E8E6B]">
                <Link to="/program" onClick={() => setMenuOpen(false)}>
                  Wellness Programmes
                </Link>

                <Link
                  to="/program/geo-wellness-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Geo-Wellness Center
                </Link>
              </div>
            </div>

            {/* EXPLORE */}
            <div className="mb-12">
              <p className="text-xs tracking-[4px] text-[#C6A75E] mb-6">
                EXPLORE
              </p>

              <div className="flex flex-col gap-3 text-base text-[#3E8E6B]">
                <Link to="/explore/video">Video</Link>
                <Link to="/explore/image">Image</Link>
                <Link to="/explore/blog">Blog</Link>
                <Link to="/explore/brochure">Brochure</Link>
              </div>
            </div>

            <Link to="/patient-dashboard" className="bg-[#1E7A3A] text-white py-4 rounded-full text-lg tracking-widest">
              JOIN WAITLIST
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}