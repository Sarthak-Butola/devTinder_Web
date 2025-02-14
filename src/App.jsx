import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="navbar bg-base-300">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">🧑‍💻DevTinder</a>
  </div>
  <div className="flex-none gap-2 mx-5">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            src="https://tse1.mm.bing.net/th?id=OIP.U1FcsQimhEwceLMAYGs_TQHaHa&pid=Api&P=0&h=180" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

<p className="font-bold text-3xl underline text-red-400 ">
      Hello World!
      </p>
    </>
  )
}

export default App
