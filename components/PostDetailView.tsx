
import React from 'react';
import PostCard from './PostCard';
import { Post } from '../types';

interface PostDetailViewProps {
  post: Post;
  onBack: () => void;
  onCommentClick: (postId: string) => void;
  onProfileClick: (userId: string) => void;
  onMoreClick: (postId: string) => void;
  onSendClick: (postId: string) => void;
}

const PostDetailView: React.FC<PostDetailViewProps> = ({ 
  post, 
  onBack, 
  onCommentClick, 
  onProfileClick,
  onMoreClick,
  onSendClick
}) => {
  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark pb-safe">
      <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-slate-200 bg-background-light/95 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-background-dark/95">
        <button onClick={onBack} className="text-slate-800 dark:text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-wider text-xs text-center flex-1 pr-8">Posts</h2>
      </div>
      <PostCard 
         post={post} 
         onCommentClick={onCommentClick} 
         onProfileClick={onProfileClick}
         onMoreClick={onMoreClick}
         onSendClick={onSendClick}
      />
    </div>
  );
};

export default PostDetailView;
