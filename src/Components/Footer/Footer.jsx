import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
    return (
        <footer className="relative overflow-hidden bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 mt-16 text-slate-400">
            {/* Ambient Background Gradient Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-900/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/60">
                    
                    {/* Brand Column */}
                    <div className="md:col-span-5 flex flex-col justify-between">
                        <div>
                            <Logo width="auto" className="mb-4" />
                            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
                                A modern blogging platform crafted for developers, creators, and technology enthusiasts to publish insights and share knowledge.
                            </p>
                        </div>
                        
                        {/* Newsletter Card */}
                        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 max-w-md">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">Subscribe to newsletter</h4>
                            <div className="flex gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-indigo-500 flex-1"
                                />
                                <button className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="md:col-span-7 grid grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                                Platform
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home Feed</Link></li>
                                <li><Link to="/all-posts" className="hover:text-indigo-400 transition-colors">Explore Articles</Link></li>
                                <li><Link to="/add-post" className="hover:text-indigo-400 transition-colors">Write Post</Link></li>
                                <li><a href="#featured" className="hover:text-indigo-400 transition-colors">Featured Topics</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                                Community
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Guidelines</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Authors</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">API Docs</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">GitHub Repository</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                                Legal
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Cookie Policy</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Licenses</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} megaBlog. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            System Operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;