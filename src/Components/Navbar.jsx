import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import appStore from '../utils/appStore'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { removeUser } from '../utils/userSlice' 

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store)=>store.user);
  const navigate = useNavigate();
  
  
 //this removes cookie from user's browser
 const handleLogout = async()=>{
  try{
  const logOut = await axios.post(BASE_URL + '/logout',{},{withCredentials:true});
  //this removes info from userSlice
  dispatch(removeUser());
  //navigate to login page
    navigate("/login");

  }catch(err){
    console.log(err);
  }
 }
  
 
  // console.log(user);

  return (
    <div>
      
      <div className="navbar bg-base-300">
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost text-xl">💻DevTinder</Link>
  </div>
  <div className="flex-none gap-2 mx-5">
    <div className="form-control">
      
    </div>

    {/* Only showing pic if present in the slice/ after userInfo retrieval from backend/DB */}
    {user && (<div className="dropdown dropdown-end flex">
      <p className='my-2 pr-5'>Welcome {user.firstName} </p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Photo"
            src={user.photoUrl}
             />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge bg-slate-700">New</span>
          </Link>
        </li>
        <li><Link to={'/connections'}>Connections</Link></li>
        <li><Link to={"/requests"}>Requests</Link></li>
        <li>
          <Link to="/searchPage" className="justify-between">
            Search
            <span className="badge  bg-slate-700">Premium!</span>
          </Link>
        </li>
        <li><Link to={"/feed"}>{"Find Devs " + " :)"}  </Link></li>
        <li><Link onClick={handleLogout}>Logout</Link></li>
    
      </ul>
    </div> )}
    

  </div>
</div>

    </div>
  )
}

export default Navbar
