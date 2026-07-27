import React, { useState, useEffect } from 'react'
import { Container, PostCard } from "../Components/index"
import appwriteService from "../appwrite/config";
import { SAMPLE_POSTS } from '../utils/sampleData'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts([])
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
    }, []) // Empty dependency array prevents re-render loop

    const filteredPosts = posts.filter(post =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='w-full py-8 text-slate-100'>
            <Container>
                {/* Header & Filter Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">All Blog Articles</h1>
                        <p className="text-sm text-slate-400 mt-1">Browse all published stories and technology updates</p>
                    </div>

                    <div className="relative max-w-xs w-full">
                        <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Filter articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} className="h-72 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse p-4"></div>
                        ))}
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800 max-w-md mx-auto my-8 p-6">
                        <p className="text-slate-400 text-sm">No posts found matching "{searchQuery}"</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredPosts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts;