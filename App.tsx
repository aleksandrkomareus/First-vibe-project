
import React, { useState } from 'react';
import Header from './components/Header';
import StoryRail from './components/StoryRail';
import PostCard from './components/PostCard';
import BottomNav from './components/BottomNav';
import ExploreView from './components/ExploreView';
import ActivityView from './components/ActivityView';
import ProfileView from './components/ProfileView';
import StoryModal from './components/StoryModal';
import CommentsView from './components/CommentsView';
import ChatListView from './components/ChatListView';
import ChatDetailView from './components/ChatDetailView';
import CreatePostView from './components/CreatePostView';
import EditProfileView from './components/EditProfileView';
import PostDetailView from './components/PostDetailView';
import ActionSheet from './components/ActionSheet';
import { STORIES, POSTS, CURRENT_USER, USERS, CHATS } from './constants';
import { Tab, ViewState, User, Post } from './types';

const App: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [viewStack, setViewStack] = useState<ViewState[]>([{ name: 'tab' }]); // Stack history

  // Overlay State (Modals that sit on top of everything)
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper to get current active view
  const currentView = viewStack[viewStack.length - 1];

  // --- Navigation Helpers ---
  const pushView = (name: ViewState['name'], data?: any) => {
    setViewStack(prev => [...prev, { name, data }]);
    window.scrollTo({ top: 0 });
  };

  const popView = () => {
    setViewStack(prev => {
      if (prev.length > 1) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  };

  const handleTabChange = (tab: Tab) => {
    // Reset stack when changing tabs
    setViewStack([{ name: 'tab' }]);
    setActiveTab(tab);
    window.scrollTo({ top: 0 });
  };

  // --- Global Action Handlers ---
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleProfileClick = (userId: string) => {
    // Determine which user object to pass
    const user = Object.values(USERS).find(u => u.id === userId) || CURRENT_USER;
    if (user.id === CURRENT_USER.id && activeTab === 'profile' && currentView.name === 'tab') {
      return; // Already on my profile tab
    }
    pushView('tab', { overrideTab: 'profile', userId }); // Reuse profile view logic by rendering ProfileView with specific user
  };

  const handlePostClick = (post: Post) => {
     pushView('post-detail', { post });
  };

  // --- Render Content Based on Stack ---
  const renderView = () => {
    // 1. Messages Flow
    if (currentView.name === 'messages') {
      return (
        <ChatListView 
          onBack={popView} 
          onChatClick={(chatId) => {
            const chat = CHATS.find(c => c.id === chatId);
            if(chat) pushView('chat-detail', { chat });
          }} 
        />
      );
    }
    if (currentView.name === 'chat-detail') {
      return <ChatDetailView chat={currentView.data.chat} onBack={popView} />;
    }

    // 2. Post Creation Flow
    if (currentView.name === 'create-post') {
       return (
         <CreatePostView 
            onBack={popView} 
            onPost={(caption) => {
              showToast("Post shared successfully!");
              popView();
            }} 
         />
       );
    }

    // 3. Comments Flow
    if (currentView.name === 'comments') {
       const post = POSTS.find(p => p.id === currentView.data.postId);
       if (!post) return null;
       return <CommentsView post={post} currentUser={CURRENT_USER} onClose={popView} />;
    }

    // 4. Edit Profile Flow
    if (currentView.name === 'edit-profile') {
      return (
        <EditProfileView 
          user={CURRENT_USER} 
          onBack={popView} 
          onSave={(data) => {
            // Mock update
            Object.assign(CURRENT_USER, data); 
            showToast("Profile updated");
            popView();
          }} 
        />
      );
    }

    // 5. Single Post Detail
    if (currentView.name === 'post-detail') {
      return (
        <PostDetailView 
          post={currentView.data.post} 
          onBack={popView}
          onCommentClick={(postId) => pushView('comments', { postId })}
          onProfileClick={handleProfileClick}
          onMoreClick={() => setIsActionSheetOpen(true)}
          onSendClick={() => showToast("Shared to clipboard!")}
        />
      );
    }

    // 6. Main Tabs (and "View Profile as Page")
    // Check if we are "viewing a profile" that isn't the main tab root
    const isProfileOverride = currentView.data?.overrideTab === 'profile';
    const effectiveTab = isProfileOverride ? 'profile' : activeTab;
    const viewingUserId = currentView.data?.userId;

    switch (effectiveTab) {
      case 'home':
        return (
          <>
            <Header 
              onMessageClick={() => pushView('messages')} 
              onHomeClick={() => handleTabChange('home')} 
            />
            <main className="flex-1 pb-24">
              <StoryRail stories={STORIES} onStoryClick={setSelectedStoryId} />
              <div className="flex flex-col">
                {POSTS.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onCommentClick={(postId) => pushView('comments', { postId })}
                    onProfileClick={handleProfileClick}
                    onMoreClick={() => setIsActionSheetOpen(true)}
                    onSendClick={() => showToast("Shared to clipboard!")}
                  />
                ))}
              </div>
            </main>
          </>
        );
      case 'explore':
        return (
           <ExploreView 
             onPostClick={(index) => {
               // Mock finding a post from index, cycling through existing posts
               const post = POSTS[index % POSTS.length];
               handlePostClick(post);
             }} 
           />
        );
      case 'activity':
        return (
          <ActivityView 
            onUserClick={handleProfileClick} 
            onPostClick={(postId) => {
              const post = POSTS.find(p => p.id === postId);
              if(post) handlePostClick(post);
            }} 
          />
        );
      case 'profile':
        // Determine user to show
        const userToShow = viewingUserId 
          ? (Object.values(USERS).find(u => u.id === viewingUserId) || CURRENT_USER)
          : CURRENT_USER;
        
        const userPosts = POSTS.filter(p => p.user.id === userToShow.id || userToShow.isCurrentUser); // Fallback for mock

        return (
          <ProfileView 
            user={userToShow} 
            posts={userPosts} 
            isOwnProfile={userToShow.id === CURRENT_USER.id}
            onBack={isProfileOverride ? popView : undefined}
            onEditProfile={() => pushView('edit-profile')}
            onShare={() => showToast("Link copied to clipboard")}
            onPostClick={handlePostClick}
          />
        );
      default:
        return null;
    }
  };

  const selectedStory = STORIES.find(s => s.id === selectedStoryId);

  return (
    <div className="relative mx-auto flex h-auto min-h-screen w-full max-w-md flex-col bg-background-light dark:bg-background-dark font-display">
      
      {/* Main View Render */}
      {renderView()}
      
      {/* --- Overlays --- */}

      {/* 1. Stories */}
      {selectedStory && (
        <StoryModal 
          story={selectedStory} 
          onClose={() => setSelectedStoryId(null)} 
          onNext={() => {
            const idx = STORIES.findIndex(s => s.id === selectedStoryId);
            if (idx < STORIES.length - 1) setSelectedStoryId(STORIES[idx + 1].id);
            else setSelectedStoryId(null);
          }}
          onPrev={() => {
            const idx = STORIES.findIndex(s => s.id === selectedStoryId);
            if (idx > 0) setSelectedStoryId(STORIES[idx - 1].id);
          }}
        />
      )}

      {/* 2. Action Sheet */}
      <ActionSheet 
        isOpen={isActionSheetOpen} 
        onClose={() => setIsActionSheetOpen(false)}
        options={[
          { label: 'Report', isDestructive: true, action: () => showToast("Reported") },
          { label: 'Unfollow', isDestructive: true, action: () => showToast("Unfollowed") },
          { label: 'Copy Link', action: () => showToast("Link copied") },
          { label: 'Share to...', action: () => showToast("Opening share...") },
        ]}
      />

      {/* 3. Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-800 px-6 py-2 text-sm font-semibold text-white shadow-lg animate-fade-in dark:bg-white dark:text-slate-900">
          {toastMessage}
        </div>
      )}

      {/* 4. Bottom Nav (Only on main tabs) */}
      {currentView.name === 'tab' && (
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          onCreateClick={() => pushView('create-post')}
        />
      )}
    </div>
  );
};

export default App;
