// {
import React, { useState } from 'react'
import { BASE_URL, defaultUserPhoto } from '../utils/constants';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ConnectionCard = ({connection}) => {

 const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick = () => {
    setShowConfirmation(true);
  };

    const {_id ,firstName, lastName, age, gender, skills, about, photoUrl} = connection;

    const handleConfirm = async () => {
      //if confirmed yes then api call is made to remove friend and their char from db
      const connectionRemoval = await axios.patch(BASE_URL + "/chat/unfriend/" + _id, {}, {withCredentials:true});
      console.log(connectionRemoval); 
  
      alert(connectionRemoval.data);
      setShowConfirmation(false);
      //reloads page which shows updated connection list
      window.location.reload();
    };
  
    const handleCancel = () => {
      setShowConfirmation(false);
    };


  return (
     
    <div className='p-2 text-gray-400'>
      
      <div className="card card-side bg-slate-700 shadow-xl w-1/2 m-auto mt-2 h-32  ">
  <figure className='p-2 w-1/3'>
     <img className='rounded-full w-fit h-24'
      src={photoUrl ? photoUrl :defaultUserPhoto }
      alt="User Pic"/>
  </figure>
  <div className="card-body flex text-left overflow-auto ">
    <h2 className="card-title ">{firstName + " " + lastName}</h2>
    <p>{age + ", " + gender}</p>
    <p>{about}</p>
  </div>
  <div className='flex flex-col justify-center ml-2 mr-5'>
    <Link to={"/chat/" + _id}>
     <button className="btn btn-primary mb-2">Chat</button>
     </Link>
     <button className='btn' onClick={handleClick} >Unfriend</button>


     {showConfirmation && (
  <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-10">
    <div className="bg-gray-700 p-6 rounded-md shadow-lg w-11/12 max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-300 text-center sm:text-lg">
        Remove "{firstName + " " + lastName}" from connections, are you sure?
      </h2>
      <div className="flex justify-center sm:justify-between gap-4 sm:gap-6">
        <button
          onClick={handleConfirm}
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-700 sm:px-4 sm:py-2"
        >
          Yes
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 sm:px-4 sm:py-2"
        >
          No
        </button>
      </div>
    </div>
  </div>
)}



  </div>
  
</div>
    </div>

  )
}

export default ConnectionCard
// }



