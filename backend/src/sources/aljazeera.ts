import Parser from 'rss-parser';
import { Category, ContentItem } from '@funbytes/types';
import { BaseContentSource } from './base';

export class AlJazeeraSource extends BaseContentSource {
  id: string = 'aljazeera';
  name: string = 'Al Jazeera';
  category: Category = 'international';
  url: string = 'https://www.aljazeera.com';
  private parser: Parser;

  constructor() {
    super();
    this.parser = new Parser({ timeout: 4000 });
    this.refreshIntervalMinutes = 20;
  }

  async fetchContent(): Promise<ContentItem[]> {
    try {
      const feed = await this.parser.parseURL('https://www.aljazeera.com/xml/rss/all.xml');
      if (feed && feed.items) {
        return this.normalizeContent(feed.items);
      }
      return [];
    } catch (error: any) {
      console.warn(`[AlJazeeraSource] Warning fetching feed: ${error.message}`);
      return [];
    }
  }

  normalizeContent(rawItems: any[]): ContentItem[] {
    if (!Array.isArray(rawItems)) return [];

    return rawItems.map((item) => {
      const cleanSummary = this.stripHtml(item.contentSnippet || item.description || '').slice(0, 240);
      return {
        id: this.generateDeterministicId('aljazeera', item.guid || item.link || item.title),
        sourceId: this.id,
        sourceName: 'Al Jazeera',
        sourceUrl: 'https://www.aljazeera.com',
        sourceLogo: 'https://www.aljazeera.com/favicon.ico',
        title: item.title || 'Al Jazeera Update',
        summary: cleanSummary ? cleanSummary + '...' : 'In-depth global coverage.',
        author: 'Al Jazeera Desk',
        imageUrl: item.enclosure?.url || undefined,
        articleUrl: item.link || this.url,
        publishedAt: item.isoDate || item.pubDate ? new Date(item.isoDate || item.pubDate).toISOString() : new Date().toISOString(),
        category: this.category,
        tags: ['AlJazeera', 'World', 'Breaking'],
        contentType: 'article',
        engagement: {
          likes: Math.floor(Math.random() * 500) + 90,
          comments: Math.floor(Math.random() * 110) + 15,
          shares: Math.floor(Math.random() * 60) + 10,
        },
      };
    });
  }
}
