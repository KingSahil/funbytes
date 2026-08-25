import { Request, Response } from 'express';
import { mockFeedData } from '../data/mockFeedData';
import { sourceManager } from '../sources';
import { rankingEngine } from '../services/ranking';
import { deduplicationEngine } from '../services/deduplication';
import { interactionStore } from '../services/interactionStore';
import { moderationService } from '../services/moderation';
import { ContentItem, FeedStyle } from '@funbytes/types';

export class FeedController {
  private inMemoryCache: ContentItem[] = [...mockFeedData];
  private lastFetchTime = 0;
  private cacheDurationMs = 5 * 60 * 1000; // 5 minutes

  private async refreshLiveFeedsIfNeeded() {
    const now = Date.now();
    if (now - this.lastFetchTime > this.cacheDurationMs) {
      try {
        const liveItems = await sourceManager.fetchAll();
        if (liveItems.length > 0) {
          // Merge live items with mock data
          const combined = [...liveItems, ...mockFeedData];
          this.inMemoryCache = deduplicationEngine.deduplicateAndCluster(combined);
          this.lastFetchTime = now;
        }
      } catch (error) {
        console.warn('[FeedController] Live refresh warning, using cached items:', error);
      }
    }
  }

  getFeed = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.refreshLiveFeedsIfNeeded();

      const topic = (req.query.topic as string) || 'all';
      const style = ((req.query.style as string) || 'personalized') as FeedStyle;
      const interestsQuery = req.query.interests as string;
      const interests = interestsQuery ? interestsQuery.split(',').map((s) => s.trim()) : [];
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 20;
      const userId = (req.query.userId as string) || 'guest_user';

      // 1. Filter out hidden/reported items
      let rawItems = this.inMemoryCache.filter((item) => !moderationService.isContentHidden(item.id));

      // 2. Rank using the RankingEngine
      const ranked = rankingEngine.rankFeed(rawItems, {
        activeTopic: topic,
        userInterests: interests,
        feedStyle: style,
      });

      // 3. Paginate
      const startIndex = (page - 1) * limit;
      const pagedItems = ranked.slice(startIndex, startIndex + limit);

      // 4. Enrich with current user interactions
      const enrichedItems = pagedItems.map((item) => ({
        ...item,
        isLiked: interactionStore.isPostLiked(userId, item.id),
        isBookmarked: interactionStore.isBookmarked(userId, item.id),
        engagement: {
          ...item.engagement,
          likes: interactionStore.getLikesCount(item.id, item.engagement.likes),
        },
      }));

      res.json({
        success: true,
        data: {
          items: enrichedItems,
          pagination: {
            page,
            limit,
            total: ranked.length,
            hasMore: startIndex + limit < ranked.length,
          },
          appliedTopic: topic,
          feedStyle: style,
        },
      });
    } catch (error: any) {
      console.error('[FeedController] Error serving feed:', error);
      res.status(500).json({ success: false, error: 'Failed to retrieve feed' });
    }
  };

  getItemById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const userId = (req.query.userId as string) || 'guest_user';

      const item = this.inMemoryCache.find((i) => i.id === id);
      if (!item) {
        res.status(404).json({ success: false, error: 'Content item not found' });
        return;
      }

      const enriched = {
        ...item,
        isLiked: interactionStore.isPostLiked(userId, item.id),
        isBookmarked: interactionStore.isBookmarked(userId, item.id),
        engagement: {
          ...item.engagement,
          likes: interactionStore.getLikesCount(item.id, item.engagement.likes),
        },
      };

      res.json({ success: true, data: enriched });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

export const feedController = new FeedController();
