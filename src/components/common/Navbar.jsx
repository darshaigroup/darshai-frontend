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
  const [activeItem, setActiveItem] = useState(null);
  return (
   <nav className = "sticky top-0 z-50 bg-lightBg/80 backdrop-blur-md border-b border-gray-200">
    <div className = "max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

      {/* Logo Section */}
        <div className = "flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
            <span className = "text-3xl font-bold text-primary animate-pulse">@</span>
            <h1 className = "font-heading text-2xl md:text-3xl font-bold text-primary tracking-widest">DARSHAI</h1>
        </div>

      {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item)=>(
            <NavLink
            key = {item.name}
            to = {item.path}
            end={item.path === "/"} 
            className = {({isActive}) => `group px-4 py-2 rounded-lg font-body text-base font-bold uppercase tracking-wide transition duration-300 ${isActive ? 'bg-primary/20 border border-primary/40 text-primary backdrop-blur-sm' : 'text-gray-700 hover:bg-primary/10 hover:text-primary'} `}>
              {item.name}
            </NavLink>
          ))}
        </div>

        <button className = "hidden md:block bg-primary text-white px-7 py-2.5 rounded-full font-bold uppercase tracking-wider text-sm shadow-lg hover:bg-primaryDark hover:scale-105 hover:shadow-xl transition duration-300">
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
           key={item.name}
           to={item.path}
           onClick={() => setActiveItem(item.name)}
           className={`group px-4 py-2 rounded-lg font-body text-base font-bold uppercase tracking-wide transition duration-300 ${
          activeItem === item.name && activeItem !== null
          ? "bg-primary/20 border border-primary/40 text-primary backdrop-blur-sm"
      : "text-gray-700 hover:bg-primary/10 hover:text-primary"
  }`}
>
  {item.name}
</NavLink>
            ))
          }
          <button className="bg-primary text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-lg hover:bg-primaryDark transition">
            Login
          </button>

        </div>
      </div>
   </nav>
  );
}

export default Navbar;                                       