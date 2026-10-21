import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X, LogOut, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectIsAuthenticated, selectCurrentUser } from "../../redux/slices/authSlice";
import { selectCurrentStep, nextStep } from "../../redux/slices/tutorialSlice";
import logo from "../../assets/images/MainLogo(1).png";
import { useGetUserDashboardQuery } from "../../redux/api/userApi"; // Added import

const ActiveFlagSVG = () => (
  <svg
    className="absolute -top-4 left-1/2 -translate-x-1/2 -z-10 drop-shadow-lg w-full h-[100px] fill-"
    viewBox="0 0 102 122"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path d="M0 0H102V122C72.5 97.6992 32 97.6992 0 122V0Z" fill="#80CBC4" />
  </svg>
);

const NavItem = ({ to, children, id, onClick }) => (
  <NavLink
    to={to}
    id={id}
    onClick={onClick}
    className={({ isActive }) =>
      `relative px-4 py-2 text-base font-medium font-serif transition-colors duration-200 
      ${isActive ? "text-amber-100" : "text-black hover:text-[#b83b3b]"}`
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
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const currentStep = useSelector(selectCurrentStep);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Added hook: Fetches user profile globally when logged in, ensuring the avatar loads on any route.
  useGetUserDashboardQuery(undefined, {
    skip: !isAuthenticated,
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsOpen(false);
  };

  return (
   <nav className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-[#f5f5f4] to-[#e7e5e4] backdrop-blur-xs shadow-xl border-b border-stone-300">
  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2C7A7B] via-[#4FD1C5] to-[#2C7A7B] opacity-80" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <img src={logo} alt="" />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1 font-merriweather">
            <NavItem className="text-black" to="/">Home</NavItem>
            <NavItem 
              className="text-black" 
              to="/languages"
              id="tour-nav-languages"
              onClick={() => { if (currentStep === 1) dispatch(nextStep()); }}
            >
              Languages
            </NavItem>
            <NavItem className="text-black" to="/membership">Membership</NavItem>
            <NavItem className="text-black" to="/community">Community</NavItem>
            {isAuthenticated && <NavItem className="text-black" to="/dashboard">Dashboard</NavItem>}
            <NavItem className="text-black" to="/contact">Contact</NavItem>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <button className="w-28 h-12 flex justify-center items-center bg-stone-200 hover:bg-white text-stone-900 font-serif font-bold shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4)] border-1  outline outline-3 outline-[#DBDBDB]  rounded-sm active:translate-y-0.5 transition-all">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-28 h-12 flex justify-center items-center bg-teal-200 hover:bg-teal-800 text-black font-serif font-bold shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6)] border-1  outline outline-3 outline-[#DBDBDB] rounded-sm active:translate-y-0.5 transition-all">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-black font-serif">
                  <div className="w-10 h-10 rounded-full bg-stone-700 border-2 border-[#FCD669] flex items-center justify-center overflow-hidden shrink-0">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user?.name || "Profile"} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={20} className="text-stone-300" />
                    )}
                  </div>
                  <span className="max-w-[100px] truncate">{user?.name || "Member"}</span>
                </div>
                <button onClick={handleLogout} className="px-4 h-12 flex items-center gap-2 bg-red-900/80 hover:bg-red-800 text-red-100 font-serif font-bold border-2 border-red-950 rounded-sm transition-all">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
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
            <Link to="/" onClick={() => setIsOpen(false)} className="text-stone-300 hover:text-amber-500 py-2 font-serif border-b border-stone-700">Home</Link>
            <Link to="/languages" onClick={() => setIsOpen(false)} className="text-stone-300 hover:text-amber-500 py-2 font-serif border-b border-stone-700">Languages</Link>
            <Link to="/membership" onClick={() => setIsOpen(false)} className="text-stone-300 hover:text-amber-500 py-2 font-serif border-b border-stone-700">Membership</Link>
            <Link to="/community" onClick={() => setIsOpen(false)} className="text-stone-300 hover:text-amber-500 py-2 font-serif border-b border-stone-700">Community</Link>
            {isAuthenticated && (
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-stone-300 hover:text-amber-500 py-2 font-serif border-b border-stone-700">Dashboard</Link>
            )}
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-stone-300 hover:text-amber-500 py-2 font-serif">Contact</Link>

            <div className="flex gap-4 pt-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                    <button className="w-full py-3 bg-stone-300 text-stone-900 font-bold shadow-inner">Login</button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={() => setIsOpen(false)}>
                    <button className="w-full py-3 bg-yellow-900 text-stone-100 font-bold shadow-inner">Sign Up</button>
                  </Link>
                </>
              ) : (
                <button onClick={handleLogout} className="flex-1 py-3 bg-red-900 text-white font-bold shadow-inner flex justify-center items-center gap-2">
                  <LogOut size={18} /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;