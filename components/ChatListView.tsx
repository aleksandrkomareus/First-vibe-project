
import React from 'react';
import { CHATS } from '../constants';
import { Chat } from '../types';

interface ChatListViewProps {
  onBack: () => void;
  onChatClick: (chatId: string) => void;
}

const ChatListView: React.FC<ChatListViewProps> = ({ onBack, onChatClick }) => {
  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark pb-safe">
      <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-slate-200 bg-background-light/95 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-background-dark/95">
        <button onClick={onBack} className="text-slate-800 dark:text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Messages</h2>
        <div className="ml-auto">
          <button className="text-slate-800 dark:text-white">
            <span className="material-symbols-outlined">edit_square</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="px-4 py-4">
           <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full rounded-xl border-none bg-slate-200 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {CHATS.map((chat) => (
          <button 
            key={chat.id}
            onClick={() => onChatClick(chat.id)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <div className="relative">
              <div 
                className="h-14 w-14 rounded-full bg-cover bg-center" 
                style={{ backgroundImage: `url("${chat.user.avatarUrl}")` }}
              />
              {chat.unreadCount > 0 && (
                <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-primary border-2 border-background-light dark:border-background-dark"></div>
              )}
            </div>
            <div className="flex flex-1 flex-col items-start gap-1 overflow-hidden">
              <p className="font-semibold text-slate-800 dark:text-white">{chat.user.username}</p>
              <p className={`w-full truncate text-sm ${chat.unreadCount > 0 ? 'font-bold text-slate-800 dark:text-white' : 'text-slate-500'}`}>
                {chat.lastMessage}
              </p>
            </div>
            <span className="text-xs text-slate-400">{chat.timestamp}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatListView;
