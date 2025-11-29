
import React from 'react';
import { NOTIFICATIONS } from '../constants';

interface ActivityViewProps {
  onUserClick: (userId: string) => void;
  onPostClick: (postId: string) => void;
}

const ActivityView: React.FC<ActivityViewProps> = ({ onUserClick, onPostClick }) => {
  return (
    <div className="flex w-full flex-col pb-20">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-background-light/95 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-background-dark/95">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Activity</h2>
      </div>
      <div className="flex flex-col">
        {NOTIFICATIONS.map((notif) => (
          <div 
            key={notif.id} 
            className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer"
            onClick={() => notif.postId ? onPostClick(notif.postId) : onUserClick(notif.user.id)}
          >
            <div className="flex items-center gap-3">
              <div 
                className="h-10 w-10 rounded-full bg-cover bg-center" 
                style={{ backgroundImage: `url("${notif.user.avatarUrl}")` }}
                onClick={(e) => {
                   e.stopPropagation();
                   onUserClick(notif.user.id);
                }}
              />
              <div className="flex flex-col text-sm">
                <p className="text-slate-800 dark:text-white">
                  <span className="font-bold">{notif.user.username}</span> {notif.text}
                </p>
                <p className="text-xs text-slate-500">{notif.timestamp}</p>
              </div>
            </div>
            {notif.postImage ? (
              <div 
                className="h-10 w-10 rounded bg-cover bg-center"
                style={{ backgroundImage: `url("${notif.postImage}")` }}
              />
            ) : notif.type === 'follow' ? (
              <button 
                 className="rounded bg-primary px-3 py-1 text-xs font-semibold text-white hover:bg-cyan-600"
                 onClick={(e) => {
                     e.stopPropagation();
                     // Follow logic here
                 }}
              >
                Follow
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityView;
