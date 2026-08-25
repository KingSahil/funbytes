import axios from 'axios';
import Constants from 'expo-constants';
import { ContentItem, FeedResponse, Comment, Category, FeedStyle } from '@funbytes/types';
import { mockFeedData } from '../../../backend/src/data/mockFeedData';
import { rankingEngine } from '../../../backend/src/services/ranking';

const getBaseUrl = (): string => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL.endsWith('/api')
      ? process.env.EXPO_PUBLIC_API_URL
      : `${process.env.EXPO_PUBLIC_API_URL}/api`;
  }
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(':')[0];
    return `http://${host}:4000/api`;
  }
  return 'http://127.0.0.1:4000/api';
};

const API_BASE_URL = getBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const api = {
  async getFeed(params: {
    topic?: string;
    style?: FeedStyle;
    interests?: string[];
    page?: number;
    limit?: number;
    userId?: string;
  }): Promise<FeedResponse> {
    try {
      const response = await apiClient.get('/feed', {
        params: {
          topic: params.topic,
          style: params.style,
          interests: params.interests?.join(','),
          page: params.page || 1,
          limit: params.limit || 20,
          userId: params.userId || 'guest_user',
        },
      });
      if (response.data?.success) {
        return response.data.data;
      }
    } catch (error) {
      console.warn('[FunBytes Client] API unreachable, falling back to local dataset.');
    }

    // Graceful offline/local fallback
    const page = params.page || 1;
    const limit = params.limit || 20;
    const ranked = rankingEngine.rankFeed(mockFeedData, {
      activeTopic: params.topic,
      userInterests: params.interests,
      feedStyle: params.style,
    });

    const startIndex = (page - 1) * limit;
    const paged = ranked.slice(startIndex, startIndex + limit);

    return {
      items: paged,
      pagination: {
        page,
        limit,
        total: ranked.length,
        hasMore: startIndex + limit < ranked.length,
      },
      appliedTopic: params.topic || 'all',
      feedStyle: params.style || 'personalized',
    };
  },

  async getItemById(id: string, userId?: string): Promise<ContentItem> {
    try {
      const res = await apiClient.get(`/content/${id}`, { params: { userId } });
      if (res.data?.success) {
        return res.data.data;
      }
    } catch (error) {
      console.warn('[FunBytes Client] Fallback item lookup');
    }

    const found = mockFeedData.find((i) => i.id === id);
    if (!found) throw new Error('Post not found');
    return found;
  },

  async toggleLike(id: string, userId: string = 'guest_user'): Promise<{ isLiked: boolean; likesCount: number }> {
    try {
      const res = await apiClient.post(`/content/${id}/like`, { userId });
      if (res.data?.success) {
        return res.data.data;
      }
    } catch (e) {
      // Local fallback handled in store
    }
    return { isLiked: true, likesCount: 1 };
  },

  async getComments(id: string, userId?: string): Promise<Comment[]> {
    try {
      const res = await apiClient.get(`/content/${id}/comments`, { params: { userId } });
      if (res.data?.success) {
        return res.data.data;
      }
    } catch (e) {
      // Offline mock comments
    }
    return [
      {
        id: 'comm_mock_1',
        contentId: id,
        authorId: 'u/community_fan',
        authorName: 'Alexandre Roche',
        content: 'This is an insightful perspective on modern architecture!',
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        likesCount: 18,
        replies: [
          {
            id: 'comm_mock_1_reply',
            contentId: id,
            authorId: 'u/fellow_coder',
            authorName: 'Priya S.',
            content: '100% agree with this point.',
            createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            likesCount: 4,
            parentId: 'comm_mock_1',
          },
        ],
      },
    ];
  },

  async addComment(id: string, text: string, authorName: string = 'Byte Explorer', parentId?: string): Promise<Comment> {
    try {
      const res = await apiClient.post(`/content/${id}/comments`, {
        text,
        authorName,
        parentId,
      });
      if (res.data?.success) {
        return res.data.data;
      }
    } catch (e) {}

    return {
      id: `comm_${Date.now()}`,
      contentId: id,
      authorId: 'guest_user',
      authorName,
      authorAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${authorName}`,
      content: text,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      parentId,
      replies: [],
    };
  },

  async search(query: string, category?: string): Promise<ContentItem[]> {
    try {
      const res = await apiClient.get('/search', { params: { q: query, category } });
      if (res.data?.success) {
        return res.data.data;
      }
    } catch (e) {}

    const q = query.toLowerCase();
    return mockFeedData.filter((i) => {
      const matchesText =
        i.title.toLowerCase().includes(q) ||
        i.summary?.toLowerCase().includes(q) ||
        i.tags.some((t) => t.toLowerCase().includes(q)) ||
        i.sourceName.toLowerCase().includes(q);
      const matchesCat = !category || category === 'all' || i.category.toLowerCase() === category.toLowerCase();
      return matchesText && matchesCat;
    });
  },

  async getTrending(): Promise<{ items: ContentItem[]; hashtags: Array<{ tag: string; count: string }> }> {
    try {
      const res = await apiClient.get('/trending');
      if (res.data?.success) {
        return res.data.data;
      }
    } catch (e) {}

    return {
      items: mockFeedData.slice(0, 6),
      hashtags: [
        { tag: '#ModularMonoliths', count: '14.2K bytes' },
        { tag: '#ReactNative078', count: '9.8K bytes' },
        { tag: '#T20Thriller', count: '28.4K bytes' },
        { tag: '#DevHumor', count: '18.1K bytes' },
      ],
    };
  },
};

