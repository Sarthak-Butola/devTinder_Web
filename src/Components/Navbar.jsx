
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'
import { changeMode } from '../utils/modeSlice'

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const mode = useSelector((store) => store.mode);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to logout?");
      if (!confirmed) return;

      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className='pb-16'>
      <div className={`navbar fixed z-10 transition-colors duration-500
        ${mode ? 'bg-slate-950 text-slate-200 shadow-slate-700 shadow-sm' : 'bg-white text-gray-900 shadow-md'}`}>
        
        {user && (
          <div className="flex-1">
            <Link
              to="/feed"
              className={`btn btn-ghost text-xl font-semibold tracking-wide
                ${mode ? 'text-slate-200 hover:text-indigo-400' : 'text-gray-900 hover:text-indigo-600'}`}
            >
              DevTinder
            </Link>
          </div>
        )}

        {/* MODE TOGGLE BUTTON */}
        <button
          className={`btn btn-outline btn-circle transition-colors duration-300
            ${mode
              ? 'border-slate-400 text-slate-300 hover:bg-slate-200 hover:border-indigo-500'
              : 'border-gray-400 text-gray-700 hover:bg-gray-700 hover:text-slate-300 hover:border-indigo-500'}`}
          onClick={() => {
            dispatch(changeMode());
          }}
          aria-label="Toggle Dark Mode"
          title="Toggle Dark Mode"
        >
          {mode ? (
    // Light mode active: show sun icon
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m8.485-8.485h1M3 12H2m15.364 6.364l.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M12 7a5 5 0 100 10 5 5 0 000-10z"
      />
    </svg>
  ) : (
    // Dark mode active: show moon icon
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="none"
    >
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
    </svg>
  )}
        </button>

        <div className="flex-none gap-2 mx-5 items-center flex">
          {user && <p className={`font-medium ${mode ? 'text-slate-300' : 'text-gray-700'}`}>{user?.firstName}</p>}

          {/* {user && (
            <div className="w-10 h-10 rounded-full overflow-hidden ml-3 border-2"
              style={{ borderColor: mode ? '#94a3b8' : '#d1d5db' }}>
              <img className="w-full h-full object-cover" alt="User Photo" src={user.photoUrl} />
            </div>
          )} */}

          {user && (
            <button
              onClick={toggleSidebar}
              className={`btn btn-ghost text-xl ml-3 transition-colors duration-300
                ${mode ? 'text-slate-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'}`}
              aria-label="Toggle Menu"
            >
              ☰
            </button>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full z-[10] transition-transform duration-300 transform
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          ${mode ? 'bg-slate-800 text-slate-200' : 'bg-white text-gray-900 shadow-lg'}`}
        style={{ width: '250px' }}
      >
        <div className="flex justify-between items-center p-4 border-b"
          style={{ borderColor: mode ? '#475569' : '#e5e7eb' }}>
          <p className="pl-2 font-semibold text-lg">Menu</p>
          <button
            onClick={toggleSidebar}
            className={`text-xl rounded-sm p-2 transition-colors duration-300
              ${mode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}
            aria-label="Close Menu"
          >
            ×
          </button>
        </div>

        <div className="menu menu-sm p-4 space-y-3 flex flex-col">
          {[
            { to: "/profile", label: "Profile", badge: "New", badgeClass: "bg-slate-700" },
            { to: "/searchPage", label: "Search", badge: "Premium!", badgeClass: "bg-slate-700" },
            { to: "/feed", label: "Find Devs :)", badge: null },
            { to: "/connections", label: "Connections & Chat", badge: null },
            { to: "/requests", label: "Requests", badge: null },
          ].map(({ to, label, badge, badgeClass }) => (
            <li key={to}>
              <Link
                to={to}
                className={`py-2 px-4 rounded-md transition-transform duration-300 hover:scale-105
                  ${mode
                    ? 'hover:bg-slate-700 text-slate-200'
                    : 'hover:bg-gray-200 text-gray-900'}`}
                onClick={closeSidebar}
              >
                {label} {badge && <span className={`badge ml-2 ${badgeClass}`}>{badge}</span>}
              </Link>
            </li>
          ))}

          <li>
            <Link
              to="/deleteProfile"
              className="text-red-500 py-2 px-4 rounded-md transition-transform duration-300 hover:bg-red-600 hover:text-white hover:scale-105"
              onClick={closeSidebar}
            >
              Delete Profile!
            </Link>
          </li>

          <li>
            <button
              onClick={() => {
                closeSidebar();
                handleLogout();
              }}
              className={`w-full text-left py-2 px-4 rounded-md transition-transform duration-300 hover:scale-105
                ${mode ? 'text-red-400 hover:bg-red-700 hover:text-white' : 'text-red-600 hover:bg-red-100'}`}
            >
              Logout
            </button>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
