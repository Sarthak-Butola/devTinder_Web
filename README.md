<!--//NAVBAR OG {


// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import appStore from '../utils/appStore'
// import { Link, useNavigate } from 'react-router-dom'
// import { BASE_URL } from '../utils/constants'
// import axios from 'axios'
// import { removeUser } from '../utils/userSlice' 

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((store)=>store.user);
//   const navigate = useNavigate();
  
  
//  //this removes cookie from user's browser
//  const handleLogout = async()=>{
//   try{
//   const logOut = await axios.post(BASE_URL + '/logout',{},{withCredentials:true});
//   //this removes info from userSlice
//   dispatch(removeUser());
//   //navigate to login page
//     navigate("/login");

//   }catch(err){
//     console.log(err);
//   }
//  }
  
 
//   // console.log(user);

//   return (
//     <div>
      
//       <div className="navbar bg-base-300">
//   <div className="flex-1">
//     <Link to="/feed" className="btn btn-ghost text-xl">💻DevTinder</Link>
//   </div>
//   <div className="flex-none gap-2 mx-5">
//     <div className="form-control">
      
//     </div>

//     {/* Only showing pic if present in the slice/ after userInfo retrieval from backend/DB */}
//     {user && (<div className="dropdown dropdown-end flex">
//       <p className='my-2 pr-5'>Welcome {user.firstName} </p>
//       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//         <div className="w-10 rounded-full">
//           <img
//             alt="User Photo"
//             src={user.photoUrl}
//              />
//         </div>
//       </div>
//       <ul
//         tabIndex={0}
//         className="menu menu-sm dropdown-content bg-slate-800 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
//         <li >
//           <Link to="/profile" className="justify-between">
//             Profile
//             <span className="badge bg-slate-700">New</span>
//           </Link>
//         </li>
//         <li><Link to={'/connections'}>Connections</Link></li>
//         <li><Link to={"/requests"}>Requests</Link></li>
//         <li>
//           <Link to="/searchPage" className="justify-between">
//             Search
//             <span className="badge  bg-slate-700">Premium!</span>
//           </Link>
//         </li>
//         <li><Link to={"/feed"}>{"Find Devs " + " :)"}  </Link></li>
        
//         <li className='text-red-500'><Link to={"/deleteProfile"}>{"Delete Profile!"}  </Link></li>
        
//         <li><Link onClick={handleLogout}>Logout</Link></li>
    
//       </ul>
//     </div> )}
    

//   </div>
// </div>

//     </div>
//   )
// }

// export default Navbar} 
} -->

<!-- UserCard OG -->
<!--  {
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
         
<div className="card card-compact w-96 shadow-xl m-auto my-10 bg-slate-700 ">
<figure className='h-48' >  
  <img className='p-2 rounded-xl max-w-full max-h-full '
    src={photoUrl? photoUrl : defaultUserPhoto}
    alt="UserImage" />
</figure>
<div className="card-body text-gray-400 overflow">
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
} -->


<!-- OG Edit Profile 
{
  import React, { useState } from 'react'
import UserCard from './userCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user})=> {
    const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  
  

  const userInfo = {firstName, lastName, age, photoUrl, gender, about, skills}  ;

  //saving edited data in the DB
  const saveProfile = async()=>{
    try{
    //updating profile data   
    const res = await axios.patch(BASE_URL + "/profile/edit",{
        firstName,
        lastName,
        age,
        photoUrl,
        gender,
        about,
        skills
    }
       ,{withCredentials:true});
    //updating redux store userSlice to get latest/updated data of the user
        dispatch(addUser(res.data.data));

        //showing toast agter profile is updated
        setToast(true);
        //also removing this message after a few seconds
        setTimeout(()=>{
            setToast(false);
        },3000)

        // console.log(res);
        
    }catch(err){
        console.log(err);
        setError(err.response.data);
    }

  }

  return (
    <div className='flex justify-center my-6  text-gray-400' >
      
      <div className='flex justify-center mt-2 px-10 mb-56'>
      <div className="card w-96 shadow-xl bg-slate-700">
  <div className="card-body items-center text-center">
    <h2 className="card-title ">Edit Profile</h2>

    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> First Name</span>
     </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
    onChange={(e)=>{setFirstName(e.target.value)}} value={firstName}
      
  />
 
</label>  

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Last Name</span>
     </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
  onChange={(e)=>{setLastName(e.target.value)}} value={lastName} />

</label>  

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> Age </span>
     </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
    onChange={(e)=>{setAge(e.target.value)}} value={age}
      
  />
 
</label>  

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> Gender </span>
     </div>
  <input type="body" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
    onChange={(e)=>{setGender(e.target.value)}} value={gender}
      
  />
 
</label>  

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> About </span>
     </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
    onChange={(e)=>{setAbout(e.target.value)}} value={about}
      
  />
 
</label>  

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> Skills </span>
     </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
    onChange={(e)=>{setSkills(e.target.value)}} value={skills}
      
  />
 
</label>  

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> Photo Url</span>
     </div>
  <input type="url" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
    onChange={(e)=>{setPhotoUrl(e.target.value)}} value={photoUrl} />
 
</label>  

<p className='text-lg text-red-500 mt-2'> {error} </p>
  

  
    <div className="card-actions py-2">
      <button className="btn btn-primary pt-0" onClick={saveProfile} >Save Profile</button>
    </div>
  </div>

  {/* TOAST */}
  {toast &&(
  <div className="toast toast-top toast-center z-10">
  <div className="alert alert-info ">
    <span >Profile Updated successfully!! </span>
  
  </div>
</div>
)}
  
</div>


    </div>

    <UserCard user={userInfo}/>

    </div>
  )
}

export default EditProfile
}

-->

<!-- OG REQUEST CARD
// {
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
      <div className='p-2  text-gray-400'>
            <div className="card card-side bg-slate-700 shadow-xl w-1/2 m-auto mt-2">
        <figure className='p-2'>
            <img className='rounded-full w-full h-40 '
            src={photoUrl ? photoUrl :defaultUserPhoto }
            alt="User Pic"/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{age + ", " + gender}</p>
          <p>{about}</p>
          
        </div>

        <div className="card-actions flex-col justify-center mr-10 ">
            
    <button className="btn btn-secondary w-full" onClick={()=>{handleRequest("accepted",_id )}}>Accept</button>
    <button className="btn btn-primary w-full" onClick={()=>{handleRequest("rejected",_id )}}>Reject</button>

          </div>

      </div>
          </div>
  )
}

export default RequestCard
// } -->

<!-- OG LOGIN
{
import axios from 'axios';
import React, { useState } from 'react'
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';



const Login = () => {
  const[error, setError] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [emailId, setEmailId] = useState("Goku@gmail.com");
  const [password, setPassword] = useState("Kamehameha@123");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = async()=>{
    try{
    const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password}, {withCredentials:true});
    dispatch(addUser(res.data.data));
    console.log(res);
    navigate("/profile");
    }catch(err){
      console.log(err?.response?.data);
    }
    
  }

  const handleLogin = async()=>{
    try{
      const res = await axios.post( BASE_URL + "/login",{emailId, password}, {withCredentials:true});
      dispatch(addUser(res.data));
      // console.log(res.data);
      navigate("/feed");

    }catch(err){
      console.log(err);
      setError(err?.response?.data);
    }
    
  }

  return (
    <div className='flex justify-center mt-10'>
      <div className="card w-96 shadow-xl bg-slate-700">
  <div className="card-body items-center text-center">
    <h2 className="card-title">{isLoginForm ? "Login" : "Sign Up"}</h2>

    {/*First Name, Last Name */}
    { !isLoginForm && (
    <>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> First Name </span>
     </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
    onChange={(e)=>{setFirstName(e.target.value)}} value={firstName}/>
</label>
    
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> Last Name </span>
     </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
    onChange={(e)=>{setLastName(e.target.value)}} value={lastName}/>
</label>
    </>
    )}

    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text"> Email ID :</span>
     </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
    onChange={(e)=>{setEmailId(e.target.value)}} value={emailId}/>
</label>  

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Password :  </span>
     </div>
  <input type={ showPassword ? "text" : "password"} placeholder="Type here" className="input input-bordered w-full max-w-xs" 
  onChange={(e)=>{setPassword(e.target.value)}} value={password} />

   <span className='Show/Hide-Password-Label hover:underline cursor-pointer text-end'
     onClick={()=>{setShowPassword(!showPassword)}}
     >{showPassword ? "Hide-Password" : "Show-Password"}</span>
  

  <p className='text-lg text-red-500 mt-2'> {error} </p>  
</label>  
  
    <div className="card-actions">

     { isLoginForm && <button className="btn btn-primary" onClick={handleLogin}>Login</button> }

      { !isLoginForm && <button className="btn btn-primary" onClick={handleSignUp}>Sign  Up</button> }
    </div>
    <p className='cursor-pointer hover:underline 'onClick={()=>{setIsLoginForm(!isLoginForm)}}>{ isLoginForm ? "New User? Signup Here!!" : "Existing User? Login Here"}</p>
    
  </div>
</div>
    </div>
  )
}

export default Login

}
 -->

===>DO THESE<===
________________

-> Make hitting Enter button perform the task like sending message, searching etc. ✔️
-> Show/Hide PassWord dynamically. ✔️
-> Auto scroll to the bottom of the chat. ✔️
-> Show timestamps for messages sent/received.[DB need to have timestamps stored for this]
-> Fixed chat bubbles being on same side for people with same name by comparing sender id's instead of sender names✔️
->Delete User feature maybe.. ✔️[yess done :) ] 
->Delete chats of deleted user also form the db
->
->