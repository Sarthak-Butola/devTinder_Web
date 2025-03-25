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
