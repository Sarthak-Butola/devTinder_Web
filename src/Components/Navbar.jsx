import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar open/close state
  
  // this removes cookie from user's browser
  const handleLogout = async () => {
    try {
      
      const confirmed = window.confirm("Are you sure you want to logout?");
      if (!confirmed) return;

      const logOut = await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      // this removes info from userSlice
      dispatch(removeUser());
      // navigate to login page
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close the sidebar when an option is clicked
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className='pb-16' >
      <div className="navbar bg-base-300 fixed z-10">

      {user &&
        <div className="flex-1">
          <Link to="/feed" className="btn btn-ghost text-xl">💻DevTinder</Link>
        </div>
          }

        <div className="flex-none gap-2 mx-5">
        {user &&
          <p className="text-white">{user?.firstName}</p>
        }

  {user && 
  <div className="w-10 h-10 rounded-full overflow-hidden">
  <img className="w-full h-full object-cover" alt="User Photo" src={user.photoUrl} />
  </div>
  }

        
        { user &&
          <div className="form-control">
            {/* Sidebar Toggle Button */}
            
            <button
              onClick={toggleSidebar}
              className="btn btn-ghost text-xl"
            > 
              ☰
            </button>
          </div>
          }

        </div>
      </div>

      {/* Sidebar */}
      
        <div
          className={`fixed top-0 right-0 h-full bg-slate-800 z-[10] transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          
          <div className="flex justify-between items-center p-4">
            <p className="text-white pl-2"> Menu </p>
            <button
              onClick={toggleSidebar}
              className="text-white text-xl hover:bg-gray-600  rounded-sm p-2"
            >
              ☰
            </button>
          </div>
          
          <div className="menu menu-sm p-2 space-y-2 flex-col">
            <li>
              <Link to="/profile" className="text-white py-2 px-4 rounded-md transition-transform duration-300 hover:bg-slate-600 hover:scale-105" onClick={closeSidebar}>
                Profile <span className="badge bg-slate-700">New</span>
              </Link>
            </li>

            <li>
              <Link to="/searchPage" className="text-white py-2 px-4 rounded-md transition-transform duration-300 hover:bg-slate-600 hover:scale-105" onClick={closeSidebar}>
                Search <span className="badge bg-slate-700">Premium!</span>
              </Link>
            </li>

            <li>
              <Link to="/feed" className="text-white py-2 px-4 rounded-md transition-transform duration-300 hover:bg-slate-600 hover:scale-105" onClick={closeSidebar}>{"Find Devs :)"}</Link>
            </li>

            <li>
              <Link to="/connections" className="text-white py-2 px-4 rounded-md transition-transform duration-300 hover:bg-slate-600 hover:scale-105" onClick={closeSidebar}>Connections & Chat</Link>
            </li>
            <li>
              <Link to="/requests" className="text-white py-2 px-4 rounded-md transition-transform duration-300 hover:bg-slate-600 hover:scale-105" onClick={closeSidebar}>Requests</Link>
            </li>
           
          
            <li className=''>
              <Link to="/deleteProfile" className="text-red-500 py-2 px-4 rounded-md transition-transform duration-300 
               hover:bg-slate-600 hover:scale-105" onClick={closeSidebar}>Delete Profile!</Link>
            </li>
            <li>
              <Link onClick={() => { closeSidebar(); handleLogout(); }} className="text-red-500 py-2 px-4 rounded-md transition-transform duration-300 hover:bg-slate-600 hover:scale-105">Logout</Link>
            </li>
          </div>
        </div>
    </div>
  );
};

export default Navbar;
