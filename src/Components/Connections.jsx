import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
// import UserCard from './userCard'
import ConnectionCard from './ConnectionCard'
import ConnectionsAccordion from './ConnectionsAccordion'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connections);

    const fetchConnections = async()=>{
        try{
            const res = await axios.get(BASE_URL + "/connections", {withCredentials:true});
            // console.log(res.data);
            //adding connections info into connection slice in redux store
            dispatch(addConnections(res.data));
            
        }catch(err){
            console.log(err);
        }
       
    }

    useEffect(()=>{
        fetchConnections();
    },[])

    if(!connections) return <ConnectionsAccordion/>;
    if(connections.length === 0) return <h1 className='font-bold text-3xl mt-2 flex justify-center '>No Connections</h1>

    // if(!connections) return;
    // if(Connections.length === 0)  <h1>No Connections</h1>

  return (
    <div >
    <div className='flex justify-center text-2xl font-bold mt-2'>
       <p>Connections: </p>
    </div>

       {connections && (
        connections.map((connection)=> <ConnectionCard key={connection._id} connection={connection} />)
       )
       }

    </div>
  )
}

export default Connections
