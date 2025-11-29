
import React, { useState } from 'react';
import { Post, Comment, User } from '../types';

interface CommentsViewProps {
  post: Post;
  currentUser: User;
  onClose: () => void;
}

const CommentsView: React.FC<CommentsViewProps> = ({ post, currentUser, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(post.comments || []);

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: `nc-${Date.now()}`,
      user: currentUser,
      text: newComment,
      timestamp: 'Just now',
      isLiked: false,
    };
    setComments([...comments, comment]);
    setNewComment('');
  };

  const toggleLike = (id: string) => {
    setComments(comments.map(c => 
      c.id === id ? { ...c, isLiked: !c.isLiked } : c
    ));
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background-light dark:bg-background-dark">
      <div className="flex items-center gap-4 border-b border-slate-200 p-4 dark:border-slate-800">
        <button onClick={onClose} className="text-slate-800 dark:text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="font-bold text-slate-800 dark:text-white">Comments</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="mb-6 flex gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
            <div 
              className="h-8 w-8 rounded-full bg-cover bg-center" 
              style={{ backgroundImage: `url("${post.user.avatarUrl}")` }}
            />
            <div className="flex flex-col">
              <p className="text-sm text-slate-800 dark:text-white">
                <span className="font-bold mr-2">{post.user.username}</span>
                {post.caption}
              </p>
              <span className="text-xs text-slate-500 mt-1">{post.timestamp}</span>
            </div>
        </div>

        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div 
                className="h-8 w-8 shrink-0 rounded-full bg-cover bg-center" 
                style={{ backgroundImage: `url("${comment.user.avatarUrl}")` }}
              />
              <div className="flex flex-1 flex-col gap-0.5">
                <p className="text-sm text-slate-800 dark:text-white">
                  <span className="font-bold mr-2">{comment.user.username}</span>
                  {comment.text}
                </p>
                <div className="flex gap-4 text-xs text-slate-500">
                  <span>{comment.timestamp}</span>
                  <button onClick={() => setNewComment(`@${comment.user.username} `)} className="font-semibold">Reply</button>
                </div>
              </div>
              <button onClick={() => toggleLike(comment.id)} className={`ml-auto text-xs ${comment.isLiked ? 'text-red-500' : 'text-slate-400'}`}>
                <span className="material-symbols-outlined text-sm" style={comment.isLiked ? { fontVariationSettings: "'FILL' 1" } : undefined}>favorite</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-md border-t border-slate-200 bg-background-light p-4 dark:border-slate-800 dark:bg-background-dark safe-area-bottom">
        <div className="flex items-center gap-3">
          <div 
            className="h-8 w-8 rounded-full bg-cover bg-center" 
            style={{ backgroundImage: `url("${currentUser.avatarUrl}")` }}
          />
          <input 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
            type="text" 
            placeholder={`Add a comment for ${post.user.username}...`}
            className="flex-1 rounded-full border-none bg-slate-100 px-4 py-2 text-sm focus:ring-1 focus:ring-primary dark:bg-slate-800 dark:text-white"
          />
          <button 
            disabled={!newComment.trim()}
            onClick={handlePostComment}
            className="font-semibold text-primary disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsView;
