export type Category =
  | 'developers'
  | 'technology'
  | 'politics'
  | 'sports'
  | 'bollywood'
  | 'international'
  | 'business'
  | 'science'
  | 'gaming'
  | 'memes'
  | 'cartoons';

export type ContentType = 'article' | 'reddit' | 'meme' | 'cartoon' | 'video';

export interface CoverageSource {
  name: string;
  url: string;
  sourceLogo?: string;
}

export interface Engagement {
  likes: number;
  comments: number;
  shares: number;
}

export interface ContentItem {
  id: string;
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  sourceLogo?: string;

  title: string;
  summary?: string;
  aiSummary?: string;

  author?: string;

  imageUrl?: string;
  thumbnailUrl?: string;
  aspectRatio?: number;

  articleUrl: string;

  publishedAt: string;

  category: Category;
  tags: string[];

  contentType: ContentType;

  engagement: Engagement;

  coverageSources?: CoverageSource[];

  isLiked?: boolean;
  isBookmarked?: boolean;

  // Metadata for custom renderers (e.g. cartoonists, reddit flair)
  meta?: {
    flair?: string;
    cartoonist?: string;
    publication?: string;
    readingTimeMinutes?: number;
    redditScore?: number;
  };
}

export interface FeedResponse {
  items: ContentItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
  appliedTopic: string;
  feedStyle: string;
}
