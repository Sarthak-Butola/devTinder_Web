import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import UserCard from './userCard';
import { useDispatch, useSelector } from 'react-redux';
import appStore from '../utils/appStore';
import { addUsers } from '../utils/searchSlice';

const SearchPage = () => {  
    const dispatch = useDispatch();
    const searches = useSelector((store)=>store.searchUsers);

    const [firstName, setFirstName] = useState('');

    const handleSearch = async(firstName)=>{
        try{
        let user = await axios.get(BASE_URL + "/search" + "/" + firstName ,{withCredentials:true});
        // console.log(user?.data);    
        dispatch(addUsers(user?.data));  

        }
        catch(err){
            console.log(err.message);
        }
    }

    // useEffect(()=>{
    //     handleSearch();
    // },[])

  return (
   <div className=''>
   
    <div className='md:flex mt-4 justify-center modal-middle '>
       
    <h1 className='text-3xl mr-10 underline mb-2'>Search : </h1>
  
  <div className='flex'>
  <input type="text" placeholder="Enter Name of person" className="input input-primary "
    onChange={(e)=>{
    setFirstName(e.target.value);
    }}
    onKeyUp={()=>{handleSearch(firstName)}}
    />
    <button className="btn btn-primary ml-2"
    onClick={()=>{
    handleSearch(firstName)
    }   
    }>search</button>

  </div>
   
    
    </div>

    <div className='flex justify-evenly flex-wrap'> 

    {
    !searches &&(
    <h1 className='pt-4'>
       Try Searching a name like "Bruce"
   </h1>
    )
    }

    {searches && searches.map((user)=> <UserCard user={user} key={user._id} />) }
    </div>

   </div>

  )
}

export default SearchPage
