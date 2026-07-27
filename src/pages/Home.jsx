import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../Components"
import { SAMPLE_POSTS } from '../utils/sampleData'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts()
            .then((res) => {
                if (res && res.documents && res.documents.length > 0) {
                    setPosts(res.documents)
                } else {
                    setPosts(SAMPLE_POSTS)
                }
            })
            .catch(() => {
                setPosts(SAMPLE_POSTS)
            })
            .finally(() => setLoading(false))
    }, [])

    const categories = ['All', 'Technology', 'Architecture', 'UI/UX Design', 'Cloud']

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory || !post.category;
        const matchesSearch = searchQuery.trim() === '' ||
            post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
    const remainingPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

    return (
        <div className='w-full text-slate-100'>
            {/* Hero Section */}
            <section className="relative pt-8 pb-16 px-4">
                <Container>
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
                            Explore The Future of Tech
                        </span>

                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                            Perspectives on Software, <br />
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Design & Engineering
                            </span>
                        </h1>

                        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            Discover deeply researched articles, architectural insights, and practical guides written for forward-thinking developers and tech leaders.
                        </p>

                        {/* Search Bar & Action */}
                        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 pt-4">
                            <div className="relative flex-1">
                                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search articles by title or keyword..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xl"
                                />
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                            {!authStatus && (
                                <Link to="/signup" className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2">
                                    Start Writing
                                </Link>
                            )}
                        </div>

                        {/* Category Filter Chips */}
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                        selectedCategory === cat
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                            : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80 hover:border-slate-700'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Articles Grid Section */}
            <section className="py-8">
                <Container>
                    {loading ? (
                        /* Skeleton Loading Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div key={n} className="h-80 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse p-4 flex flex-col justify-between">
                                    <div className="w-full h-40 rounded-xl bg-slate-800/60"></div>
                                    <div className="space-y-2 mt-4">
                                        <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                                        <div className="h-3 bg-slate-800/60 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        /* Empty Search Result */
                        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 max-w-xl mx-auto my-8 p-8">
                            <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            <h3 className="text-xl font-bold text-slate-200 mb-2">No articles found</h3>
                            <p className="text-sm text-slate-400 mb-6">
                                We couldn't find any articles matching your search criteria. Try adjusting your query or filters.
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                className="px-5 py-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all"
                            >
                                Reset Search Filters
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {/* Featured Article Banner (First post) */}
                            {featuredPost && selectedCategory === 'All' && !searchQuery && (
                                <div className="mb-12">
                                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                                        Featured Headline Story
                                    </div>
                                    <PostCard {...featuredPost} />
                                </div>
                            )}

                            {/* Remaining Articles Grid */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-white tracking-tight">
                                        {selectedCategory === 'All' ? 'Latest Published Articles' : `${selectedCategory} Articles`}
                                    </h3>
                                    <span className="text-xs text-slate-400 font-medium">
                                        Showing {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {(selectedCategory === 'All' && !searchQuery ? remainingPosts : filteredPosts).map((post) => (
                                        <PostCard key={post.$id} {...post} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </Container>
            </section>
        </div>
    )
}

export default Home;