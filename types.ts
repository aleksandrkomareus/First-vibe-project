
export type Tab = 'home' | 'explore' | 'create' | 'activity' | 'profile';

export type ViewName = 
  | 'tab' 
  | 'messages' 
  | 'chat-detail' 
  | 'comments' 
  | 'post-detail' 
  | 'edit-profile' 
  | 'create-post';

export interface ViewState {
  name: ViewName;
  data?: any; // Generic data payload for the view (userId, postId, chatId, etc.)
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  isCurrentUser?: boolean;
  fullName?: string;
  bio?: string;
  followers?: number;
  following?: number;
  posts?: number;
}

export interface Story {
  id: string;
  user: User;
  hasUnseen: boolean;
  imageUrl?: string; 
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  timestamp: string;
  isLiked: boolean;
  isSaved: boolean;
  comments?: Comment[];
}

export interface Notification {
  id: string;
  user: User;
  type: 'like' | 'comment' | 'follow';
  text: string;
  timestamp: string;
  read: boolean;
  postImage?: string;
  postId?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
}
