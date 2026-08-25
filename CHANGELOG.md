# Changelog

All notable changes to FunBytes will be documented in this file.

## [1.0.0] - 2026-08-25

### Added
- **Mobile Client (Expo + React Native + Expo Router)**
  - Dark-mode first UI architecture with custom FunBytes neon accents (`#6366F1`, `#00F5D4`).
  - 3-step interactive onboarding flow (Welcome -> Interest Selection -> Feed Style).
  - High-performance Home feed with horizontal topic chips and vertical infinite scroll.
  - Interactive Post Cards (`FeedCard`, `MemeCard`, `CartoonCard`) with optimistic likes, bookmarks, comments count, and native Android sharing.
  - In-App Article Reader modal with clean reader mode and source attribution.
  - Threaded comment system with instant UI updates and likes.
  - Explore Screen with Trending tags carousel, topic grid, political cartoons gallery, and Dev Zone.
  - Create Post modal with topic selector.
  - Profile & Bookmarks manager organized by categories.
  - Global Search screen across titles, sources, categories, and tags.
  - Local offline storage caching powered by Zustand and AsyncStorage.

- **Backend Aggregation & Ingestion Engine**
  - Modular pluggable source architecture (`ContentSource`).
  - Adapters for Reddit (`r/developersIndia`), Medium Dev Publications, DevHumor Memes, BBC, Al Jazeera, PIB India, Politico Cartoons.
  - Multi-factor Feed Ranking engine (Topic Affinity + Recency Decay + Viral Engagement Velocity).
  - Deduplication & Clustering engine with multi-source coverage badges.
  - Built-in rich demo mock dataset with 80+ realistic items across 10 topics.
  - RESTful API endpoints for feed, topics, sources, search, interactions, and admin moderation.

- **Skills & Documentation**
  - 8 Project Skills (`skills/funbytes-*`).
  - 14 System Documentation guides (`docs/*`).
  - Automated unit and integration test suite.
