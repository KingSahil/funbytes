import { create } from 'zustand';
import { Comment } from '@funbytes/types';
import { api } from '../services/api';

interface InteractionState {
  likedPostIds: Set<string>;
  customLikeCounts: Map<string, number>;
  commentsByPost: Map<string, Comment[]>;

  // Actions
  toggleLike: (contentId: string, baseLikes: number) => { isLiked: boolean; likesCount: number };
  isLiked: (contentId: string) => boolean;
  getLikesCount: (contentId: string, baseLikes: number) => number;
  addLocalComment: (contentId: string, comment: Comment) => void;
  getCommentsForPost: (contentId: string) => Comment[];
}

export const useInteractionStore = create<InteractionState>((set, get) => ({
  likedPostIds: new Set<string>(),
  customLikeCounts: new Map<string, number>(),
  commentsByPost: new Map<string, Comment[]>(),

  toggleLike: (contentId: string, baseLikes: number) => {
    const state = get();
    const liked = state.likedPostIds.has(contentId);
    const newLiked = new Set(state.likedPostIds);
    const newCounts = new Map(state.customLikeCounts);

    const currentCount = newCounts.get(contentId) ?? baseLikes;
    let updatedCount: number;

    if (liked) {
      newLiked.delete(contentId);
      updatedCount = Math.max(currentCount - 1, 0);
    } else {
      newLiked.add(contentId);
      updatedCount = currentCount + 1;
    }

    newCounts.set(contentId, updatedCount);
    set({ likedPostIds: newLiked, customLikeCounts: newCounts });

    // Sync with backend asynchronously
    api.toggleLike(contentId).catch(() => {});

    return { isLiked: !liked, likesCount: updatedCount };
  },

  isLiked: (contentId: string) => {
    return get().likedPostIds.has(contentId);
  },

  getLikesCount: (contentId: string, baseLikes: number) => {
    return get().customLikeCounts.get(contentId) ?? baseLikes;
  },

  addLocalComment: (contentId: string, comment: Comment) => {
    const state = get();
    const map = new Map(state.commentsByPost);
    const list = map.get(contentId) || [];
    map.set(contentId, [comment, ...list]);
    set({ commentsByPost: map });
  },

  getCommentsForPost: (contentId: string) => {
    return get().commentsByPost.get(contentId) || [];
  },
}));

