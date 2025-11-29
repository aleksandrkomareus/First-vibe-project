
import React, { useState } from 'react';
import { User } from '../types';

interface EditProfileViewProps {
  user: User;
  onBack: () => void;
  onSave: (updatedUser: Partial<User>) => void;
}

const EditProfileView: React.FC<EditProfileViewProps> = ({ user, onBack, onSave }) => {
  const [name, setName] = useState(user.fullName || '');
  const [bio, setBio] = useState(user.bio || '');
  const [username, setUsername] = useState(user.username);

  const handleSave = () => {
    onSave({ fullName: name, bio, username });
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-background-light/95 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-background-dark/95">
        <button onClick={onBack} className="text-slate-800 dark:text-white">Cancel</button>
        <h2 className="font-bold text-slate-800 dark:text-white">Edit Profile</h2>
        <button onClick={handleSave} className="font-bold text-primary">Done</button>
      </div>

      <div className="flex flex-col items-center gap-4 py-6">
        <div className="flex flex-col items-center gap-2">
          <div 
            className="h-24 w-24 rounded-full bg-cover bg-center ring-4 ring-slate-100 dark:ring-slate-800"
            style={{ backgroundImage: `url("${user.avatarUrl}")` }}
          />
          <button className="text-sm font-semibold text-primary">Change Profile Photo</button>
        </div>

        <div className="w-full px-4 mt-4 flex flex-col gap-4">
           <div className="flex flex-col gap-1">
             <label className="text-xs text-slate-500">Name</label>
             <input 
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="border-b border-slate-200 bg-transparent py-2 text-slate-800 focus:border-slate-800 focus:outline-none dark:border-slate-700 dark:text-white dark:focus:border-white"
             />
           </div>

           <div className="flex flex-col gap-1">
             <label className="text-xs text-slate-500">Username</label>
             <input 
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               className="border-b border-slate-200 bg-transparent py-2 text-slate-800 focus:border-slate-800 focus:outline-none dark:border-slate-700 dark:text-white dark:focus:border-white"
             />
           </div>

           <div className="flex flex-col gap-1">
             <label className="text-xs text-slate-500">Bio</label>
             <textarea 
               value={bio}
               onChange={(e) => setBio(e.target.value)}
               className="border-b border-slate-200 bg-transparent py-2 text-slate-800 focus:border-slate-800 focus:outline-none dark:border-slate-700 dark:text-white dark:focus:border-white resize-none"
               rows={3}
             />
           </div>
        </div>

        <div className="mt-4 w-full border-t border-b border-slate-200 py-3 px-4 dark:border-slate-800">
           <button className="w-full text-left text-primary">Switch to Professional Account</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileView;
