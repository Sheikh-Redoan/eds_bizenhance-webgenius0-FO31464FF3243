import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";

const ActiveFlagSVG = () => (
  <svg
    className="absolute -top-4 left-1/2 -translate-x-1/2 -z-10 drop-shadow-lg w-full h-[100px]"
    viewBox="0 0 102 122"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path d="M0 0H102V122C72.5 97.6992 32 97.6992 0 122V0Z" fill="#3F291B" />
  </svg>
);

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative px-4 py-2 text-base font-medium font-serif transition-colors duration-200 
      ${isActive ? "text-amber-100" : "text-stone-300 hover:text-white"}`
    }
  >
    {({ isActive }) => (
      <>
        {isActive && <ActiveFlagSVG />}
        <span className="relative z-10 drop-shadow-md">{children}</span>
      </>
    )}
  </NavLink>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-[#20120B] via-[#755F48] to-[#20120B] backdrop-blur-xs shadow-xl border-b border-stone-600">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center bg-stone-800 border-2 border-stone-500 shadow-inner rounded-sm group-hover:border-amber-500 transition-colors">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33398 26V6.00002C5.33398 5.11597 5.68517 4.26812 6.3103 3.643C6.93542 3.01788 7.78326 2.66669 8.66732 2.66669H25.334C25.6876 2.66669 26.0267 2.80716 26.2768 3.05721C26.5268 3.30726 26.6673 3.6464 26.6673 4.00002V28C26.6673 28.3536 26.5268 28.6928 26.2768 28.9428C26.0267 29.1929 25.6876 29.3334 25.334 29.3334H8.66732C7.78326 29.3334 6.93542 28.9822 6.3103 28.357C5.68517 27.7319 5.33398 26.8841 5.33398 26ZM5.33398 26C5.33398 25.116 5.68517 24.2681 6.3103 23.643C6.93542 23.0179 7.78326 22.6667 8.66732 22.6667H26.6673"
                  stroke="#8B7355"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <span className="text-2xl font-semibold text-stone-100 tracking-wide font-sans drop-shadow-md">
              Lingual Jams
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1 font-merriweather">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/languages">Languages</NavItem>
            <NavItem to="/membership">Membership</NavItem>
            <NavItem to="/dashboard">Dashboard</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <button
                className="w-28 h-12 flex justify-center items-center bg-stone-200 hover:bg-white text-stone-900 font-serif font-bold 
                shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4)] border-2 border-[#8B7355] rounded-sm active:translate-y-0.5 transition-all"
              >
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button
                className="w-28 h-12 flex justify-center items-center bg-yellow-900 hover:bg-yellow-800 text-amber-50 font-serif font-bold 
                shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6)] border-2 border-[#3F291B] outline outline-1 outline-stone-900 rounded-sm active:translate-y-0.5 transition-all"
              >
                Sign Up
              </button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-300 hover:text-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-stone-800 border-t border-stone-700 pb-4 font-merriweather">
          <div className="flex flex-col space-y-2 px-4 pt-2">
            <Link
              to="/"
              className="text-stone-300 hover:text-amber-500 py-2 font-serif border-b border-stone-700"
            >
              Home
            </Link>
            <Link
              to="/languages"
              className="text-stone-300 hover:text-amber-500 py-2 font-serif border-b border-stone-700"
            >
              Languages
            </Link>
            <Link
              to="/membership"
              className="text-stone-300 hover:text-amber-500 py-2 font-serif border-b border-stone-700"
            >
              Membership
            </Link>
            <Link
              to="/dashboard"
              className="text-stone-300 hover:text-amber-500 py-2 font-serif border-b border-stone-700"
            >
              Dashboard
            </Link>
            <Link
              to="/contact"
              className="text-stone-300 hover:text-amber-500 py-2 font-serif"
            >
              Contact
            </Link>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 py-3 bg-stone-300 text-stone-900 font-bold shadow-inner">
                Login
              </button>
              <button className="flex-1 py-3 bg-yellow-900 text-stone-100 font-bold shadow-inner">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
