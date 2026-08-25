import { Category, ContentItem } from './content';
export interface Source {
    id: string;
    name: string;
    category: Category;
    url: string;
    type: 'reddit' | 'rss' | 'api' | 'scraper' | 'custom';
    enabled: boolean;
    refreshIntervalMinutes: number;
    lastFetchedAt?: string;
    status: 'healthy' | 'degraded' | 'error';
    logoUrl?: string;
    description?: string;
}
export interface ContentSource {
    id: string;
    name: string;
    category: Category;
    enabled: boolean;
    refreshIntervalMinutes: number;
    fetchContent(): Promise<ContentItem[]>;
    normalizeContent(rawData: unknown): ContentItem[];
    isAvailable(): Promise<boolean>;
}
