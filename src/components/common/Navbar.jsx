import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars,FaTimes,FaChevronDown } from "react-icons/fa";
import { motion,AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo.png";

export default function Navbar(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [insightsOpen,setInsightsOpen]=useState(false);
  const [contactOpen,setContactOpen]=useState(false);
  const [mobileInsightsOpen,setMobileInsightsOpen]=useState(false);
  const [mobileContactOpen,setMobileContactOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);

  useEffect(()=>{
    const handleScroll=()=>setScrolled(window.scrollY>80);
    window.addEventListener("scroll",handleScroll);
    return()=>window.removeEventListener("scroll",handleScroll);
  },[]);

  const insightLinks=[
    {name:"Insights",path:"/insights"},
    {name:"Journal",path:"/explore/journal"},
    {name:"Videos",path:"/explore/video"},
    {name:"Images",path:"/explore/image"},
    {name:"Brochure",path:"/explore/brochure"},
    {name:"Blog",path:"/explore/blog"},
  ];

  const contactLinks=[
    {name:"Contact",path:"/contact"},
    {name:"Careers",path:"/careers"},
  ];

  const textColor=scrolled?"text-[#1E7A3A]":"text-white";
  const hoverItem="inline-block transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#C9A75B]";
  const dropdownStyle="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-[#F1ECE2] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,.15)] py-3 flex flex-col text-[#1E7A3A] text-xs lg:text-sm z-50 border border-[#C9A75B]/15";
  const closeMobile=()=>setMenuOpen(false);

  return <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled?"bg-[#F1ECE2] shadow-md":"bg-transparent"}`}>

    <div className="max-w-7xl mx-auto flex justify-between items-center px-3 sm:px-4 md:px-5 lg:px-6 py-3 md:py-3 lg:py-4">

      {/* LOGO */}
      <Link to="/" className="shrink-0">
        <img src={logo} alt="DARSHAI Geo-Wellness" className="w-[82px] sm:w-[90px] md:w-[95px] lg:w-[105px] xl:w-[120px]"/>
      </Link>

      {/* DESKTOP / TABLET NAVIGATION */}
      <div className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-8 font-medium relative">

        {/* HOME */}
        <Link to="/" className={`group ${textColor}`}>
          <span className={`${hoverItem} text-[10px] md:text-[11px] lg:text-xs xl:text-sm`}>
            HOME
          </span>
        </Link>

        {/* OUR STORY */}
        <Link to="/story" className={`group ${textColor}`}>
          <span className={`${hoverItem} text-[10px] md:text-[11px] lg:text-xs xl:text-sm`}>
            OUR STORY
          </span>
        </Link>

        {/* GEO-WELLNESS */}
        <Link to="/geo-wellness-centres" className={`group ${textColor}`}>
          <span className={`${hoverItem} text-[10px] md:text-[11px] lg:text-xs xl:text-sm`}>
            GEO-WELLNESS
          </span>
        </Link>

        {/* PROGRAMS - DIRECT LINK */}
        <Link to="/program" className={`group ${textColor}`}>
          <span className={`${hoverItem} text-[10px] md:text-[11px] lg:text-xs xl:text-sm`}>
            PROGRAMS
          </span>
        </Link>

        {/* INTERNATIONAL */}
        <Link to="/international-wellness-india" className={`group ${textColor}`}>
          <span className={`${hoverItem} text-[10px] md:text-[11px] lg:text-xs xl:text-sm whitespace-nowrap`}>
            INTERNATIONAL
          </span>
        </Link>

        {/* INSIGHTS DROPDOWN */}
        <div
          className="relative group"
          onMouseEnter={()=>setInsightsOpen(true)}
          onMouseLeave={()=>setInsightsOpen(false)}
        >
          <div className={`flex items-center gap-1.5 cursor-pointer ${textColor}`}>
            <span className={`${hoverItem} text-[10px] md:text-[11px] lg:text-xs xl:text-sm`}>
              INSIGHTS
            </span>
            <FaChevronDown className={`w-2 h-2 md:w-2.5 md:h-2.5 xl:w-3 xl:h-3 transition-transform duration-300 ${insightsOpen?"rotate-180":""}`}/>
          </div>

          <AnimatePresence>
            {insightsOpen&&<motion.div
              initial={{opacity:0,y:-8,scale:.97}}
              animate={{opacity:1,y:0,scale:1}}
              exit={{opacity:0,y:-8,scale:.97}}
              transition={{duration:.2}}
              className={dropdownStyle}
            >
              {insightLinks.map(item=>
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={()=>setInsightsOpen(false)}
                  className="group/item relative px-5 py-3 hover:bg-[#C9A75B]/10 transition-all duration-300"
                >
                  <span className="inline-block transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:text-[#C9A75B]">
                    {item.name}
                  </span>
                  <span className="absolute left-5 bottom-1 w-0 h-px bg-[#C9A75B] group-hover/item:w-8 transition-all duration-300"/>
                </Link>
              )}
            </motion.div>}
          </AnimatePresence>
        </div>

        {/* CONTACT DROPDOWN */}
        <div
          className="relative group"
          onMouseEnter={()=>setContactOpen(true)}
          onMouseLeave={()=>setContactOpen(false)}
        >
          <div className={`flex items-center gap-1.5 cursor-pointer ${textColor}`}>
            <span className={`${hoverItem} text-[10px] md:text-[11px] lg:text-xs xl:text-sm`}>
              CONTACT
            </span>
            <FaChevronDown className={`w-2 h-2 md:w-2.5 md:h-2.5 xl:w-3 xl:h-3 transition-transform duration-300 ${contactOpen?"rotate-180":""}`}/>
          </div>

          <AnimatePresence>
            {contactOpen&&<motion.div
              initial={{opacity:0,y:-8,scale:.97}}
              animate={{opacity:1,y:0,scale:1}}
              exit={{opacity:0,y:-8,scale:.97}}
              transition={{duration:.2}}
              className={dropdownStyle}
            >
              {contactLinks.map(item=>
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={()=>setContactOpen(false)}
                  className="group/item relative px-5 py-3 hover:bg-[#C9A75B]/10 transition-all duration-300"
                >
                  <span className="inline-block transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:text-[#C9A75B]">
                    {item.name}
                  </span>
                  <span className="absolute left-5 bottom-1 w-0 h-px bg-[#C9A75B] group-hover/item:w-8 transition-all duration-300"/>
                </Link>
              )}
            </motion.div>}
          </AnimatePresence>
        </div>
      </div>

      {/* BEGIN JOURNEY */}
      <Link to="/begin-your-journey" className="shrink-0">
        <button className={`hidden md:block rounded-full transition-all duration-300 whitespace-nowrap ${scrolled?"bg-[#1E7A3A] text-white hover:bg-[#174EA6]":"border border-white text-white hover:bg-white hover:text-[#1E7A3A]"} px-3 py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2 text-[9px] md:text-[10px] lg:text-xs xl:text-sm`}>
          BEGIN JOURNEY
        </button>
      </Link>

      {/* MOBILE MENU BUTTON */}
      <button
        className={`md:hidden ${textColor} p-2`}
        onClick={()=>setMenuOpen(true)}
        aria-label="Open menu"
      >
        <FaBars size={22}/>
      </button>
    </div>

    {/* MOBILE MENU */}
    <AnimatePresence>
      {menuOpen&&<motion.div
        initial={{x:"100%"}}
        animate={{x:0}}
        exit={{x:"100%"}}
        transition={{duration:.4,ease:[.16,1,.3,1]}}
        className="fixed top-0 right-0 w-[85%] max-w-sm h-screen bg-[#F1ECE2] z-50 flex flex-col px-6 py-8 shadow-2xl overflow-y-auto"
      >

        {/* MOBILE HEADER */}
        <div className="flex justify-between items-center mb-10">
          <Link to="/" onClick={closeMobile}>
            <img src={logo} alt="DARSHAI Geo-Wellness" className="w-[100px]"/>
          </Link>

          <button onClick={closeMobile} className="text-[#1E7A3A]" aria-label="Close menu">
            <FaTimes size={24}/>
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        <div>
          <p className="text-xs tracking-[4px] text-[#C6A75E] mb-6">
            NAVIGATION
          </p>

          <div className="flex flex-col gap-1 text-2xl font-serif">

            {/* HOME */}
            <Link to="/" onClick={closeMobile} className="px-2 py-2 group">
              <span className="text-[#1E7A3A] group-hover:text-[#C9A75B] transition-colors">
                Home
              </span>
            </Link>

            {/* OUR STORY */}
            <Link to="/story" onClick={closeMobile} className="px-2 py-2 group">
              <span className="text-[#1E7A3A] group-hover:text-[#C9A75B] transition-colors">
                Our Story
              </span>
            </Link>

            {/* GEO-WELLNESS */}
            <Link to="/geo-wellness-centres" onClick={closeMobile} className="px-2 py-2 group">
              <span className="text-[#1E7A3A] group-hover:text-[#C9A75B] transition-colors">
                Geo-Wellness
              </span>
            </Link>

            {/* PROGRAMS */}
            <Link to="/program" onClick={closeMobile} className="px-2 py-2 group">
              <span className="text-[#1E7A3A] group-hover:text-[#C9A75B] transition-colors">
                Programs
              </span>
            </Link>

            {/* INTERNATIONAL */}
            <Link to="/international-wellness-india" onClick={closeMobile} className="px-2 py-2 group">
              <span className="text-[#1E7A3A] group-hover:text-[#C9A75B] transition-colors">
                International
              </span>
            </Link>

            {/* INSIGHTS */}
            <div className="px-2 py-2">
              <button
                onClick={()=>setMobileInsightsOpen(!mobileInsightsOpen)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-[#1E7A3A]">
                  Insights
                </span>
                <FaChevronDown className={`text-sm text-[#C6A75E] transition-transform duration-300 ${mobileInsightsOpen?"rotate-180":""}`}/>
              </button>

              <AnimatePresence>
                {mobileInsightsOpen&&<motion.div
                  initial={{height:0,opacity:0}}
                  animate={{height:"auto",opacity:1}}
                  exit={{height:0,opacity:0}}
                  transition={{duration:.3}}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pt-3 pl-4 ml-1 border-l border-[#C6A75E]/30">
                    {insightLinks.map(item=>
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={closeMobile}
                        className="py-2 text-base font-sans text-[#3E8E6B] hover:text-[#C9A75B] transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                </motion.div>}
              </AnimatePresence>
            </div>

            {/* CONTACT */}
            <div className="px-2 py-2">
              <button
                onClick={()=>setMobileContactOpen(!mobileContactOpen)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-[#1E7A3A]">
                  Contact
                </span>
                <FaChevronDown className={`text-sm text-[#C6A75E] transition-transform duration-300 ${mobileContactOpen?"rotate-180":""}`}/>
              </button>

              <AnimatePresence>
                {mobileContactOpen&&<motion.div
                  initial={{height:0,opacity:0}}
                  animate={{height:"auto",opacity:1}}
                  exit={{height:0,opacity:0}}
                  transition={{duration:.3}}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pt-3 pl-4 ml-1 border-l border-[#C6A75E]/30">
                    {contactLinks.map(item=>
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={closeMobile}
                        className="py-2 text-base font-sans text-[#3E8E6B] hover:text-[#C9A75B] transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                </motion.div>}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MOBILE CTA */}
        <Link to="/begin-your-journey" onClick={closeMobile} className="mt-auto pt-10">
          <button className="w-full bg-[#1E7A3A] text-white py-4 px-3 rounded-full text-lg tracking-widest hover:bg-[#174EA6] transition-all duration-300 active:scale-95">
            BEGIN JOURNEY
          </button>
        </Link>
      </motion.div>}
    </AnimatePresence>
  </nav>;
}