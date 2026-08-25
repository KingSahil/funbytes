import { Category } from './content';

export type FeedStyle = 'trending' | 'latest' | 'personalized' | 'fun';

export interface UserInterest {
  id: string;
  name: string;
  category: Category;
  icon: string;
}

export interface UserPreferences {
  selectedTopics: Category[];
  selectedInterests: string[];
  feedStyle: FeedStyle;
  darkMode: boolean;
  autoplayMedia: boolean;
  compactMode: boolean;
  notificationsEnabled: boolean;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  preferences: UserPreferences;
  isGuest: boolean;
  createdAt: string;
}
