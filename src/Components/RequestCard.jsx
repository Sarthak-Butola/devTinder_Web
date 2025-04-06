
import React from 'react';
import { BASE_URL, defaultUserPhoto } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeRequests } from '../utils/requestSlice';

const RequestCard = ({ request }) => {
    const dispatch = useDispatch();

    const handleRequest = async (status, requestId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, {}, { withCredentials: true });
            dispatch(removeRequests(requestId));
        } catch (err) {
            console.log(err);
        }
    };

    const { firstName, lastName, age, gender, about, photoUrl } = request.fromUserId;
    const { _id } = request;

    return (
        <div className="p-4">
            <div className="bg-slate-700 shadow-xl rounded-lg overflow-hidden mx-auto transition-transform transform max-w-3xl">
                <div className="flex flex-col md:flex-row items-center p-4 space-y-4 md:space-y-0 md:space-x-4">
                    {/* User Image */}
                    <div className="flex-shrink-0">
                        <img
                            className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
                            src={photoUrl ? photoUrl : defaultUserPhoto}
                            alt={`${firstName} ${lastName}`}
                        />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-xl font-semibold text-gray-100">{`${firstName} ${lastName}`}</h2>
                        <p className="text-gray-300">{`${age}, ${gender}`}</p>
                        <p className="text-gray-400 text-sm">{about}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row justify-center md:justify-end space-y-2 md:space-y-0 md:space-x-4 p-4">
                    <button
                        className="btn btn-primary px-4 py-2 rounded-md hover:scale-110  w-full md:w-auto"
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
