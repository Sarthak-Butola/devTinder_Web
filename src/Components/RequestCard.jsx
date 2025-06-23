
import React from 'react';
import { BASE_URL, BASE_URL1, defaultUserPhoto } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeRequests } from '../utils/requestSlice';

const RequestCard = ({ request }) => {
  const dispatch = useDispatch();
  const mode = useSelector((store) => store.mode);

  const handleRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL1 + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(requestId));
    } catch (err) {
      console.log(err);
    }
  };

  const { firstName, lastName, age, gender, about, photoUrl } = request.fromUserId;
  const { _id } = request;

  return (
    <div className="p-4 duration-500">
      <div
        className={`rounded-lg overflow-hidden mx-auto transition-colour transform max-w-3xl shadow-xl border border-gray-700 duration-500
          ${mode ? 'bg-slate-950 shadow-black/70' : 'bg-slate-50 shadow-gray-300 '}`}
      >
        <div className="flex flex-col md:flex-row items-center p-4 space-y-4 md:space-y-0 md:space-x-4">
          {/* User Image */}
          <div className="flex-shrink-0">
            <img
              className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
              src={photoUrl || defaultUserPhoto}
              alt={`${firstName} ${lastName}`}
            />
          </div>

          {/* User Info */}
          <div className={`flex-1 text-center md:text-left`}>
            <h2 className={`text-xl font-semibold ${mode ? 'text-gray-200' : 'text-gray-900'}`}>
              {`${firstName} ${lastName}`}
            </h2>
            <p className={`${mode ? 'text-gray-400' : 'text-gray-600'}`}>
              {`${age}, ${gender}`}
            </p>
            <p className={`text-sm ${mode ? 'text-gray-400' : 'text-gray-700'}`}>
              {about}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center md:justify-end space-y-2 md:space-y-0 md:space-x-4 p-4">
          <button
            className="btn btn-primary px-4 py-2 rounded-md hover:scale-110 w-full md:w-auto"
            onClick={() => handleRequest("accepted", _id)}
          >
            Accept
          </button>
          <button
            className="btn px-4 py-2 rounded-md hover:scale-110 w-full md:w-auto"
            onClick={() => handleRequest("rejected", _id)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
