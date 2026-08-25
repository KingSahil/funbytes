# Contributing to FunBytes ⚡

Thank you for your interest in contributing to FunBytes! We welcome contributions to our mobile client, aggregation backend, source plugin ecosystem, and ranking engine.

---

## 🛠️ Code of Conduct
- Be respectful, constructive, and inclusive.
- Adhere to legal and ethical scraping/ingestion guidelines. Never violate `robots.txt`, copyrights, or third-party Terms of Service.

---

## 🚀 Development Workflow

1. **Fork and clone** the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feat/my-awesome-feature
   ```
3. Install dependencies in `backend/` and `apps/mobile/`.
4. Ensure your changes pass type checking and tests:
   ```bash
   npm test
   ```
5. Follow code style guidelines:
   - TypeScript strict mode
   - Pure UI component isolation
   - Zustand stores for client-side persistence
   - Pluggable source classes implementing `ContentSource`

---

## 🔌 Adding a Content Source

To add a new content source:
1. Implement the `ContentSource` interface in `backend/src/sources/<source-name>.ts`.
2. Register the source in `backend/src/sources/index.ts`.
3. Add unit tests in `backend/tests/sources.test.ts`.
4. Verify graceful degradation when network or third-party APIs fail.
