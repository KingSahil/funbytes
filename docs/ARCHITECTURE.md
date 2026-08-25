# FunBytes Architecture Documentation

## 1. System Overview
FunBytes is a distributed personalized content aggregation and social feed platform. It unites fast-scroll social media mechanics with ethical content aggregation, real-time deduplication, and customized ranking.

```text
┌────────────────────────────────────────────────────────┐
│             FunBytes Android Client (Expo)             │
│  - Expo Router v3/v4 Tab Navigation                    │
│  - Dark Theme UI System & Animated Cards               │
│  - Zustand (User Preferences, Bookmarks, Likes)        │
│  - TanStack React Query (Cache & Pagination)           │
└───────────────────────────┬────────────────────────────┘
                            │ REST / JSON (HTTP)
                            ▼
┌────────────────────────────────────────────────────────┐
│             FunBytes Backend API Server                │
│  - Node.js / Express / TypeScript                      │
│  - Pluggable Ingestion Engine (ContentSource Plugins)  │
│  - Deduplication & Clustering Service                  │
│  - Feed Ranking & Scoring Algorithm                    │
│  - Interactive Comments, Likes & Bookmarks Store       │
│  - Mock Fallback Engine (Offline / Demo Mode)          │
└──────────────┬────────────────────────────┬────────────┘
               │                            │
 ┌─────────────▼───────────────┐ ┌──────────▼────────────┐
 │      External Providers     │ │      Local Storage    │
 │ - Reddit (developersIndia)  │ │ - In-memory / SQLite  │
 │ - Medium Tech Feeds         │ │ - Async Client Cache  │
 │ - DevHumor Memes            │ └───────────────────────┘
 │ - BBC / Al Jazeera          │
 │ - PIB India Gov News        │
 │ - Politico Cartoons         │
 └─────────────────────────────┘
```

## 2. Monorepo Organization
- `apps/mobile`: The React Native Expo application containing routes, screens, custom components, store hooks, and Android native bindings.
- `backend`: The content aggregation API, pluggable source adapters, ranking engines, and demo mock stores.
- `packages/types`: Shared TypeScript definitions across client and backend.
- `skills`: Project-specific AI guidance and operational skills.
- `docs`: Architectural and technical references.

## 3. Data Flow
1. **Ingestion Cycle**: Background jobs or on-demand fetchers query source plugins (`RedditSource`, `DevHumorSource`, etc.).
2. **Normalization**: Each source maps raw XML/JSON/HTML into the unified `ContentItem` contract.
3. **Deduplication**: Content items are evaluated for textual and semantic similarity. Matching stories are merged with multi-source coverage badges.
4. **Ranking & Personalization**: The scoring engine orders content based on user topic affinity, interest tags, recency decay, and engagement velocity.
5. **Client Presentation**: TanStack Query fetches paged feeds, and Zustand handles optimistic like/bookmark updates.
