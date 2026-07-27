import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { SAMPLE_POSTS, formatDate, estimateReadTime } from "../utils/sampleData";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            setLoading(true);
            appwriteService.getPost(slug).then((res) => {
                if (res) {
                    setPost(res);
                } else {
                    // Try demo sample posts
                    const found = SAMPLE_POSTS.find(p => p.$id === slug);
                    if (found) {
                        setPost(found);
                    } else {
                        navigate("/");
                    }
                }
            }).catch(() => {
                const found = SAMPLE_POSTS.find(p => p.$id === slug);
                if (found) setPost(found);
                else navigate("/");
            }).finally(() => setLoading(false));
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    if (post.featuredImage) {
                        appwriteService.deleteFile(post.featuredImage);
                    }
                    navigate("/");
                }
            });
        }
    };

    if (loading) {
        return (
            <div className="py-16 text-center text-slate-400">
                <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
                Loading Article...
            </div>
        );
    }

    if (!post) return null;

    const imageUrl = post.featuredImage && typeof post.featuredImage === 'string' && post.featuredImage.startsWith('http')
        ? post.featuredImage
        : appwriteService.getFilePreview(post.featuredImage);

    const readTime = post.readTime || estimateReadTime(post.content);
    const publishedDate = formatDate(post.$createdAt);
    const authorName = post.authorName || (isAuthor ? (userData?.name || "Author") : "MegaBlog Author");

    return (
        <div className="py-8 text-slate-100 min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Back Button */}
                    <div>
                        <Link 
                            to="/" 
                            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Articles
                        </Link>
                    </div>

                    {/* Article Header */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                {post.category || "Technology"}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                                {readTime}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                            {post.title}
                        </h1>

                        {/* Author Info & Date */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-md">
                                    {authorName.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-200">{authorName}</p>
                                    <p className="text-xs text-slate-400">{publishedDate}</p>
                                </div>
                            </div>

                            {/* Author Controls */}
                            {isAuthor && (
                                <div className="flex items-center gap-2">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button bgColor="bg-emerald-600 hover:bg-emerald-500" className="text-xs py-2 px-3">
                                            Edit Article
                                        </Button>
                                    </Link>
                                    <Button bgColor="bg-rose-600 hover:bg-rose-500" onClick={deletePost} className="text-xs py-2 px-3">
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Featured Image Cover */}
                    <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
                        <img
                            src={imageUrl}
                            alt={post.title}
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80";
                            }}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Article Content Container */}
                    <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-xl">
                        <div className="browser-css max-w-none">
                            {parse(post.content || "<p>No article content available.</p>")}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}