import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';
import RequestCard from './RequestCard';


const Requests = () => {
    const dispatch =useDispatch();
    const requests = useSelector((store)=>store.requests);

    const fetchRequests = async ()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials:true});
            console.log(res.data.data);
            //save requests data in requestSlice
            // dispatch(addRequests(res.data.data));

        }catch(err){
            console.log(err.response);
        } 
    }

    useEffect(()=>{
        fetchRequests();
    },[])

  return (
    <>
    {requests && (
          requests.map((request)=> <RequestCard request={request} key={request.fromUserId._id} /> )  
    )}
    
    </>
  )
}

export default Requests
