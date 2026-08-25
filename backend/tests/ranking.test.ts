import { RankingEngine } from '../src/services/ranking';
import { ContentItem } from '@funbytes/types';

describe('RankingEngine', () => {
  const rankingEngine = new RankingEngine();

  const sampleItems: ContentItem[] = [
    {
      id: 'item_dev_1',
      sourceId: 'src_1',
      sourceName: 'Medium',
      sourceUrl: 'https://medium.com',
      title: 'Advanced React Native Architecture',
      articleUrl: 'https://medium.com/1',
      publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
      category: 'developers',
      tags: ['Developers', 'React Native', 'Mobile'],
      contentType: 'article',
      engagement: { likes: 100, comments: 20, shares: 10 },
    },
    {
      id: 'item_politics_1',
      sourceId: 'src_2',
      sourceName: 'PIB',
      sourceUrl: 'https://pib.gov.in',
      title: 'New Economic Policy Announced',
      articleUrl: 'https://pib.gov.in/1',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 48 hours ago
      category: 'politics',
      tags: ['Politics', 'Economy'],
      contentType: 'article',
      engagement: { likes: 10, comments: 2, shares: 1 },
    },
  ];

  it('should rank developer content higher when user active topic is developers', () => {
    const ranked = rankingEngine.rankFeed(sampleItems, { activeTopic: 'developers' });
    expect(ranked[0].id).toBe('item_dev_1');
    expect(ranked[0].category).toBe('developers');
  });

  it('should boost items matching user interest tags', () => {
    const ranked = rankingEngine.rankFeed(sampleItems, {
      userInterests: ['React Native'],
    });
    expect(ranked[0].id).toBe('item_dev_1');
  });

  it('should apply recency decay to older items', () => {
    const ranked = rankingEngine.rankFeed(sampleItems, { feedStyle: 'latest' });
    expect(ranked[0].id).toBe('item_dev_1'); // 30 mins ago beats 48h ago
  });
});
