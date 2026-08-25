import { RedditSource } from '../src/sources/reddit';
import { MediumSource } from '../src/sources/medium';
import { DevHumorSource } from '../src/sources/devhumor';

describe('Source Adapters', () => {
  it('RedditSource should normalize raw Reddit JSON properly', () => {
    const source = new RedditSource('developersIndia', 'r/developersIndia');
    const mockRawChildren = [
      {
        data: {
          id: 'test_post_1',
          title: 'How to transition to Staff Engineer in India?',
          selftext: 'Looking for advice on technical leadership...',
          author: 'dev_user',
          permalink: '/r/developersIndia/comments/test_post_1',
          url: 'https://reddit.com/r/developersIndia/comments/test_post_1',
          created_utc: 1700000000,
          ups: 350,
          num_comments: 45,
          link_flair_text: 'Career Advice',
        },
      },
    ];

    const normalized = source.normalizeContent(mockRawChildren as any);
    expect(normalized.length).toBe(1);
    expect(normalized[0].sourceName).toBe('r/developersIndia');
    expect(normalized[0].title).toBe('How to transition to Staff Engineer in India?');
    expect(normalized[0].author).toBe('u/dev_user');
    expect(normalized[0].engagement.likes).toBe(350);
    expect(normalized[0].contentType).toBe('reddit');
  });

  it('MediumSource should normalize RSS item feed', () => {
    const mediumSource = new MediumSource();
    const rawItems = [
      {
        title: 'Zero Downtime Postgres Migrations',
        link: 'https://medium.com/engineering/pg-migration',
        contentSnippet: 'Learn how to alter multi-million row tables safely.',
        creator: 'Sarah Chen',
        categories: ['Postgres', 'Backend', 'DevOps'],
        pubDate: '2026-08-25T10:00:00Z',
      },
    ];

    const normalized = mediumSource.normalizeContent(rawItems);
    expect(normalized.length).toBe(1);
    expect(normalized[0].sourceName).toBe('Medium');
    expect(normalized[0].author).toBe('Sarah Chen');
    expect(normalized[0].contentType).toBe('article');
  });

  it('DevHumorSource should normalize meme entries', () => {
    const devHumorSource = new DevHumorSource();
    const rawData = [
      {
        id: 'meme_101',
        title: 'Friday Deployments',
        caption: 'Pushing to main branch right before weekend',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        likes: 1200,
        comments: 80,
      },
    ];

    const normalized = devHumorSource.normalizeContent(rawData);
    expect(normalized.length).toBe(1);
    expect(normalized[0].category).toBe('memes');
    expect(normalized[0].contentType).toBe('meme');
    expect(normalized[0].engagement.likes).toBe(1200);
  });
});
