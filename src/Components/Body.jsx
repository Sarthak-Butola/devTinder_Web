import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'
import ErrorPage from './ErrorPage'


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user =useSelector(store=>store.user)

  const fetchUser = async()=>{
    try{
      if(user) return;
      const userData = await axios.get(BASE_URL + "/profile", {withCredentials:true});
      // console.log(userData.data);
      //update the userSlice
      dispatch(addUser(userData.data));
  
    }catch(err){
      if(err.status === 401){ 
        //token not present so redirected to login page
        navigate("/login");
      }
      else{
        //for any other error(s); redirected to error page
        navigate("/errorPage");
      }
    }

  }

  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <div>
      <Navbar/>
      <Outlet/>
      {/* <Footer/> */}
    </div>
  )
}

export default Body