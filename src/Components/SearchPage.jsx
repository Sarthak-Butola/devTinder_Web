import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import UserCard from './userCard';
import { useDispatch, useSelector } from 'react-redux';
import appStore from '../utils/appStore';
import { addUsers } from '../utils/searchSlice';

const SearchPage = () => {  
    const mode = useSelector((store)=>store.mode);
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
       
   <h1 className={`text-3xl mr-10 mb-2 ${mode ? 'text-gray-300' : 'text-gray-900'} transition-colors duration-500`}>Search :</h1>

<div className="flex">
  <input 
    type="text" 
    placeholder="Enter Name of person" 
    className={`input input-primary flex-1 
      ${mode 
        ? 'bg-slate-800 text-gray-200 placeholder-gray-400' 
        : 'bg-white text-gray-900 placeholder-gray-600'} 
      transition-colors duration-500`}
    onChange={(e) => setFirstName(e.target.value)}
    onKeyUp={() => handleSearch(firstName)}
  />
  <button 
    className={`btn ml-2 px-5 py-2 rounded-md 
      ${mode 
        ? 'bg-indigo-700 hover:bg-indigo-800 text-indigo-100' 
        : 'bg-indigo-300 hover:bg-indigo-400 text-indigo-900'} 
      transition-colors duration-500`}
    onClick={() => handleSearch(firstName)}
  >
    Search
  </button>
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
