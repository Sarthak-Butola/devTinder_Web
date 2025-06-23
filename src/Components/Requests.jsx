import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL, BASE_URL1 } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';
import RequestCard from './RequestCard';


const Requests = () => {
    const dispatch =useDispatch();
    const requests = useSelector((store)=>store.requests);

    const fetchRequests = async ()=>{
        try{
            const res = await axios.get(BASE_URL1 + "/user/requests/received", {withCredentials:true});
            // console.log(res.data.data);
            //save requests data in requestSlice
            dispatch(addRequests(res.data.data));

        }catch(err){
            console.log(err.response);
        } 
    }

    useEffect(()=>{
        fetchRequests();
    },[])

    if(!requests) return;
    if(requests.length === 0) return <h1 className='font-bold text-3xl mt-2 flex justify-center'>No requests currently...</h1>

  return (
    
    <>
    <div className='flex justify-center text-2xl font-bold mt-2'>
       <p>Requests :</p>
    </div>

    {requests && (
          requests.map((request)=> <RequestCard request={request} key={request.fromUserId._id} /> )  
    )}
    
    </>
  )
}

export default Requests
