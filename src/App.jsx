import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/Auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './Components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .catch((err) => {
        console.log("App auth check err:", err);
        dispatch(logout());
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className='min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden'>
      {/* Background Glow Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none animate-glow"></div>
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <Header />
      
      <main className="flex-grow pt-24 pb-12 relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  ) : (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <div className="absolute font-bold text-xs text-indigo-400">MB</div>
      </div>
      <p className="mt-4 text-slate-400 text-sm font-medium tracking-wide">Initializing megaBlog...</p>
    </div>
  )
}

export default App;