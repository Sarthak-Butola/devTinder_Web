import React, { useState } from 'react';
import { BASE_URL1, defaultUserPhoto } from '../utils/constants';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeConnections } from '../utils/connectionSlice';

const ConnectionCard = ({ connection }) => {
  const dispatch = useDispatch();
  const mode = useSelector((store) => store.mode);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleClick = () => setShowConfirmation(true);
  const handleImageClick = () => setShowImageModal(true);
  const handleModalClose = (e) => {
    if (e.target.id === 'modalOverlay') setShowImageModal(false);
  };

  const { _id, firstName, lastName, age, gender, about, photoUrl } = connection;

  const handleConfirm = async () => {
    try {
      await axios.patch(
        `${BASE_URL1}/chat/unfriend/${_id}`,
        {},
        { withCredentials: true }
      );
      setShowConfirmation(false);
      dispatch(removeConnections(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => setShowConfirmation(false);

  return (
    <>
      {/* Image Modal */}
      {showImageModal && (
        <div
          id="modalOverlay"
          onClick={handleModalClose}
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
        >
          <div className="w-3/4 sm:w-1/2 md:w-1/3 max-w-md">
            <img
              src={photoUrl || defaultUserPhoto}
              alt={`${firstName} ${lastName}`}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Connection Card */}
      <div className="p-4">
        <div
          className={`rounded-xl border border-gray-700 overflow-hidden transition duration-300 ease-in-out md:max-w-2xl mx-auto hover:scale-[1.01] ${
            mode ? 'bg-slate-950' : 'bg-neutral-50 shadow-md shadow-slate-300'
          }`}
        >
          <div className="flex items-center justify-between gap-4 p-4 flex-wrap sm:flex-nowrap">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                onClick={handleImageClick}
                src={photoUrl || defaultUserPhoto}
                alt={`${firstName} ${lastName}`}
                className="w-20 h-20 rounded-full object-cover cursor-pointer border-2 border-gray-300 dark:border-slate-600"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-left min-w-[150px]">
              <h2
                className={`text-base font-semibold tracking-tight ${
                  mode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {firstName} {lastName}
              </h2>
              <p
                className={`text-sm ${
                  mode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {`${age}, ${gender}`}
              </p>
              {/* Hide about on small screens */}
              <p
                className={`mt-1 text-sm leading-snug ${
                  mode ? 'text-gray-300' : 'text-gray-700'
                } hidden sm:block`}
              >
                {about}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 sm:items-end w-full sm:w-auto sm:flex-nowrap">
              <Link to={`/chat/${_id}`}>
                <button className="btn btn-primary btn-sm w-full sm:w-auto hover:scale-105 transition">
                  Chat
                </button>
              </Link>
              <button
                onClick={handleClick}
                className="btn btn-outline btn-sm w-full sm:w-auto hover:scale-105 transition"
              >
                Unfriend
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-center text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Remove "{firstName + ' ' + lastName}" from connections?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectionCard;
