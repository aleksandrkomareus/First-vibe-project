
import { Post, Story, User, Notification, Comment, Chat } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'alex_b',
  fullName: 'Alex Bennett',
  bio: 'Digital creator 📸 | Travel & Art 🎨',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB77fH9HuLyNJTVxrJGRmYKGmf91fH_b5djA4gxTykGZZszoJpObnnqF4wFmAO8Bh4jugorIjn_goJ43Br8ejl6pto9jD5Wc225yb0HZWbiAEIG1iiUwM00T0aa-AQZMY4GTbA4zG3cF2xf3dAVGUGgdld4JrehoidN8-D5iy2ktbMmObmmGpqnHqjRG9a5e9Syl2qVm-MANC6EmDX5XjhsNyTa3ri1DQQq4Un8aqpRhcx8CRIT-VBnb9EqBEwoU2mcCk8MvuJWyqk',
  isCurrentUser: true,
  followers: 1254,
  following: 432,
  posts: 48,
};

export const USERS: Record<string, User> = {
  u2: { id: 'u2', username: 'aaron_j', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo4HKpQ47WyYO0h6vwYxKzO5tVm4gNt1l0pT7rcTSmTKVIZ9jkZdLejwKYzL8N1I7NvfbccY9XjxdmMcg0rBmuhnE4aAQE-i6fprz7dm3XcUx7-_qjQAyVlwssTnLzcXlaEDKBk7qzbnXLGFClnKXy7dLOWOVExWGW70GSr-ah3UQ_VDWu6nQNarb_JPU-UX74r4yEPh7JuT3kFyUqomQC9m1qlU8wImunIZ-sqYjxQNINWadPlLIeeC4rpwGe7cIMW-KCw0_zr-s' },
  u3: { id: 'u3', username: 'casey_l', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT8oUPKIoRyYSRoiYG8m03PjYnhvBLq_eOn9JOlF4bj9OK865Ap6B3Iuhh09_vMq2aJ7y8UlGuUVqUVf_43au3PUWi5rJVkq4DeW1ZtZa4scY7Nkkfs3Inf2M5az3PuoZV8GjnHqyFQmyXJkUa475XtCYLEBNcd9fl7Y-2ybFysNIaVh37_YyWYZmgZaKJ5zKvu1x1J4sLKjS1JVQp3S5lj0EUKXAOZHAftkBwCMD-LVL7Lma7XVrCvzHWl53Z2nHhpkAUonasf3g' },
  u4: { id: 'u4', username: 'max_p', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBYZLEp9zZZCsd3TkbJiPJcp41cQLFPl8Ga0ZB3rbFJQAlHJtJbRkfY42kppgOkHghMidzJ6sYSgCu4WTACBaJI3ICweMtI_FXZjEsyMu2HZE3i5cBPO01-fKHE45CakHSaFL2UYIZWWpP_8u3RPxUwyx4Z7-1wY2OtHV-5I4as7YCmu5CheCf90f8vQIq6yr5DAoqdW0BC7yZ6YHQi2wD7ZxMoeDQTtZ0PvrMntelwTG2J46e8Odluj7GS2UoVGq8YMt6TFmVX0w' },
  u5: { id: 'u5', username: 'jess_g', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNTJ-OKroZx33h-2Ly7GUBqmheDx0hLDqxDAbsJO-3IbXCLiu-lVSKjAn-D5ZIMCv7xkgeA5pchXXNE7lCU9WmnV0tl2__L-XBv5tWODUrJa3ZKsNP4DkTa-c_CMvEgSflVcCfqeJY_SYTRipjRsuvdahnH6Ibzg-zfmqO9k1kcD78l9hUNQoasgyvEKBPsamuQuGWH83m5RK63Qyu5UleTnR7YVxcb_3YDe2haqwTgt7anhGs8aKFv2WUclMqhvs8PfCFcmHiABM' },
  u6: { id: 'u6', username: 'alex_b', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDci3NvLxStjhVov2u5bAl47Kn5cnnUurHAs0JK2_5uhARIxmjjghYlZuMjaur0Y9WrzfB3nEQyYCfP4irHKIa1eRvTHHMldpyZYCGQwAUyGDN7fMUIJM3x49fQLDX3J77zLpZGFEclimLJ5Fr8cbbg84ntSBl9vdvbkfGCWqKbpTC7H4-K0ySeTzWVmysy795TjjgAFqXdfcVlMXulPCrpGR0rHQDqy20f2DlvjME9cueVkuzVLhvAcjB-h0f6R6-f9MO8afIWup4' },
};

export const STORIES: Story[] = [
  { id: 's1', user: CURRENT_USER, hasUnseen: false, imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop' },
  { id: 's2', user: USERS.u2, hasUnseen: true, imageUrl: 'https://images.unsplash.com/photo-1526779218005-0638cf943588?q=80&w=1000&auto=format&fit=crop' },
  { id: 's3', user: USERS.u3, hasUnseen: true, imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop' },
  { id: 's4', user: USERS.u4, hasUnseen: true, imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop' },
  { id: 's5', user: USERS.u5, hasUnseen: true, imageUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop' },
];

export const COMMENTS: Comment[] = [
  { id: 'c1', user: USERS.u2, text: 'Absolutely stunning! 😍', timestamp: '1h', isLiked: false },
  { id: 'c2', user: USERS.u4, text: 'The colors are amazing here.', timestamp: '45m', isLiked: true },
  { id: 'c3', user: USERS.u3, text: 'Wish I was there right now.', timestamp: '10m', isLiked: false },
];

export const POSTS: Post[] = [
  {
    id: 'p1',
    user: USERS.u6,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeTTqiDOjN9ni0brCXBO_czo-zUC4Kt7A-1xHmrNyM9ufscrH42SdxE1gZebhes8QyvFygZSjsj2cZd2e9r-IQEvVUnAugLnl3tkzEn-GD0KpQ5Kh-pEU31EgQdOIk9kmcusPOXymotU4GaFuuIkKkuuvhMhXX5Tggg36CtHrc7SHMQXPNIIbc-ae2DM8d4_JnWYpOtoW00s_KwUiSuaasNsgtQgY_XFQDDV2ayW1GJ-fpySRhx3Grzv07mP9AHb95djwE52iEOig',
    caption: 'Golden hour at the pier.',
    likesCount: 153,
    commentsCount: 42,
    timestamp: '2 hours ago',
    isLiked: false,
    isSaved: false,
    comments: COMMENTS,
  },
  {
    id: 'p2',
    user: USERS.u5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAUi9kLhHjjiYv_qsbhDrE2EG9gZMEW_B4LWPos2w1f5OVCFDWm2I9jZLlYFmrfTsdDtGPtqBuzSZqjYplKe4wYJ0tfiYElrJ6X1BgAkpJx1mXkW3CSEmYlhL_MPkIFhbOpnI2IoSls8pRpQumVPVHPFf_KB_AX02LynGXdANVLL75D50hiDdeAZT_FIK58SjNIIXgIdDIwQWpW8dCbiXh0rHF4oW8dsEWrSld_un3hhGgniAkKA6LbLhNVf3Hi6Epkovjz-Uh4Zc',
    caption: 'My new masterpiece!',
    likesCount: 311,
    commentsCount: 88,
    timestamp: '1 day ago',
    isLiked: false,
    isSaved: false,
    comments: [COMMENTS[0]],
  }
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', user: USERS.u2, type: 'like', text: 'liked your photo.', timestamp: '1h', read: false, postImage: POSTS[0].imageUrl, postId: 'p1' },
  { id: 'n2', user: USERS.u3, type: 'follow', text: 'started following you.', timestamp: '3h', read: true },
  { id: 'n3', user: USERS.u4, type: 'comment', text: 'commented: "Amazing!"', timestamp: '5h', read: true, postImage: POSTS[1].imageUrl, postId: 'p2' },
  { id: 'n4', user: USERS.u5, type: 'like', text: 'liked your photo.', timestamp: '1d', read: true, postImage: POSTS[1].imageUrl, postId: 'p2' },
];

export const CHATS: Chat[] = [
  { 
    id: 'chat1', 
    user: USERS.u2, 
    lastMessage: 'Hey! Are you going to the event?', 
    timestamp: '5m', 
    unreadCount: 1,
    messages: [
      { id: 'm1', senderId: 'u2', text: 'Hey! Are you going to the event?', timestamp: '5m ago', isMe: false }
    ]
  },
  { 
    id: 'chat2', 
    user: USERS.u3, 
    lastMessage: 'Sent you the photos!', 
    timestamp: '2h', 
    unreadCount: 0,
    messages: [
      { id: 'm1', senderId: 'u1', text: 'Did you take any pics yesterday?', timestamp: '3h ago', isMe: true },
      { id: 'm2', senderId: 'u3', text: 'Yeah, let me send them over.', timestamp: '2h ago', isMe: false },
      { id: 'm3', senderId: 'u3', text: 'Sent you the photos!', timestamp: '2h ago', isMe: false },
    ]
  },
];
