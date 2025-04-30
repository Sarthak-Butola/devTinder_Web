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
import ErrorPage from './Components/ErrorPage'
import Connections from './Components/Connections'
import Requests from './Components/Requests'
import SearchPage from './Components/SearchPage'
import Chat from './Components/Chat'
import DeleteProfile from './Components/DeleteProfile'


function App() {

  return (
    <div data-theme="dark" className='min-h-screen'>
    <Provider store={appStore}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Body />}>
      {/* children Routes */}
      
      <Route path='/login' element={<Login/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path='/logout'element={<Logout/>} />
      <Route path='/feed'element={<Feed/>} />
      <Route path='/errorPage'element={<ErrorPage/>} />
      <Route path='/connections'element={<Connections/>} />
      <Route path='/requests'element={<Requests/>} />
      <Route path='/searchPage'element={<SearchPage/>} />
      <Route path='/chat/:targetUserId'element={<Chat/>} />
      <Route path='/deleteProfile'element={<DeleteProfile/>} />
      
    </Route>
    </Routes>
    </BrowserRouter>
  
  {/* <p className="font-bold text-3xl underline text-red-400 ">
      Hello World!
      </p> */}
      
      </Provider>
    </div>
  )
}

export default App
