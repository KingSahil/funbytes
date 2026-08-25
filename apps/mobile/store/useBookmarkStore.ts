import { create } from 'zustand';
import { ContentItem, Category } from '@funbytes/types';

interface BookmarkStore {
  savedItems: ContentItem[];
  folders: string[];
  activeFolder: string;

  // Actions
  toggleBookmark: (item: ContentItem) => boolean; // returns true if now saved, false if unsaved
  isBookmarked: (id: string) => boolean;
  setActiveFolder: (folder: string) => void;
  removeBookmark: (id: string) => void;
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  savedItems: [],
  folders: ['All', 'Read Later', 'Developers', 'Tech', 'Cartoons', 'Memes'],
  activeFolder: 'All',

  toggleBookmark: (item) => {
    const state = get();
    const exists = state.savedItems.some((i) => i.id === item.id);

    if (exists) {
      set({
        savedItems: state.savedItems.filter((i) => i.id !== item.id),
      });
      return false;
    } else {
      set({
        savedItems: [{ ...item, isBookmarked: true }, ...state.savedItems],
      });
      return true;
    }
  },

  isBookmarked: (id) => {
    return get().savedItems.some((i) => i.id === id);
  },

  setActiveFolder: (folder) => set({ activeFolder: folder }),

  removeBookmark: (id) =>
    set((state) => ({
      savedItems: state.savedItems.filter((i) => i.id !== id),
    })),
}));

