import React from 'react'
import { defaultUserPhoto } from '../utils/constants';

const ConnectionCard = ({connection}) => {
    const {firstName, lastName, age, gender, skills, about, photoUrl} = connection;

  return (
    <div className='p-2'>
      
      <div className="card card-side bg-slate-300 shadow-xl w-1/2 m-auto mt-2">
  <figure className='p-2'>
      <img className='rounded-full w-full h-40 '
      src={photoUrl ? photoUrl :defaultUserPhoto }
      alt="User Pic"/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <p>{age + ", " + gender}</p>
    <p>{about}</p>
    <div className="card-actions justify-end">
      
    </div>
  </div>
</div>

    </div>
  )
}

export default ConnectionCard
