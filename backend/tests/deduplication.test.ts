import { DeduplicationEngine } from '../src/services/deduplication';
import { ContentItem } from '@funbytes/types';

describe('DeduplicationEngine', () => {
  const engine = new DeduplicationEngine();

  it('should detect similar titles and cluster them', () => {
    const items: ContentItem[] = [
      {
        id: 'bbc_1',
        sourceId: 'bbc_news',
        sourceName: 'BBC News',
        sourceUrl: 'https://bbc.com',
        title: 'India announces landmark national semiconductor mission phase 2',
        articleUrl: 'https://bbc.com/semi',
        publishedAt: new Date().toISOString(),
        category: 'politics',
        tags: ['India', 'Semiconductor'],
        contentType: 'article',
        engagement: { likes: 100, comments: 20, shares: 10 },
      },
      {
        id: 'pib_1',
        sourceId: 'pib_india',
        sourceName: 'PIB India',
        sourceUrl: 'https://pib.gov.in',
        title: 'India unveils national semiconductor mission phase 2 approval',
        articleUrl: 'https://pib.gov.in/semi',
        publishedAt: new Date().toISOString(),
        category: 'politics',
        tags: ['India', 'Semiconductor'],
        contentType: 'article',
        engagement: { likes: 150, comments: 30, shares: 15 },
      },
      {
        id: 'dev_1',
        sourceId: 'medium_tech',
        sourceName: 'Medium',
        sourceUrl: 'https://medium.com',
        title: 'Understanding Rust Memory Management and Lifetimes',
        articleUrl: 'https://medium.com/rust',
        publishedAt: new Date().toISOString(),
        category: 'developers',
        tags: ['Rust', 'Developers'],
        contentType: 'article',
        engagement: { likes: 300, comments: 50, shares: 25 },
      },
    ];

    const result = engine.deduplicateAndCluster(items);

    // 3 items should become 2 items
    expect(result.length).toBe(2);

    const clusteredItem = result.find((i) => i.id === 'bbc_1');
    expect(clusteredItem).toBeDefined();
    expect(clusteredItem?.coverageSources?.length).toBeGreaterThanOrEqual(2);
    expect(clusteredItem?.coverageSources?.some((s) => s.name === 'PIB India')).toBe(true);
  });
});
