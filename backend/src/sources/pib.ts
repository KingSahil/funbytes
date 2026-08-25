import Parser from 'rss-parser';
import { Category, ContentItem } from '@funbytes/types';
import { BaseContentSource } from './base';

export class PIBSource extends BaseContentSource {
  id: string = 'pib_india';
  name: string = 'PIB India';
  category: Category = 'politics';
  url: string = 'https://www.pib.gov.in';
  private parser: Parser;

  constructor() {
    super();
    this.parser = new Parser({ timeout: 4000 });
    this.refreshIntervalMinutes = 30;
  }

  async fetchContent(): Promise<ContentItem[]> {
    try {
      // PIB official press release feed endpoint
      return [];
    } catch (error: any) {
      console.warn(`[PIBSource] Warning fetching feed: ${error.message}`);
      return [];
    }
  }

  normalizeContent(rawItems: any[]): ContentItem[] {
    if (!Array.isArray(rawItems)) return [];
    return rawItems.map((item) => ({
      id: this.generateDeterministicId('pib', item.guid || item.title),
      sourceId: this.id,
      sourceName: 'PIB India',
      sourceUrl: this.url,
      sourceLogo: 'https://pib.gov.in/pib_images/pib_logo.png',
      title: item.title || 'Official Government Release',
      summary: this.stripHtml(item.summary || item.description || '').slice(0, 240),
      author: 'Press Information Bureau',
      articleUrl: item.link || this.url,
      publishedAt: item.pubDate || new Date().toISOString(),
      category: 'politics',
      tags: ['India', 'PIB', 'Government', 'Policy'],
      contentType: 'article',
      engagement: {
        likes: Math.floor(Math.random() * 300) + 50,
        comments: Math.floor(Math.random() * 40) + 5,
        shares: Math.floor(Math.random() * 80) + 12,
      },
    }));
  }
}
