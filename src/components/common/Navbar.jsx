// This component is responsible for rendering the navigation bar at the top of the application. 
// It includes links to different sections of the app and is designed to be responsive and visually appealing.

import {useState} from 'react'
import { NavLink } from 'react-router-dom';

const navItems = [
  {name:"Home", path:"/"},
  {name:"About", path:"/about"},
  {name:"Contact", path:"/contact"},
]

function Navbar() {
  const [isOpen,setIsopen] = useState(false);
  return (
   <nav className = "sticky top-0 z-50 bg-lightBg/80 backdrop-blur-md border-b border-gray-200">
    <div className = "max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        
      {/* Logo Section */}
        <div className = "flex items-center gap-2 cursor-pointer">
            <span className = "text-xl font-bold text-primary">@</span>
            <h1 className = "font-heading text-lg md:text-xl font-semibold text-gray-800">Darshai</h1>
        </div>

      {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item)=>(
            <NavLink 
            key = {item.name}
            to = {item.path}
            className = {({isActive}) => `group relative font-body text-sm tracking-wide transition duration-300 ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'} `}>
              {item.name}
              <span className = "absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
        </div>

        <button className = "hidden md:block bg-primary text-white px-5 py-2 rounded-full font-medium shadow-md hover:bg-primaryDark hover:scale-105 transation duration-300">
          Login
        </button>

        <button className = "md:hidden flex flex-col gap-1" onClick={() => setIsopen(!isOpen)}>
          <span className = "w-6 h-[2px] bg-gray-800"></span>
          <span className = "w-6 h-[2px] bg-gray-800"></span>
          <span className = "w-6 h-[2px] bg-gray-800"></span>
        </button>
      </div>

      {/*Responsive view*/}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${ isOpen ? 'max-h-96 py-4' : 'max-h-0'} bg-lightBg`}>
        <div className="flex flex-col items-center gap-6">
          {
            navItems.map((item) => (
              <NavLink
                 key = {item.name}
                 to = {item.path}
                 onClick={() => setIsopen(false)}
                className={({isActive}) => `text-base font-body transition ${ isActive ? 'text-primary':'text-gray-700 hover:text-primary'}`}>
                  {item.name}
                </NavLink>
            ))
          }
          <button className="bg-primary text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-primaryDark transition">
            Login
          </button>

        </div>
      </div>
   </nav>
  );
};

export default Navbar;                                       