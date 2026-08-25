---
name: funbytes-source-parser
description: Specifications for building, testing, and standardizing source-specific parser plugins.
---

# FunBytes Source Parser Skill

## Purpose
Provides the step-by-step procedure for creating and validating new source adapters for the FunBytes aggregation engine.

## When to Use It
- Adding support for a new blog, news portal, RSS feed, Reddit subreddit, or cartoon publisher.
- Updating an existing parser when source feed schemas change.

## Base Class Contract
Every parser must extend or implement:
```typescript
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
```

## Normalization Checklist
When mapping raw payload to `ContentItem`:
- [ ] Ensure `id` is a deterministic SHA-256 or base64 hash of source ID + article URL.
- [ ] Sanitize HTML tags out of `title` and `summary`.
- [ ] Verify `publishedAt` is a valid ISO 8601 UTC string.
- [ ] Check `imageUrl` points to an absolute HTTPS URL; if unavailable, provide high-quality topic category fallback banner.
- [ ] Assign appropriate `contentType` (`'article' | 'reddit' | 'meme' | 'cartoon' | 'video'`).
- [ ] Populate relevant topic `tags: string[]`.

## Testing Requirements
- Unit tests against cached raw JSON / XML fixtures for each parser.
- Ensure zero uncaught exceptions on malformed dates, empty summaries, or missing images.
