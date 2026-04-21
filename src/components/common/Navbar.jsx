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

  // 🔥 Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Common styles
  const textColor = scrolled ? "text-[#1E7A3A]" : "text-white";

  const hoverItem =
    "inline-block transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#C9A75B]";

  const dropdownStyle =
    "absolute top-full mt-4 w-48 bg-white rounded-xl shadow-xl py-3 flex flex-col text-[#1E7A3A] text-sm z-50";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-[#F1ECE2] shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* LOGO */}
        <img src={logo} className="w-[120px]" />

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-10 font-medium relative">

          {/* HOME */}
          <Link to="/" className={`group ${textColor}`}>
            <span className={hoverItem}>HOME</span>
          </Link>

          {/* STORY */}
          <Link to="/story" className={`group ${textColor}`}>
            <span className={hoverItem}>OUR STORY</span>
          </Link>

          {/* 🔥 PROGRAM DROPDOWN */}
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
                <Link to="/program/geo-wellness" className="px-5 py-2 hover:text-[#C9A75B]">
                  Geo Wellness
                </Link>
                <Link to="/program/treatment" className="px-5 py-2 hover:text-[#C9A75B]">
                  Treatment
                </Link>
              </div>
            )}
          </div>

          {/* 🔥 EXPLORE DROPDOWN */}
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

          {/* CONTACT */}
          <Link to="/contact" className={`group ${textColor}`}>
            <span className={hoverItem}>CONTACT</span>
          </Link>
        </div>

        {/* CTA */}
        <button
          className={`hidden md:block px-5 py-2 rounded-full transition ${
            scrolled
              ? "bg-[#1E7A3A] text-white"
              : "border border-white text-white"
          }`}
        >
          JOIN WAITLIST
        </button>

        {/* MOBILE ICON */}
        <button
          className={`md:hidden ${textColor}`}
          onClick={() => setMenuOpen(true)}
        >
          <FaBars size={22} />
        </button>
      </div>

      {/* 📱 MOBILE MENU (UNCHANGED) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 w-[80%] max-w-sm h-screen bg-[#F1ECE2] z-50 flex flex-col p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center">
              <img src={logo} className="w-[100px]" />
              <FaTimes size={24} onClick={() => setMenuOpen(false)} />
            </div>

            <div className="flex flex-col items-center gap-6 mt-12 text-lg text-[#1E7A3A]">

              <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
              <Link to="/story" onClick={() => setMenuOpen(false)}>OUR STORY</Link>

              <Link to="/program/geo-wellness" onClick={() => setMenuOpen(false)}>
                Geo Wellness
              </Link>
              <Link to="/program/treatment" onClick={() => setMenuOpen(false)}>
                Treatment
              </Link>

              <Link to="/explore/video" onClick={() => setMenuOpen(false)}>
                Videos
              </Link>
              <Link to="/explore/image" onClick={() => setMenuOpen(false)}>
                Images
              </Link>
              <Link to="/explore/brochure" onClick={() => setMenuOpen(false)}>
                Brochure
              </Link>
              <Link to="/explore/blog" onClick={() => setMenuOpen(false)}>
                Blog
              </Link>

              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                CONTACT
              </Link>

              <button className="bg-[#1E7A3A] text-white px-6 py-3 rounded-full mt-6">
                JOIN WAITLIST
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}