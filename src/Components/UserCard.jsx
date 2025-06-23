
import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL, BASE_URL1, defaultUserPhoto } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';


const UserCard = ({ user }) => {
  const { firstName, lastName, age, skills, photoUrl, gender, about, _id } = user;
  const dispatch = useDispatch();
  const [toast, setToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Sent connection request successfully..!!");

  const [animationClass, setAnimationClass] = useState('');
  const mode = useSelector((store) => store.mode);

  const handleUser = async (status, toUserId, direction) => {
    try {
      const res = await axios.post(
        BASE_URL1 + '/request/send/' + status + '/' + toUserId,
        {},
        { withCredentials: true }
      );
      setToast(true);
      setTimeout(() => setToast(false), 3000);

      dispatch(removeFeed(toUserId));
      setAnimationClass(direction);
      setTimeout(() => setAnimationClass(''), 300);

    } catch (err) {
      console.log(err);
      //setting error msg and showing toast msg
      setErrorMsg(err?.response?.data);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    }
  };

  return (
    user && (
      <div className={`transition-all duration-500 ease-in-out transform ${animationClass}`}>
        <div
          className={`w-96 m-auto my-14 rounded-2xl overflow-hidden duration-500 border border-gray-600 ${
            mode
              ? 'bg-slate-950 text-slate-100'
              : 'bg-neutral-50 text-gray-900 shadow-md hover:shadow-lg'
          }`}
        >
          <figure className="h-52 rounded-t-2xl overflow-hidden relative">
            <img
              className="w-full h-full object-cover object-center"
              src={photoUrl ? photoUrl : defaultUserPhoto}
              alt={`${firstName}'s photo`}
            />  
          </figure>

          <div className="p-6 space-y-3">
            
            <h2
  className={`text-2xl font-semibold tracking-wide ${
    mode ? 'text-slate-100' : 'text-gray-900'    
  }`}
>
  {firstName + ' ' + lastName}
</h2>
            <p
              className={`text-base font-medium opacity-80 ${
                mode ? 'text-slate-300' : 'text-gray-700'
              }`}
            >
              {age + ', ' + gender}
            </p>

            <p
              className={`text-sm font-medium uppercase tracking-wide opacity-70 ${
                mode ? 'text-slate-400' : 'text-gray-600'
              }`}
            >
              {about.length > 90 ? `${about.slice(0, 90)}...` : about}
            </p>

            <p
              className={`text-sm font-medium uppercase tracking-wide opacity-70 ${
                mode ? 'text-slate-400' : 'text-gray-600'
              }`}
            >
              Skills: {skills.length > 60 ? `${skills.slice(0, 60)}...` : skills}
            </p>

            <div className="pt-4 flex justify-evenly gap-4">
              <button
                className={`px-5 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  mode
                    ? 'bg-transparent border border-red-400 text-red-400 hover:bg-red-500 hover:text-white'
                    : 'bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                }`}
                onClick={() => handleUser('ignore', _id, '-translate-x-full opacity-0')}
              >
                Ignore
              </button>

              <button
                className={`px-5 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  mode
                    ? 'bg-transparent border border-green-400 text-green-400 hover:bg-green-500 hover:text-white'
                    : 'bg-white border border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                }`}
                onClick={() =>handleUser('interested', _id, 'translate-x-full opacity-0')}
              >
                Interested
              </button>
            </div>
          </div>
        </div>

        {toast && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert alert-info">
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

      </div>
    )
  );
};

export default UserCard;
