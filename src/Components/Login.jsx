
import axios from 'axios';
import React, { useState } from 'react';
import { addUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const mode = useSelector((store) => store.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailId, setEmailId] = useState("Goku@gmail.com");
  const [password, setPassword] = useState("Kamehameha@123");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  let loginByEnter = (e) => {
    if (e.key === 'Enter' && isLoginForm) handleLogin();
    else if (e.key === 'Enter') handleSignUp();
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className='flex justify-center items-center animate__animated animate__fadeIn h-screen'>
      <div className={`w-full max-w-md sm:w-96 shadow-xl rounded-lg p-8 border border-gray-700
        ${mode ? "bg-neutral-800" : "bg-neutral-50"} 
        transition-colors duration-500`}>
        
        <div className='text-center mb-4'>
          <h2 className={`text-2xl md:text-3xl font-bold 
            ${mode ? "text-white" : "text-gray-900"} 
            transition-colors duration-500`}>
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
        </div>

        <div className='flex flex-col gap-4'>
          {!isLoginForm && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`p-3 rounded-md border 
                  ${mode ? "bg-neutral-700 border-gray-600 text-white placeholder-gray-400" 
                         : "bg-white border-gray-300 text-gray-900 placeholder-gray-600"} 
                  transition-colors duration-500`}
              />

              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`p-3 rounded-md border 
                  ${mode ? "bg-neutral-700 border-gray-600 text-white placeholder-gray-400" 
                         : "bg-white border-gray-300 text-gray-900 placeholder-gray-600"} 
                  transition-colors duration-500`}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className={`p-3 rounded-md border 
              ${mode ? "bg-neutral-700 border-gray-600 text-white placeholder-gray-400" 
                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-600"} 
              transition-colors duration-500`}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={loginByEnter}
              className={`w-full p-3 pr-10 rounded-md border 
                ${mode ? "bg-neutral-700 border-gray-600 text-white placeholder-gray-400" 
                       : "bg-white border-gray-300 text-gray-900 placeholder-gray-600"} 
                transition-colors duration-500`}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {error && (
            <p className="text-red-500 text-sm transition-all duration-300">{error}</p>
          )}

          <button
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className={`w-full py-2 mt-2 rounded-md font-semibold 
              ${mode 
                ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                : "bg-indigo-400 text-gray-900 hover:bg-indigo-500"} 
              transition-colors duration-500 hover:scale-105`}
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>

          <p
            className={`mt-4 text-sm cursor-pointer text-center 
              ${mode ? "text-gray-300" : "text-gray-700"} 
              hover:underline transition-colors duration-500`}
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm ? "New User? Signup Here!!" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
