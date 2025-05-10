

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

    const userInfo = {firstName, lastName, age, photoUrl, gender, about, skills};

    // saving edited data in the DB
    const saveProfile = async()=>{
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit",{
                firstName,
                lastName,
                age,
                photoUrl,
                gender,
                about,
                skills
            },{withCredentials:true});
            
            dispatch(addUser(res.data.data)); // Updating redux store

            setToast(true); // Show toast
            setTimeout(()=>{
                setToast(false);
            },3000);
        } catch(err){
            console.log(err);
            setError(err.response.data);
        }
    }

    return (
        <div className="md:flex justify-center my-6 text-gray-400">
            <div className="flex justify-center mt-2 px-4 sm:px-10 mb-56">
                <div className="card w-full sm:w-96 shadow-xl bg-slate-700">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Edit Profile</h2>

                        {/* First Name */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text"> First Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />
                        </label>

                        {/* Last Name */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text"> Last Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </label>

                        {/* Age */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text"> Age </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setAge(e.target.value)}
                                value={age}
                            />
                        </label>

                        {/* Gender */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text"> Gender : [male, female or others] </span>
                            </div>
                            <input
                                type="body"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setGender(e.target.value)}
                                value={gender}
                            />
                        </label>

                        {/* About */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text"> About [limit 90 characters] : </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setAbout(e.target.value)}
                                value={about}
                            />
                        </label>

                        {/* Skills */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text"> Skills </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setSkills(e.target.value)}
                                value={skills}
                            />
                        </label>

                        {/* Photo URL */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text"> Photo URL</span>
                            </div>
                            <input
                                type="url"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                value={photoUrl}
                            />
                        </label>

                        {/* Error Message */}
                        <p className="text-lg text-red-500 mt-2">{error}</p>

                        {/* Save Button */}
                        <div className="card-actions py-2">
                            <button className="btn btn-primary pt-0" onClick={saveProfile}>Save Profile</button>
                        </div>
                    </div>

                    {/* TOAST */}
                    {toast && (
                        <div className="toast toast-top toast-center z-10">
                            <div className="alert alert-info">
                                <span>Profile Updated successfully!!</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* User Card */}
            <div>
            <UserCard user={userInfo} />
            </div>
            
        </div>
    );
}

export default EditProfile;
