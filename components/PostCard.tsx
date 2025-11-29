
import React, { useState } from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onCommentClick: (postId: string) => void;
  onProfileClick: (userId: string) => void;
  onMoreClick: (postId: string) => void;
  onSendClick: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onCommentClick, 
  onProfileClick, 
  onMoreClick,
  onSendClick 
}) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [heartAnim, setHeartAnim] = useState(false);

  const toggleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
      setHeartAnim(true);
      setTimeout(() => setHeartAnim(false), 1000);
    }
    setIsLiked(!isLiked);
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="flex flex-col gap-3 py-4 border-b border-slate-200 dark:border-slate-800 last:border-0 relative">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4">
        <button onClick={() => onProfileClick(post.user.id)} className="flex items-center gap-3 focus:outline-none">
          <div
            className="h-10 w-10 rounded-full bg-cover bg-center bg-no-repeat ring-1 ring-slate-200 dark:ring-slate-700"
            style={{ backgroundImage: `url("${post.user.avatarUrl}")` }}
          />
          <span className="font-bold text-slate-800 dark:text-white hover:underline">{post.user.username}</span>
        </button>
        <button 
          onClick={() => onMoreClick(post.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          <span className="material-symbols-outlined text-xl">more_horiz</span>
        </button>
      </div>

      {/* Post Image */}
      <div
        className="aspect-square w-full bg-cover bg-center bg-no-repeat cursor-pointer relative"
        style={{ backgroundImage: `url("${post.imageUrl}")` }}
        onDoubleClick={toggleLike}
      >
        {heartAnim && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-ping-short">
             <span className="material-symbols-outlined text-white text-8xl drop-shadow-lg" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-2 transition-transform active:scale-90 ${
              isLiked
                ? 'text-red-500'
                : 'text-slate-600 hover:text-red-500 dark:text-slate-300 dark:hover:text-red-500'
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={isLiked ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              favorite
            </span>
          </button>
          <button 
            onClick={() => onCommentClick(post.id)}
            className="flex items-center gap-2 text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary"
          >
            <span className="material-symbols-outlined">chat_bubble</span>
          </button>
          <button 
            onClick={() => onSendClick(post.id)}
            className="flex items-center gap-2 text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
        <button
          onClick={toggleSave}
          className={`text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary ${
            isSaved ? 'text-primary' : ''
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            bookmark_border
          </span>
        </button>
      </div>

      {/* Post Footer */}
      <div className="flex flex-col gap-1 px-4 text-sm">
        <p className="font-semibold text-slate-800 dark:text-slate-100">{likesCount} likes</p>
        <p className="text-slate-800 dark:text-slate-100">
          <span 
            className="font-semibold cursor-pointer hover:underline mr-1" 
            onClick={() => onProfileClick(post.user.id)}
          >
            {post.user.username}
          </span> 
          {post.caption}
        </p>
        <button 
          onClick={() => onCommentClick(post.id)}
          className="text-left text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300"
        >
          View all {post.commentsCount} comments
        </button>
        <p className="text-xs text-slate-400 dark:text-slate-500">{post.timestamp}</p>
      </div>
    </div>
  );
};

export default PostCard;
