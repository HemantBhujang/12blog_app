import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus,
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus,
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus,
        },
        {
            name: 'Sign Up',
            slug: '/signup',
            active: !authStatus,
        },
    ]

    return (
        <header className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all duration-300'>
            <Container>
                <nav className='flex items-center justify-between h-20 px-2 sm:px-0'>
                    <Link to='/' className="flex items-center">
                        <Logo width='auto' />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center gap-1.5'>
                        <ul className='flex items-center gap-1'>
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                                                location.pathname === item.slug
                                                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                                                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                                            }`}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null
                            )}
                        </ul>

                        {authStatus && (
                            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-800">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                                        {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <span className="text-xs font-medium text-slate-300 max-w-[100px] truncate hidden lg:inline">
                                        {userData?.name || 'User'}
                                    </span>
                                </div>
                                <LogoutBtn />
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="md:hidden flex items-center gap-2">
                        {authStatus && (
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                                {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                        )}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl rounded-b-2xl">
                        <ul className="flex flex-col gap-2">
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => {
                                                navigate(item.slug);
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                                                location.pathname === item.slug
                                                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                                                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                                            }`}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null
                            )}
                            {authStatus && (
                                <li className="pt-2 border-t border-slate-800 px-4">
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </Container>
        </header>
    )
}

export default Header;