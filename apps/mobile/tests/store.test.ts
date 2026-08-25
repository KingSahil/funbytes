import { useUserStore } from '../store/useUserStore';
import { useBookmarkStore } from '../store/useBookmarkStore';
import { useInteractionStore } from '../store/useInteractionStore';
import { ContentItem } from '@funbytes/types';

describe('Mobile Client State Stores', () => {
  it('useUserStore should toggle topics and update feed style', () => {
    const { toggleTopic, setFeedStyle, completeOnboarding } = useUserStore.getState();

    completeOnboarding();
    expect(useUserStore.getState().hasCompletedOnboarding).toBe(true);

    toggleTopic('sports');
    expect(useUserStore.getState().selectedTopics).toContain('sports');

    setFeedStyle('trending');
    expect(useUserStore.getState().feedStyle).toBe('trending');
  });

  it('useBookmarkStore should toggle and filter saved items', () => {
    const dummyItem: ContentItem = {
      id: 'test_save_01',
      sourceId: 'src_1',
      sourceName: 'Medium',
      sourceUrl: 'https://medium.com',
      title: 'Testing Zustand with Jest',
      articleUrl: 'https://medium.com/test',
      publishedAt: new Date().toISOString(),
      category: 'developers',
      tags: ['Zustand', 'Testing'],
      contentType: 'article',
      engagement: { likes: 50, comments: 10, shares: 5 },
    };

    const { toggleBookmark, isBookmarked, removeBookmark } = useBookmarkStore.getState();

    const isSaved = toggleBookmark(dummyItem);
    expect(isSaved).toBe(true);
    expect(isBookmarked('test_save_01')).toBe(true);

    // Toggle off
    const isUnsaved = toggleBookmark(dummyItem);
    expect(isUnsaved).toBe(false);
    expect(isBookmarked('test_save_01')).toBe(false);
  });

  it('useInteractionStore should optimistically toggle likes', () => {
    const { toggleLike, isLiked, getLikesCount } = useInteractionStore.getState();

    const res1 = toggleLike('post_xyz', 100);
    expect(res1.isLiked).toBe(true);
    expect(res1.likesCount).toBe(101);
    expect(isLiked('post_xyz')).toBe(true);
    expect(getLikesCount('post_xyz', 100)).toBe(101);

    const res2 = toggleLike('post_xyz', 100);
    expect(res2.isLiked).toBe(false);
    expect(res2.likesCount).toBe(100);
    expect(isLiked('post_xyz')).toBe(false);
  });
});

