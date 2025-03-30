
import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL, defaultUserPhoto } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const { firstName, lastName, age, skills, photoUrl, gender, about, _id } = user;
  const dispatch = useDispatch();

  // State to handle animation classes
  const [animationClass, setAnimationClass] = useState('');

  const handleUser = async (status, toUserId, direction) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/send/' + status + '/' + toUserId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(toUserId));

      // Set animation class based on the direction
      setAnimationClass(direction);

      // Optionally reset the animation after it completes
      setTimeout(() => setAnimationClass(''), 300); // Adjust time as needed
    } catch (err) {
      console.log(err);
    }
  };

  return (
    user && (
      <div
        className={`transition-all duration-500 ease-in-out transform ${animationClass}`}
      >
        <div className="card card-compact w-96 shadow-xl m-auto my-10 bg-slate-700 ">
          <figure className="h-48">
            <img
              className="p-2 rounded-xl max-w-full max-h-full "
              src={photoUrl ? photoUrl : defaultUserPhoto}
              alt="UserImage"
            />
          </figure>
          <div className="card-body text-gray-400 overflow">
            <h2 className="card-title">{firstName + ' ' + lastName}</h2>
            <p>{age + ', ' + gender}</p>
            <p>{about}</p>
            <p>skills: {skills}</p>
            <div className="card-actions justify-evenly ">
              <button
                className="btn btn-primary "
                onClick={() => {
                  handleUser('ignore', _id, '-translate-x-full opacity-0');
                }}
              >
                Ignored
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  handleUser('interested', _id, 'translate-x-full opacity-0');
                }}
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
