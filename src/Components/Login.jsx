
import axios from 'axios';
import React, { useState } from 'react'
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import FontAwesome icons

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

  const handleSignUp = async() => {
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data);
    }
  }

  const handleLogin = async() => {
    try {
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data);
    }
  }

  return (
    <div className='flex justify-center mt-5 animate__animated animate__fadeIn '>
      <div className="card w-full max-w-md shadow-xl bg-slate-700 sm:w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl md:text-3xl">{isLoginForm ? "Login" : "Sign Up"}</h2>

          {/* First Name, Last Name */}
          { !isLoginForm && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text"> First Name </span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
                  onChange={(e) => { setFirstName(e.target.value) }} value={firstName} />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text"> Last Name </span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
                  onChange={(e) => { setLastName(e.target.value) }} value={lastName} />
              </label>
            </>
          )}

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text"> Email ID :</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
              onChange={(e) => { setEmailId(e.target.value) }} value={emailId} />
          </label>

          <label className="form-control w-full max-w-xs relative">
            <div className="label">
              <span className="label-text">Password :</span>
            </div>
            <input type={showPassword ? "text" : "password"} placeholder="Type here" className="input input-bordered w-full max-w-xs pr-10" 
              onChange={(e) => { setPassword(e.target.value) }} value={password} />

            {/* Eye icon positioned at the right, vertically centered */}
            <p className='absolute right-3 top-3/4 transform -translate-y-1/2 cursor-pointer ' 
              onClick={() => { setShowPassword(!showPassword) }}>
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </p>
          </label>
          <p className='text-lg text-red-500 mt-2'>{error}</p>

          <div className="card-actions">
            {isLoginForm && <button className="btn btn-primary transition duration-200 hover:scale-105" onClick={handleLogin}>Login</button>}
            {!isLoginForm && <button className="btn btn-primary transition duration-200 hover:scale-105" onClick={handleSignUp}>Sign Up</button>}
          </div>

          {/* Smooth toggle link */}
          <p className='cursor-pointer hover:underline' onClick={() => { 
            setIsLoginForm(!isLoginForm);
          }}>
            {isLoginForm ? "New User? Signup Here!!" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

