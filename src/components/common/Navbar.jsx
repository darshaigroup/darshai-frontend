import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
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
          {/* HOME */}
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
            <div
              className={`flex items-center gap-2 cursor-pointer ${textColor}`}
            >
              <span className={hoverItem}>OUR PROGRAM</span>
              <FaChevronDown size={12} />
            </div>

            {programOpen && (
              <div className={dropdownStyle}>
                <Link to="/program/treatment" className="px-5 py-2 hover:text-[#C9A75B]">
                  Wellness Programmes
                </Link>
                <Link
                  to="/program/geo-wellness"
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
            <div
              className={`flex items-center gap-2 cursor-pointer ${textColor}`}
            >
              <span className={hoverItem}>EXPLORE</span>
              <FaChevronDown size={12} />
            </div>

            {exploreOpen && (
              <div className={dropdownStyle}>
                  <Link
                  to="/explore/journal"
                  className="px-5 py-2 hover:text-[#C9A75B]"
                >
                  Journal
                </Link>
                <Link
                  to="/explore/video"
                  className="px-5 py-2 hover:text-[#C9A75B]"
                >
                  Videos
                </Link>
                <Link
                  to="/explore/image"
                  className="px-5 py-2 hover:text-[#C9A75B]"
                >
                  Images
                </Link>
                <Link
                  to="/explore/brochure"
                  className="px-5 py-2 hover:text-[#C9A75B]"
                >
                  Brochure
                </Link>
                <Link
                  to="/explore/blog"
                  className="px-5 py-2 hover:text-[#C9A75B]"
                >
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
        <Link to="/patient-dashboard">
        <button
          onClick={() => navigate("/patient-dashboard")}
          className={`hidden md:block px-5 py-2 rounded-full transition ${
            scrolled
              ? "bg-[#1E7A3A] text-white"
              : "border border-white text-white"
          }`}
        >
          BEGIN JOURNEY
        </button>
        </Link>

        {/* MOBILE ICON */}
        <button
          className={`md:hidden ${textColor}`}
          onClick={() => setMenuOpen(true)}
        >
          <FaBars size={22} />
        </button>
      </div>

      {/* 📱 MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 w-[85%] max-w-sm h-screen bg-[#F1ECE2] z-50 flex flex-col px-6 py-8 shadow-2xl overflow-y-auto"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-10">
              <img src={logo} className="w-[100px]" alt="logo" />
              <FaTimes size={24} onClick={() => setMenuOpen(false)} />
            </div>

            {/* 🔹 NAVIGATION */}
            <div className="mb-10">
              <p className="text-xs tracking-[4px] text-[#C6A75E] mb-6">
                NAVIGATION
              </p>

              <div className="flex flex-col gap-4 text-2xl font-serif">
                {[
                  { name: "Home", path: "/" },
                  { name: "Our Story", path: "/story" },
                  { name: "Contact", path: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="group relative px-2 py-1 rounded-md transition-all duration-300 hover:bg-[#C6A75E]/10 active:scale-95"
                  >
                    <span className="text-[#1E7A3A] transition-all duration-300 group-hover:text-[#C6A75E] group-hover:drop-shadow-[0_0_6px_#C6A75E] inline-block">
                      {item.name}
                    </span>

                    {/* underline glow */}
                    <span className="absolute left-2 bottom-0 w-0 h-[2px] bg-[#C6A75E] transition-all duration-300 group-hover:w-[calc(100%-16px)] shadow-[0_0_8px_#C6A75E]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* 🔹 PROGRAMS */}
            <div className="mb-10">
              <p className="text-xs tracking-[4px] text-[#C6A75E] mb-6">
                PROGRAMS
              </p>

              <div className="flex flex-col gap-3 text-base text-[#3E8E6B]">
                {[
                  { name: "Wellness Programmes", path: "/program/treatment" },
                  {
                    name: "Geo-Wellness Center",
                    path: "/program/geo-wellness",
                  },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="group relative px-2 py-1 rounded-md transition-all duration-300 hover:bg-[#C6A75E]/10 active:scale-95"
                  >
                    <span className="transition-all duration-300 group-hover:text-[#C6A75E] group-hover:drop-shadow-[0_0_6px_#C6A75E] inline-block">
                      {item.name}
                    </span>

                    <span className="absolute left-2 bottom-0 w-0 h-[1px] bg-[#C6A75E] transition-all duration-300 group-hover:w-[calc(100%-16px)]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* 🔹 ARCHIVE */}
            <div className="mb-12">
              <p className="text-xs tracking-[4px] text-[#C6A75E] mb-6">
                ARCHIVE
              </p>

              <div className="flex flex-col gap-3 text-base text-[#3E8E6B]">
                {[
                  { name: "Journal", path: "/explore/journal" },
                  { name: "Video", path: "/explore/video" },
                  { name: "Image", path: "/explore/image" },
                  { name: "Blog", path: "/explore/blog" },
                  { name: "Brochure", path: "/explore/brochure" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="group relative px-2 py-1 rounded-md transition-all duration-300 hover:bg-[#C6A75E]/10 active:scale-95"
                  >
                    <span className="transition-all duration-300 group-hover:text-[#C6A75E] group-hover:drop-shadow-[0_0_6px_#C6A75E] inline-block">
                      {item.name}
                    </span>

                    <span className="absolute left-2 bottom-0 w-0 h-[1px] bg-[#C6A75E] transition-all duration-300 group-hover:w-[calc(100%-16px)]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link to="/patient-dashboard">
            <button className="bg-[#1E7A3A] text-white py-4 px-3 rounded-full text-lg tracking-widest hover:bg-[#166534] transition active:scale-95">
              BEGIN JOURNEY
            </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
