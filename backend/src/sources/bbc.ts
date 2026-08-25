import Parser from 'rss-parser';
import { Category, ContentItem } from '@funbytes/types';
import { BaseContentSource } from './base';

export class BBCSource extends BaseContentSource {
  id: string = 'bbc_news';
  name: string = 'BBC News';
  category: Category = 'international';
  url: string = 'https://www.bbc.com';
  private parser: Parser;

  constructor() {
    super();
    this.parser = new Parser({ timeout: 4000 });
    this.refreshIntervalMinutes = 20;
  }

  async fetchContent(): Promise<ContentItem[]> {
    try {
      const feed = await this.parser.parseURL('http://feeds.bbci.co.uk/news/world/rss.xml');
      if (feed && feed.items) {
        return this.normalizeContent(feed.items);
      }
      return [];
    } catch (error: any) {
      console.warn(`[BBCSource] Fetch warning: ${error.message}`);
      return [];
    }
  }

  normalizeContent(rawItems: any[]): ContentItem[] {
    if (!Array.isArray(rawItems)) return [];

    return rawItems.map((item) => {
      const cleanSummary = this.stripHtml(item.contentSnippet || item.description || '').slice(0, 240);
      return {
        id: this.generateDeterministicId('bbc', item.guid || item.link || item.title),
        sourceId: this.id,
        sourceName: 'BBC News',
        sourceUrl: 'https://www.bbc.com',
        sourceLogo: 'https://static.files.bbci.co.uk/core/website/assets/static/icons/favicon-192x192.png',
        title: item.title || 'Breaking World News',
        summary: cleanSummary ? cleanSummary + '...' : 'Latest global news report from BBC.',
        author: 'BBC World Service',
        imageUrl: item.enclosure?.url || undefined,
        articleUrl: item.link || this.url,
        publishedAt: item.isoDate || item.pubDate ? new Date(item.isoDate || item.pubDate).toISOString() : new Date().toISOString(),
        category: this.category,
        tags: ['BBC', 'World', 'International', 'News'],
        contentType: 'article',
        engagement: {
          likes: Math.floor(Math.random() * 800) + 100,
          comments: Math.floor(Math.random() * 150) + 20,
          shares: Math.floor(Math.random() * 90) + 10,
        },
      };
    });
  }
}
