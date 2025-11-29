
import React from 'react';
import { Story } from '../types';

interface StoryRailProps {
  stories: Story[];
  onStoryClick: (storyId: string) => void;
}

const StoryRail: React.FC<StoryRailProps> = ({ stories, onStoryClick }) => {
  return (
    <>
      <div className="w-full overflow-hidden px-4 py-4">
        <div className="flex min-h-min flex-row items-start justify-start gap-4 overflow-x-auto no-scrollbar">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => onStoryClick(story.id)}
              className="flex w-20 flex-col items-center justify-center gap-2 text-center focus:outline-none group"
            >
              <div className="relative transition-transform duration-200 group-hover:scale-105">
                <div
                  className={`h-16 w-16 rounded-full bg-cover bg-center bg-no-repeat ${
                    story.user.isCurrentUser
                      ? 'ring-2 ring-slate-300 dark:ring-slate-600'
                      : 'p-0.5 ring-2 ring-primary'
                  }`}
                  style={{ backgroundImage: `url("${story.user.avatarUrl}")` }}
                  data-alt={`Profile picture of ${story.user.username}`}
                />
                {story.user.isCurrentUser && (
                  <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background-light bg-primary dark:border-background-dark">
                    <span className="material-symbols-outlined text-base text-white">add</span>
                  </div>
                )}
              </div>
              <p className="w-full truncate text-xs text-slate-600 dark:text-slate-400">
                {story.user.isCurrentUser ? 'Your Story' : story.user.username}
              </p>
            </button>
          ))}
        </div>
      </div>
      <hr className="border-slate-200 dark:border-slate-800" />
    </>
  );
};

export default StoryRail;
