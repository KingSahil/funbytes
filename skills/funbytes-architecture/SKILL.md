---
name: funbytes-architecture
description: Guide and rules for the overall FunBytes system architecture, monorepo structure, and client-server boundaries.
---

# FunBytes Architecture Skill

## Purpose
This skill defines the architectural principles, layer separations, data flows, and code organization rules across the FunBytes mobile client and backend aggregation engine.

## When to Use It
- Adding or refactoring architectural components.
- Designing new state flows, API endpoints, or cross-cutting concerns.
- Verifying client-server contract compliance.

## Inputs
- Architectural requirements, new data entities, or feature specifications.

## Expected Outputs
- Modular, decoupled components adhering to the monorepo layer structure without circular dependencies.

## Architecture Rules
1. **Never scrape or store third-party credentials directly in the mobile client.** All external API interactions, ingestion, and secret tokens belong exclusively in the backend layer.
2. **Strict Client-Server Contract**: All communication must use the normalized `ContentItem`, `User`, `Comment`, and `Topic` interfaces defined in `@funbytes/types`.
3. **Pluggable Source Ingestion**: Content ingestion sources must implement `ContentSource` and live in `backend/src/sources/`.
4. **Offline First UI**: The client UI must always function smoothly with local cache or fallback demo data if network connectivity drops.

## Layer Boundaries
```text
Mobile App (Expo Router / Zustand / React Query)
   ↓ (REST / JSON)
Backend API Controller (Express / Fastify)
   ↓
Service Layer (Ranking, Deduplication, Summarizer, Moderation)
   ↓
Ingestion Engine (ContentSource Plugin Adapters)
   ↓
External Feeds (Reddit, Medium, DevHumor, RSS, Public APIs)
```

## Common Mistakes to Avoid
- Putting business logic directly inside React components instead of hooks/Zustand stores.
- Coupling backend source adapters directly to database tables instead of the normalized `ContentItem`.
- Hardcoding URLs instead of environment configuration.

## Testing Requirements
- Architecture tests must verify that client modules do not import backend dependencies.
- Shared models in `@funbytes/types` must compile without external runtime dependencies.
