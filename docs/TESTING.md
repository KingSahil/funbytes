# FunBytes Testing Strategy & Execution

## 1. Test Layers
- **Unit Tests**: Ranking algorithm, deduplication engine, and normalization logic.
- **Source Adapter Tests**: Simulated RSS and JSON responses, handling network timeouts, error codes, and empty arrays.
- **Store Tests**: Zustand stores for likes, bookmarks, user interests, and offline caching.

## 2. Running Tests
```bash
# Run all backend unit and integration tests
cd backend
bun test

# Run mobile tests
cd ../apps/mobile
bun test
```
