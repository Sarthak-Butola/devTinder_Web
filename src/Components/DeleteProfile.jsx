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
    const [error, setError] = useState("");

    const handleDeletion = async()=>{
      const confirmed = window.confirm("Are you sure you want to delete your profile? This action is permanent.");
      if (!confirmed) {
          return; //User clicked "No"
      }
      try{
        let deleteProfile = await axios.patch(BASE_URL + "/profile/delete/User",
            {confirmation:deletionMessage},{withCredentials:true});

            console.log(deleteProfile);
            //IF PROFILE HAS BEEN DELETED SUCCESSFULLLY THEN SIMPLY LOGOUT
            if(deleteProfile.data == "User has been deleted successfully"){
            dispatch(removeUser());
            // navigate to login page
            navigate("/login");
            alert("Account deleted successfully!")
            }
            else if(deleteProfile.data == "confirmation message is not correct"){
              setError(deleteProfile.data);
            }

        // CHECK WHAT ERROR IS LIKE ERR.MESSAGE OR WHAT AND SET ACCORDINGLY IN THE CATCH BLOCK
        console.log(deleteProfile);
          }catch(err){
            console.log(err);
             alert("Some error occured while trying to delete your account.Kindly try again later.");
          }
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
      <textarea className='mt-4 w-full p-3 bg-black'
        placeholder="Type the message above to confirm"
        rows="4"
        cols="50"
        onChange={(e)=>{
            setDeletionMessage(e.target.value);
        }}
        
      ></textarea>
      <br />
      {/* Error message if any */}
      {error && 
      <p className='text-2xl text-red-500'> [{error}] </p>
      }
      
      <button className="btn btn-outline hover:bg-red-600  mr-10 m-2"
      onClick={()=>{
        handleDeletion()
    }}
      >Confirm Deletion!</button>
      
      <p className='text-red-500 text-xl'>Please note that deleted Profile can never be recovered again!!</p>
    </div>

    </div>
  )
}

export default DeleteProfile
