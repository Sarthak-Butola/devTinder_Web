import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Body from './Body'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Profile from './Profile'
import Logout from './Logout'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Body />}>
      {/* children Routes */}

      <Route path='/login' element={<Login/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path='/logout'element={<Logout/>} />

      </Route>
    </Routes>
    </BrowserRouter>
  
  <p className="font-bold text-3xl underline text-red-400 ">
      Hello World!
      </p>

    </>
  )
}

export default App
