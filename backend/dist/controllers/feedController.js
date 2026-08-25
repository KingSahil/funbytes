"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedController = exports.FeedController = void 0;
const mockFeedData_1 = require("../data/mockFeedData");
const sources_1 = require("../sources");
const ranking_1 = require("../services/ranking");
const deduplication_1 = require("../services/deduplication");
const interactionStore_1 = require("../services/interactionStore");
const moderation_1 = require("../services/moderation");
class FeedController {
    inMemoryCache = [...mockFeedData_1.mockFeedData];
    lastFetchTime = 0;
    cacheDurationMs = 5 * 60 * 1000; // 5 minutes
    async refreshLiveFeedsIfNeeded() {
        const now = Date.now();
        if (now - this.lastFetchTime > this.cacheDurationMs) {
            try {
                const liveItems = await sources_1.sourceManager.fetchAll();
                if (liveItems.length > 0) {
                    // Merge live items with mock data
                    const combined = [...liveItems, ...mockFeedData_1.mockFeedData];
                    this.inMemoryCache = deduplication_1.deduplicationEngine.deduplicateAndCluster(combined);
                    this.lastFetchTime = now;
                }
            }
            catch (error) {
                console.warn('[FeedController] Live refresh warning, using cached items:', error);
            }
        }
    }
    getFeed = async (req, res) => {
        try {
            await this.refreshLiveFeedsIfNeeded();
            const topic = req.query.topic || 'all';
            const style = (req.query.style || 'personalized');
            const interestsQuery = req.query.interests;
            const interests = interestsQuery ? interestsQuery.split(',').map((s) => s.trim()) : [];
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 20;
            const userId = req.query.userId || 'guest_user';
            // 1. Filter out hidden/reported items
            let rawItems = this.inMemoryCache.filter((item) => !moderation_1.moderationService.isContentHidden(item.id));
            // 2. Rank using the RankingEngine
            const ranked = ranking_1.rankingEngine.rankFeed(rawItems, {
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
                isLiked: interactionStore_1.interactionStore.isPostLiked(userId, item.id),
                isBookmarked: interactionStore_1.interactionStore.isBookmarked(userId, item.id),
                engagement: {
                    ...item.engagement,
                    likes: interactionStore_1.interactionStore.getLikesCount(item.id, item.engagement.likes),
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
        }
        catch (error) {
            console.error('[FeedController] Error serving feed:', error);
            res.status(500).json({ success: false, error: 'Failed to retrieve feed' });
        }
    };
    getItemById = async (req, res) => {
        try {
            const id = String(req.params.id);
            const userId = req.query.userId || 'guest_user';
            const item = this.inMemoryCache.find((i) => i.id === id);
            if (!item) {
                res.status(404).json({ success: false, error: 'Content item not found' });
                return;
            }
            const enriched = {
                ...item,
                isLiked: interactionStore_1.interactionStore.isPostLiked(userId, item.id),
                isBookmarked: interactionStore_1.interactionStore.isBookmarked(userId, item.id),
                engagement: {
                    ...item.engagement,
                    likes: interactionStore_1.interactionStore.getLikesCount(item.id, item.engagement.likes),
                },
            };
            res.json({ success: true, data: enriched });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
}
exports.FeedController = FeedController;
exports.feedController = new FeedController();
