
import React, { useEffect, useState } from 'react';
import { Story } from '../types';

interface StoryModalProps {
  story: Story;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, onClose, onNext, onPrev }) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [message, setMessage] = useState('');
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev >= 100) {
            onNext();
            return 0; // Reset just in case component doesn't unmount immediately
          }
          return prev + 1;
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [story, onNext, isPaused]);

  const handleSend = () => {
    if (message.trim()) {
      // Mock send
      setMessage('');
      alert('Reply sent!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Progress Bar */}
      <div className="absolute top-4 left-0 right-0 z-20 flex gap-1 px-2">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-8 left-0 right-0 z-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img 
            src={story.user.avatarUrl} 
            className="h-8 w-8 rounded-full border border-white/50" 
            alt={story.user.username}
          />
          <span className="font-semibold text-white shadow-black drop-shadow-md">{story.user.username}</span>
          <span className="text-xs text-white/70">2h</span>
        </div>
        <button onClick={onClose} className="text-white z-50 p-2">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Main Content */}
      <div 
        className="relative h-full w-full bg-slate-900 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${story.imageUrl}")` }}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Tap Areas */}
        <div className="absolute inset-0 flex">
          <div className="h-full w-1/3" onClick={onPrev}></div>
          <div className="h-full w-2/3" onClick={onNext}></div>
        </div>
      </div>

      {/* Footer Reply */}
      <div 
        className="absolute bottom-4 w-full px-4 z-50"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-center gap-4">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Send message" 
            className="w-full rounded-full border border-white/30 bg-transparent px-4 py-3 text-white placeholder-white/70 backdrop-blur-md focus:border-white focus:ring-0"
          />
          <button 
            onClick={() => setHasLiked(!hasLiked)}
            className={`transition-colors ${hasLiked ? 'text-red-500' : 'text-white'}`}
          >
            <span className="material-symbols-outlined text-3xl" style={hasLiked ? { fontVariationSettings: "'FILL' 1" } : undefined}>favorite</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
