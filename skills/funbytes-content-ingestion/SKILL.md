---
name: funbytes-content-ingestion
description: Architecture, safety protocols, and operational workflows for aggregating content from diverse online sources.
---

# FunBytes Content Ingestion Skill

## Purpose
Governs the safe, legal, and reliable ingestion of external content (Reddit, Medium, DevHumor, BBC, Al Jazeera, PIB, Politico) into the FunBytes data pipeline.

## When to Use It
- Designing or maintaining source scrapers, RSS parsers, or API adapters.
- Configuring polling schedules, rate limiters, and error handling for external providers.

## Ingestion Protocols & Ethical Rules
1. **Never build indiscriminate web scrapers.** Always prioritize:
   1. Official APIs (Reddit OAuth / public endpoints)
   2. RSS / Atom XML feeds (Medium, BBC, PIB)
   3. Structured JSON-LD / OpenGraph metadata
   4. Permitted static HTML parsing only as a last resort
2. **Copyright Respect**: Never download, store, or redistribute full copyrighted article bodies. Ingest only metadata:
   - `title`
   - `summary` / `excerpt`
   - `author`
   - `source`
   - `publishedAt`
   - `imageUrl`
   - `articleUrl`
   - `category`
3. **Graceful Fallback**: If an external provider returns 429, 500, or invalid payload, the adapter MUST NOT throw unhandled exceptions. Instead, log the failure and return cached or fallback mock items.
4. **User-Agent Header**: All external requests must identify as `FunBytesBot/1.0 (+https://funbytes.app/bot)`.

## Error Handling Pattern
```typescript
try {
  const response = await fetchWithTimeout(sourceUrl, { timeoutMs: 5000 });
  return this.normalizeContent(response);
} catch (error) {
  logger.warn(`Source ${this.name} failed: ${error.message}. Returning cached fallback.`);
  return this.getFallbackContent();
}
```

## Testing Requirements
- Unit tests mocking HTTP 429 (Rate Limit), 503 (Unavailable), and malformed XML/JSON.
- Ensure parsers do not block Node event loop with unbounded synchronous regex.
