import { ContentItem, UserPreferences, Category, FeedStyle } from '@funbytes/types';

export interface RankingOptions {
  activeTopic?: string;
  userInterests?: string[];
  feedStyle?: FeedStyle;
  weights?: {
    topicMatch?: number;
    interestOverlap?: number;
    recency?: number;
    engagement?: number;
    styleBonus?: number;
  };
}

export class RankingEngine {
  private defaultWeights = {
    topicMatch: 50.0,
    interestOverlap: 25.0,
    recency: 30.0,
    engagement: 15.0,
    styleBonus: 12.0,
  };

  /**
   * Score and rank a list of content items based on user preferences and active context.
   */
  rankFeed(items: ContentItem[], options: RankingOptions = {}): ContentItem[] {
    const weights = { ...this.defaultWeights, ...options.weights };
    const now = Date.now();
    const activeTopic = options.activeTopic?.toLowerCase();
    const userInterests = (options.userInterests || []).map((i) => i.toLowerCase());
    const feedStyle = options.feedStyle || 'personalized';

    // Calculate score for each item
    const scoredItems = items.map((item) => {
      let score = 0;

      // 1. Topic Match Score
      if (activeTopic && activeTopic !== 'all' && activeTopic !== 'for you') {
        if (item.category.toLowerCase() === activeTopic) {
          score += weights.topicMatch;
        } else {
          // If a specific topic chip is selected, heavily downrank non-matching items
          score -= weights.topicMatch * 2;
        }
      }

      // 2. User Interests Overlap Score
      if (userInterests.length > 0) {
        const itemTagsLower = item.tags.map((t) => t.toLowerCase());
        const matches = userInterests.filter((interest) =>
          itemTagsLower.includes(interest) || item.category.toLowerCase() === interest
        ).length;

        const overlapRatio = Math.min(matches / Math.max(userInterests.length, 1), 1.0);
        score += overlapRatio * weights.interestOverlap;
      }

      // 3. Recency Decay (24-hour half life exponential decay)
      const itemTime = new Date(item.publishedAt).getTime();
      const ageHours = Math.max((now - itemTime) / (1000 * 60 * 60), 0);
      const halfLifeHours = 24;
      const recencyFactor = Math.exp((-Math.LN2 * ageHours) / halfLifeHours);
      score += recencyFactor * weights.recency;

      // 4. Viral Engagement Velocity (Logarithmic scaling)
      const rawEngagement =
        (item.engagement?.likes || 0) +
        (item.engagement?.comments || 0) * 2 +
        (item.engagement?.shares || 0) * 3;

      const logEngagement = Math.log10(1 + Math.max(rawEngagement, 0));
      score += logEngagement * weights.engagement;

      // 5. Feed Style Modifier
      if (feedStyle === 'trending') {
        // Boost high-engagement content
        score += logEngagement * weights.styleBonus * 1.5;
      } else if (feedStyle === 'latest') {
        // Boost fresh recency heavily
        score += recencyFactor * weights.styleBonus * 2.0;
      } else if (feedStyle === 'fun') {
        // Boost memes and cartoons
        if (item.contentType === 'meme' || item.contentType === 'cartoon') {
          score += weights.styleBonus * 2.5;
        }
      }

      return { item, score };
    });

    // Sort descending by score
    scoredItems.sort((a, b) => b.score - a.score);

    return scoredItems.map((s) => s.item);
  }
}

export const rankingEngine = new RankingEngine();
