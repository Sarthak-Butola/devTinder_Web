import React from 'react'
import { BASE_URL, defaultUserPhoto } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeRequests } from '../utils/requestSlice';

const RequestCard = ({request}) => {
    const dispatch = useDispatch();

    const handleRequest = async(status, requestId)=>{
        try{
            // console.log(status, requestId);
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, {}, {withCredentials:true});
            // console.log(res); 
            // removing this request from the requestSlice
            dispatch(removeRequests(requestId));


        }catch(err){
            console.log(err);
        }
      
    }

    const {firstName, lastName, age, gender, skills, about, photoUrl} = request.fromUserId;
    const {_id} = request;
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
          <div className="card-actions">
            
    <button className="btn btn-primary" onClick={()=>{handleRequest("accepted",_id )}}>Accept</button>
    <button className="btn btn-neutral" onClick={()=>{handleRequest("rejected",_id )}}>Reject</button>

          </div>
        </div>
      </div>
          </div>
  )
}

export default RequestCard
