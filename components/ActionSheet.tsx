
import React from 'react';

interface ActionOption {
  label: string;
  isDestructive?: boolean;
  action: () => void;
}

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  options: ActionOption[];
}

const ActionSheet: React.FC<ActionSheetProps> = ({ isOpen, onClose, options }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-md rounded-t-2xl bg-background-light p-4 dark:bg-card-dark animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-slate-300 dark:bg-slate-600" />
        <div className="flex flex-col gap-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                option.action();
                onClose();
              }}
              className={`w-full rounded-xl bg-slate-100 p-4 text-center font-semibold dark:bg-slate-800 ${
                option.isDestructive 
                  ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' 
                  : 'text-slate-800 hover:bg-slate-200 dark:text-white dark:hover:bg-slate-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button 
          onClick={onClose}
          className="mt-4 w-full rounded-xl bg-transparent p-4 text-center font-semibold text-slate-800 dark:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ActionSheet;
