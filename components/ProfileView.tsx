
import React, { useState } from 'react';
import { User, Post } from '../types';

interface ProfileViewProps {
  user: User;
  posts: Post[];
  onBack?: () => void;
  isOwnProfile?: boolean;
  onEditProfile: () => void;
  onPostClick: (post: Post) => void;
  onShare: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ 
  user, 
  posts, 
  onBack, 
  isOwnProfile, 
  onEditProfile,
  onPostClick,
  onShare 
}) => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex w-full flex-col pb-20 bg-background-light dark:bg-background-dark min-h-screen">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-background-light/95 px-4 py-2 backdrop-blur-sm dark:border-slate-800 dark:bg-background-dark/95">
        {onBack ? (
           <button onClick={onBack} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700">
             <span className="material-symbols-outlined">arrow_back</span>
           </button>
        ) : (
          <h2 className="text-lg font-bold text-slate-800 dark:text-white px-2">{user.username}</h2>
        )}
        {isOwnProfile && (
           <button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-800 dark:text-white ml-auto">
            <span className="material-symbols-outlined">menu</span>
           </button>
        )}
      </div>

      <div className="flex flex-col gap-6 px-4 py-6">
        <div className="flex items-center justify-between">
          <div 
            className="h-20 w-20 rounded-full bg-cover bg-center ring-2 ring-slate-200 dark:ring-slate-700" 
            style={{ backgroundImage: `url("${user.avatarUrl}")` }}
          />
          <div className="flex gap-6 text-center">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-800 dark:text-white">{user.posts}</span>
              <span className="text-xs text-slate-500">Posts</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-800 dark:text-white">{user.followers}</span>
              <span className="text-xs text-slate-500">Followers</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-800 dark:text-white">{user.following}</span>
              <span className="text-xs text-slate-500">Following</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
            <h1 className="font-bold text-slate-800 dark:text-white">{user.fullName || user.username}</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line">{user.bio}</p>
        </div>

        <div className="flex gap-2">
            {isOwnProfile ? (
                <button 
                  onClick={onEditProfile}
                  className="flex-1 rounded-lg bg-slate-200 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                >
                    Edit Profile
                </button>
            ) : (
                 <button className="flex-1 rounded-lg bg-primary py-1.5 text-sm font-semibold text-white hover:bg-cyan-600">
                    Follow
                </button>
            )}
             <button 
                onClick={onShare}
                className="flex-1 rounded-lg bg-slate-200 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
             >
                Share Profile
            </button>
        </div>
      </div>
      
      {/* Grid */}
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="flex justify-around py-2">
             <button 
                onClick={() => setLayout('grid')}
                className={`flex-1 pb-2 border-b-2 ${layout === 'grid' ? 'border-slate-800 dark:border-white text-slate-800 dark:text-white' : 'border-transparent text-slate-400'}`}
             >
                <span className="material-symbols-outlined">grid_on</span>
             </button>
             <button 
                onClick={() => setLayout('list')}
                className={`flex-1 pb-2 border-b-2 ${layout === 'list' ? 'border-slate-800 dark:border-white text-slate-800 dark:text-white' : 'border-transparent text-slate-400'}`}
             >
                <span className="material-symbols-outlined">crop_square</span>
             </button>
        </div>
        
        {layout === 'grid' ? (
          <div className="grid grid-cols-3 gap-0.5">
            {posts.length > 0 ? posts.map(post => (
                <div 
                  key={post.id} 
                  onClick={() => onPostClick(post)}
                  className="aspect-square bg-slate-200 dark:bg-slate-800 relative cursor-pointer group"
                >
                    <img src={post.imageUrl} className="absolute w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
                </div>
            )) : (
                <div className="col-span-3 py-10 text-center text-slate-500 text-sm">No posts yet</div>
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            {posts.map(post => (
               <div key={post.id} className="flex gap-4 p-4 border-b border-slate-100 dark:border-slate-800" onClick={() => onPostClick(post)}>
                  <img src={post.imageUrl} className="h-24 w-24 object-cover rounded" />
                  <div className="flex flex-col justify-center">
                    <p className="font-semibold text-slate-800 dark:text-white">{post.caption}</p>
                    <p className="text-xs text-slate-500 mt-1">{post.likesCount} likes • {post.commentsCount} comments</p>
                  </div>
               </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
