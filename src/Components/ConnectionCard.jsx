
import React, { useState } from 'react';
import { BASE_URL, defaultUserPhoto } from '../utils/constants';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ConnectionCard = ({ connection }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick = () => {
    setShowConfirmation(true);
  };

  const { _id, firstName, lastName, age, gender, about, photoUrl } = connection;

  const handleConfirm = async () => {
    const connectionRemoval = await axios.patch(BASE_URL + "/chat/unfriend/" + _id, {}, { withCredentials: true });
    console.log(connectionRemoval);

    alert(connectionRemoval.data);
    setShowConfirmation(false);
    window.location.reload();
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="p-4">
      <div className="bg-gray-700 shadow-lg rounded-lg overflow-hidden md:max-w-2xl mx-auto transition-transform transform ">
        <div className="flex flex-col md:flex-row items-center p-4 space-y-4 md:space-y-0 md:space-x-4">
          {/* User Image */}
          <div className="flex-shrink-0">
            <img
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              src={photoUrl ? photoUrl : defaultUserPhoto}
              alt={`${firstName} ${lastName}`}
            />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-semibold text-gray-400">{`${firstName} ${lastName}`}</h2>
            <p className="text-gray-400">{`${age}, ${gender}`}</p>
            <p className="text-gray-400 text-sm">{about}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2 mt-2 md:mt-0">
            <Link to={`/chat/${_id}`}>
              <button className=" btn btn-primary hover:scale-110">
                Chat
              </button>
            </Link>
            <button
              onClick={handleClick}
              className="btn px-4 py-2 rounded-md hover:scale-110"
            >
              Unfriend
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
  <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-10">
    <div className="bg-gray-700 p-6 rounded-md shadow-lg w-11/12 max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-300 text-center sm:text-lg">
        Remove "{firstName + " " + lastName}" from connections, are you sure?
      </h2>
      <div className="flex justify-center sm:justify-between gap-4 sm:gap-6">
        <button
          onClick={handleConfirm}
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-700 sm:px-4 sm:py-2 hover:scale-110"
        >
          Yes
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 sm:px-4 sm:py-2 hover:scale-110"
        >
          No
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default ConnectionCard;
