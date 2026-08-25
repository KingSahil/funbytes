import { Comment, ContentItem } from '@funbytes/types';
import { v4 as uuidv4 } from 'uuid';

export class InteractionStore {
  private userLikes: Set<string> = new Set(); // format: `${userId}_${contentId}`
  private postLikeCounts: Map<string, number> = new Map();

  private commentsByPost: Map<string, Comment[]> = new Map();
  private commentLikeCounts: Map<string, number> = new Map();
  private userCommentLikes: Set<string> = new Set(); // format: `${userId}_${commentId}`

  private bookmarksByUser: Map<string, Set<string>> = new Map(); // userId -> Set of contentIds

  constructor() {
    this.seedInitialComments();
  }

  private seedInitialComments() {
    // Seed realistic discussions on top items
    this.addComment('dev_post_01', 'u/distributed_fan', 'Alexandre Roche', 'Completely agree on modular monoliths. We saved 40% on AWS bill after merging 8 microservices back together.');
    this.addComment('dev_post_02', 'u/mobile_dev_in', 'Priya Sharma', 'Tested React Native 0.78 on our production app. Cold start is noticeably faster on budget devices!');
    this.addComment('reddit_dev_01', 'u/staff_eng_blr', 'Rohan Verma', 'Focus heavily on system design and database internals. Knowing why B-trees work or how Raft achieves consensus separates Seniors from Mid-level devs.');
    this.addComment('meme_dev_01', 'u/coffee_drinker', 'Ankit Gupta', 'The classic "it worked on my machine" will never get old 😂');
    this.addComment('tech_post_01', 'u/quantum_nerd', 'Dr. Sarah Jenkins', 'Room temperature fidelity is the holy grail. Exciting times for material science.');
  }

  // ==========================================
  // LIKES
  // ==========================================
  toggleLike(userId: string, contentId: string, baseLikes: number = 0): { isLiked: boolean; likesCount: number } {
    const key = `${userId}_${contentId}`;
    const isLiked = this.userLikes.has(key);

    let currentCount = this.postLikeCounts.get(contentId) ?? baseLikes;

    if (isLiked) {
      this.userLikes.delete(key);
      currentCount = Math.max(currentCount - 1, 0);
    } else {
      this.userLikes.add(key);
      currentCount = currentCount + 1;
    }

    this.postLikeCounts.set(contentId, currentCount);
    return { isLiked: !isLiked, likesCount: currentCount };
  }

  isPostLiked(userId: string, contentId: string): boolean {
    return this.userLikes.has(`${userId}_${contentId}`);
  }

  getLikesCount(contentId: string, defaultLikes: number = 0): number {
    return this.postLikeCounts.get(contentId) ?? defaultLikes;
  }

  // ==========================================
  // COMMENTS
  // ==========================================
  getComments(contentId: string, currentUserId?: string): Comment[] {
    const list = this.commentsByPost.get(contentId) || [];
    return list.map((c) => ({
      ...c,
      isLiked: currentUserId ? this.userCommentLikes.has(`${currentUserId}_${c.id}`) : false,
      likesCount: this.commentLikeCounts.get(c.id) ?? c.likesCount,
      replies: c.replies?.map((r) => ({
        ...r,
        isLiked: currentUserId ? this.userCommentLikes.has(`${currentUserId}_${r.id}`) : false,
        likesCount: this.commentLikeCounts.get(r.id) ?? r.likesCount,
      })),
    }));
  }

  addComment(
    contentId: string,
    authorId: string,
    authorName: string,
    text: string,
    parentId?: string,
    authorAvatar?: string
  ): Comment {
    const newComment: Comment = {
      id: `comm_${uuidv4().slice(0, 8)}`,
      contentId,
      authorId,
      authorName,
      authorAvatar: authorAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${authorName}`,
      content: text,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      parentId,
      replies: [],
    };

    const postComments = this.commentsByPost.get(contentId) || [];

    if (parentId) {
      // Find parent comment and append to replies
      const parent = postComments.find((c) => c.id === parentId);
      if (parent) {
        parent.replies = parent.replies || [];
        parent.replies.push(newComment);
      } else {
        postComments.push(newComment);
      }
    } else {
      postComments.unshift(newComment);
    }

    this.commentsByPost.set(contentId, postComments);
    return newComment;
  }

  toggleCommentLike(userId: string, commentId: string): { isLiked: boolean; likesCount: number } {
    const key = `${userId}_${commentId}`;
    const isLiked = this.userCommentLikes.has(key);
    let count = this.commentLikeCounts.get(commentId) || 0;

    if (isLiked) {
      this.userCommentLikes.delete(key);
      count = Math.max(count - 1, 0);
    } else {
      this.userCommentLikes.add(key);
      count += 1;
    }

    this.commentLikeCounts.set(commentId, count);
    return { isLiked: !isLiked, likesCount: count };
  }

  // ==========================================
  // BOOKMARKS
  // ==========================================
  toggleBookmark(userId: string, contentId: string): { isBookmarked: boolean } {
    const userBookmarks = this.bookmarksByUser.get(userId) || new Set<string>();
    const isBookmarked = userBookmarks.has(contentId);

    if (isBookmarked) {
      userBookmarks.delete(contentId);
    } else {
      userBookmarks.add(contentId);
    }

    this.bookmarksByUser.set(userId, userBookmarks);
    return { isBookmarked: !isBookmarked };
  }

  isBookmarked(userId: string, contentId: string): boolean {
    const userBookmarks = this.bookmarksByUser.get(userId);
    return userBookmarks ? userBookmarks.has(contentId) : false;
  }

  getUserBookmarks(userId: string): string[] {
    const userBookmarks = this.bookmarksByUser.get(userId);
    return userBookmarks ? Array.from(userBookmarks) : [];
  }
}

export const interactionStore = new InteractionStore();
