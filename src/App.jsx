import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Body from './Components/Body'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Profile from './Components/Profile'
import Logout from './Components/Logout'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './Components/Feed'


function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Body />}>
      {/* children Routes */}

      <Route path='/login' element={<Login/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path='/logout'element={<Logout/>} />
      <Route path='/feed'element={<Feed/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  
  <p className="font-bold text-3xl underline text-red-400 ">
      Hello World!
      </p>
      </Provider>
    </>
  )
}

export default App
