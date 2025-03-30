
import React from 'react'
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
    }

    const { firstName, lastName, age, gender, skills, about, photoUrl } = request.fromUserId;
    const { _id } = request;

    return (
        <div className='p-2 text-gray-400 '>
            <div className="card card-side bg-slate-700 shadow-xl w-full md:w-1/2 mx-auto mt-2 h-40">
                <figure className='p-2'>
                    <img
                        className='rounded-full w-full  md:h-fit lg:h-56'
                        src={photoUrl ? photoUrl : defaultUserPhoto}
                        alt="User Pic"
                    />
                </figure>
                <div className="card-body overflow-auto">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p>{age + ", " + gender}</p>
                    <p>{about}</p>
                </div>

                <div className="card-actions flex-col justify-center mr-10 ">
                    <button className="btn btn-secondary w-full" onClick={() => { handleRequest("accepted", _id) }}>Accept</button>
                    <button className="btn btn-primary w-full" onClick={() => { handleRequest("rejected", _id) }}>Reject</button>
                </div>
            </div>
        </div>
    )
}

export default RequestCard;
