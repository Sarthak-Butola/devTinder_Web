
import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import { removeUsers } from '../utils/searchSlice';

const DeleteProfile = () => {
  const mode = useSelector((store) => store.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deletionMessage, setDeletionMessage] = useState("");
  const [error, setError] = useState("");

  const handleDeletion = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your profile? This action is permanent."
    );
    if (!confirmed) {
      return; // User clicked "No"
    }
    try {
      let deleteProfile = await axios.patch(
        BASE_URL + "/profile/delete/User",
        { confirmation: deletionMessage },
        { withCredentials: true }
      );

      console.log(deleteProfile);
      // IF PROFILE HAS BEEN DELETED SUCCESSFULLY THEN SIMPLY LOGOUT
      if (deleteProfile.data === "User has been deleted successfully") {
        dispatch(removeUser());
        dispatch(removeUsers());
        // navigate to login page
        navigate("/login");
        alert("Account deleted successfully!");
      } else if (deleteProfile.data === "confirmation message is not correct") {
        setError(deleteProfile.data);
      }

      console.log(deleteProfile);
    } catch (err) {
      console.log(err);
      alert(
        "Some error occured while trying to delete your account. Kindly try again later."
      );
    }
  };

  return (
    <div
      className={`m-auto md:w-1/2 p-5 rounded-lg text-center mt-5
        ${mode ? 'bg-slate-950 text-gray-200' : 'bg-neutral-50 text-gray-900'}
        shadow-lg transition-colors duration-500
      `}
    >
      <h1 className="text-red-500 text-3xl mb-4">Account Deletion!</h1>
      <p>
        We're sorry to see you go! To delete your account, please confirm by
        typing:
      </p>
      <span> "I WILLINGLY AGREE TO DELETE MY PROFILE PERMANENTLY" in the box below.</span>
      <textarea
        className={`mt-4 w-full p-3 rounded-md duration-500
          ${mode ? 'bg-slate-800 text-gray-200 placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}
          border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300
        `}
        placeholder="Type the message above to confirm"
        rows="4"
        cols="50"
        onChange={(e) => {
          setDeletionMessage(e.target.value);
        }}
        value={deletionMessage}
      ></textarea>
      <br />
      {/* Error message if any */}
      {error && <p className="text-2xl text-red-500 mt-2">[{error}]</p>}

      <button
        className="btn btn-outline hover:bg-red-600 mr-10 m-2 transition-transform hover:scale-105 "
        onClick={() => {
          handleDeletion();
        }}
      >
        Confirm Deletion!
      </button>

      <p className="text-red-500 text-xl">
        Please note that deleted Profile can never be recovered again!!
      </p>
    </div>
  );
};

export default DeleteProfile;
