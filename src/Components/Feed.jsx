import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './userCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store)=>store.feed);

  const getFeed = async()=>{
    try{
      //if feed already present in store then no need to get feed again
      if(feed) return;

    const res = await axios.get(BASE_URL + "/feed",{withCredentials:true});
    dispatch(addFeed(res.data));
    console.log(res.data);

    }catch(err){
      console.log(err);
    }

  }

  useEffect(()=>{
    getFeed();
  },[])

  return (
    //makes sure to only return this when feed is present as feed[0] passed will goe error if feed is empty
    feed && (
    <div className=' flex flex-wrap justify-evenly '>
      {feed.map((user,index)=>
         <UserCard key={user._id} user={user} />
      )}

    </div>
    )
  )
}

export default Feed
