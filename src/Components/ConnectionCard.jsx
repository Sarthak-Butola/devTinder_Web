
// import React, { useState } from 'react';
// import { BASE_URL, defaultUserPhoto } from '../utils/constants';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { changeMode } from '../utils/modeSlice';


// const ConnectionCard = ({ connection }) => {
//   const dispatch = useDispatch();
//   const mode = useSelector((store)=>store.mode);
  
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [showImageModal, setShowImageModal] = useState(false);

//   const handleClick = () => setShowConfirmation(true);
//   const handleImageClick = () => setShowImageModal(true);
//   const handleModalClose = (e) => {
//     if (e.target.id === 'modalOverlay') {
//       setShowImageModal(false);
//     }
//   };

//   const { _id, firstName, lastName, age, gender, about, photoUrl } = connection;

//   const handleConfirm = async () => {
//     const connectionRemoval = await axios.patch(
//       BASE_URL + "/chat/unfriend/" + _id,
//       {},
//       { withCredentials: true }
//     );
//     alert(connectionRemoval.data);
//     setShowConfirmation(false);
//     window.location.reload();
//   };

//   const handleCancel = () => setShowConfirmation(false);

//   return (
//     <>
//       {/* Image Modal OUTSIDE the card */}
//       {showImageModal && (
//         <div
//           id="modalOverlay"
//           onClick={handleModalClose}
//           className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
//         >
//           <div className="w-1/3 max-w-md">
//             <img
//               src={photoUrl ? photoUrl : defaultUserPhoto}
//               alt={`${firstName} ${lastName}`}
//               className="w-full h-auto rounded-lg shadow-lg"
//             />
//           </div>
//         </div>
//       )}

//       <div className="p-4">
//         <div className="bg-gray-700 shadow-lg rounded-lg overflow-hidden md:max-w-2xl mx-auto transition-transform transform">
//           <div className="flex flex-col md:flex-row items-center p-4 space-y-4 md:space-y-0 md:space-x-4">
//             {/* User Image */}
//             <div className="flex-shrink-0">
//               <img
//                 className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
//                 src={photoUrl ? photoUrl : defaultUserPhoto}
//                 alt={`${firstName} ${lastName}`}
//                 onClick={handleImageClick}
//               />
//             </div>

//             {/* User Info */}
//             <div className="flex-1 text-center md:text-left">
//               <h2 className="text-xl font-semibold text-gray-400">{`${firstName} ${lastName}`}</h2>
//               <p className="text-gray-400">{`${age}, ${gender}`}</p>
//               <p className="text-gray-400 text-sm">{about}</p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col space-y-2 mt-2 md:mt-0">
//               <Link to={`/chat/${_id}`}>
//                 <button className="btn btn-primary hover:scale-110">Chat</button>
//               </Link>
//               <button
//                 onClick={handleClick}
//                 className="btn px-4 py-2 rounded-md hover:scale-110"
//               >
//                 Unfriend
//               </button>
//             </div>
//           </div>

//           {/* Unfriend Confirmation Modal */}
//           {showConfirmation && (
//             <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-40">
//               <div className="bg-gray-700 p-6 rounded-md shadow-lg w-11/12 max-w-md">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-300 text-center sm:text-lg">
//                   Remove "{firstName + ' ' + lastName}" from connections, are you sure?
//                 </h2>
//                 <div className="flex justify-center sm:justify-between gap-4 sm:gap-6">
//                   <button
//                     onClick={handleConfirm}
//                     className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-700 sm:px-4 sm:py-2 hover:scale-110"
//                   >
//                     Yes
//                   </button>
//                   <button
//                     onClick={handleCancel}
//                     className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 sm:px-4 sm:py-2 hover:scale-110"
//                   >
//                     No
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ConnectionCard;







// import React, { useState } from 'react';
// import { BASE_URL, defaultUserPhoto } from '../utils/constants';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import {useSelector } from 'react-redux';

// const ConnectionCard = ({ connection }) => {
//   const mode = useSelector((store) => store.mode);

//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [showImageModal, setShowImageModal] = useState(false);

//   const handleClick = () => setShowConfirmation(true);
//   const handleImageClick = () => setShowImageModal(true);
//   const handleModalClose = (e) => {
//     if (e.target.id === 'modalOverlay') setShowImageModal(false);
//   };

//   const { _id, firstName, lastName, age, gender, about, photoUrl } = connection;

//   const handleConfirm = async () => {
//     const res = await axios.patch(
//       `${BASE_URL}/chat/unfriend/${_id}`,
//       {},
//       { withCredentials: true }
//     );
//     alert(res.data);
//     setShowConfirmation(false);
//     window.location.reload();
//   };

//   const handleCancel = () => setShowConfirmation(false);

//   return (
//     <>
//       {/* Image Modal */}
//       {showImageModal && (
//         <div
//           id="modalOverlay"
//           onClick={handleModalClose}
//           className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
//         >
//           <div className="w-3/4 sm:w-1/2 md:w-1/3 max-w-md">
//             <img
//               src={photoUrl || defaultUserPhoto}
//               alt={`${firstName} ${lastName}`}
//               className="w-full h-auto rounded-lg shadow-lg"
//             />
//           </div>
//         </div>
//       )}

//       {/* Connection Card */}
//       <div className="p-4 ">
//             <div  className={`shadow-md rounded-xl overflow-hidden transition duration-300 ease-in-out md:max-w-2xl mx-auto hover:scale-[1.01] ${
//       mode ? 'bg-slate-950' : 'bg-neutral-100'
//     }`}>
//           <div className="flex flex-col md:flex-row items-center p-4 gap-4">
//             {/* Profile Image */}
//             <div className="flex-shrink-0">
//               <img
//                 onClick={handleImageClick}
//                 src={photoUrl || defaultUserPhoto}
//                 alt={`${firstName} ${lastName}`}
//                 className="w-24 h-24 rounded-full object-cover cursor-pointer border-2 border-gray-300 dark:border-slate-600"
//               />
//             </div>

//             {/* User Info */}
//             <div className="flex-1 text-center md:text-left">
//               <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
//                 {firstName} {lastName}
//               </h2>
//               <p className="text-sm text-gray-600 dark:text-gray-400">{`${age}, ${gender}`}</p>
//               <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{about}</p>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col gap-2 mt-2 md:mt-0">
//               <Link to={`/chat/${_id}`}>
//                 <button className="btn btn-primary btn-sm hover:scale-105 transition">Chat</button>
//               </Link>
//               <button
//                 onClick={handleClick}
//                 className="btn btn-outline btn-sm hover:scale-105 transition"
//               >
//                 Unfriend
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirmation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
//           <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
//             <h2 className="text-center text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
//               Remove "{firstName + ' ' + lastName}" from connections?
//             </h2>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleConfirm}
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 transition"
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ConnectionCard;








import React, { useState } from 'react';
import { BASE_URL, defaultUserPhoto } from '../utils/constants';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const ConnectionCard = ({ connection }) => {
  const dispatch = useDispatch();
  const mode = useSelector((store) => store.mode);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleClick = () => setShowConfirmation(true);
  const handleImageClick = () => setShowImageModal(true);
  const handleModalClose = (e) => {
    if (e.target.id === 'modalOverlay') setShowImageModal(false);
  };

  const { _id, firstName, lastName, age, gender, about, photoUrl } = connection;

  const handleConfirm = async () => {
    const res = await axios.patch(
      `${BASE_URL}/chat/unfriend/${_id}`,
      {},
      { withCredentials: true }
    );
    alert(res.data);
    setShowConfirmation(false);
    window.location.reload();
  };

  const handleCancel = () => setShowConfirmation(false);

  return (
    <>
      {/* Image Modal */}
      {showImageModal && (
        <div
          id="modalOverlay"
          onClick={handleModalClose}
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
        >
          <div className="w-3/4 sm:w-1/2 md:w-1/3 max-w-md">
            <img
              src={photoUrl || defaultUserPhoto}
              alt={`${firstName} ${lastName}`}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Connection Card */}
      <div className="p-4">
        <div
          className={`rounded-xl border border-gray-700 overflow-hidden transition duration-300 ease-in-out md:max-w-2xl mx-auto hover:scale-[1.01] ${
            mode
              ? 'bg-slate-950'
              : 'bg-neutral-50 shadow-md shadow-slate-300'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center p-4 gap-4">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                onClick={handleImageClick}
                src={photoUrl || defaultUserPhoto}
                alt={`${firstName} ${lastName}`}
                className="w-24 h-24 rounded-full object-cover cursor-pointer border-2 border-gray-300 dark:border-slate-600"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className={`text-lg font-semibold tracking-tight ${
                mode ? 'text-white' : 'text-gray-900'
              }`}>
                {firstName} {lastName}
              </h2>
              <p className={`text-sm ${
                mode ? 'text-gray-400' : 'text-gray-600'
              }`}>{`${age}, ${gender}`}</p>
              <p className={`mt-1 text-sm leading-snug ${
                mode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {about}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 mt-2 md:mt-0">
              <Link to={`/chat/${_id}`}>
                <button className="btn btn-primary btn-sm hover:scale-105 transition">
                  Chat
                </button>
              </Link>
              <button
                onClick={handleClick}
                className="btn btn-outline btn-sm hover:scale-105 transition"
              >
                Unfriend
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-center text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Remove "{firstName + ' ' + lastName}" from connections?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectionCard;
