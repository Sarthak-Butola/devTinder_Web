import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';

const DeleteProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deletionMessage,setDeletionMessage] = useState("");

    const handleDeletion = async()=>{
        let deleteProfile = await axios.patch(BASE_URL + "/profile/delete/User",
            {confirmation:deletionMessage},{withCredentials:true});

            console.log(deleteProfile);
            //IF PROFILE HAS BEEN DELETED SUCCESSFULLLY THEN SIMPLY LOGOUT
            if(deleteProfile.data == "User has been deleted successfully"){
            dispatch(removeUser());
            // navigate to login page
            navigate("/login");
            }

        console.log(deleteProfile);

        // alert("Account deleted")
    }

  return (
    <div>

<div className="account-deletion-container m-auto md:w-1/2 bg-slate-700 p-5 rounded-lg text-center mt-5">
      <h1 className='text-red-500 text-3xl mb-4'>Account Deletion!</h1>
      <p>
        We're sorry to see you go! To delete your account, please confirm by
        typing :
      </p>
      <span> "I WILLINGLY AGREE TO DELETE MY PROFILE PERMANENTLY" in the box below.</span>
      <textarea className='mt-4 w-full p-3'
        placeholder="Type the message above to confirm"
        rows="4"
        cols="50"
        onChange={(e)=>{
            setDeletionMessage(e.target.value);
        }}
        
      ></textarea>
      <br />
      <button className="btn btn-outline hover:bg-red-600  mr-10 m-2"
      onClick={()=>{
        handleDeletion()
    }}
      >Confirm Deletion!</button>
      <p className='text-red-500'>Please note that deleted Profile can never be recovered again!!</p>
    </div>

    </div>
  )
}

export default DeleteProfile
