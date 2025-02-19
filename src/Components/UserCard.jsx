import React from 'react'

const UserCard = ({user}) => {
    const {firstName, lastName, age, skills, photoUrl, gender, about } = user;
  return (
    <div>
         
<div className="card card-compact w-96 shadow-xl m-auto my-10 bg-slate-200">
<figure>
  <img className='p-2 w-52 h-auto '
    src={photoUrl}
    alt="UserImage" />
</figure>
<div className="card-body">
  <h2 className="card-title">{firstName + " " + lastName}</h2>
  <p>{age + ", " + gender}</p>
  <p>{about}</p>
  <p>skills: {skills}</p>
  <div className="card-actions justify-evenly ">
    <button className="btn btn-primary">Ignore</button>
    <button className="btn btn-secondary">Interested</button>
  </div>
</div>
</div>

    </div>
  )
}

export default UserCard


