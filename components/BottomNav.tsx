
import React from 'react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onCreateClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, onCreateClick }) => {
  const getTabClass = (tab: Tab) => 
    activeTab === tab 
      ? "text-primary" 
      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors";

  const getIconStyle = (tab: Tab) => 
    activeTab === tab ? { fontVariationSettings: "'FILL' 1" } : undefined;

  return (
    <nav className="fixed bottom-0 z-10 flex h-20 w-full max-w-md items-center justify-around border-t border-slate-200 bg-background-light/90 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/90 safe-area-bottom">
      <button 
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center gap-1 ${getTabClass('home')}`}
      >
        <span className="material-symbols-outlined" style={getIconStyle('home')}>home</span>
        <span className={`text-[10px] font-bold ${activeTab === 'home' ? 'opacity-100' : 'opacity-0'} transition-opacity`}>Home</span>
      </button>

      <button 
        onClick={() => onTabChange('explore')}
        className={`flex flex-col items-center gap-1 ${getTabClass('explore')}`}
      >
        <span className="material-symbols-outlined" style={getIconStyle('explore')}>search</span>
        <span className={`text-[10px] font-bold ${activeTab === 'explore' ? 'opacity-100' : 'opacity-0'} transition-opacity`}>Explore</span>
      </button>

      <button 
        onClick={onCreateClick}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform active:scale-95"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      <button 
        onClick={() => onTabChange('activity')}
        className={`flex flex-col items-center gap-1 ${getTabClass('activity')}`}
      >
        <span className="material-symbols-outlined" style={getIconStyle('activity')}>notifications</span>
        <span className={`text-[10px] font-bold ${activeTab === 'activity' ? 'opacity-100' : 'opacity-0'} transition-opacity`}>Activity</span>
      </button>

      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center gap-1 ${getTabClass('profile')}`}
      >
        <span className="material-symbols-outlined" style={getIconStyle('profile')}>person</span>
        <span className={`text-[10px] font-bold ${activeTab === 'profile' ? 'opacity-100' : 'opacity-0'} transition-opacity`}>Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;
