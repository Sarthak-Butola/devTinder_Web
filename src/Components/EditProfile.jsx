
import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL, BASE_URL1 } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const mode = useSelector((store) => store.mode);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || '');
  const [about, setAbout] = useState(user.about || '');
  const [gender, setGender] = useState(user.gender || '');
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || '');
  const [skills, setSkills] = useState(user.skills || '');
  const [error, setError] = useState('');
  const [toast, setToast] = useState(false);

  const userInfo = { firstName, lastName, age, photoUrl, gender, about, skills };

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL1 + '/profile/edit',
        { firstName, lastName, age, photoUrl, gender, about, skills },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "Something went wrong");
    }
  };

  // Tailwind input classes optimized:
  // Dark mode input: bg-slate-800 (a shade lighter than bg-neutral-800 card bg), border-gray-700
  // Light mode input: bg-white, border-gray-300 (lighter border than card)
  const inputBaseClasses = "w-full p-3 rounded-lg border outline-none transition-colors duration-500";
  const darkInputClasses = "bg-slate-800 border-gray-700 text-white placeholder:text-gray-400";
  const lightInputClasses = "bg-white border-gray-300 text-black placeholder:text-gray-500";

  return (
    <div className={`min-h-screen px-4 py-10 flex flex-col md:flex-row gap-8 justify-center items-start transition duration-500 ${mode ? "bg-neutral-900 text-white" : "bg-neutral-50 text-black"}`}>
      
      {/* Form Section */}
      <div className={`w-full max-w-md p-6 rounded-2xl shadow-xl transition duration-500 border border-gray-600 ${mode ? "bg-gray-900" : "bg-white"}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block mb-1 font-semibold">First Name</label>
            <input
              type="text"
              className={`${inputBaseClasses} ${mode ? darkInputClasses : lightInputClasses}`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1 font-semibold">Last Name</label>
            <input
              type="text"
              className={`${inputBaseClasses} ${mode ? darkInputClasses : lightInputClasses}`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block mb-1 font-semibold">Age</label>
            <input
              type="text"
              className={`${inputBaseClasses} ${mode ? darkInputClasses : lightInputClasses}`}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </div>

          {/* Gender Dropdown */}
          <div>
            <label className="block mb-1 font-semibold">Gender</label>
            <select
              className={`${inputBaseClasses} ${mode ? darkInputClasses : lightInputClasses}`}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* About as Textarea */}
          <div>
            <label className="block mb-1 font-semibold">About (max 90 chars)</label>
            <textarea
              maxLength={90}
              rows={3}
              className={`${inputBaseClasses} ${mode ? darkInputClasses : lightInputClasses} resize-none`}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell us about yourself"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block mb-1 font-semibold">Skills</label>
            <input
              type="text"
              className={`${inputBaseClasses} ${mode ? darkInputClasses : lightInputClasses}`}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Your skills"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-1 font-semibold">Photo URL</label>
            <input
              type="url"
              className={`${inputBaseClasses} ${mode ? darkInputClasses : lightInputClasses}`}
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Link to your photo"
            />
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {/* Save Button */}
        <button
  className={`w-full py-3 mt-6 rounded-xl font-semibold text-white
    transition duration-300 ease-in-out transform
    ${
      mode
        ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg hover:shadow-xl hover:scale-105"
        : "bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 shadow-md hover:shadow-lg hover:scale-105 text-black"
    }
    focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50
  `}
  onClick={saveProfile}
>
  Save Profile
</button>


        {/* Toast */}
        {toast && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert alert-info">
              <span>Profile Updated Successfully!</span>
            </div>
          </div>
        )}
      </div>

      {/* Preview Card */}
      <UserCard user={userInfo} />
    </div>
  );
};

export default EditProfile;
