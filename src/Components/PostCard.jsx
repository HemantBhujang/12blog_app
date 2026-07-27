import React, { useState } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import { formatDate, estimateReadTime } from '../utils/sampleData'

function PostCard({ $id, title, featuredImage, content, $createdAt, category, authorName, readTime }) {
    const [imgSrc, setImgSrc] = useState(() => {
        if (!featuredImage) return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80";
        if (typeof featuredImage === 'string' && featuredImage.startsWith('http')) {
            return featuredImage;
        }
        return appwriteService.getFilePreview(featuredImage);
    });

    const displayCategory = category || "Article";
    const displayReadTime = readTime || estimateReadTime(content);
    const displayDate = formatDate($createdAt);
    const displayAuthor = authorName || "MegaBlog Author";

    const handleImgError = () => {
        setImgSrc("https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80");
    };

    return (
        <Link to={`/post/${$id}`} className="group block h-full">
            <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col justify-between border border-slate-800/80 bg-slate-900/40 hover:border-indigo-500/50 transition-all duration-300">
                <div>
                    {/* Image Thumbnail Container */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                        <img 
                            src={imgSrc} 
                            alt={title} 
                            onError={handleImgError}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                        
                        {/* Category Badge */}
                        <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full bg-slate-950/80 text-indigo-400 border border-indigo-500/30 backdrop-blur-md">
                            {displayCategory}
                        </span>

                        {/* Read Time Tag */}
                        <span className="absolute bottom-3 right-3 text-xs text-slate-300 bg-slate-950/70 px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center gap-1 font-medium">
                            <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {displayReadTime}
                        </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col">
                        <h2 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2 mb-2 leading-snug">
                            {title}
                        </h2>
                        
                        {content && (
                            <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                                {content.replace(/<[^>]+>/g, '')}
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-[10px] text-white">
                            {displayAuthor.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-300 truncate max-w-[110px]">
                            {displayAuthor}
                        </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                        {displayDate}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default PostCard;