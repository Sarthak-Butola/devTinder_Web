import React from 'react'
import { defaultUserPhoto } from '../utils/constants';
import { Link } from 'react-router-dom';

const ConnectionCard = ({connection}) => {
    const {_id ,firstName, lastName, age, gender, skills, about, photoUrl} = connection;

  return (
     
    <div className='p-2 text-gray-400'>
      
      <div className="card card-side bg-slate-700 shadow-xl w-1/2 m-auto mt-2 h-32 overflow-y-auto  ">
  <figure className='p-2'>
     <img className='rounded-full w-full h-24'
      src={photoUrl ? photoUrl :defaultUserPhoto }
      alt="User Pic"/>
  </figure>
  <div className="card-body flex text-left">
    <h2 className="card-title ">{firstName + " " + lastName}</h2>
    <p>{age + ", " + gender}</p>
    <p>{about}</p>
  </div>
  <div className='flex flex-col justify-center pr-2'>
    <Link to={"/chat/" + _id}>
     <button className="btn btn-primary mr-10">Chat</button>
     </Link>
 
  </div>
  
</div>
    </div>

  )
}

export default ConnectionCard
