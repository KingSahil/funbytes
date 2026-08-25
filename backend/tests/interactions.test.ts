import { InteractionStore } from '../src/services/interactionStore';

describe('InteractionStore', () => {
  let store: InteractionStore;

  beforeEach(() => {
    store = new InteractionStore();
  });

  it('should toggle likes optimistically and prevent double liking', () => {
    const userId = 'test_user_1';
    const contentId = 'post_123';

    // First like
    const res1 = store.toggleLike(userId, contentId, 10);
    expect(res1.isLiked).toBe(true);
    expect(res1.likesCount).toBe(11);
    expect(store.isPostLiked(userId, contentId)).toBe(true);

    // Second like (unlike)
    const res2 = store.toggleLike(userId, contentId, 10);
    expect(res2.isLiked).toBe(false);
    expect(res2.likesCount).toBe(10);
    expect(store.isPostLiked(userId, contentId)).toBe(false);
  });

  it('should add comments and threaded replies', () => {
    const contentId = 'post_456';
    const comment = store.addComment(contentId, 'user_a', 'Alice', 'Top level comment');
    expect(comment.id).toBeDefined();
    expect(comment.content).toBe('Top level comment');

    const reply = store.addComment(contentId, 'user_b', 'Bob', 'Nested reply', comment.id);
    expect(reply.parentId).toBe(comment.id);

    const comments = store.getComments(contentId);
    expect(comments.length).toBe(1);
    expect(comments[0].replies?.length).toBe(1);
    expect(comments[0].replies?.[0].content).toBe('Nested reply');
  });

  it('should toggle bookmarks', () => {
    const userId = 'user_c';
    const contentId = 'post_789';

    const b1 = store.toggleBookmark(userId, contentId);
    expect(b1.isBookmarked).toBe(true);
    expect(store.isBookmarked(userId, contentId)).toBe(true);

    const b2 = store.toggleBookmark(userId, contentId);
    expect(b2.isBookmarked).toBe(false);
    expect(store.isBookmarked(userId, contentId)).toBe(false);
  });
});
