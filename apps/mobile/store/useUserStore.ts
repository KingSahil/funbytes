import { create } from 'zustand';
import { Category, FeedStyle } from '@funbytes/types';

interface UserState {
  hasCompletedOnboarding: boolean;
  selectedTopics: Category[];
  selectedInterests: string[];
  feedStyle: FeedStyle;
  isGuest: boolean;
  userName: string;
  userAvatar: string;

  // Actions
  completeOnboarding: () => void;
  setSelectedTopics: (topics: Category[]) => void;
  toggleTopic: (topic: Category) => void;
  setSelectedInterests: (interests: string[]) => void;
  toggleInterest: (interest: string) => void;
  setFeedStyle: (style: FeedStyle) => void;
  setUserName: (name: string) => void;
  resetPreferences: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  hasCompletedOnboarding: false,
  selectedTopics: ['developers', 'technology', 'memes'],
  selectedInterests: ['React Native', 'TypeScript', 'Rust', 'AI', 'Backend'],
  feedStyle: 'personalized',
  isGuest: true,
  userName: 'Byte Pioneer',
  userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',

  completeOnboarding: () => set({ hasCompletedOnboarding: true }),

  setSelectedTopics: (topics) => set({ selectedTopics: topics }),

  toggleTopic: (topic) =>
    set((state) => {
      const exists = state.selectedTopics.includes(topic);
      const updated = exists
        ? state.selectedTopics.filter((t) => t !== topic)
        : [...state.selectedTopics, topic];
      return { selectedTopics: updated.length > 0 ? updated : [topic] };
    }),

  setSelectedInterests: (interests) => set({ selectedInterests: interests }),

  toggleInterest: (interest) =>
    set((state) => {
      const exists = state.selectedInterests.includes(interest);
      const updated = exists
        ? state.selectedInterests.filter((i) => i !== interest)
        : [...state.selectedInterests, interest];
      return { selectedInterests: updated };
    }),

  setFeedStyle: (style) => set({ feedStyle: style }),

  setUserName: (name) => set({ userName: name }),

  resetPreferences: () =>
    set({
      hasCompletedOnboarding: false,
      selectedTopics: ['developers', 'technology', 'memes'],
      selectedInterests: ['React Native', 'TypeScript', 'Rust', 'AI'],
      feedStyle: 'personalized',
    }),
}));

