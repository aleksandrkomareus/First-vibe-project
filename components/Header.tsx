
import React from 'react';

interface HeaderProps {
  onMessageClick: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMessageClick, onHomeClick }) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-white/10 bg-background-light/80 px-4 backdrop-blur-sm dark:bg-background-dark/80">
      <button onClick={onHomeClick} className="flex items-center gap-2 focus:outline-none">
        <span className="material-symbols-outlined text-3xl text-primary">hub</span>
        <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Connect</h1>
      </button>
      <button 
        onClick={onMessageClick}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-transparent text-slate-600 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        <span className="material-symbols-outlined text-2xl">send</span>
      </button>
    </header>
  );
};

export default Header;
