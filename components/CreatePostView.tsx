
import React, { useState } from 'react';

interface CreatePostViewProps {
  onBack: () => void;
  onPost: (caption: string) => void;
}

const CreatePostView: React.FC<CreatePostViewProps> = ({ onBack, onPost }) => {
  const [caption, setCaption] = useState('');
  const [step, setStep] = useState(1); // 1: Select, 2: Caption

  const mockImages = [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1526779218005-0638cf943588?fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?fit=crop&w=500&q=80',
  ];

  const [selectedImage, setSelectedImage] = useState(mockImages[0]);

  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-background-light/95 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-background-dark/95">
        <button onClick={() => step === 1 ? onBack() : setStep(1)} className="text-slate-800 dark:text-white">
          <span className="material-symbols-outlined">{step === 1 ? 'close' : 'arrow_back'}</span>
        </button>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">{step === 1 ? 'New Post' : 'New Post'}</h2>
        <button 
          onClick={() => step === 1 ? setStep(2) : onPost(caption)}
          className="font-semibold text-primary"
        >
          {step === 1 ? 'Next' : 'Share'}
        </button>
      </div>

      {step === 1 ? (
        <div className="flex flex-col flex-1">
          <div className="aspect-square w-full bg-black">
            <img src={selectedImage} className="h-full w-full object-contain" />
          </div>
          <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
             <div className="flex items-center justify-between p-3">
               <span className="font-semibold text-slate-800 dark:text-white">Recents</span>
               <button className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
               </button>
             </div>
             <div className="grid grid-cols-4 gap-0.5">
               {mockImages.map((img, i) => (
                 <div key={i} onClick={() => setSelectedImage(img)} className={`aspect-square relative cursor-pointer ${selectedImage === img ? 'opacity-50' : ''}`}>
                   <img src={img} className="absolute h-full w-full object-cover" />
                 </div>
               ))}
             </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-4 gap-4">
           <div className="flex gap-4">
              <div className="h-16 w-16 bg-slate-200">
                <img src={selectedImage} className="h-full w-full object-cover" />
              </div>
              <textarea 
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                className="flex-1 resize-none bg-transparent text-slate-800 placeholder-slate-500 focus:outline-none dark:text-white"
                rows={3}
              />
           </div>
           <hr className="border-slate-200 dark:border-slate-800" />
           <div className="flex justify-between items-center py-2">
             <span className="text-slate-800 dark:text-white">Add Location</span>
             <span className="material-symbols-outlined text-slate-400">location_on</span>
           </div>
           <hr className="border-slate-200 dark:border-slate-800" />
           <div className="flex justify-between items-center py-2">
             <span className="text-slate-800 dark:text-white">Tag People</span>
             <span className="material-symbols-outlined text-slate-400">person_add</span>
           </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostView;
