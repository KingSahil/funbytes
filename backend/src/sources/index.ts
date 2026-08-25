import { BaseContentSource } from './base';
import { RedditSource } from './reddit';
import { MediumSource } from './medium';
import { DevHumorSource } from './devhumor';
import { BBCSource } from './bbc';
import { AlJazeeraSource } from './aljazeera';
import { PIBSource } from './pib';
import { PoliticoCartoonSource } from './politico';
import { ContentItem } from '@funbytes/types';

export class SourceManager {
  private sources: Map<string, BaseContentSource> = new Map();

  constructor() {
    this.registerDefaults();
  }

  private registerDefaults() {
    this.register(new RedditSource('developersIndia', 'r/developersIndia', 'developers'));
    this.register(new RedditSource('programming', 'r/programming', 'developers'));
    this.register(new RedditSource('ArtificialInteligence', 'r/ArtificialInteligence', 'technology'));
    this.register(new MediumSource());
    this.register(new DevHumorSource());
    this.register(new BBCSource());
    this.register(new AlJazeeraSource());
    this.register(new PIBSource());
    this.register(new PoliticoCartoonSource());
  }

  register(source: BaseContentSource) {
    this.sources.set(source.id, source);
  }

  getSource(id: string): BaseContentSource | undefined {
    return this.sources.get(id);
  }

  getAllSources(): BaseContentSource[] {
    return Array.from(this.sources.values());
  }

  setSourceEnabled(id: string, enabled: boolean): boolean {
    const source = this.sources.get(id);
    if (source) {
      source.enabled = enabled;
      return true;
    }
    return false;
  }

  async fetchAll(): Promise<ContentItem[]> {
    const promises = Array.from(this.sources.values())
      .filter((source) => source.enabled)
      .map(async (source) => {
        try {
          const items = await source.fetchContent();
          source.lastFetchedAt = new Date().toISOString();
          return items;
        } catch (error) {
          console.error(`[SourceManager] Error from ${source.id}:`, error);
          return [];
        }
      });

    const results = await Promise.all(promises);
    return results.flat();
  }
}

export const sourceManager = new SourceManager();
