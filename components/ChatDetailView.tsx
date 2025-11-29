
import React, { useState, useEffect, useRef } from 'react';
import { Chat, Message } from '../types';

interface ChatDetailViewProps {
  chat: Chat;
  onBack: () => void;
}

const ChatDetailView: React.FC<ChatDetailViewProps> = ({ chat, onBack }) => {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [inputText, setInputText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: `nm-${Date.now()}`,
      senderId: 'me',
      text: inputText,
      timestamp: 'Just now',
      isMe: true,
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-background-light/95 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-background-dark/95">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-slate-800 dark:text-white">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex items-center gap-3">
             <div 
                className="h-8 w-8 rounded-full bg-cover bg-center" 
                style={{ backgroundImage: `url("${chat.user.avatarUrl}")` }}
              />
             <span className="font-bold text-slate-800 dark:text-white">{chat.user.username}</span>
          </div>
        </div>
        <button className="text-slate-800 dark:text-white">
            <span className="material-symbols-outlined">info</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        <div className="flex flex-col gap-4">
           {messages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                    msg.isMe 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-white rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
             </div>
           ))}
           <div ref={bottomRef} />
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-md border-t border-slate-200 bg-background-light p-4 dark:border-slate-800 dark:bg-background-dark safe-area-bottom">
        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-primary dark:bg-slate-800">
             <span className="material-symbols-outlined">add_circle</span>
          </button>
          <input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            type="text" 
            placeholder="Message..."
            className="flex-1 rounded-full border-none bg-slate-100 px-4 py-2 text-sm focus:ring-1 focus:ring-primary dark:bg-slate-800 dark:text-white"
          />
          {inputText ? (
            <button onClick={handleSend} className="font-semibold text-primary">Send</button>
          ) : (
            <button className="text-slate-500">
               <span className="material-symbols-outlined">mic</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatDetailView;
