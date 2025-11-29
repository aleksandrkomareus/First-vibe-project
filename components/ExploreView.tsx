
import React from 'react';

const EXPLORE_IMAGES = [
  'https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1508739773434-c26b3d0ed6c5?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1505968409348-bd000797c92e?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=500&fit=crop',
];

interface ExploreViewProps {
  onPostClick: (index: number) => void;
}

const ExploreView: React.FC<ExploreViewProps> = ({ onPostClick }) => {
  return (
    <div className="w-full pb-20">
      <div className="sticky top-0 z-10 p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full rounded-xl border-none bg-slate-200 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-0.5">
        {EXPLORE_IMAGES.map((url, index) => (
          <div 
            key={index} 
            onClick={() => onPostClick(index)}
            className={`relative bg-slate-200 dark:bg-slate-800 cursor-pointer ${index % 10 === 0 ? 'col-span-2 row-span-2' : 'aspect-square'}`}
          >
            <img 
              src={url} 
              alt="Explore" 
              className="absolute h-full w-full object-cover transition-opacity hover:opacity-90"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreView;
