import axios from 'axios';
import React, { useState } from 'react'
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';



const Login = () => {
  const[error, setError] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [emailId, setEmailId] = useState("Goku@gmail.com");
  const [password, setPassword] = useState("Kamehameha@123");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = async()=>{
    try{
    const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password}, {withCredentials:true});
    dispatch(addUser(res.data.data));
    console.log(res);
    navigate("/profile");
    }catch(err){
      console.log(err?.response?.data);
    }
    
  }

  const handleLogin = async()=>{
    try{
      const res = await axios.post( BASE_URL + "/login",{emailId, password}, {withCredentials:true});
      dispatch(addUser(res.data));
      // console.log(res.data);
      navigate("/feed");

    }catch(err){
      console.log(err);
      setError(err?.response?.data);
    }
    
  }

  return (
    <div className='flex justify-center mt-10'>
      <div className="card w-96 shadow-xl bg-slate-700">
  <div className="card-body items-center text-center">
    <h2 className="card-title">{isLoginForm ? "Login" : "Sign Up"}</h2>

    {/*First Name, Last Name */}
    { !isLoginForm && (
    <>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> First Name </span>
     </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
    onChange={(e)=>{setFirstName(e.target.value)}} value={firstName}/>
</label>
    
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> Last Name </span>
     </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
    onChange={(e)=>{setLastName(e.target.value)}} value={lastName}/>
</label>
    </>
    )}

    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> Email ID :</span>
     </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
    onChange={(e)=>{setEmailId(e.target.value)}} value={emailId}/>
</label>  

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Password :  </span>
     </div>
  <input type={ showPassword ? "text" : "password"} placeholder="Type here" className="input input-bordered w-full max-w-xs" 
  onChange={(e)=>{setPassword(e.target.value)}} value={password} />

   <span className='Show/Hide-Password-Label hover:underline cursor-pointer text-end'
     onClick={()=>{setShowPassword(!showPassword)}}
     >{showPassword ? "Hide-Password" : "Show-Password"}</span>
  

  <p className='text-lg text-red-500 mt-2'> {error} </p>  
</label>  
  
    <div className="card-actions">

     { isLoginForm && <button className="btn btn-primary" onClick={handleLogin}>Login</button> }

      { !isLoginForm && <button className="btn btn-primary" onClick={handleSignUp}>Sign  Up</button> }
    </div>
    <p className='cursor-pointer hover:underline 'onClick={()=>{setIsLoginForm(!isLoginForm)}}>{ isLoginForm ? "New User? Signup Here!!" : "Existing User? Login Here"}</p>
    
  </div>
</div>
    </div>
  )
}

export default Login