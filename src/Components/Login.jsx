import axios from 'axios';
import React, { useState } from 'react'
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';



const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("Goku@gmail.com");
  const [password, setPassword] = useState("Kamehameha@123");

  const handleLogin = async()=>{
    try{
      const res = await axios.post( BASE_URL + "/login",{emailId, password}, {withCredentials:true});
      dispatch(addUser(res.data));
      console.log(res.data);
      navigate("/feed");

    }catch(err){
      console.log(err);
    }
    
  }

  return (
    <div className='flex justify-center mt-10'>
      <div className="card w-96 shadow-xl bg-slate-300">
  <div className="card-body items-center text-center">
    <h2 className="card-title">Login</h2>

    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> Email ID? </span>
     </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
    onChange={(e)=>{setEmailId(e.target.value)}} value={emailId}
      
  />
  <div className="label">
  </div>
</label>  

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Password</span>
     </div>
  <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
  onChange={(e)=>{setPassword(e.target.value)}} value={password} />
  <div className="label">
  </div>
</label>  
  
    <div className="card-actions">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login