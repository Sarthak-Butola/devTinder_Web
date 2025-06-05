// AppContent.jsx
import { useSelector } from 'react-redux'
import './App.css'
import Navbar from './Components/Navbar'
import Body from './Components/Body'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Profile from './Components/Profile'
import Logout from './Components/Logout'
import Feed from './Components/Feed'
import ErrorPage from './Components/ErrorPage'
import Connections from './Components/Connections'
import Requests from './Components/Requests'
import SearchPage from './Components/SearchPage'
import Chat from './Components/Chat'
import DeleteProfile from './Components/DeleteProfile'
import Premium from './Components/Premium'

function AppContent() {
  const mode = useSelector((store) => store.mode) // ✅ This works now!

  return (
    // data-theme={mode ? 'dark' : 'light'}
    <div  className={mode ? 'bg-slate-900 min-h-screen duration-500' : 'bg-neutral-100 min-h-screen transition-colors duration-500'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/errorPage" element={<ErrorPage />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/searchPage" element={<SearchPage />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/deleteProfile" element={<DeleteProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppContent
