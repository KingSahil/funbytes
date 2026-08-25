import { Category, ContentItem, ContentSource } from '@funbytes/types';

export abstract class BaseContentSource implements ContentSource {
  abstract id: string;
  abstract name: string;
  abstract category: Category;
  abstract url: string;
  enabled: boolean = true;
  refreshIntervalMinutes: number = 30;
  lastFetchedAt?: string;

  abstract fetchContent(): Promise<ContentItem[]>;
  abstract normalizeContent(rawData: unknown): ContentItem[];

  async isAvailable(): Promise<boolean> {
    return true;
  }

  protected generateDeterministicId(sourcePrefix: string, urlOrId: string): string {
    // Simple deterministic slug-based ID
    const cleanStr = urlOrId.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(-40);
    return `${sourcePrefix}_${cleanStr}`;
  }

  protected stripHtml(html: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
  }
}
