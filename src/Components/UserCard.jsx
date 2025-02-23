import axios from 'axios';
import React from 'react'
import { BASE_URL, defaultUserPhoto } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {

  const {firstName, lastName, age, skills, photoUrl, gender, about, _id} = user;
  
  const dispatch = useDispatch();

  const handleUser = async(status, toUserId)=>{
    try{
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/"  + toUserId, {}, {withCredentials:true});
      dispatch(removeFeed(toUserId));
      // console.log(res);
    }catch(err){
     console.log(err);
    }
   
  }

  
    
  return (
    user && (
    <div>
         
<div className="card card-compact w-96 shadow-xl m-auto my-10 bg-slate-200">
<figure>
  <img className='p-2 '
    src={photoUrl? photoUrl : defaultUserPhoto}
    alt="UserImage" />
</figure>
<div className="card-body">
  <h2 className="card-title">{firstName + " " + lastName}</h2>
  <p>{age + ", " + gender}</p>
  <p>{about}</p>
  <p>skills: {skills}</p>
  <div className="card-actions justify-evenly ">
    <button className="btn btn-primary " onClick={()=>{handleUser("ignore", _id)}}>Ignored</button>

    <button className="btn btn-secondary" onClick={()=>{handleUser("interested", _id)}}>Interested</button>
  </div>
</div>
</div>

    </div>
    )
  )
}

export default UserCard


